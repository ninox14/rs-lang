import { getAndUpdateUserWord, UpdateUserWordAction } from 'api/ApiService';
import { IOptional, WordDifficulty } from 'redux/types/types.d';
import { getTodaysDate } from 'utils/helpers';
import {
  IGetNewUserWordStatsOptions,
  ILongTerm,
  ISaveStatsOptions,
  // ISaveStatsOptions,
  ISaveUserWordStatsOptions,
  ISendUpdateRequestsOptions,
  IStatsAll,
  IStatsDaily,
  IUpdateDailyStatsOptions,
  IUpdateLongTernStatsOptions,
} from './types';

const getNewUserWordStats = ({
  userWord,
  action,
}: IGetNewUserWordStatsOptions) => {
  let learnedWords = 0;
  let newDifficulty: WordDifficulty;
  let newCorrectInRow: number;
  const { difficulty, optional } = userWord;

  if (action === UpdateUserWordAction.CORRECT) {
    newCorrectInRow = optional.correctInRow + 1;
    console.log('new ', newCorrectInRow, ' optional ', optional.correctInRow);
    // Checking if word should become learned
    const isPromotedFromDefault =
      difficulty === WordDifficulty.DEFAULT && newCorrectInRow === 3;
    const isPromotedFromHard =
      difficulty === WordDifficulty.HARD && newCorrectInRow === 5;
    newDifficulty = isPromotedFromDefault
      ? WordDifficulty.LEARNED
      : isPromotedFromHard
      ? WordDifficulty.LEARNED
      : difficulty;

    if (isPromotedFromDefault || isPromotedFromHard) {
      learnedWords += 1;
    }

    console.log(newDifficulty, newCorrectInRow, newDifficulty);
    return {
      difficulty: newDifficulty,
      correctInRow: newCorrectInRow,
      learnedWords,
    };
  } else {
    newCorrectInRow = 0;
    // Check if were learned before to decide if it should be forgotten
    const isUnlearned = difficulty === WordDifficulty.LEARNED;
    newDifficulty = isUnlearned ? WordDifficulty.DEFAULT : difficulty;
    if (isUnlearned) {
      learnedWords -= 1;
    }
    return {
      difficulty: newDifficulty,
      correctInRow: newCorrectInRow,
      learnedWords,
    };
  }
};

export const sendUpdateRequests = async ({
  words,
  action,
  game,
  userId,
}: ISendUpdateRequestsOptions) => {
  let learned = 0;
  for (const word of words) {
    const { id, userWord } = word;
    if (userWord) {
      const { difficulty, correctInRow, learnedWords } = getNewUserWordStats({
        userWord,
        action,
      });
      learned += learnedWords;
      await getAndUpdateUserWord({
        userId,
        wordId: id,
        difficulty,
        action,
        game,
        userWord: JSON.parse(JSON.stringify(userWord)), //WHY I HAVE TO DO THIS ??????
        correctInRow,
      });
      console.log('Updated ', action, userWord); // To be removed later
    }
  }
  return learned;
};

export const saveUserWordStats = async ({
  correct,
  wrong,
  userId,
  game,
}: ISaveUserWordStatsOptions) => {
  const learned = await sendUpdateRequests({
    words: correct,
    action: UpdateUserWordAction.CORRECT,
    userId,
    game,
  });
  const unlearned = await sendUpdateRequests({
    words: wrong,
    action: UpdateUserWordAction.INCORRECT,
    userId,
    game,
  });
  return learned + unlearned;
};

export const getDefaultDailyStats = (): IStatsDaily => ({
  date: getTodaysDate(),
  newWords: 0,
  learned: 0,
  games: {
    audiocall: {
      percentage: { total: 0, right: 0 },
      newWords: 0,
      maxChain: 0,
    },
    sprint: {
      percentage: { total: 0, right: 0 },
      newWords: 0,
      maxChain: 0,
    },
  },
});

export const getDefaultAllStats = (): IStatsAll => ({
  longTerm: { [getTodaysDate()]: { learned: 0, newWords: 0 } },
  dailyStats: getDefaultDailyStats(),
});

export const isWordNew = (optional: IOptional): boolean => {
  if (optional.correctInRow) {
    return false;
  }
  if (optional.audiocall.total === 0 && optional.sprint.total === 0) {
    return true;
  }
  return false;
};

export const countNewWords = ({
  correct,
  wrong,
}: Omit<ISaveStatsOptions, 'maxInRow'>) => {
  let newWords = 0;
  wrong.forEach((word) => {
    if (word.userWord && isWordNew(word.userWord.optional)) {
      newWords += 1;
    }
  });
  correct.forEach((word) => {
    if (word.userWord && isWordNew(word.userWord.optional)) {
      newWords += 1;
    }
  });
  return newWords;
};
export const pickStatsToUpdate = (currentStatistics?: IStatsAll) => {
  if (!currentStatistics) {
    return getDefaultAllStats();
  } else {
    const today = getTodaysDate();
    if (currentStatistics.dailyStats.date !== today) {
      currentStatistics.dailyStats = getDefaultDailyStats();
    }
    return currentStatistics;
  }
};

export const updateDailyStats = ({
  maxInRow,
  correctCount,
  wrongCount,
  game,
  stats,
  learned,
  newWords,
}: IUpdateDailyStatsOptions) => {
  const newMaxChain =
    stats.dailyStats.games[game].maxChain > maxInRow
      ? stats.dailyStats.games[game].maxChain
      : maxInRow;
  stats.dailyStats.learned += learned;
  stats.dailyStats.newWords += newWords;
  stats.dailyStats.games[game].maxChain = newMaxChain;
  stats.dailyStats.games[game].percentage.right += correctCount;
  stats.dailyStats.games[game].percentage.total += correctCount + wrongCount;
  return stats;
};

export const updateLongTern = ({
  newWords,
  learned,
  stats,
}: IUpdateLongTernStatsOptions) => {
  const todaysDate = getTodaysDate();
  const newLongTermStats: ILongTerm = {
    newWords,
    learned,
  };
  let totalLearned = 0;
  for (const date in stats.longTerm) {
    if (date === todaysDate) {
      newLongTermStats.learned += stats.longTerm[date].learned;
      newLongTermStats.newWords += stats.longTerm[date].newWords;
      delete stats.longTerm[date];
    } else {
      totalLearned += stats.longTerm[date].learned;
    }
  }

  // if (item.date === todaysDate) {
  //   newLongTermStats.learned += item.learned;
  //   newLongTermStats.newWords += item.newWords;
  //   stats.longTerm.splice(index, 1);
  // } else {
  //   totalLearned += item.learned;
  // }
  newLongTermStats.learned += totalLearned;
  stats.longTerm[todaysDate] = newLongTermStats;
  return stats;
};

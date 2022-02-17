import { getAndUpdateUserWord, UpdateUserWordAction } from 'api/ApiService';
import { IOptional, WordDifficulty } from 'redux/types/types.d';
import { getTodaysDate } from 'utils/helpers';
import {
  IGetNewUserWordStatsOptions,
  // ISaveStatsOptions,
  ISaveUserWordStatsOptions,
  ISendUpdateRequestsOptions,
  IStatsAll,
  IStatsDaily,
  IUpdateStatsOptions,
} from './types';
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
  longTerm: [{ date: getTodaysDate(), learned: 0, newWords: 0 }],
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

export const updateDailyStats = ({
  maxInRow,
  correct,
  wrong,
  userId,
  game,
  stats,
}: IUpdateStatsOptions) => {
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
};

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
      const resp = await getAndUpdateUserWord({
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
  console.log(learned, unlearned);
  return learned + unlearned;
};

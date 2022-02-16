import { getAndUpdateUserWord, UpdateUserWordAction } from 'api/ApiService';
import { IOptional, IWord, WordDifficulty } from 'redux/types/types';
import { getTodaysDate } from 'utils/helpers';
import {
  IGetNewUserWordStatsOptions,
  ISaveStatsOptions,
  ISaveUserStatsOptions,
  ISendUpdateRequestsOptions,
  IStatsAll,
  IStatsDaily,
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

export const countStatistics = () => [];

const getNewUserWordStats = ({
  userWord,
  action,
}: IGetNewUserWordStatsOptions) => {
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
    return { difficulty: newDifficulty, correctInRow: newCorrectInRow };
  } else {
    newCorrectInRow = 0;
    // Check if were learned before to decide if it should be forgotten
    newDifficulty =
      difficulty === WordDifficulty.LEARNED
        ? WordDifficulty.DEFAULT
        : difficulty;
    return { difficulty: newDifficulty, correctInRow: newCorrectInRow };
  }
};

export const sendUpdateRequests = async ({
  words,
  action,
  game,
  userId,
}: ISendUpdateRequestsOptions) => {
  for (const word of words) {
    const { id, userWord } = word;
    if (userWord) {
      const { difficulty, correctInRow } = getNewUserWordStats({
        userWord,
        action,
      });
      const resp = await getAndUpdateUserWord({
        userId,
        wordId: id,
        difficulty,
        action,
        game,
        correctInRow,
      });
      console.log('Updated ', action, resp); // To be removed later
    }
  }
};

export const saveUserWordStats = async ({
  correct,
  wrong,
  userId,
  game,
}: ISaveUserStatsOptions) => {
  await sendUpdateRequests({
    words: correct,
    action: UpdateUserWordAction.CORRECT,
    userId,
    game,
  });
  await sendUpdateRequests({
    words: wrong,
    action: UpdateUserWordAction.INCORRECT,
    userId,
    game,
  });
};

import { IStatisticsResponse, WordDifficulty } from '../redux/types/types.d';
import type {
  IAggregatedResponse,
  IOptional,
  IUserWord,
  IWord,
} from '../redux/types/types';
import { makeUserWordEndpoint } from 'utils/helpers';
import { http } from 'api/http';
import { IStatsAll } from 'components/StatsContext/types.d';

const WORDS_ENDPOINT = '/words';
export const USERS_ENDPOINT = '/users';
const AGGREGATED_ENDPOINT = '/aggregatedWords';
const STATS_ENDPOINT = '/statistics';
export const WORDS_PER_PAGE = 20;

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface IGetWordsOptions {
  page: number;
  group: number;
}

interface IUserWordIDs {
  userId: string;
  wordId: string;
}

interface IStatisticsOptions extends Pick<IUserWordIDs, 'userId'> {
  stats: IStatsAll;
}

export enum UpdateUserWordAction {
  CORRECT,
  INCORRECT,
}

interface IUserWordOptions extends IUserWord, IUserWordIDs {}

export type GameKey = keyof Omit<IOptional, 'correctInRow'>;
interface IGetAndUpdateOptions extends IUserWordIDs {
  difficulty?: WordDifficulty;
  game?: GameKey;
  action?: UpdateUserWordAction;
  correctInRow?: number;
}
export interface IAggregatedOptions
  extends PartialBy<IGetWordsOptions, 'group'>, // it is partial coz of fetching only hard textbook.
    Pick<IUserWordIDs, 'userId'> {
  filter?: string;
  wordsPerPage?: number;
}

export const getWords = async (
  options: PartialBy<IGetWordsOptions, 'page'>
) => {
  const response = await http.get<IWord[]>(WORDS_ENDPOINT, {
    params: { ...options },
  });
  return response;
};

export const getAllUserWords = async (userId: string) => {
  const endpoint = `${USERS_ENDPOINT}/${userId}${WORDS_ENDPOINT}`;
  const response = await http.get<IUserWord[]>(endpoint);
  return response;
};

export const createUserWord = async ({
  userId,
  wordId,
  difficulty,
  optional,
}: IUserWordOptions) => {
  const endpoint = makeUserWordEndpoint(userId, wordId);
  const response = await http.post<IUserWord>(endpoint, {
    difficulty,
    optional,
  });
  return response;
};

export const getUserWord = async ({ userId, wordId }: IUserWordIDs) => {
  const endpoint = makeUserWordEndpoint(userId, wordId);
  const response = await http.get<IUserWord>(endpoint);
  return response;
};

export const updateUserWord = async ({
  userId,
  wordId,
  difficulty,
  optional,
}: IUserWordOptions) => {
  const endpoint = makeUserWordEndpoint(userId, wordId);
  const response = await http.put<IUserWord>(endpoint, {
    difficulty,
    optional,
  });
  return response;
};

export const deleteUserWord = async ({ userId, wordId }: IUserWordIDs) => {
  const endpoint = makeUserWordEndpoint(userId, wordId);
  const response = await http.get(endpoint);
  return response;
};

export const getAggregatedWords = async ({
  userId,
  page,
  group,
  filter,
  wordsPerPage,
}: IAggregatedOptions) => {
  const endpoint = `${USERS_ENDPOINT}/${userId}${AGGREGATED_ENDPOINT}`;
  const newWordsPerPage = wordsPerPage ? wordsPerPage : WORDS_PER_PAGE;
  const response = await http.get<IAggregatedResponse[]>(endpoint, {
    params: {
      group,
      page,
      wordsPerPage: newWordsPerPage,
      ...(filter ? { filter } : {}),
    },
  });
  return response;
};

const updateGameScore = (
  game: keyof Omit<IOptional, 'correctInRow'>,
  action: UpdateUserWordAction,
  optional: IOptional,
  correctInRow?: number
) => {
  switch (action) {
    case UpdateUserWordAction.CORRECT: {
      optional[game].right += 1;
      optional[game].total += 1;
      if (typeof correctInRow === 'number') {
        optional.correctInRow = correctInRow;
      }
      break;
    }
    case UpdateUserWordAction.INCORRECT: {
      optional[game].total += 1;
      break;
    }
  }
  return optional;
};

export const getAndUpdateUserWord = async ({
  userId,
  wordId,
  difficulty,
  action,
  game,
  correctInRow,
}: IGetAndUpdateOptions) => {
  try {
    const wordExists = (word: IUserWord) => {
      if (game && action) {
        word.optional = updateGameScore(
          game,
          action,
          word.optional,
          correctInRow
        );
      }
      const newDifficulty = difficulty ? difficulty : word.difficulty;
      return updateUserWord({
        userId,
        wordId,
        difficulty: newDifficulty,
        optional: word.optional,
      });
    };
    const wordDoesntExist = () => {
      let optional: IOptional = {
        audiocall: { right: 0, total: 0 },
        sprint: { right: 0, total: 0 },
        correctInRow: 0,
      };
      const newDifficulty = difficulty ? difficulty : WordDifficulty.DEFAULT;
      if (game && action) {
        optional = updateGameScore(game, action, optional, correctInRow);
      }
      return createUserWord({
        userId,
        wordId,
        difficulty: newDifficulty,
        optional,
      });
    };
    const response = await getUserWord({ userId, wordId }).then(
      (result) => wordExists(result.data),
      wordDoesntExist
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const getUserStatistics = async ({
  userId,
}: Pick<IUserWordIDs, 'userId'>) => {
  const endpoint = `${USERS_ENDPOINT}/${userId}${STATS_ENDPOINT}`;
  const response = await http.get<IStatisticsResponse>(endpoint);
  return response;
};

export const updateUserStatistics = async ({
  userId,
  stats,
}: IStatisticsOptions) => {
  const endpoint = `${USERS_ENDPOINT}/${userId}${STATS_ENDPOINT}`;
  const response = await http.put<IStatisticsResponse>(endpoint, {
    learnedWords: 1337,
    optional: stats,
  });
  return response;
};

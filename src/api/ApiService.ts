import { WordDifficulty } from '../redux/types/types';
import type {
  IAggregatedResponse,
  IOptional,
  IUserWord,
  IWord,
} from '../redux/types/types';
import { makeUserWordEndpoint } from '../utils/helpers';
import { http } from './http';

const WORDS_ENDPOINT = '/words';
export const USERS_ENDPOINT = '/users';
const AGGREGATED_ENDPOINT = '/aggregatedWords';
export const WORDS_PER_PAGE = 20;

const aggregatedWordsFilters = {
  onlyHard: `{"$and":[{"userWord.difficulty":"${WordDifficulty.HARD}"}]}`,
};

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type FilterKey = keyof typeof aggregatedWordsFilters;
export interface IGetWordsOptions {
  page: number;
  group: number;
}

interface IUserWordIDs {
  userId: string;
  wordId: string;
}

enum UpdateUserWordAction {
  CORRECT,
  INCORRECT,
}

interface IUserWordOptions extends IUserWord, IUserWordIDs {}

type GameKey = keyof IOptional;
interface IGetAndUpdateOptions extends IUserWordIDs {
  difficulty?: WordDifficulty;
  game?: GameKey;
  action?: UpdateUserWordAction;
}
export interface IAggregatedOptions
  extends PartialBy<IGetWordsOptions, 'group'>,
    Pick<IUserWordIDs, 'userId'> {
  filter?: FilterKey;
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
  const response = await http.get<IAggregatedResponse>(endpoint, {
    params: {
      group,
      page,
      wordsPerPage: newWordsPerPage,
      ...(filter ? { filter: aggregatedWordsFilters[filter] } : {}),
    },
  });
  return response;
};

const updateGameScore = (
  game: keyof IOptional,
  action: UpdateUserWordAction,
  optional: IOptional
) => {
  switch (action) {
    case UpdateUserWordAction.CORRECT: {
      optional[game].right += 1;
      optional[game].total += 1;
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
}: IGetAndUpdateOptions) => {
  try {
    const wordExists = (word: IUserWord) => {
      if (game && action) {
        word.optional = updateGameScore(game, action, word.optional);
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
      };
      const newDifficulty = difficulty ? difficulty : WordDifficulty.DEFAULT;
      if (game && action) {
        optional = updateGameScore(game, action, optional);
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

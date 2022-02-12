import { IAggregatedResponse, IUserWord, IWord } from '../redux/types/types';
import { makeUserWordEndpoint } from '../utils/helpers';
import { http } from './http';

const WORDS_ENDPOINT = '/words';
export const USERS_ENDPOINT = '/users';
const AGGREGATED_ENDPOINT = '/aggregatedWords';
export const WORDS_PER_PAGE = 30;

const aggregatedWordsFilters = {
  placeholderKey: 'placeholderValue',
};

export interface IGetWordsOptions {
  page: number;
  group: number;
}

interface IUserWordIDs {
  userId: string;
  wordId: string;
}

// eslint-disable-next-line prettier/prettier
type FilterKey = keyof typeof aggregatedWordsFilters;

interface IUserWordOptions extends IUserWord, IUserWordIDs {}
export interface IAggregatedOptions
  extends IGetWordsOptions,
    Pick<IUserWordIDs, 'userId'> {
      filter?: FilterKey
    }

export const getWords = async ({ page, group }: IGetWordsOptions) => {
  const response = await http.get<IWord[]>(WORDS_ENDPOINT, {
    params: { group, page },
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
  filter
}: IAggregatedOptions) => {
  const endpoint = `${USERS_ENDPOINT}/${userId}${AGGREGATED_ENDPOINT}`;
  const response = await http.get<IAggregatedResponse>(endpoint, {
    params: {
      group,
      page,
      wordsPerPage: WORDS_PER_PAGE,
      ...(filter ? {filter: aggregatedWordsFilters[filter]} : {})},
  });
  return response;
};

import { IUserWord, IWord } from '../redux/types/types';
import { makeUserWordEndpoint } from '../utils/helpers';
import { http } from './http';

const WORDS_ENDPOINT = '/words';
export const USERS_ENDPOINT = '/users';

export interface IGetWordsOptions {
  page: number;
  group: number;
}

interface IUserWordOptions extends IUserWord, IUserWordIDs {}

interface IUserWordIDs {
  userId: string;
  wordId: string;
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

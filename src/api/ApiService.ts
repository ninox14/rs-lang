import { IWord } from '../redux/types/types';
import { http } from './http';

const WORDS_ENDPOINT = '/words';
export const USERS_ENDPOINT = '/users';

interface IGetWordsOptions {
  page: number;
  group: number;
}

interface IUserWord {
  difficulty: string;
  //TODO interface for optional object
  optional: unknown;
}

export const getWords = async ({ page, group }: IGetWordsOptions) => {
  const response = await http.get<IWord[]>(WORDS_ENDPOINT, {
    params: { group, page },
  });
  return response;
};

export const getUserWords = async (userId: string) => {
  const endpoint = `${USERS_ENDPOINT}/${userId}${WORDS_ENDPOINT}`;
  const response = await http.get<IUserWord[]>(endpoint);
  return response;
};

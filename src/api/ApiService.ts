import { IWord } from '../redux/types/types';
import { http } from './http';

const WORDS_ENDPOINT = '/words';
export const USERS_ENDPOINT = '/users';

interface IGetWordsOptions {
  page: number;
  group: number;
}

export const getWords = async ({ page, group }: IGetWordsOptions) => {
  const response = await http.get<IWord[]>(WORDS_ENDPOINT, {
    params: { group, page },
  });
  return response;
};

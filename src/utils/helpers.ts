import { USERS_ENDPOINT } from 'api/ApiService';
import { WordDifficulty } from '../redux/types/types.d';
import type { IUserWord, IWord } from '../redux/types/types';

export const makeUserWordEndpoint = (userId: string, wordId: string) =>
  `${USERS_ENDPOINT}/${userId}/words/${wordId}`;

export const reshapeWordsForUser = (words: IWord[]) => {
  words.map((word) => {
    if (word._id) {
      word.id = word._id;
    }
    if (!word.userWord) {
      const defaultUserWord: IUserWord = {
        difficulty: WordDifficulty.DEFAULT,
        optional: {
          audiocall: { right: 0, total: 0 },
          sprint: { right: 0, total: 0 },
        },
      };
      word.userWord = defaultUserWord;
    }
    return word;
  });
  return words;
};

export const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

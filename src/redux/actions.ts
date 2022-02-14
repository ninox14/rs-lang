import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IHardWordsOptions } from './types/types';

import {
  getAggregatedWords,
  getWords,
  WORDS_PER_PAGE,
} from '../api/ApiService';
import type { IAggregatedOptions, IGetWordsOptions } from '../api/ApiService';
import { getRandomNumber, reshapeWordsForUser } from '../utils/helpers';
import { setMaxHardWordsPages } from './word.slice';

export const AUDIOCALL_WORD_COUNT = 20;
const SPRINT_MAX_PAGE_COUNT = 3;
const maxPageIndex = 29;

const getPossiblePages = ({ group, page }: IGetWordsOptions) => {
  let pageIndex = page;
  let groupIndex = group;
  const result = [];
  group: while (groupIndex >= 0) {
    while (pageIndex >= 0) {
      if (result.length < SPRINT_MAX_PAGE_COUNT) {
        result.push({ page: pageIndex, group: groupIndex });
      } else {
        break group;
      }
      pageIndex--;
    }
    pageIndex = maxPageIndex;
    groupIndex--;
  }
  return result;
};

export const getTextbookWords = createAsyncThunk(
  'words/getTextbookWords',
  async (options: IGetWordsOptions, { rejectWithValue }) => {
    try {
      const response = await getWords(options);
      return response.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue('Не удалось загрузить слова');
    }
  }
);

export const getUserTextbookWords = createAsyncThunk(
  'words/getUserTextbookWords',
  async (options: IAggregatedOptions, { rejectWithValue }) => {
    try {
      const { data } = await getAggregatedWords(options);
      const reshaped = reshapeWordsForUser(data.paginatedResults);
      return reshaped;
    } catch (err) {
      console.error(err);
      return rejectWithValue(
        'Не удалось получить слова для этого пользователя'
      );
    }
  }
);

export const getTextbookHardWords = createAsyncThunk(
  'words/getTextbookHardWords',
  async (options: IHardWordsOptions, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await getAggregatedWords({
        ...options,
        filter: 'onlyHard',
      });
      const reshaped = reshapeWordsForUser(data.paginatedResults);
      const maxPages = Math.floor(data.totalCount[0].count / WORDS_PER_PAGE);
      dispatch(setMaxHardWordsPages(maxPages));
      return reshaped;
    } catch (err) {
      console.error(err);
      return rejectWithValue('Не удалось загрузить сложные слова');
    }
  }
);

export const getWordsAudiocall = createAsyncThunk(
  'words/getWordsAudiocall',
  async (options: IAggregatedOptions, { rejectWithValue }) => {
    try {
      const { data } = await getAggregatedWords({
        ...options,
        wordsPerPage: AUDIOCALL_WORD_COUNT,
      });
      const reshaped = reshapeWordsForUser(data.paginatedResults);
      return reshaped;
    } catch (err) {
      console.error(err);
      return rejectWithValue('Не удалось загрузить слова для аудиовызова');
    }
  }
);

export const getWordsAudiocallAnon = createAsyncThunk(
  'words/getWordsAudiocallAnon',
  async (options: IGetWordsOptions, { rejectWithValue }) => {
    try {
      const { data } = await getWords(options);
      return data.slice(getRandomNumber(data.length - AUDIOCALL_WORD_COUNT));
    } catch (err) {
      console.error(err);
      return rejectWithValue('Не удалось загрузить слова для аудиовызова');
    }
  }
);

// export const getWordsSprint = createAsyncThunk(
//   'words/getWordsAudiocall',
//   async (options: IAggregatedOptions, { rejectWithValue }) => {
//     const { page, group } = options;
//     const pagesToGetFrom: IGetWordsOptions[] = [];

//     try {
//       const { data } = await getAggregatedWords({
//         ...options,
//       });
//       return data;
//     } catch (err) {
//       console.error(err);
//       return rejectWithValue('');
//     }
//   }
// );

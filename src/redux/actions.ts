import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAggregatedWords,
  getWords,
  WORDS_PER_PAGE,
} from '../api/ApiService';
import type { IGetWordsOptions } from 'api/ApiService';
import {
  IHardWordsOptions,
  IUserWordsActionOptions,
  IWord,
  WordDifficulty,
} from 'redux/types/types.d';

import { reshapeWordsForUser } from 'utils/helpers';
import { setMaxHardWordsPages } from 'redux/word.slice';
import { RootState } from './store';

export const AUDIOCALL_WORD_COUNT = 20;
const SPRINT_MAX_PAGE_COUNT = 3;
const maxPageIndex = 29;

const aggregatedWordsFilters = {
  onlyHard: `{"$and":[{"userWord.difficulty":"${WordDifficulty.HARD}"}]}`,
  notLearned: ({ page }: { page: number }) =>
    `{"$and":[{"$or":[{"userWord.difficulty":"${WordDifficulty.HARD}"},{"userWord.difficulty":"${WordDifficulty.DEFAULT}"},{"userWord":null}]},{"page":${page}}]}`,
  defaultFilter: ({ page }: { page: number }) => `{"$and":[{"page":${page}}]}`,
};

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
  async (options: IUserWordsActionOptions, { rejectWithValue }) => {
    try {
      const { page, group, userId } = options;
      const filter = aggregatedWordsFilters.defaultFilter({ page });
      const { data } = await getAggregatedWords({ userId, group, filter });
      const reshaped = reshapeWordsForUser(data[0].paginatedResults);
      console.log(data[0].paginatedResults);
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
        filter: aggregatedWordsFilters.onlyHard,
      });
      const reshaped = reshapeWordsForUser(data[0].paginatedResults);
      const maxPages = Math.floor(data[0].totalCount[0].count / WORDS_PER_PAGE);
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
  async (options: IUserWordsActionOptions, { getState, rejectWithValue }) => {
    try {
      const { page, group, userId } = options;
      const {
        word: { isGameRanFromTextbook },
      } = getState() as RootState;
      const filter = isGameRanFromTextbook
        ? aggregatedWordsFilters.notLearned({ page })
        : aggregatedWordsFilters.defaultFilter({ page });

      const { data } = await getAggregatedWords({
        group,
        userId,
        wordsPerPage: AUDIOCALL_WORD_COUNT,
        filter,
      });
      const reshaped = reshapeWordsForUser(data[0].paginatedResults);
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
      return data;
    } catch (err) {
      console.error(err);
      return rejectWithValue('Не удалось загрузить слова для аудиовызова');
    }
  }
);

export const getWordsSprint = createAsyncThunk(
  'words/getWordsSprint',
  async (
    { page, group, userId }: IUserWordsActionOptions,
    { getState, rejectWithValue }
  ) => {
    const pagesToGetFrom = getPossiblePages({ group, page });
    try {
      const words: IWord[] = [];
      const {
        word: { isGameRanFromTextbook },
      } = getState() as RootState;

      for (const item of pagesToGetFrom) {
        const filter = isGameRanFromTextbook
          ? aggregatedWordsFilters.notLearned({ page: item.page })
          : aggregatedWordsFilters.defaultFilter({ page: item.page });
        const { data } = await getAggregatedWords({
          group: item.group,
          userId,
          filter,
        });
        const reshaped = reshapeWordsForUser(data[0].paginatedResults);
        words.push(...reshaped);
      }
      return words;
    } catch (err) {
      console.error(err);
      return rejectWithValue("Не удалось загрузить слова для сринт'а");
    }
  }
);

export const getWordsSprintAnon = createAsyncThunk(
  'words/getWordsSprintAnon',
  async (options: IGetWordsOptions, { rejectWithValue }) => {
    try {
      const { data } = await getWords(options);
      return data;
    } catch (err) {
      console.error(err);
      return rejectWithValue("Не удалось загрузить слова для сринт'а");
    }
  }
);

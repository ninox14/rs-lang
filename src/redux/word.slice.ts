import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { WordDifficulty } from './types/types';
import type { IUserWord, IWord, IWordSlice } from './types/types';
import {
  getAggregatedWords,
  getWords,
  IGetWordsOptions,
} from '../api/ApiService';
import type { IAggregatedOptions } from '../api/ApiService';

export const initialState: IWordSlice = {
  words: [],
  loading: true,
  page: 0,
  group: 0,
  userId: '',
  error: '',
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

      const reshaped = data.paginatedResults.map((word) => {
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
      return reshaped;
    } catch (err) {
      console.error(err);
      return rejectWithValue(
        'Не удалось получить слова для этого пользователя'
      );
    }
  }
);

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setGroup: (state, action: PayloadAction<number>) => {
      state.group = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setErrorMsg: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [getTextbookWords.fulfilled.type]: (
      state,
      action: PayloadAction<IWord[]>
    ) => {
      state.loading = false;
      state.error = '';
      state.words = action.payload;
    },
    [getTextbookWords.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
      console.error(action.payload);
    },
    [getTextbookWords.pending.type]: (state) => {
      state.loading = true;
    },
    [getUserTextbookWords.fulfilled.type]: (
      state,
      action: PayloadAction<IWord[]>
    ) => {
      state.loading = false;
      state.error = '';
      state.words = action.payload;
    },
    [getUserTextbookWords.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getUserTextbookWords.pending.type]: (state) => {
      state.loading = true;
    },
  },
});

const { reducer, actions } = wordsSlice;

export const { setPage, setGroup, setUserId, setErrorMsg } = actions;

export default reducer;

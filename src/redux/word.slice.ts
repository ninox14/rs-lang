import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  getAggregatedWords,
  getWords,
  IAggregatedOptions,
  IGetWordsOptions,
} from '../api/ApiService';

import { IWord, IWordSlice } from './types/types';

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

export const { setPage, setGroup, setUserId } = actions;

export default reducer;

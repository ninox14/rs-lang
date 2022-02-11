// eslint-disable-next-line import/named
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getWords, IGetWordsOptions } from '../api/ApiService';

import { IWord, IWordSlice } from './types/types';

export const initialState: IWordSlice = {
  words: [],
  loading: true,
  page: 0,
  group: 0,
  userId: '',
  error: '',
};

const getTextbookWords = createAsyncThunk(
  'words/getTextbookWords',
  async (options: IGetWordsOptions) => {
    const response = await getWords(options);
    return response.data;
  }
);

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    // getWords: (state) => {},
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
    },
    [getTextbookWords.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
  },
});

const { reducer, actions } = wordsSlice;

export const { setPage, setGroup, setUserId } = actions;

export default reducer;

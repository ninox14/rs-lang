import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { IWord, IWordSlice } from 'redux/types/types';
import {
  getTextbookWords,
  getUserTextbookWords,
  getTextbookHardWords,
  getWordsAudiocall,
  getWordsAudiocallAnon,
  getWordsSprint,
  getWordsSprintAnon,
} from 'redux/actions';

export const initialState: IWordSlice = {
  words: [],
  loading: true,
  page: 0,
  group: 0,
  userId: '',
  error: '',
  isGameRanFromTextbook: false,
  audiocallWords: [],
  sprintWords: [],
  maxHardWordsPages: 0,
};

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
    setMaxHardWordsPages: (state, action: PayloadAction<number>) => {
      state.maxHardWordsPages = action.payload;
    },
    setIsGameRanFromTextbook: (state, action: PayloadAction<boolean>) => {
      state.isGameRanFromTextbook = action.payload;
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
    [getTextbookHardWords.fulfilled.type]: (
      state,
      action: PayloadAction<IWord[]>
    ) => {
      state.loading = false;
      state.error = '';
      state.words = action.payload;
    },
    [getTextbookHardWords.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
      console.error(action.payload);
    },
    [getTextbookHardWords.pending.type]: (state) => {
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
    [getWordsAudiocall.fulfilled.type]: (
      state,
      action: PayloadAction<IWord[]>
    ) => {
      state.loading = false;
      state.error = '';
      state.audiocallWords = action.payload;
    },
    [getWordsAudiocall.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getWordsAudiocall.pending.type]: (state) => {
      state.loading = true;
    },
    [getWordsAudiocallAnon.fulfilled.type]: (
      state,
      action: PayloadAction<IWord[]>
    ) => {
      state.loading = false;
      state.error = '';
      state.audiocallWords = action.payload;
    },
    [getWordsAudiocallAnon.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getWordsAudiocallAnon.pending.type]: (state) => {
      state.loading = true;
    },
    [getWordsSprint.fulfilled.type]: (
      state,
      action: PayloadAction<IWord[]>
    ) => {
      state.loading = false;
      state.error = '';
      state.sprintWords = action.payload;
    },
    [getWordsSprint.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getWordsSprint.pending.type]: (state) => {
      state.loading = true;
    },
    [getWordsSprintAnon.fulfilled.type]: (
      state,
      action: PayloadAction<IWord[]>
    ) => {
      state.loading = false;
      state.error = '';
      state.sprintWords = action.payload;
    },
    [getWordsSprintAnon.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getWordsSprintAnon.pending.type]: (state) => {
      state.loading = true;
    },
  },
});

const { reducer, actions } = wordsSlice;

export const {
  setPage,
  setGroup,
  setUserId,
  setErrorMsg,
  setMaxHardWordsPages,
  setIsGameRanFromTextbook,
} = actions;

export default reducer;

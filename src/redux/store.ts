import { configureStore } from '@reduxjs/toolkit';
import { wordsSlice } from './word.slice';

export const store = configureStore({
  reducer: {
    words: wordsSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export const selectWords = (state: RootState) => state.words.words;

export type AppDispatch = typeof store.dispatch;

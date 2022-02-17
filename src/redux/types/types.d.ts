// import type { IAggregatedOptions } from 'api/ApiService';
import type { IStatsAll } from 'components/StatsContext/StatsContext';
export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  userWord?: IUserWord;
  _id?: string;
}

export interface IWordSlice {
  words: IWord[];
  loading: boolean;
  page: number;
  group: number;
  userId: string;
  error: string;
  isGameRanFromTextbook: boolean;
  audiocallWords: IWord[];
  sprintWords: IWord[];
  maxHardWordsPages: number;
}

export interface IUserWord {
  difficulty: WordDifficulty;
  optional: IOptional;
}

export interface IOptional {
  audiocall: IWordGameStats;
  sprint: IWordGameStats;
  correctInRow: number;
}

export interface IWordGameStats {
  right: number;
  total: number;
}

export enum WordDifficulty {
  DEFAULT = 'default',
  LEARNED = 'learned',
  HARD = 'hard',
}

export interface IAggregatedResponse {
  paginatedResults: IWord[];
  totalCount: { count: number }[];
}

export interface IHardWordsOptions {
  userId: string;
  page: number;
}

export interface IUserWordsActionOptions {
  // extends Omit<IAggregatedOptions, 'group'> {
  userId: string;
  group: number;
  page: number;
}

export interface IStatisticsResponse {
  learnedWords: number;
  optional: IStatsAll;
}

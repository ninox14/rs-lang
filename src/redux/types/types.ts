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
  audiocallWords: IWord[];
  maxHardWordsPages: number;
}

export interface IUserWord {
  difficulty: WordDifficulty;
  optional: IOptional;
}

export interface IOptional {
  audiocall: IWordGameStats;
  sprint: IWordGameStats;
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

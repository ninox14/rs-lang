import { GameKey, UpdateUserWordAction } from 'api/ApiService';
import { IWord, IUserWord } from 'redux/types/types';

export interface IGameStats {
  percentage: { total: number; right: number };
  newWords: number;
  maxChain: number;
}

type IGamesStats = Record<GameKey, IGameStats>;

export interface IStatsDaily {
  date: string;
  newWords: number;
  learned: number;
  // percentage: number;
  games: IGamesStats;
}

export interface IStatsAll {
  longTerm: { date: string; learned: number; newWords: number }[];
  dailyStats: IStatsDaily;
}
export interface ISaveStatsOptions {
  correct: IWord[];
  wrong: IWord[];
}
export type SaveStatsCallback = (options: ISaveStatsOptions) => Promise<void>;

export interface IStatsContext {
  // game: string;
  // correct: IWord[];
  // wrong: IWord[];
  // addCorrect: (words: IWord[]) => void;
  // addWrong: (words: IWord[]) => void;
  saveStatistics: SaveStatsCallback;
}

export interface IStatsContextProviderProps {
  game: GameKey;
}

export interface ISaveUserStatsOptions
  extends ISaveStatsOptions,
    IStatsContextProviderProps {
  userId: string;
}

export interface IGetNewUserWordStatsOptions {
  userWord: IUserWord;
  action: UpdateUserWordAction;
}

export interface ISendUpdateRequestsOptions {
  action: UpdateUserWordAction;
  game: GameKey;
  words: IWord[];
  userId: string;
}

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
export interface ILongTerm {
  // date: string;
  learned: number;
  newWords: number;
}

export interface IStatsAll {
  longTerm: { [date: string]: ILongTerm };
  // longTerm: { date: string; learned: number; newWords: number };
  dailyStats: IStatsDaily;
}
export interface ISaveStatsOptions {
  correct: IWord[];
  wrong: IWord[];
  maxInRow: number;
}

export type SaveStatsCallback = (options: ISaveStatsOptions) => Promise<void>;

export interface IStatsContext {
  saveStatistics: SaveStatsCallback;
  getStatistics: () => Promise<IStatsAll>;
}

export interface IStatsContextProviderProps {
  game: GameKey;
}

export interface ISaveUserWordStatsOptions
  extends Omit<ISaveStatsOptions, 'maxInRow'>,
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

export interface IUpdateDailyStatsOptions extends IStatsContextProviderProps {
  stats: IStatsAll;
  learned: number;
  newWords: number;
  maxInRow: number;
  correctCount: number;
  wrongCount: number;
}
export interface IUpdateLongTernStatsOptions {
  learned: number;
  newWords: number;
  stats: IStatsAll;
}

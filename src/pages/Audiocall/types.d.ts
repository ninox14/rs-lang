export enum GamePage {
  Home = 'Home',
  Round = 'Round',
  Statistics = 'Statistics',
}

export interface Result {
  correct: boolean;
  word: string;
  translation: string;
  audio: string;
}

export type Results = Result[];

export interface IGamePageProps {
  gamePageProps: IGamePagePropsObject;
}

export interface IGamePagePropsObject {
  changePage?: (page: GamePage) => void;
  changeAudioSrc?: (src: string) => void;
  saveResults?: (results: Results) => void;
  roundResults?: Results;
}

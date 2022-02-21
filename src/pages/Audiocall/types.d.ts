import AudioPlayer from 'components/Audio/Audio';

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
  audioSrc: string;
  changeAudioSrc: (src: string) => void;
  audio: AudioPlayer;
}

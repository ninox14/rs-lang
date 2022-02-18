import { GameKey } from 'api/ApiService';
import { createContext, FC } from 'react';
import { IWord } from 'redux/types/types';

export enum GameState {
  INITIAL = 'initial',
  QUESTION = 'question',
  CORRECT = 'answ-correct',
  WRONG = 'answ-wrong',
  RESULTS = 'results',
}

interface IGameContext {
  answers: string[];
  question: IWord | null;
  correct: IWord[];
  wrong: IWord[];
  gameState: GameState;
  giveAnswer: (answer: string) => void;
  pickDifficulty: (difficulty: number) => void;
}

const contextDefaults: IGameContext = {
  answers: [],
  question: null,
  correct: [],
  wrong: [],
  gameState: GameState.INITIAL,
  giveAnswer: (answer) => {},
  pickDifficulty: (difficulty) => {},
};

interface IGameContextProps {
  game: GameKey;
}

const GameContext = createContext<IGameContext>(contextDefaults);

export const GameProvider: FC<IGameContextProps> = ({ game, children }) => {
  return (
    <GameContext.Provider
      value={contextDefaults}
      children={children}
    ></GameContext.Provider>
  );
};

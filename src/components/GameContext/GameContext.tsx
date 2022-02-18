import type { AnyAction } from '@reduxjs/toolkit';
import { GameKey, IGetWordsOptions } from 'api/ApiService';
import { createContext, FC, useEffect, useState } from 'react';
import {
  getWordsAudiocall,
  getWordsAudiocallAnon,
  getWordsSprint,
  getWordsSprintAnon,
} from 'redux/actions';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { IUserWordsActionOptions, IWord } from 'redux/types/types';
import { getRandomNumber } from 'utils/helpers';

const maxPages = 30;

export enum GameState {
  INITIAL = 'initial',
  QUESTION = 'question',
  CORRECT = 'answ-correct',
  WRONG = 'answ-wrong',
  RESULTS = 'results',
  COUNTDOWN = 'countdown',
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

interface IFetchWordsOptions {
  action: () => AnyAction;
  // actionOptions: IUserWordsActionOptions | IGetWordsOptions;
}
interface IGameContextProps {
  game: GameKey;
}

const GameContext = createContext<IGameContext>(contextDefaults);

export const GameProvider: FC<IGameContextProps> = ({ game, children }) => {
  const appDispatch = useAppDispatch();

  const isRanFromTextBook = useAppSelector(
    (state) => state.word.isGameRanFromTextbook
  );
  const sprintWords = useAppSelector((state) => state.word.sprintWords);
  const audicallWords = useAppSelector((state) => state.word.audiocallWords);
  const userId = useAppSelector((state) => state.word.userId);

  const [gameState, setGameState] = useState<GameState>(GameState.INITIAL);
  const [gameWords, setGameWords] = useState<IWord[]>([]);

  const initializeWords = () => {
    switch (game) {
      case 'audiocall': {
        setGameWords(audicallWords);
        break;
      }
      case 'sprint': {
        setGameWords(sprintWords);
        break;
      }
    }
  };

  const fetchWords = ({ action }: IFetchWordsOptions) => {
    switch (game) {
      case 'audiocall': {
        appDispatch(action());
        break;
      }
      case 'sprint': {
        appDispatch(action());
        break;
      }
    }
  };

  const pickDifficulty = (difficulty: number) => {
    if (userId) {
      switch (game) {
        case 'audiocall': {
          appDispatch(
            getWordsAudiocall({
              userId,
              group: difficulty,
              page: getRandomNumber(maxPages),
            })
          );
          break;
        }
        case 'sprint': {
          appDispatch(
            getWordsSprint({
              userId,
              group: difficulty,
              page: getRandomNumber(maxPages),
            })
          );
          break;
        }
      }
    } else {
      switch (game) {
        case 'audiocall': {
          appDispatch(
            getWordsAudiocallAnon({
              group: difficulty,
              page: getRandomNumber(maxPages),
            })
          );
          break;
        }
        case 'sprint': {
          appDispatch(
            getWordsSprintAnon({
              group: difficulty,
              page: getRandomNumber(maxPages),
            })
          );
          break;
        }
      }
    }
  };

  useEffect(() => {
    if (isRanFromTextBook) {
      initializeWords();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initializeWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sprintWords, audicallWords]);

  return <GameContext.Provider value={contextDefaults} children={children} />;
};

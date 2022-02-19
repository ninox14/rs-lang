import { GameKey, IGetWordsOptions } from 'api/ApiService';
import { createContext, FC, useContext, useEffect, useState } from 'react';
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
  const [maxRounds, setMaxRounds] = useState(99999);

  // Function that sets words from react store to state of this component
  // for you to pop words from this state to put it as a question
  const initializeWords = () => {
    switch (game) {
      case 'audiocall': {
        setGameWords(audicallWords);
        setMaxRounds(audicallWords.length);
        break;
      }
      case 'sprint': {
        setGameWords(sprintWords);
        setMaxRounds(sprintWords.length);
        break;
      }
    }
  };

  // Exported pick difficulty callback that dispatches actions
  // to get words for loged in user or for Anon user and sets
  // them as a word array for questions
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
    setGameState(GameState.COUNTDOWN);
  };

  // After loading get words that were already fetched and sets them as a questions
  // For that to work you need to dispatch(getSprintWords or getAudiocallWords) right
  // befor navigating user to this page
  useEffect(() => {
    if (isRanFromTextBook) {
      initializeWords();
      setGameState(GameState.COUNTDOWN); // to start game right after loading
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This needed to actually track changes in redux store
  // example: after executing pickDifficulty redux gets new words and;
  // this useEffect executes to set them as words for questions
  useEffect(() => {
    initializeWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sprintWords, audicallWords]);

  // This should execute services or make something happend on change of the
  // game state
  useEffect(() => {
    switch (gameState) {
      case GameState.INITIAL: {
        break;
      }
      case GameState.COUNTDOWN: {
        break;
      }
      case GameState.CORRECT: {
        break;
      }
      case GameState.WRONG: {
        break;
      }
      case GameState.RESULTS: {
        break;
      }
    }
  }, [gameState]);

  // You should put everything you want to give access to for child components
  // shape of value prop defined in IGameContex interface
  return <GameContext.Provider value={contextDefaults} children={children} />;
};

// This gives an access to things you put in value
export const useGame = () => useContext(GameContext);

// tried to optimize but faiiled :(
// const fetchWords = ({ action }: IFetchWordsOptions) => {
//   switch (game) {
//     case 'audiocall': {
//       appDispatch(action());
//       break;
//     }
//     case 'sprint': {
//       appDispatch(action());
//       break;
//     }
//   }
// };

// interface IFetchWordsOptions {
//   action: () => AnyAction;
//   // actionOptions: IUserWordsActionOptions | IGetWordsOptions;
// }

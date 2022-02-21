import { createContext, FC, useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { IWord } from 'redux/types/types';
import { getRandomNumber, shuffle } from 'utils/helpers';
import { GameKey } from 'api/ApiService';
import {
  getWordsAudiocall,
  getWordsAudiocallAnon,
  getWordsSprint,
  getWordsSprintAnon,
} from 'redux/actions';
import { useStats } from 'components/StatsContext/StatsContext';
import { setIsGameRanFromTextbook } from 'redux/word.slice';

const maxPages = 30;
const maxAnswersAudiocall = 5;

export enum GameState {
  INITIAL = 'initial',
  QUESTION = 'question',
  CORRECT = 'answ-correct',
  WRONG = 'answ-wrong',
  RESULTS = 'results',
  COUNTDOWN = 'countdown',
  INSUFFICIENT = 'insufficient',
}

interface IGameContext {
  answers: string[];
  question: IWord;
  correct: IWord[];
  wrong: IWord[];
  gameState: GameState;
  countDown: number;
  correctInRow: number;
  giveAnswerAudiocall: (answer: string) => void;
  giveAnswerSprint: (answer: boolean) => void;
  pickDifficulty: (difficulty: number) => void;
  handleGameStateChange: (state: GameState) => void;
  progressGame: () => void;
}

const wordDefaults: IWord = {
  id: '',
  group: 0,
  page: 0,
  word: '',
  image: '',
  audio: '',
  audioMeaning: '',
  audioExample: '',
  textMeaning: '',
  textExample: '',
  transcription: '',
  wordTranslate: '',
  textMeaningTranslate: '',
  textExampleTranslate: '',
};

const contextDefaults: IGameContext = {
  answers: [],
  question: wordDefaults,
  correct: [],
  wrong: [],
  gameState: GameState.INITIAL,
  countDown: 0,
  correctInRow: 0,
  giveAnswerAudiocall: () => {},
  giveAnswerSprint: () => {},
  pickDifficulty: () => {},
  handleGameStateChange: () => {},
  progressGame: () => {},
};

interface IGameContextProps {
  game: GameKey;
}

const GameContext = createContext<IGameContext>(contextDefaults);

export const GameProvider: FC<IGameContextProps> = ({ game, children }) => {
  const appDispatch = useAppDispatch();
  const { saveStatistics } = useStats();
  const isRanFromTextBook = useAppSelector(
    (state) => state.word.isGameRanFromTextbook
  );
  const sprintWords = useAppSelector((state) => state.word.sprintWords);
  const audicallWords = useAppSelector((state) => state.word.audiocallWords);
  const userId = useAppSelector((state) => state.word.userId);

  const [gameState, setGameState] = useState<GameState>(GameState.INITIAL);
  const [gameWords, setGameWords] = useState<IWord[]>([]);
  const [correctArray, setCorrectArray] = useState<IWord[]>([]);
  const [wrongArray, setWrongArray] = useState<IWord[]>([]);
  const [countDown, setCountdown] = useState(0);
  const [question, setQuestion] = useState<IWord>(wordDefaults);
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctInRow, setCorrectInRow] = useState(0);
  const [maxInRow, setMaxInRow] = useState(0);
  // const [isCountdownStarted, setIsCountdownStarted] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [round, setRound] = useState(0);

  // Function that sets words from react store to state of this component
  // for you to pop words from this state to put it as a question
  const initializeWords = () => {
    switch (game) {
      case 'audiocall': {
        setGameWords(audicallWords);
        setRound(0);
        break;
      }
      case 'sprint': {
        setGameWords(sprintWords);
        setRound(0);
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

  const progressGame = () => {
    if (round < gameWords.length - 1) {
      setRound((state) => state + 1);
      setGameState(GameState.QUESTION);
    } else {
      setGameState(GameState.RESULTS);
    }
  };

  const handleGameStateChange = (state: GameState) => {
    setGameState(state);
  };

  const giveAnswerAudiocall = (answer: string) => {
    // not sure which to compare
    if (answer === question.wordTranslate) {
      setCorrectArray((state) => [...state, question]);
      setGameState(GameState.CORRECT);
    } else {
      setWrongArray((state) => [...state, question]);
      setGameState(GameState.WRONG);
    }
  };

  const giveAnswerSprint = (answer: boolean) => {
    const correct =
      (answer && answers[0] === question.wordTranslate) ||
      (!answer && answers[0] !== question.wordTranslate);
    if (correct) {
      setCorrectArray((state) => [...state, question]);
      setGameState(GameState.CORRECT);
    } else {
      setWrongArray((state) => [...state, question]);
      setGameState(GameState.WRONG);
    }
  };

  const getNewAnswersAudiocall = () => {
    const pickedAnswers: string[] = [];
    const currentWord = question.wordTranslate;
    pickedAnswers.push(currentWord);
    while (pickedAnswers.length < maxAnswersAudiocall) {
      const index = getRandomNumber(gameWords.length);
      const pickedWord = gameWords[index];
      if (
        pickedWord.wordTranslate !== currentWord &&
        pickedAnswers.indexOf(currentWord) !== -1
      ) {
        pickedAnswers.push(pickedWord.wordTranslate);
      } else {
        continue;
      }
    }
    shuffle(pickedAnswers);
    setAnswers(pickedAnswers);
  };

  const getNewAnswerSprint = () => {
    const answer: string[] = [];
    if (Math.random() - 0.5 >= 0) {
      answer.push(question.wordTranslate);
    } else {
      while (answer.length < 1) {
        const index = getRandomNumber(gameWords.length);
        if (gameWords[index].wordTranslate !== question.wordTranslate) {
          answer.push(gameWords[index].wordTranslate);
        } else {
          continue;
        }
      }
    }
    setAnswers(answer);
  };

  const setCurrentQuestion = () => {
    setQuestion(gameWords[round]);
  };

  const resetStates = () => {
    setGameWords([]);
    setCorrectArray([]);
    setWrongArray([]);
    setCountdown(0);
    setIsGameStarted(false);
    setMaxInRow(0);
    setCorrectInRow(0);
    setQuestion(wordDefaults);
    setAnswers([]);
    setRound(0);
  };

  const saveGameStats = async () => {
    await saveStatistics({
      correct: correctArray,
      wrong: wrongArray,
      maxInRow,
    });
  };

  // After loading get words that were already fetched and sets them as a questions
  // For that to work you need to dispatch(getSprintWords or getAudiocallWords) right
  // befor navigating user to this page
  useEffect(() => {
    if (isRanFromTextBook) {
      appDispatch(setIsGameRanFromTextbook(false));
      initializeWords();
      setGameState(GameState.COUNTDOWN); // to start game right after loading
    }
  }, []);

  // This needed to actually track changes in redux store
  // example: after executing pickDifficulty redux gets new words and;
  // this useEffect executes to set them as words for questions
  useEffect(() => {
    initializeWords();
  }, [sprintWords, audicallWords]);

  // This should execute services or make something happend on change of the
  // game state
  useEffect(() => {
    switch (gameState) {
      case GameState.INITIAL: {
        resetStates();
        break;
      }
      case GameState.COUNTDOWN: {
        setIsGameStarted(true);
        setCountdown(4);
        break;
      }
      case GameState.QUESTION: {
        setCurrentQuestion();
        break;
      }
      case GameState.CORRECT: {
        setCorrectInRow((state) => state + 1);
        if (maxInRow < correctInRow + 1) {
          setMaxInRow(correctInRow + 1);
        }
        if (game === 'sprint') {
          progressGame();
        }
        break;
      }
      case GameState.WRONG: {
        setCorrectInRow(0);
        if (game === 'sprint') {
          progressGame();
        }
        break;
      }
      case GameState.RESULTS: {
        setIsGameStarted(false);
        if (userId) {
          saveGameStats();
        }
        break;
      }
    }
  }, [gameState]);

  useEffect(() => {
    if (isGameStarted) {
      if (game === 'audiocall') {
        getNewAnswersAudiocall();
      } else {
        getNewAnswerSprint();
      }
    }
  }, [question]);

  useEffect(() => {
    if (countDown > 0 && isGameStarted) {
      setTimeout(() => setCountdown((state) => state - 1), 1000);
    } else {
      const notEnoughWords =
        (sprintWords.length > 0 && sprintWords.length < 15) ||
        (audicallWords.length > 0 && audicallWords.length < 10);
      if (isGameStarted) {
        if (notEnoughWords) {
          setGameState(GameState.INSUFFICIENT);
          setIsGameStarted(false);
        } else {
          setGameState(GameState.QUESTION);
        }
      }
    }
  }, [countDown]);

  // You should put everything you want to give access to for child components
  // shape of value prop defined in IGameContex interface
  return (
    <GameContext.Provider
      value={{
        correctInRow,
        countDown,
        correct: correctArray,
        wrong: wrongArray,
        question: question,
        gameState: gameState,
        answers,
        handleGameStateChange,
        pickDifficulty,
        progressGame,
        giveAnswerAudiocall,
        giveAnswerSprint,
      }}
      children={children}
    />
  );
};

// This gives an access to things you put in value
export const useGame = () => useContext(GameContext);

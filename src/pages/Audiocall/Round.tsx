/* eslint-disable react-hooks/exhaustive-deps */
import { VolumeUp } from '@mui/icons-material';
import Button from 'components/AudiocallPage/Button';
import { GameState, useGame } from 'components/GameContext/GameContext';
import { FC, ReactElement, useEffect, useState } from 'react';
import { IGamePageProps } from './types.d';

const AudiocallRound: FC<IGamePageProps> = ({ gamePageProps }) => {
  const {
    gameState,
    question,
    answers,
    countDown,
    giveAnswerAudiocall,
    progressGame,
  } = useGame();
  const { audioSrc, changeAudioSrc, audio } = gamePageProps;

  const [answer, setAnswer] = useState<string>();

  const handleKeyUp = (event: KeyboardEvent) => {
    if (
      event.keyCode > 48 &&
      event.keyCode < answers.length + 49 &&
      !answer &&
      gameState === GameState.QUESTION
    ) {
      giveAnswerAudiocall(answers[event.keyCode - 49]);
      setAnswer(answers[event.keyCode - 49]);
    } else if (event.keyCode === 32) {
      if (answer) {
        setAnswer(undefined);
        progressGame();
      } else if (gameState === GameState.QUESTION) {
        giveAnswerAudiocall('Не знаю');
        setAnswer('Не знаю');
      }
    }
  };

  useEffect(() => {
    if (question.audio && question.audio.length > 0) {
      changeAudioSrc(question.audio);
    }
  }, [question.audio]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyUp);
    return () => window.removeEventListener('keydown', handleKeyUp);
  }, [answer, answers, gameState]);

  if (gameState === GameState.CORRECT && answer) {
    audio.playCorrect();
  }
  if (gameState === GameState.WRONG && answer) {
    audio.playWrong();
  }

  return (
    <div className="audiocall__container audiocall__container_round">
      <div
        className={`audiocall__countdown ${
          gameState === GameState.COUNTDOWN ? undefined : 'hidden'
        }`}
      >
        {countDown}
      </div>
      <div
        className={`audiocall__audio-container ${
          gameState === GameState.COUNTDOWN ? 'hidden' : undefined
        }`}
      >
        {answer ? (
          <div className="audiocall__word-container">
            <div
              style={{
                backgroundImage: `url(https://rs-lang-team-34.herokuapp.com/${question.image})`,
              }}
              className="audiocall__word-image"
            />
            <div
              className="button audiocall__word"
              onClick={() => {
                audio.playSound(audioSrc);
              }}
            >
              {question.word}
              <span className="audiocall__speaker-icon audiocall__speaker-icon_small">
                <VolumeUp />
              </span>
            </div>
          </div>
        ) : (
          <div
            className="button audiocall__speaker-icon audiocall__speaker-icon_big"
            onClick={() => {
              audio.playSound(audioSrc);
            }}
          >
            <VolumeUp />
          </div>
        )}
      </div>
      <div
        className={`audiocall__options ${
          gameState === GameState.COUNTDOWN ? 'hidden' : undefined
        }`}
      >
        {answers.map(
          (word, index): ReactElement => (
            <Button
              key={word.concat(`${index}`)}
              className={`audiocall__option ${
                answer === word ? 'audiocall__answer' : ''
              } ${
                question.wordTranslate === word && answer
                  ? 'audiocall__answer_correct'
                  : ''
              }`}
              tabIndex={index + 1}
              onClick={() => {
                if (!answer) {
                  giveAnswerAudiocall(word);
                  setAnswer(word);
                }
              }}
            >
              <span className="audiocall__option-index">{index + 1}</span>
              {word}
            </Button>
          )
        )}
      </div>
      <div
        className={`audiocall__round-button ${
          gameState === GameState.COUNTDOWN ? 'hidden' : undefined
        }`}
      >
        {answer ? (
          <Button
            className="audiocall__next"
            text="Далее"
            tabIndex={answers.length + 1}
            onClick={() => {
              setAnswer(undefined);
              progressGame();
            }}
          />
        ) : (
          <Button
            className="audiocall__skip"
            text="Не знаю"
            tabIndex={answers.length + 1}
            onClick={() => {
              if (!answer && gameState === GameState.QUESTION) {
                giveAnswerAudiocall('Не знаю');
                setAnswer('Не знаю');
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AudiocallRound;

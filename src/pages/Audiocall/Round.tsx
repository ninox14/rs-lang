/* eslint-disable react-hooks/exhaustive-deps */
import { VolumeUp } from '@mui/icons-material';
import Button from 'components/AudiocallPage/Button';
import { GameState, useGame } from 'components/GameContext/GameContext';
import Countdown from 'pages/Sprint/Countdown/Countdown';
import { FC, ReactElement, useEffect, useState } from 'react';
import { IGamePageProps } from './types.d';

const AudiocallRound: FC<IGamePageProps> = ({ gamePageProps }) => {
  const { gameState, question, answers, giveAnswerAudiocall, progressGame } =
    useGame();
  const { audioSrc, changeAudioSrc, audio } = gamePageProps;

  const [answer, setAnswer] = useState<string>();

  const handleKeyUp = (event: KeyboardEvent) => {
    if (
      parseInt(event.key) > 0 &&
      parseInt(event.key) < answers.length + 1 &&
      !answer &&
      gameState === GameState.QUESTION
    ) {
      giveAnswerAudiocall(answers[parseInt(event.key) - 1]);
      setAnswer(answers[parseInt(event.key) - 1]);
    } else if (event.key === ' ') {
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

  console.log(gameState === GameState.INSUFFICIENT);

  return (
    <div className="audiocall__container audiocall__container_round">
      <div
        className={`audiocall__countdown ${
          gameState === GameState.COUNTDOWN ? '' : 'hidden'
        }`}
      >
        <Countdown />
      </div>
      <div
        className={`audiocall__error ${
          gameState === GameState.INSUFFICIENT ? '' : 'hidden'
        }`}
      >
        <h3 className="audiocall__error-message">
          Извините, для данной игры недостаточно слов
        </h3>

        <div className="audiocall__round-button">
          <Button
            className="audiocall__back"
            text="Назад"
            onClick={() => {
              history.back();
            }}
          />
        </div>
      </div>
      <div
        className={`audiocall__audio-container ${
          gameState === GameState.COUNTDOWN ||
          gameState === GameState.INSUFFICIENT
            ? 'hidden'
            : ''
        }`}
      >
        {answer ? (
          <div className="audiocall__word-container">
            <div className="audiocall__word-image-wrap">
              <div
                style={{
                  backgroundImage: `url(https://rs-lang-team-34.herokuapp.com/${question.image})`,
                }}
                className="audiocall__word-image"
              />
            </div>
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
          gameState === GameState.COUNTDOWN ||
          gameState === GameState.INSUFFICIENT
            ? 'hidden'
            : ''
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
          gameState === GameState.COUNTDOWN ||
          gameState === GameState.INSUFFICIENT
            ? 'hidden'
            : ''
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

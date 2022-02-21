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

  useEffect(() => {
    if (question.audio && question.audio.length > 0) {
      changeAudioSrc(question.audio);
    }
  }, [question.audio]);

  if (gameState === GameState.CORRECT) {
    audio.playCorrect();
  }
  if (gameState === GameState.WRONG) {
    audio.playWrong();
  }

  return (
    <div className="audiocall__container audiocall__container_round">
      <div className="audiocall__audio-container">
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
        ) : gameState === GameState.COUNTDOWN ? (
          countDown
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
      <div className="audiocall__options">
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
      <div className="audiocall__round-button">
        {answer ? (
          <Button
            className="audiocall__next"
            text="Далее"
            onClick={() => {
              setAnswer(undefined);
              progressGame();
            }}
          />
        ) : (
          <Button
            className="audiocall__skip"
            text="Не знаю"
            onClick={() => {
              giveAnswerAudiocall('Не знаю');
              setAnswer('Не знаю');
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AudiocallRound;

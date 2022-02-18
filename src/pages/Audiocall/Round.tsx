import { CloseSharp, VolumeUp } from '@mui/icons-material';
import Button from 'components/AudiocallPage/Button';
import FullscreenButton from 'components/AudiocallPage/Fullscreen';
import { FC, ReactElement, useState } from 'react';
import audiocallData from './testData';

const AudiocallRound: FC = () => {
  const data = audiocallData.rounds;
  const [round, setRound] = useState<number>(0);
  const [answer, setAnswer] = useState<string>();
  // const [audioSrc, setAudioSrc] = useState<string>();
  const nextRound = () => {
    if (round < data.length - 1) {
      setRound(round + 1);
      setAnswer(undefined);
    }
  };
  const checkAnswer = (word: string): void => {
    setAnswer(word);
  };
  // const audio = new Audio();

  return (
    <div className="audiocall__container audiocall__container_round">
      <div className="audiocall__fixed-controls">
        <div className="audiocall__fixed-controls_left">
          <div className="button audiocall__controls-button">
            <CloseSharp />
          </div>
        </div>
        <div className="audiocall__fixed-controls_right">
          <FullscreenButton className="audiocall__controls-button" />
        </div>
      </div>
      <div className="audiocall__audio-container">
        {answer ? (
          <div className="audiocall__word-container">
            <div
              style={{
                backgroundImage: `url(${data[round].image})`,
              }}
              className="audiocall__word-image"
            />
            <div className="audiocall__word">
              {data[round].word}
              <span className="audiocall__speaker-icon audiocall__speaker-icon_small">
                <VolumeUp />
              </span>
            </div>
          </div>
        ) : (
          <div className="audiocall__speaker-icon audiocall__speaker-icon_big">
            <VolumeUp />
          </div>
        )}
      </div>
      <div className="audiocall__options">
        {data[round].options.map(
          (word, index): ReactElement => (
            <Button
              key={word}
              className={`audiocall__option ${
                answer === word ? 'audiocall__answer' : ''
              } ${
                data[round].answer === word && answer
                  ? 'audiocall__answer_correct'
                  : ''
              }`}
              onClick={answer ? undefined : () => checkAnswer(word)}
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
            onClick={nextRound}
          />
        ) : (
          <Button
            className="audiocall__skip"
            text="Не знаю"
            onClick={() => checkAnswer('Не знаю')}
          />
        )}
      </div>
    </div>
  );
};

export default AudiocallRound;

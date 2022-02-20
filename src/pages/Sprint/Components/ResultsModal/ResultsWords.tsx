import { FC } from 'react';

import { ReactComponent as AudioIcon } from 'assets/icons/card-volume.svg';
import { useGame } from 'components/GameContext/GameContext';
import AudioPlayer from 'components/Audio/Audio';

interface IWord {
  sound: string;
  word: string;
  translate: string;
}

const player = AudioPlayer.getInstance();

const Word: FC<IWord> = ({ sound, word, translate }) => {
  return (
    <div className="results-words__word-container">
      <AudioIcon
        className="results-words__sound"
        onClick={() => player.playSound(sound)}
      />
      <span className="results-words__word">{word}</span>
      <span className="results-words__dash">-</span>
      <span className="results-words__translation"></span>
      {translate}
    </div>
  );
};

const ResultsWords: FC = () => {
  const { correct, wrong } = useGame();

  const rightCount = correct.length;
  const wrongCount = wrong.length;

  return (
    <div className="results-words">
      <div className="results-words__known">
        <div className="results-words__heading">
          <span className="results-words__subtitle">Знаю</span>
          <span className="results-words__words-count">{rightCount}</span>
        </div>
        <div className="results-words__words">
          {correct.map((word) => (
            <Word
              sound={`${word.audio}`}
              word={word.word}
              translate={word.wordTranslate}
            />
          ))}
        </div>
      </div>
      <div className="results-words__repeat">
        <div className="results-words__heading">
          <span className="results-words__subtitle">Надо повторить</span>
          <span className="results-words__words-count">{wrongCount}</span>
        </div>
        <div className="results-words__words">
          <div className="results-words__words">
            {wrong.map((word) => (
              <Word
                sound={`${word.audio}`}
                word={word.word}
                translate={word.wordTranslate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsWords;

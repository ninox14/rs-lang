import { FC } from 'react';

import { ReactComponent as AudioIcon } from 'assets/icons/card-volume.svg';

interface IWord {
  sound: string;
  word: string;
  translate: string;
}

const Word: FC<IWord> = ({ sound, word, translate }) => {
  return (
    <div className="results-words__word-container">
      <AudioIcon className="results-words__sound" />
      <span className="results-words__word">{word}</span>
      <span className="results-words__dash">-</span>
      <span className="results-words__translation"></span>
      {translate}
    </div>
  );
};

const ResultsWords: FC = () => {
  const word = 'immense';

  const rightCount = 10;
  const wrongCount = 10;
  const translate = 'находящихся под угрозой исчезновения';

  return (
    <div className="results-words">
      <div className="results-words__known">
        <div className="results-words__heading">
          <span className="results-words__subtitle">Знаю</span>
          <span className="results-words__words-count">{rightCount}</span>
        </div>
        <div className="results-words__words">
          <Word sound={''} word={word} translate={translate} />
        </div>
      </div>
      <div className="results-words__repeat">
        <div className="results-words__heading">
          <span className="results-words__subtitle">Надо повторить</span>
          <span className="results-words__words-count">{wrongCount}</span>
        </div>
        <div className="results-words__words">
          <div className="results-words__words">
            <Word sound={''} word={word} translate={translate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsWords;

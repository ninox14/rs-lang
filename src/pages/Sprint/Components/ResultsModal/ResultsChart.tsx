import { FC } from 'react';

const ResultsChart: FC = () => {
  const resultMessage = 'Отличный результат!';
  const subtitleMessage = '2990 очков';
  const rightAnswersPercentage = '90%';

  const percStyle = {
    '--percentage': rightAnswersPercentage,
  } as React.CSSProperties;

  return (
    <div className="results-chart">
      <p className="results-chart__title">{resultMessage}</p>
      <p className="results-chart__subtitle">{subtitleMessage}</p>
      <div className="results-chart__chart" style={percStyle}>
        <div className="results-chart__percentage">
          <span className="results-chart__percentage-number">
            {rightAnswersPercentage}
          </span>
          правильных ответов
        </div>
      </div>
      <div className="results-chart__btns">
        <button className="results-chart__btn results-chart__exit">
          Выйти
        </button>
        <button className="results-chart__btn results-chart__replay">
          Сыграть еще раз
        </button>
      </div>
    </div>
  );
};

export default ResultsChart;

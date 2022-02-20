import { GameState, useGame } from 'components/GameContext/GameContext';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const getMessage = (points: number) => {
  if (points < 200) {
    return 'Можно лучше!';
  }
  if (points < 400) {
    return 'Нормальный результат!';
  }
  if (points < 600) {
    return 'Хороший результат!';
  }
  return 'Oтличный результат!!';
};

const ResultsChart: FC<{ points: number }> = ({ points }) => {
  const navigate = useNavigate();
  const { wrong, correct, handleGameStateChange } = useGame();
  const resultMessage = getMessage(points);
  const subtitleMessage = points;
  const rightAnswersPercentage = `${
    ((correct.length / (wrong.length + correct.length)) * 100).toFixed(0) || '0'
  }%`;
  console.log(rightAnswersPercentage);

  const percStyle = {
    '--percentage': rightAnswersPercentage,
  } as React.CSSProperties;

  return (
    <div className="results-chart">
      <p className="results-chart__title">{resultMessage}</p>
      <p className="results-chart__subtitle">{subtitleMessage} очков</p>
      <div className="results-chart__chart" style={percStyle}>
        <div className="results-chart__percentage">
          <span className="results-chart__percentage-number">
            {rightAnswersPercentage}
          </span>
          правильных ответов
        </div>
      </div>
      <div className="results-chart__btns">
        <button
          className="results-chart__btn results-chart__exit"
          onClick={() => navigate(-1)}
        >
          Выйти
        </button>
        <button
          className="results-chart__btn results-chart__replay"
          onClick={() => handleGameStateChange(GameState.INITIAL)}
        >
          Сыграть еще раз
        </button>
      </div>
    </div>
  );
};

export default ResultsChart;

import { useGame } from 'components/GameContext/GameContext';
import { FC } from 'react';
import './Countdown.scss';

const Countdown: FC = () => {
  const { countDown } = useGame();
  return (
    <div className="sprint_countdown-screen">
      <div className={`countdown__timer timer_${countDown}`}>{countDown}</div>
      <p className="countdown__title">Приготовьтесь</p>
    </div>
  );
};

export default Countdown;

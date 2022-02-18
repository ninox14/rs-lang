import { FC } from 'react';
import './Countdown.scss';

const Countdown: FC = () => {
  return (
    <div className="sprint_countdown-screen">
      <div className="countdown__timer">3</div>
      <p className="countdown__title">Приготовьтесь</p>
    </div>
  );
};

export default Countdown;

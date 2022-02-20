import { FC } from 'react';
import './GameScreen.scss';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

const GameScreen: FC = () => {
  return (
    <div className="sprint_game-screen">
      <div className="game__timer-container">
        <TimerOutlinedIcon className="game__timer-icon" />
        <div className="game__timer-countdown">120 с</div>
      </div>
      <div className="game__points-container">
        <div className="game__points game__points_per-word">
          <span className="points">+10</span> очков за слово
        </div>
        <div className="game__points game__points_total">
          <span className="points">2100</span> очков
        </div>
      </div>

      <div className="game-card">
        <VolumeUpIcon className="game-card__sound" />
        <ul className="game-card__combo">
          <li className="game-card__combo-item"></li>
          <li className="game-card__combo-item"></li>
          <li className="game-card__combo-item"></li>
        </ul>
        <div className="game-card__answer">
          <div className="game-card__word">word</div>
          <div className="game-card__translate">translate</div>
        </div>

        <div className="game-card__controls">
          <div className="game-card__btn game-card__btn_false">Неверно</div>
          <div className="game-card__btn game-card__btn_true">Верно</div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;

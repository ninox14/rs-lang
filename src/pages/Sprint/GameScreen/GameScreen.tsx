import { FC, useEffect, useState } from 'react';
import './GameScreen.scss';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { GameState, useGame } from 'components/GameContext/GameContext';

interface IGameInterface {
  points: number;
  handlePointsChnage: (points: number) => void;
}

const GameScreen: FC<IGameInterface> = ({ points, handlePointsChnage }) => {
  const {
    question,
    gameState,
    giveAnswerSprint,
    correctInRow,
    answers,
    handleGameStateChange,
  } = useGame();
  const [countdown, setCountdown] = useState(60);
  // const [points, setPoints] = useState(0);
  // const [modificator, setModificator] = useState(1);

  useEffect(() => {
    if (gameState === GameState.CORRECT) {
      // setPoints((state) => state + (correctInRow + 1) * 10);
      handlePointsChnage(points + (correctInRow + 1) * 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => setCountdown((state) => state - 1), 1000);
    } else {
      handleGameStateChange(GameState.RESULTS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

  return (
    <div className="sprint_game-screen">
      <div className="game__timer-container">
        <TimerOutlinedIcon className="game__timer-icon" />
        <div className="game__timer-countdown">{countdown} с</div>
      </div>
      <div className="game__points-container">
        <div className="game__points game__points_per-word">
          <span className="points">+{(correctInRow + 1) * 10}</span> очков за
          слово
        </div>
        <div className="game__points game__points_total">
          <span className="points">{points}</span> очков
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
          <div className="game-card__word">{question?.word}</div>
          <div className="game-card__translate">
            {answers[0] ? answers[0] : ''}
          </div>
        </div>

        <div className="game-card__controls">
          <div
            className="game-card__btn game-card__btn_false"
            onClick={() => giveAnswerSprint(false)}
          >
            Неверно
          </div>
          <div
            className="game-card__btn game-card__btn_true"
            onClick={() => giveAnswerSprint(true)}
          >
            Верно
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
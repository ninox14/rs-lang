import { FC, useEffect, useState } from 'react';
import './GameScreen.scss';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { GameState, useGame } from 'components/GameContext/GameContext';
import AudioPlayer from 'components/Audio/Audio';

interface IGameInterface {
  points: number;
  isMuted: boolean;
  handlePointsChnage: (points: number) => void;
}

const player = AudioPlayer.getInstance();

const GameScreen: FC<IGameInterface> = ({
  isMuted,
  points,
  handlePointsChnage,
}) => {
  const {
    question,
    gameState,
    giveAnswerSprint,
    correctInRow,
    answers,
    handleGameStateChange,
  } = useGame();
  const [countdown, setCountdown] = useState(60);
  const [multilpler, setMultiplier] = useState(1);

  const handleKeyPress = (event: KeyboardEvent) => {
    event.preventDefault();
    switch (event.code) {
      case 'ArrowRight': {
        giveAnswerSprint(true);
        break;
      }
      case 'ArrowLeft': {
        giveAnswerSprint(false);
        break;
      }
    }
  };

  useEffect(() => {
    if (gameState === GameState.CORRECT) {
      handlePointsChnage(points + multilpler * 10);
      if (!isMuted) {
        player.playCorrect();
      }
    }
    if (gameState === GameState.WRONG) {
      if (!isMuted) {
        player.playWrong();
      }
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

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (correctInRow > 0 && correctInRow % 3 === 0) {
      setMultiplier((state) => state + 1);
    }
    if (correctInRow === 0) {
      setMultiplier(1);
    }
  }, [correctInRow]);

  return (
    <div className="sprint_game-screen">
      <div className="game__timer-container">
        <TimerOutlinedIcon className="game__timer-icon" />
        <div className="game__timer-countdown">{countdown} с</div>
      </div>
      <div className="game__points-container">
        <div className="game__points game__points_per-word">
          <span className="points">+{multilpler * 10}</span> очков за слово
        </div>
        <div className="game__points game__points_total">
          <span className="points">{points}</span> очков
        </div>
      </div>

      <div className="game-card">
        <VolumeUpIcon className="game-card__sound" />
        <ul className="game-card__combo">
          <li
            className={`game-card__combo-item ${
              (correctInRow % 4 === 1 ||
                correctInRow % 4 === 2 ||
                correctInRow % 4 === 3) &&
              'game-card__combo-item_active'
            }`}
          ></li>
          <li
            className={`game-card__combo-item ${
              (correctInRow % 4 === 2 || correctInRow % 4 === 3) &&
              'game-card__combo-item_active'
            }`}
          ></li>
          <li
            className={`game-card__combo-item ${
              correctInRow % 4 === 3 && 'game-card__combo-item_active'
            }`}
          ></li>
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

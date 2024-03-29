import { FC, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';

import './Sprint.scss';
import StartScreen from './StartScreen/StartScreen';
import { Link, useNavigate } from 'react-router-dom';
import Countdown from './Countdown/Countdown';
import GameScreen from './GameScreen/GameScreen';
import EndScreen from './EndScreen/EndScreen';
import { GameState, useGame } from 'components/GameContext/GameContext';
import FullscreenButton from './Components/FullScreen/FullScreen';

const Sprint: FC = () => {
  const navigate = useNavigate();
  const { gameState, pickDifficulty, handleGameStateChange } = useGame();
  const [difficulty, setDifficulty] = useState<null | number>(null);
  const [points, setPoints] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (gameState === GameState.INITIAL) {
      setDifficulty(null);
      setPoints(0);
    }
  }, [gameState]);

  // const isFullscreen = true;
  const isQuestionOnScreen =
    gameState === GameState.QUESTION ||
    gameState === GameState.CORRECT ||
    gameState === GameState.WRONG;

  const handleDifficultyChange = (newDifficulty: number) => {
    setDifficulty(newDifficulty);
  };
  const handlePointsChange = (newPoints: number) => {
    setPoints(newPoints);
  };

  const toggleMuted = () => {
    setIsMuted(!isMuted);
  };

  return (
    <main className="page page_sprint">
      <div className="page-controls">
        <CloseIcon
          style={{ visibility: !isQuestionOnScreen ? 'hidden' : 'initial' }}
          className="sprint_btn btn_exit"
          onClick={() => handleGameStateChange(GameState.INITIAL)}
        />
        <div className="sprint-btns-wrapper">
          {isQuestionOnScreen &&
            (isMuted ? (
              <MusicOffIcon
                className="sprint_btn btn_alerts"
                onClick={toggleMuted}
              />
            ) : (
              <MusicNoteIcon
                className="sprint_btn btn_alerts"
                onClick={toggleMuted}
              />
            ))}
          <FullscreenButton className="sprint_btn btn_fullscreen" />
        </div>
      </div>
      <div className="sprint-content">
        {gameState === GameState.INITIAL ? (
          <StartScreen
            difficulty={difficulty}
            handleDifficultyChange={handleDifficultyChange}
          />
        ) : null}
        {gameState === GameState.INITIAL ? (
          <div className="sprint__controls-container">
            <Link to={'/'} className="sprint__btn_title btn__to-textbook">
              Выйти
            </Link>
            <button
              className="sprint__btn_title  btn__start"
              disabled={difficulty === null}
              onClick={() => {
                if (difficulty !== null) {
                  pickDifficulty(difficulty);
                }
              }}
            >
              Начать
            </button>
          </div>
        ) : null}

        {gameState === GameState.COUNTDOWN ? <Countdown /> : null}

        {gameState === GameState.INSUFFICIENT ? (
          <div className="sprint__error-screen">
            <h3 className="sprint__error-message">
              Извините, для данной игры недостаточно слов
            </h3>
            <button
              className="sprint__btn_title btn__to-textbook"
              onClick={() => {
                handleGameStateChange(GameState.INITIAL);
              }}
            >
              Выйти
            </button>
          </div>
        ) : null}

        {isQuestionOnScreen ? (
          <GameScreen
            isMuted={isMuted}
            points={points}
            handlePointsChange={handlePointsChange}
          />
        ) : null}
        {gameState === GameState.RESULTS ? <EndScreen points={points} /> : null}
      </div>
    </main>
  );
};

export default Sprint;

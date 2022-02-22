import { CloseSharp } from '@mui/icons-material';
import { GameState, useGame } from 'components/GameContext/GameContext';
import { FC } from 'react';
import FullscreenButton from './Fullscreen';

const GameControls: FC = () => {
  const { gameState, handleGameStateChange } = useGame();
  const isInRound =
    gameState !== GameState.INITIAL && gameState !== GameState.RESULTS;

  return (
    <div className="game__controls">
      <div className="game__controls_left">
        {isInRound ? (
          <div
            className="button game__controls-button"
            onClick={() => handleGameStateChange(GameState.INITIAL)}
          >
            <CloseSharp />
          </div>
        ) : undefined}
      </div>
      <div className="game__controls_right">
        <FullscreenButton className="game__controls-button" />
      </div>
    </div>
  );
};

export default GameControls;

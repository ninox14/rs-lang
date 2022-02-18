import { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import './Sprint.scss';
import StartScreen from './StartScreen/StartScreen';
import { Link } from 'react-router-dom';

const Sprint: FC = () => {
  const gameMode = 'start-screen';
  const isFullscreen = true;
  return (
    <main className="page page_sprint">
      <div className="page-controls">
        <CloseIcon className="sprint_btn btn_exit" />
        <div className="sprint-btns-wrapper">
          <MusicNoteIcon className="sprint_btn btn_alerts" />
          {isFullscreen ? (
            <FullscreenIcon className="sprint_btn btn_fullscreen btn_fullscreen_on" />
          ) : (
            <FullscreenExitIcon className="sprint_btn btn_fullscreen btn_fullscreen_off" />
          )}
        </div>
      </div>
      <div className="sprint-content">
        {gameMode === 'start-screen' ? <StartScreen /> : null}
        {gameMode === 'start-screen' ? (
          <div className="sprint__controls-container">
            {/* link to? where? title? back? */}
            <Link to={'/'} className="sprint__btn_title btn__to-textbook">
              Выйти
            </Link>
            <button className="sprint__btn_title  btn__start">Начать</button>
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Sprint;

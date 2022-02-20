// import { IElementProps } from './types';
// import { Fullscreen, FullscreenExit } from '@mui/icons-material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { FC, useCallback, useEffect, useState } from 'react';

export interface IElementProps {
  className?: string;
}

const FullscreenButton: FC<IElementProps> = (props) => {
  const { className } = props;
  const [fsState, setFsState] = useState<boolean>(false);
  const fsControl = (): void => {
    setFsState(!fsState);
  };
  const escFunction = useCallback(() => {
    if (!document.fullscreenElement && fsState) {
      setFsState(false);
    }
  }, [fsState]);
  useEffect(() => {
    if (fsState) {
      document.documentElement.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [fsState]);
  useEffect(() => {
    document.addEventListener('fullscreenchange', escFunction, false);

    return () => {
      document.removeEventListener('fullscreenchange', escFunction, false);
    };
  }, [escFunction]);

  return (
    <div className={`${className ?? ''}`} onClick={fsControl}>
      {fsState ? (
        <FullscreenExitIcon className="btn_fullscreen_on" />
      ) : (
        <FullscreenIcon className="btn_fullscreen_off" />
      )}
    </div>
  );
};

export default FullscreenButton;

import { IElementProps } from './types';
import { Fullscreen, FullscreenExit } from '@mui/icons-material';
import { FC, useCallback, useEffect, useState } from 'react';

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
    <div
      className={`button button_fullscreen ${className ?? ''}`}
      onClick={fsControl}
    >
      {fsState ? <FullscreenExit /> : <Fullscreen />}
    </div>
  );
};

export default FullscreenButton;

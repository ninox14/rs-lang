/* eslint-disable react-hooks/exhaustive-deps */
import AudioPlayer from 'components/Audio/Audio';
import GameControls from 'components/AudiocallPage/GameControls';
import { GameState, useGame } from 'components/GameContext/GameContext';
import { FC, useEffect, useState } from 'react';
import AudiocallHome from './Home';
import AudiocallRound from './Round';
import AudiocallStatistics from './Statistics';
import { IGamePagePropsObject } from './types.d';

const Audiocall: FC = () => {
  const { gameState } = useGame();

  const [audioSrc, setAudioSrc] = useState<string>('');

  const changeAudioSrc = (src: string): void => {
    setAudioSrc(src);
  };

  const audio = AudioPlayer.getInstance();

  useEffect(() => {
    if (audioSrc.length > 0) {
      audio.playSound(audioSrc);
    }
  }, [audioSrc]);

  const Page =
    gameState === GameState.INITIAL
      ? AudiocallHome
      : gameState === GameState.RESULTS
      ? AudiocallStatistics
      : AudiocallRound;
  const pageProps: IGamePagePropsObject = {
    audioSrc,
    changeAudioSrc,
    audio,
  };

  return (
    <main className="page page_audiocall audiocall">
      <GameControls />
      <Page gamePageProps={pageProps} />
    </main>
  );
};

export default Audiocall;

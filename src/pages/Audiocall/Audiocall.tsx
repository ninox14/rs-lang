import { FC, useState } from 'react';
import AudiocallHome from './Home';
import AudiocallRound from './Round';
import AudiocallStatistics from './Statistics';
import { GamePage, IGamePagePropsObject, Results } from './types.d';

const Audiocall: FC = () => {
  const [currentPage, setCurrentPage] = useState<GamePage>(GamePage.Home);
  const [roundResults, setRoundResults] = useState<Results>([]);
  const [audioSrc, setAudioSrc] = useState<string>();
  const audio = new Audio();

  const changePage = (page: GamePage): void => {
    setCurrentPage(page);
    audio.pause();
    audio.currentTime = 0;
    if (page === GamePage.Home) setRoundResults([]);
  };
  const saveResults = (results: Results): void => {
    setRoundResults(results);
  };
  const changeAudioSrc = (src: string): void => {
    audio.pause();
    audio.currentTime = 0;
    setAudioSrc(src);
    if (audio.src.length > 0) audio.play();
  };

  const Page =
    currentPage === GamePage.Home
      ? AudiocallHome
      : currentPage === GamePage.Round
      ? AudiocallRound
      : AudiocallStatistics;
  const pageProps: IGamePagePropsObject =
    currentPage === GamePage.Home
      ? { changePage }
      : currentPage === GamePage.Round
      ? { changePage, changeAudioSrc, saveResults, roundResults }
      : { changePage, changeAudioSrc, roundResults };

  audio.src = audioSrc ?? '';

  return (
    <main className="page page_audiocall audiocall">
      <Page gamePageProps={pageProps} />
    </main>
  );
};

export default Audiocall;

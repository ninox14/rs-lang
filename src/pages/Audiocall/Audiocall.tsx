import { FC } from 'react';
// import AudiocallHome from './Home';
// import AudiocallRound from './Round';
import AudiocallStatistics from './Statistics';

const Audiocall: FC = () => {
  // debug
  const currPage = <AudiocallStatistics />;

  return <main className="page page_audiocall audiocall">{currPage}</main>;
};

export default Audiocall;

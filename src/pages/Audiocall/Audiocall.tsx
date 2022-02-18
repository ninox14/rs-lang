import { FC } from 'react';
// import AudiocallHome from './Home';
import AudiocallRound from './Round';

const Audiocall: FC = () => {
  // debug
  const currPage = <AudiocallRound />;

  return <main className="page page_audiocall audiocall">{currPage}</main>;
};

export default Audiocall;

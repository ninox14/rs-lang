import { FC } from 'react';
import './Home.scss';

export const Home: FC = () => {
  return (
    <main className="page page_home">
      <div className="home-intro">
        <div className="home-intro__text">
          <h1 className="home-intro__title">
            Говорите на английском уверенно с{' '}
            <span className="home-intro__title_highlight">RS-Lang</span>{' '}
          </h1>
          <h3 className="home-intro__subtitle">
            Лучший способ изучить слова просто, весело и эффективно
          </h3>
          <a href="#advantages" className="home-intro__btn">
            Узнать больше
          </a>
        </div>
        <div className="home-intro__cards">
          <div className="home-intro__card"></div>
          <div className="home-intro__card"></div>
          <div className="home-intro__card"></div>
          <div className="home-intro__card"></div>
        </div>
      </div>
    </main>
  );
};

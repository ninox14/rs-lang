import { FC } from 'react';
import { CardHome } from './Components/CardHome';
import CardData from './Components/CardData';
import { Link } from 'react-router-dom';
import './Home.scss';

import { ReactComponent as GlassIcon } from 'assets/icons/glass.svg';
import { ReactComponent as LaptopIcon } from 'assets/icons/laptop.svg';
import { ReactComponent as AppleIcon } from 'assets/icons/apple.svg';
import { ReactComponent as PuzzleIcon } from 'assets/icons/main-puzzle.svg';

const Home: FC = () => {
  return (
    <main className="page page_home">
      <div className="home-intro">
        <div className="home-intro__text">
          <h1 className="home-intro__title">
            Говорите на английском уверенно с{' '}
            <span className="home-intro__title_highlight">RS-Lang</span>
          </h1>
          <h3 className="home-intro__subtitle">
            Лучший способ изучить слова просто, весело и эффективно
          </h3>
          <a href="#advantages" className="home-intro__btn">
            Узнать больше
          </a>
        </div>
        <div className="home-intro__cards">
          <div className="home-intro__card">
            <GlassIcon className="home-intro__card-icon" />
          </div>
          <div className="home-intro__card">
            <LaptopIcon className="home-intro__card-icon" />
          </div>
          <div className="home-intro__card">
            <AppleIcon className="home-intro__card-icon" />
          </div>
          <div className="home-intro__card">
            <PuzzleIcon className="home-intro__card-icon" />
          </div>
        </div>
      </div>
      <div id="advantages" className="home-advantages">
        <h2 className="advantages__title">
          Почему <strong>RS-Lang</strong>?
        </h2>
        <div className="advantages-wrapper">
          {CardData.map((el) => (
            <CardHome
              key={el.id}
              title={el.title}
              iconName={el.iconName}
              description={el.description}
              linkName={el.linkName}
              path={el.path}
            >
              <Link to={el.path} />
            </CardHome>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;

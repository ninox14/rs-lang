import { FC } from 'react';
import CardData from './Components/CardData';
import { CardGames } from './Components/CardGames';
import './Games.scss';

export const Games: FC = () => (
  <main className="page page_games">
    <div className="games-content">
      <h2 className="games__title">Выберите мини-игру:</h2>
      <div className="games__cards-container">
        {CardData.map((el) => (
          <CardGames
            key={el.id}
            path={el.path}
            name={el.name}
            description={el.description}
          />
        ))}
      </div>
    </div>
  </main>
);

export default Games;

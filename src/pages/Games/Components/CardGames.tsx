import { FC } from 'react';
import { Link } from 'react-router-dom';
import './CardGames.scss';

interface CardsData {
  id?: number;
  path: string;
  name: string;
  description: string;
}

export const CardGames: FC<CardsData> = ({ path, name, description }) => {
  return (
    <Link className="games-card" to={`/games/${path}`}>
      <div className="games-card__heading-container">
        <p className="games-card__subtitle">Мини-игра</p>
        <h3 className="games-card__title">{name}</h3>
      </div>
      <div className={`games-card__icon games-card__icon_${path}`}></div>
      <p className="games-card__desc">{description}</p>
    </Link>
  );
};

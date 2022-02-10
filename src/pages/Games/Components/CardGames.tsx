import { FC } from 'react';
import { Link } from 'react-router-dom';
import './CardGames.scss';

interface CardsData {
  type: string;
  name: string;
  desc: string;
}

export const CardGames: FC<CardsData> = (props) => {
  return (
    <Link className="games-card" to={`/games/${props.type}`}>
      <div className="games-card__heading-container">
        <p className="games-card__subtitle">Мини-игра</p>
        <h3 className="games-card__title">{props.name}</h3>
      </div>
      <div className={`games-card__icon games-card__icon_${props.type}`}></div>
      <p className="games-card__desc">{props.desc}</p>
    </Link>
  );
};

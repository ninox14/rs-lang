import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './CardGames.scss';

import { ReactComponent as AudiocallIcon } from '../../../assets/icons/headphones.svg';
import { ReactComponent as SprintIcon } from '../../../assets/icons/sprint.svg';

interface CardsData {
  id?: number;
  path: string;
  name: string;
  description: string;
}

interface IconsInterface {
  [index: string]: ReactElement;
  audiocall: ReactElement;
  sprint: ReactElement;
}
const icons: IconsInterface = {
  audiocall: (
    <AudiocallIcon className="games-card__icon games-card__icon_audiocall" />
  ),
  sprint: <SprintIcon className="games-card__icon games-card__icon_sprint" />,
};

export const CardGames: FC<CardsData> = ({ path, name, description }) => {
  return (
    <Link className="games-card" to={`/games/${path}`}>
      <div className="games-card__heading-container">
        <p className="games-card__subtitle">Мини-игра</p>
        <h3 className="games-card__title">{name}</h3>
      </div>
      {icons[path]}
      <p className="games-card__desc">{description}</p>
    </Link>
  );
};

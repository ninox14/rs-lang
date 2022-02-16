import { FC } from 'react';
import { Link } from 'react-router-dom';
import './CardHome.scss';

interface CardsData {
  id?: number;
  title: string;
  iconName: string;
  description: string;
  linkName: string;
  path: string;
}

export const CardHome: FC<CardsData> = ({
  title,
  iconName,
  description,
  linkName,
  path,
}) => {
  return (
    <div className="advantages-card">
      <div className="advantages-card__title">{title}</div>
      <div className={`advantages-card__icon  icon_${iconName}`}></div>
      <div className="advantages-card__desc">
        {description}
        <Link className="advantages-card__link" to={path}>
          {linkName}
        </Link>
      </div>
    </div>
  );
};

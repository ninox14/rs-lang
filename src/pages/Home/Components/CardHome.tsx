import { FC } from 'react';
import { Link } from 'react-router-dom';
import './CardHome.scss';

interface CardsData {
  id?: number;
  title: string;
  iconName: string;
  desc: string;
  linkName: string;
  path: string;
}

export const CardHome: FC<CardsData> = (props) => {
  return (
    <div className="advantages-card">
      <div className="advantages-card__title">{props.title}</div>
      <div className={`advantages-card__icon  icon_${props.iconName}`}></div>
      <div className="advantages-card__desc">
        {props.desc}
        <Link className="advantages-card__link" to={props.path}>
          {props.linkName}
        </Link>
      </div>
    </div>
  );
};

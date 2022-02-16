import { FC } from 'react';
import { Link } from 'react-router-dom';
import './CardTextbook.scss';

interface CardsData {
  title: string;
  desc: string;
  level: string;
  path: string;
}

const CardTextbook: FC<CardsData> = (props) => {
  return (
    <Link className="textbook-card" to={props.path}>
      <h3 className="textbook-card__level">{props.level}</h3>
      <div className="textbook-card__content">
        <h4 className="textbook-card__title">{props.title}</h4>
        <p className="textbook-card__desc">{props.desc}</p>
      </div>
    </Link>
  );
};

export default CardTextbook;

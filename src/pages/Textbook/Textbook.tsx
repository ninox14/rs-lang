import { FC } from 'react';
import { CardTextbook } from './Components/CardTextbook';
import CardData from './Components/CardData';
import './Textbook.scss';

export const Textbook: FC = () => {
  return (
    <main className="page page_textbook">
      <div className="textbook-content">
        <h2 className="textbook__title">Учебник</h2>
        <div className="textbook__cards-container">
          {CardData.map((el) => (
            <CardTextbook
              key={el.id}
              title={el.title}
              desc={el.desc}
              level={el.level}
              path={el.path}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

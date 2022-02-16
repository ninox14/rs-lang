import { FC } from 'react';
import CardTextbook from 'pages/Textbook/Components/CardTextbook';
import CardData from 'pages/Textbook/Components/CardData';
import './Textbook.scss';
import { useAppSelector } from 'redux/hooks';

const Textbook: FC = () => {
  const isLogged = useAppSelector((state) => state.word.userId);
  return (
    <main className="page page_textbook">
      <div className="textbook-content">
        <h2 className="textbook__title">Учебник</h2>
        <div className="textbook__cards-container">
          {CardData.map((el) => {
            if (!el.isAuthReq) {
              return (
                <CardTextbook
                  key={el.id}
                  title={el.title}
                  desc={el.desc}
                  level={el.level}
                  path={el.path}
                />
              );
            }
            if (isLogged) {
              return (
                <CardTextbook
                  key={el.id}
                  title={el.title}
                  desc={el.desc}
                  level={el.level}
                  path={el.path}
                />
              );
            }
          })}
        </div>
      </div>
    </main>
  );
};

export default Textbook;

import { FC } from 'react';
import './DifficultyButtons.scss';

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

interface IDifficultyButtons {
  isFromTextbook: boolean;
}

const DifficultyButtons: FC<IDifficultyButtons> = ({ isFromTextbook }) => {
  if (isFromTextbook) {
    return (
      <div className="options-difficulty">
        <p className="options-difficulty__title">Выбери сложность:</p>
        <div className="options-difficulty__controls">
          {levels.map((el) => (
            <button key={el} className="options-difficulty__btn">
              {el}
            </button>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="options-difficulty">
        <p className="options-difficulty__title">
          Игра будет запущена со словами с текущей страницы
        </p>
      </div>
    );
  }
};

export default DifficultyButtons;

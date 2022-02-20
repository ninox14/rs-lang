import { FC } from 'react';
import './DifficultyButtons.scss';

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

interface IDifficultyButtons {
  isFromTextbook: boolean;
  handleDifficultyChange: (newDifficulty: number) => void;
  difficulty: number | null;
}

const DifficultyButtons: FC<IDifficultyButtons> = ({
  handleDifficultyChange,
  difficulty,
  isFromTextbook,
}) => {
  if (isFromTextbook) {
    return (
      <div className="options-difficulty">
        <p className="options-difficulty__title">Выбери сложность:</p>
        <div className="options-difficulty__controls">
          {levels.map((el, index) => (
            <button
              key={el}
              onClick={() => handleDifficultyChange(index)}
              className={`options-difficulty__btn ${
                index === difficulty && 'active'
              }`}
            >
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

import { FC } from 'react';
import DifficultyButtons from '../Components/DifficultyButtons/DifficultyButtons';
import './StartScreen.scss';

import { ReactComponent as SprintLogo } from 'assets/icons/sprint.svg';

const StartScreen: FC = () => {
  const isFromTextbook = true;
  return (
    <div className="sprint_start-screen">
      <SprintLogo className="sprint__logo" />
      <h2 className="sprint__title">Спринт</h2>
      <p className="sprint__description">
        Твоя задача как можно быстрее определить правильно ли указан перевод
        слова. Управлять можно как кнопками, так и стрелками на клавиатуре.
      </p>
      <DifficultyButtons isFromTextbook={isFromTextbook} />
    </div>
  );
};

export default StartScreen;

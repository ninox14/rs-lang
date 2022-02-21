import { ReactComponent as Headphones } from 'assets/icons/headphones.svg';
import { FC, ReactElement, useEffect, useState } from 'react';
import Button from 'components/AudiocallPage/Button';
import { useGame } from 'components/GameContext/GameContext';

const AudiocallHome: FC = () => {
  const { pickDifficulty } = useGame();
  const [difficulty, setDifficulty] = useState<number>();

  useEffect(() => {
    setDifficulty(undefined);
  }, []);

  return (
    <div className="audiocall__container audiocall__container_home">
      <div className="audiocall__content-wrapper">
        <Headphones className="audiocall__game-icon" />
        <h2 className="audiocall__game-header">Аудиовызов</h2>
        <div className="audiocall__game-desc">
          <div>
            Ты слышишь слово на английском и видишь 5 вариантов его перевода.
          </div>
          <div>Твоя задача выбрать правильный перевод озвученного слова.</div>
        </div>
        <div className="audiocall__difficulty-container">
          <div>Выбери сложность:</div>
          <div className="audiocall__difficulty-buttons">
            {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(
              (label, index): ReactElement => (
                <Button
                  text={label}
                  className={`audiocall__difficulty-button ${
                    index === difficulty
                      ? 'audiocall__difficulty-button_selected'
                      : ''
                  }`}
                  key={`difficulty${index}`}
                  onClick={() => {
                    setDifficulty(index);
                  }}
                />
              )
            )}
          </div>
        </div>
        <div className="audiocall__homepage-buttons">
          {['Выйти', 'Начать'].map(
            (label, index): ReactElement => (
              <Button
                text={label}
                className={`audiocall__homepage-button ${
                  difficulty === undefined && index > 0
                    ? 'audiocall__homepage-button_disabled'
                    : ''
                }`}
                url={index ? undefined : '..'}
                onClick={() => {
                  if (difficulty !== undefined && index > 0)
                    pickDifficulty(difficulty);
                }}
                key={`homepageButton${index}`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AudiocallHome;

import FullscreenButton from 'components/AudiocallPage/Fullscreen';
import { ReactComponent as Headphones } from 'assets/icons/headphones.svg';
import { FC, ReactElement } from 'react';
import Button from 'components/AudiocallPage/Button';

const AudiocallHome: FC = () => {
  return (
    <div className="audiocall__container audiocall__container_home">
      <div className="audiocall__fixed-controls">
        <div className="audiocall__fixed-controls_left"></div>
        <div className="audiocall__fixed-controls_right">
          <FullscreenButton className="audiocall__controls-button" />
        </div>
      </div>
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
              (label): ReactElement => (
                <Button
                  text={label}
                  className="audiocall__difficulty-button"
                  key={`difficulty${label}`}
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
                className="audiocall__homepage-button"
                url={index ? undefined : '.'}
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

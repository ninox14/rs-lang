import TabPanel from 'components/AudiocallPage/TabPanel';
import { FC, ReactElement, SyntheticEvent, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { VolumeUp } from '@mui/icons-material';
import { IGamePageProps } from './types.d';
import Button from 'components/AudiocallPage/Button';
import { GameState, useGame } from 'components/GameContext/GameContext';

const AudiocallStatistics: FC<IGamePageProps> = ({ gamePageProps }) => {
  const { audio } = gamePageProps;
  const { correct, wrong, handleGameStateChange } = useGame();

  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const allyProps = (index: number) => {
    return {
      id: `audiocall-statistics-tab-${index}`,
      'aria-controls': `audiocall-statistics-tabpanel-${index}`,
    };
  };

  const rate = (correct.length / (correct.length + wrong.length)) * 100;
  const chart = isNaN(rate) ? 0 : rate;
  const resultTitle =
    rate > 85
      ? 'Отличный результат!'
      : rate > 50
      ? 'Хороший результат!'
      : 'Стоит повторить!';

  return (
    <div className="audiocall__container audiocall__container_statistics">
      <div className="audiocall__tabs-container">
        <Box className="audiocall__tabs-wrapper">
          <Tabs
            className="audiocall__tabs"
            value={tabIndex}
            onChange={handleChange}
          >
            <Tab
              className="audiocall__tab"
              label="Результат"
              {...allyProps(0)}
            />
            <Tab className="audiocall__tab" label="Слова" {...allyProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0}>
          <div className="panel-result audiocall__panel-result">
            <p className="panel-result__title">{resultTitle}</p>
            <div className="panel-result__chart-container">
              <div
                className="panel-result__chart"
                style={{ backgroundSize: `100% ${chart}%` }}
              >
                <div className="panel-result__chart-info">
                  <div className="panel-result__chart-score">{chart}%</div>
                  <div>правильных ответов</div>
                </div>
              </div>
            </div>
            <div className="panel-result__btns">
              <Button className="panel-result__btn panel-result__exit" url="..">
                Выйти
              </Button>
              <Button
                className="panel-result__btn panel-result__replay"
                onClick={() => {
                  handleGameStateChange(GameState.INITIAL);
                }}
              >
                Сыграть еще раз
              </Button>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <div className="panel-words audiocall__panel-words">
            {correct.length ? (
              <div className="panel-words__known">
                <div className="panel-words__heading">
                  <span className="panel-words__subtitle">Знаю</span>
                  <span className="panel-words__words-count">
                    {correct.length}
                  </span>
                </div>
                <div className="panel-words__words">
                  {correct.map(
                    (answer, index): ReactElement => (
                      <div
                        className="panel-words__item"
                        key={`knownWord${index}`}
                        onClick={() => {
                          audio.playSound(answer.audio);
                        }}
                      >
                        <VolumeUp />
                        <span className="panel-words__word">
                          {answer.word}
                        </span>{' '}
                        — {answer.wordTranslate}
                      </div>
                    )
                  )}
                </div>
              </div>
            ) : undefined}
            {wrong.length ? (
              <div className="panel-words__repeat">
                <div className="panel-words__heading">
                  <span className="panel-words__subtitle">Надо повторить</span>
                  <span className="panel-words__words-count">
                    {wrong.length}
                  </span>
                </div>
                <div className="panel-words__words">
                  {wrong.map(
                    (answer, index): ReactElement => (
                      <div
                        className="panel-words__item"
                        key={`repeatWord${index}`}
                        onClick={() => {
                          audio.playSound(answer.audio);
                        }}
                      >
                        <VolumeUp />
                        <span className="panel-words__word">
                          {answer.word}
                        </span>{' '}
                        —{' '}
                        <span className="panel-words__translation">
                          {answer.wordTranslate}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            ) : undefined}
          </div>
        </TabPanel>
      </div>
    </div>
  );
};

export default AudiocallStatistics;

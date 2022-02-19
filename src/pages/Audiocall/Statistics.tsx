import TabPanel from 'components/AudiocallPage/TabPanel';
import { FC, ReactElement, SyntheticEvent, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import FullscreenButton from 'components/AudiocallPage/Fullscreen';
import { VolumeUp } from '@mui/icons-material';

const AudiocallStatistics: FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const allyProps = (index: number) => {
    return {
      id: `audiocall-statistics-tab-${index}`,
      'aria-controls': `audiocall-statistics-tabpanel-${index}`,
    };
  };
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const chart = 85;

  const answers = [
    { correct: true, word: 'hurr', translation: 'хурр' },
    { correct: false, word: 'durr', translation: 'дурр' },
    { correct: true, word: 'purr', translation: 'пурр' },
    { correct: false, word: 'kurr', translation: 'курр' },
    { correct: true, word: 'furr', translation: 'фурр' },
  ];
  const correctAnswers = answers.filter((answer) => answer.correct);
  const wrongAnswers = answers.filter((answer) => !answer.correct);

  return (
    <div className="audiocall__container audiocall__container_statistics">
      <div className="audiocall__fixed-controls">
        <div className="audiocall__fixed-controls_left"></div>
        <div className="audiocall__fixed-controls_right">
          <FullscreenButton className="audiocall__controls-button" />
        </div>
      </div>
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
            <p className="panel-result__title">Отличный результат!</p>
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
              <button className="panel-result__btn panel-result__exit">
                Выйти
              </button>
              <button className="panel-result__btn panel-result__replay">
                Сыграть еще раз
              </button>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <div className="panel-words audiocall__panel-words">
            <div className="panel-words__known">
              <div className="panel-words__heading">
                <span className="panel-words__subtitle">Знаю</span>
                <span className="panel-words__words-count">
                  {correctAnswers.length}
                </span>
              </div>
              <div className="panel-words__words">
                {correctAnswers.map(
                  (answer): ReactElement => (
                    <div className="panel-words__item">
                      <VolumeUp />
                      <span className="panel-words__word">
                        {answer.word}
                      </span> — {answer.translation}
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="panel-words__repeat">
              <div className="panel-words__heading">
                <span className="panel-words__subtitle">Надо повторить</span>
                <span className="panel-words__words-count">
                  {wrongAnswers.length}
                </span>
              </div>
              <div className="panel-words__words">
                {wrongAnswers.map(
                  (answer): ReactElement => (
                    <div className="panel-words__item">
                      <VolumeUp />
                      <span className="panel-words__word">
                        {answer.word}
                      </span> —{' '}
                      <span className="panel-words__translation">
                        {answer.translation}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </TabPanel>
      </div>
    </div>
  );
};

export default AudiocallStatistics;

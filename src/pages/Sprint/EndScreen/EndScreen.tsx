import { FC, useState } from 'react';
import './EndScreen.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { createTheme, ThemeProvider } from '@mui/material';
import { GameState, useGame } from 'components/GameContext/GameContext';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface IEndscreenProps {
  points: number;
}

// const pointsToCompare = {}

const TabPanel: FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      className="sprint__tab-panel"
      {...other}
    >
      {value === index && children}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const TabsTheme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: 'black',
          },
        },
      },
    },
  },
});

const EndScreen: FC<IEndscreenProps> = ({ points }) => {
  const navigate = useNavigate();
  const { wrong, correct, handleGameStateChange } = useGame();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="sprint_end-screen">
      <div className="end-card">
        <div className="end-card__tabs">
          <ThemeProvider theme={TabsTheme}>
            <Tabs
              variant="fullWidth"
              className="end-card__tabs-container"
              value={value}
              onChange={handleChange}
              aria-label="game results"
              sx={{
                height: '40px',
                minHeight: '40px',
                backgroundColor: '#C1CCDB',
              }}
              TabIndicatorProps={{
                style: {
                  height: '100%',
                  backgroundColor: '#F9FBFC',
                },
              }}
            >
              <Tab
                className="end-card__tab end-card__tab_result"
                label="Результат"
                {...a11yProps(0)}
              />
              <Tab
                className="end-card__tab end-card__tab_words"
                label="Слова"
                {...a11yProps(1)}
              />
            </Tabs>
          </ThemeProvider>
        </div>
        <TabPanel value={value} index={0}>
          <div className="panel-result">
            <p className="panel-result__title">Отличный результат! {points}</p>
            <div className="panel-result__chart"></div>
            <div className="panel-result__btns">
              <button
                className="panel-result__btn panel-result__exit"
                onClick={() => navigate(-1)}
              >
                Выйти
              </button>
              <button
                className="panel-result__btn panel-result__replay"
                onClick={() => handleGameStateChange(GameState.INITIAL)}
              >
                Сыграть еще раз
              </button>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="panel-words">
            <div className="panel-words__known">
              <div className="panel-words__heading">
                <span className="panel-words__subtitle">Знаю</span>
                <span className="panel-words__words-count">
                  {correct.length}
                </span>
              </div>
              <div className="panel-words__words">
                {correct.map((word) => (
                  <div className="panel-words__word">{`${word.word} - ${word.wordTranslate}`}</div>
                ))}
              </div>
            </div>
            <div className="panel-words__repeat">
              <div className="panel-words__heading">
                <span className="panel-words__subtitle">Надо повторить</span>
                <span className="panel-words__words-count">{wrong.length}</span>
              </div>
              <div className="panel-words__words">
                {wrong.map((word) => (
                  <div className="panel-words__word">{`${word.word} - ${word.wordTranslate}`}</div>
                ))}
              </div>
            </div>
          </div>
        </TabPanel>
      </div>
    </div>
  );
};

export default EndScreen;

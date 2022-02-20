import { FC, useState } from 'react';
import './EndScreen.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { createTheme, ThemeProvider } from '@mui/material';
import ResultsChart from '../Components/ResultsModal/ResultsChart';
import TabPanel from '../Components/ResultsModal/ResultsTabPanel';
import ResultsWords from '../Components/ResultsModal/ResultsWords';

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

const EndScreen: FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="sprint_end-screen results-screen">
      <div className="results-modal">
        <div className="results-modal__tabs">
          <ThemeProvider theme={TabsTheme}>
            <Tabs
              variant="fullWidth"
              className="results-modal__tab-container"
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
                className="results-modal__tab results-modal__tab_result"
                label="Результат"
                {...a11yProps(0)}
              />
              <Tab
                className="results-modal__tab results-modal__tab_words"
                label="Слова"
                {...a11yProps(1)}
              />
            </Tabs>
          </ThemeProvider>
        </div>
        <TabPanel value={value} index={0}>
          <ResultsChart />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ResultsWords />
        </TabPanel>
      </div>
    </div>
  );
};

export default EndScreen;

import { FC, useState, SyntheticEvent } from 'react';
import './Auth.scss';

import { ReactComponent as PlaneSvg } from '../../assets/icons/plane.svg';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Form } from '../../components/Form/Form';
interface TabPanelProps {
  index: number;
  value: number;
}

const TabPanel: FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

const allyProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export const Auth: FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <main className="page page_auth">
      <div className="auth">
        <PlaneSvg />
        <div className="auth__form-container">
          <Box sx={{ width: '100%' }}>
            <Tabs
              className="auth_tabs"
              value={value}
              onChange={handleChange}
              // TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
            >
              <Tab label="Вход" {...allyProps(0)} />
              <Tab label="Регистрация" {...allyProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Form type="login" />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
        </div>
      </div>
    </main>
  );
};

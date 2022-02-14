import { FC, useState, SyntheticEvent } from 'react';

import { ReactComponent as PlaneSvg } from 'assets/icons/plane.svg';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Form from 'components/Form/Form';
import { TabPanelProps } from './types';

const TabPanel: FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className="auth__tab-panel"
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

const Auth: FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <main className="page page_auth auth">
      <div className="auth__container">
        <PlaneSvg className="auth__svg" />
        <div className="auth__form-container">
          <Box className="auth__tabs-wrapper">
            <Tabs className="auth__tabs" value={value} onChange={handleChange}>
              <Tab className="auth__tab" label="Вход" {...allyProps(0)} />
              <Tab
                className="auth__tab"
                label="Регистрация"
                {...allyProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Form type="login" />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Form type="register" />
          </TabPanel>
        </div>
      </div>
    </main>
  );
};

export default Auth;

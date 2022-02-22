import { FC } from 'react';
import { TabPanelProps } from './types';

const TabPanel: FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`audiocall-tabpanel-${index}`}
      aria-labelledby={`audiocall-tab-${index}`}
      className={`audiocall__tab-panel audiocall__tab-panel_${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

export default TabPanel;

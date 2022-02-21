import { FC } from 'react';
import './ResultsModal.scss';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      className="results-modal__tab-panel"
      {...other}
    >
      {value === index && children}
    </div>
  );
};

export default TabPanel;

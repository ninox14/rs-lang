import React, { FC, StrictMode } from 'react';

import 'styles/index.scss';
import AppRouter from 'components/AppRouter/AppRouter';

import StyledEngineProvider from '@mui/material/StyledEngineProvider';

const App: FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <StrictMode>
        <div className="app">
          <AppRouter />
        </div>
      </StrictMode>
    </StyledEngineProvider>
  );
};

export default App;

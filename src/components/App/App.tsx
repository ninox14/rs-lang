import React, { FC, useEffect } from 'react';

import 'styles/index.scss';
import AppRouter from 'components/AppRouter/AppRouter';

import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { relogin } from 'api/AuthService';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

const App: FC = () => {
  useEffect(() => {
    const tryRelogin = async () => {
      await relogin();
    };
    tryRelogin();
  }, []);
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <div className="app">
          <AppRouter />
        </div>
      </StyledEngineProvider>
    </Provider>
  );
};

export default App;

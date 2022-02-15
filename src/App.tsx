import React, { FC, useEffect } from 'react';
import { relogin } from './api/AuthService';
import { AppRouter } from './components/AppRouter/AppRouter';

const App: FC = () => {
  useEffect(() => {
    const tryRelogin = async () => {
      await relogin();
    };
    tryRelogin();
  }, []);
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
};

export default App;

import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Audiocall } from './components/Audiocall/Audiocall';
import { Auth } from './components/Auth/Auth';
import { Games } from './components/Games/Games';
import { Home } from './components/Home/Home';
import { PageLayout } from './components/PageLayout/PageLayout';
import { Sprint } from './components/Sprint/Sprint';
import { Team } from './components/Team/Team';
import { Textbook } from './components/Textbook/Textbook';
import { WordList } from './components/WordList/WordList';
import { WordPage } from './components/WordPage/WordPage';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Auth />} />
          <Route path="team" element={<Team />} />
          <Route path="textbook">
            <Route index element={<Textbook />} />
            <Route path=":groupId" element={<WordPage />}>
              <Route path=":pageId" element={<WordList />} />
            </Route>
          </Route>
          <Route path="games" element={<Games />} />
        </Route>
        <Route path="/games/audiocall" element={<Audiocall />} />
        <Route path="/games/sprint" element={<Sprint />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

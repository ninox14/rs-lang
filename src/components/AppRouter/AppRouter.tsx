import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Audiocall from 'pages/Audiocall/Audiocall';
import Auth from 'pages/Auth/Auth';
import Games from 'pages/Games/Games';
import Home from 'pages/Home/Home';
import PageLayout from 'pages/PageLayout/PageLayout';
import Sprint from 'pages/Sprint/Sprint';
import Team from 'pages/Team/Team';
import Textbook from 'pages/Textbook/Textbook';
import WordList from 'components/WordList/WordList';
import WordPage from 'components/WordPage/WordPage';
import { GameProvider } from 'components/GameContext/GameContext';
import { StatsProvider } from 'components/StatsContext/StatsContext';

const AppRouter: FC = () => {
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
        <Route
          path="/games/sprint"
          element={
            <StatsProvider game="sprint">
              <GameProvider game="sprint">
                <Sprint />
              </GameProvider>
            </StatsProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

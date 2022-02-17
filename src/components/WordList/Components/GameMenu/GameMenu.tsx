import { FC } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { ThemeProvider } from '@mui/material/styles';

import { ReactComponent as PuzzleIcon } from 'assets/icons/card-puzzle.svg';
import { ReactComponent as AudiocallLogo } from 'assets/icons/headphones.svg';
import { ReactComponent as SprintLogo } from 'assets/icons/sprint.svg';

import {
  GameMenuTheme,
  gamesMenuData,
} from 'components/WordPage/Components/WordPageData';
import { GameKey } from 'api/ApiService';
import { useAppDispatch } from 'redux/hooks';
import { setIsGameRanFromTextbook } from 'redux/word.slice';
import {
  getWordsAudiocall,
  getWordsAudiocallAnon,
  getWordsSprint,
  getWordsSprintAnon,
} from 'redux/actions';
import { useNavigate } from 'react-router-dom';

const gamesMenuIcons = [
  <AudiocallLogo className="games-menu__logo games-menu__logo_audiocall"></AudiocallLogo>,
  <SprintLogo className="games-menu__logo games-menu__logo_sprint"></SprintLogo>,
];

interface IGameMenu {
  isHardPage: boolean;
  isLearned: boolean;
  userId: string;
  groupId: number;
  pageId: number;
}

const GameMenu: FC<IGameMenu> = ({
  isHardPage,
  isLearned,
  userId,
  groupId,
  pageId,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNavigateToGame = async (linkToGame: string, game: GameKey) => {
    if (userId) {
      switch (game) {
        case 'audiocall': {
          dispatch(setIsGameRanFromTextbook(true));
          dispatch(getWordsAudiocall({ userId, group: groupId, page: pageId }));
          navigate(linkToGame);
          break;
        }
        case 'sprint': {
          dispatch(setIsGameRanFromTextbook(true));
          dispatch(getWordsSprint({ userId, group: groupId, page: pageId }));
          navigate(linkToGame);
          break;
        }
      }
    } else {
      switch (game) {
        case 'audiocall': {
          dispatch(setIsGameRanFromTextbook(true));
          dispatch(getWordsAudiocallAnon({ group: groupId, page: pageId }));
          navigate(linkToGame);
          break;
        }
        case 'sprint': {
          dispatch(setIsGameRanFromTextbook(true));
          dispatch(getWordsSprintAnon({ group: groupId, page: pageId }));
          navigate(linkToGame);
          break;
        }
      }
    }
  };

  return (
    <ThemeProvider theme={GameMenuTheme}>
      <SpeedDial
        ariaLabel="Mini-games"
        className={`games-menu ${
          isHardPage || isLearned ? 'games-menu_disabled' : ''
        }`}
        icon={<PuzzleIcon />}
        FabProps={{
          sx: {
            backgroundColor: 'var(--color)',
            boxShadow: 1,
            ':hover': {
              boxShadow: 3,
              backgroundColor: 'var(--color)',
            },
          },
        }}
      >
        {gamesMenuData.map((el) => (
          <SpeedDialAction
            key={el.id}
            className={`games-menu__btn games-menu__btn_${el.name}`}
            tooltipOpen
            tooltipTitle={el.title}
            FabProps={{
              sx: {
                boxShadow: 0,
                ':hover': {
                  boxShadow: 3,
                },
              },
            }}
            icon={
              <div
                className={`games-menu__link games-menu__link_${el.name}`}
                onClick={() => {
                  handleNavigateToGame(el.path, el.name);
                }}
              >
                {gamesMenuIcons[el.id]}
              </div>
            }
          ></SpeedDialAction>
        ))}
      </SpeedDial>
    </ThemeProvider>
  );
};

export default GameMenu;

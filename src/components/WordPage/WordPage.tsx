import { createTheme, SpeedDialAction, ThemeProvider } from '@mui/material';
import SpeedDial from '@mui/material/SpeedDial';
import { FC, useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import {
  gamesMenuData,
  groupsColorThemes,
  groupsLinksData,
} from './Components/WordPageData';

import { ReactComponent as AudiocallLogo } from '../../assets/icons/headphones.svg';
import { ReactComponent as SprintLogo } from '../../assets/icons/sprint.svg';
import { ReactComponent as PuzzleIcon } from '../../assets/icons/card-puzzle.svg';

import './WordPage.scss';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setGroup } from 'redux/word.slice';

const gamesMenuIcons = [
  <AudiocallLogo className="games-menu__logo_audiocall"></AudiocallLogo>,
  <SprintLogo className="games-menu__logo_sprint"></SprintLogo>,
];

const SpeedDealTheme = createTheme({
  components: {
    MuiSpeedDialAction: {
      styleOverrides: {
        fab: {
          width: '45px',
          height: '45px',
          '&.games-menu__btn_audiocall': {
            backgroundColor: '#8cd9ff',
          },
          '&.games-menu__btn_sprint': {
            backgroundColor: '#ffa587',
          },
        },
        staticTooltipLabel: {
          backgroundColor: '#3C4758',
          color: '#FFFFFF',
          fontSize: 14,
          fontFamily: 'inherit',
          minWidth: '180px',
          textAlign: 'center',
          justifyContent: 'center',
          padding: '4px 10px',
        },
      },
    },
  },
});

const WordPage: FC = () => {
  const isLogged = !!useAppSelector((state) => state.word.userId);

  const groupId = Number(useParams().groupId || '0');
  const [currentGroup, setCurrentGroup] = useState(0);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setGroup(Number(groupId)));
  }, [dispatch, groupId]);

  function handleGroupSwitch(value: number) {
    setCurrentGroup(value);
  }

  return (
    <div
      className={`page page_wordpage wordpage_${groupsColorThemes[groupId]}`}
    >
      <div className="wordpage-container">
        <h4 className="wordpage__title">Разделы</h4>
        <div className="groups-container">
          {groupsLinksData.map((el) => {
            if (!el.isAuthReq || isLogged) {
              return (
                <Link
                  key={el.id}
                  to={el.path}
                  className={`groups__link groups__link_${
                    groupsColorThemes[el.id]
                  } ${groupId === el.id ? 'groups__link_active' : ''}`}
                >
                  {el.title}
                </Link>
              );
            }
          })}
        </div>
        <Outlet />
        <ThemeProvider theme={SpeedDealTheme}>
          <SpeedDial
            ariaLabel="Mini-games"
            className="games-menu"
            icon={<PuzzleIcon />}
            sx={{
              position: 'fixed',
              bottom: 50,
              right: 50,
            }}
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
                  <Link
                    className={`games-menu__link games-menu__link_${el.name}`}
                    to={`${el.path}`}
                  >
                    {gamesMenuIcons[el.id]}
                  </Link>
                }
              ></SpeedDialAction>
            ))}
          </SpeedDial>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default WordPage;

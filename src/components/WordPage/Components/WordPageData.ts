import { createTheme } from '@mui/material/styles';

export const groupsColorThemes = [
  'lightblue',
  'blue',
  'pink',
  'green',
  'yellow',
  'orange',
  'purple',
];

export const groupsLinksData = [
  { id: 0, title: 'A1', path: '/textbook/0/0', isAuthReq: false },
  { id: 1, title: 'A2', path: '/textbook/1/0', isAuthReq: false },
  { id: 2, title: 'B1', path: '/textbook/2/0', isAuthReq: false },
  { id: 3, title: 'B2', path: '/textbook/3/0', isAuthReq: false },
  { id: 4, title: 'C1', path: '/textbook/4/0', isAuthReq: false },
  { id: 5, title: 'C2', path: '/textbook/5/0', isAuthReq: false },
  { id: 6, title: '★', path: '/textbook/6/0', isAuthReq: true },
];

interface IGamesMenuData {
  id: number;
  name: 'audiocall' | 'sprint';
  title: string;
  path: string;
}

export const gamesMenuData: IGamesMenuData[] = [
  {
    id: 0,
    name: 'audiocall',
    title: 'Сыграть в Аудиовызов',
    path: '/games/audiocall',
  },
  { id: 1, name: 'sprint', title: 'Сыграть в Спринт', path: '/games/sprint' },
];

export const GameMenuTheme = createTheme({
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

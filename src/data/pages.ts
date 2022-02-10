import { Pages } from '../types/rs-lang';
import session from './session';

const pages: Pages = [
  {
    label: 'Главная',
    url: '/',
  },
  {
    label: 'Учебник',
    url: '/textbook',
    visibility: session.loggedIn,
  },
  {
    label: 'Игры',
    url: '/games',
    visibility: session.loggedIn,
  },
  {
    label: 'Статистика',
    url: '/stat',
    visibility: session.loggedIn,
  },
  {
    label: 'О команде',
    url: '/team',
  },
  {
    label: 'Войти',
    url: '/auth',
  },
];

export default pages;

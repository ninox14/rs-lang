import { Pages } from 'types/rs-lang';

const pages: Pages = [
  {
    label: 'Главная',
    url: '/',
  },
  {
    label: 'Учебник',
    url: '/textbook',
    visibility: false,
  },
  {
    label: 'Игры',
    url: '/games',
    visibility: false,
  },
  {
    label: 'Статистика',
    url: '/statistics',
    visibility: false,
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

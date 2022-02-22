import { Pages } from 'types/rs-lang';

const pages: Pages = [
  {
    label: 'Главная',
    url: '/',
  },
  {
    label: 'Учебник',
    url: '/textbook',
  },
  {
    label: 'Игры',
    url: '/games',
  },
  {
    label: 'Статистика',
    url: '/stat',
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

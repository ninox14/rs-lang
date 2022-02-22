interface Page {
  label: string;
  url: string;
}

const PagesData: Page[] = [
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
    url: '/statistics',
  },
  {
    label: 'О команде',
    url: '/team',
  },
];

export default PagesData;

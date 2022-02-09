interface CardsDataInterface {
  id: number;
  title: string;
  iconName: string;
  desc: string;
  linkName: string;
  path: string;
}

const CardsData: CardsDataInterface[] = [
  {
    id: 0,
    title: 'Возьмите обучение под контроль',
    iconName: 'chart',
    desc: 'Следите за своим прогрессом с помощью детальной ',
    linkName: 'статистики.',
    path: '/auth',
  },
  {
    id: 1,
    title: 'Не останавливайтесь',
    iconName: 'bulb',
    desc: 'Более 3500 слов подобранных под каждый уровень подготовки содержится в ',
    linkName: 'учебнике.',
    path: '/textbook',
  },
  {
    id: 2,
    title: 'Бросьте себе вызов',
    iconName: 'puzzle',
    desc: `Не заскучать и одновременно укрепить знания помогут `,
    linkName: 'игры.',
    path: '/games',
  },
];

export default CardsData;

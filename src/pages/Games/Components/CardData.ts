interface CardsDataInterface {
  id: number;
  type: string;
  name: string;
  desc: string;
}

const CardData: CardsDataInterface[] = [
  {
    id: 0,
    type: 'audiocall',
    name: 'Аудиовызов',
    desc: 'Развивает навыки восприятия речи на слух',
  },
  {
    id: 1,
    type: 'sprint',
    name: 'Спринт',
    desc: 'Развивает навык быстрого переключения между языками',
  },
];

export default CardData;

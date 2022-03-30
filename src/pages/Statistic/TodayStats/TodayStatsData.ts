interface IStatsKeys {
  type: 'newWords' | 'learned' | 'percentage';
  className: string;
  description: string;
}

export const WordsCardsData: IStatsKeys[] = [
  {
    type: 'newWords',
    className: 'new',
    description: 'новых слов',
  },
  {
    type: 'learned',
    className: 'learned',
    description: 'слов изучено',
  },
  {
    type: 'percentage',
    className: 'answers',
    description: 'правильных ответов',
  },
];

import { FC } from 'react';
import GameStatsCard from '../Components/GamesStatsCard/GameStatsCard';
import WordsStatsCard from '../Components/WordsStatsCard/WordsStatsCard';
import './TodayStats.scss';
import { WordsCardsData } from './TodayStatsData';

const TodayStats: FC = () => {
  return (
    <div className="stats_today">
      <h4 className="stats_today__title">Статистика за сегодня</h4>
      <div className="stats_today__words-stats">
        {WordsCardsData.map((el) => (
          <WordsStatsCard
            key={el.type}
            type={el.type}
            className={el.className}
            description={el.description}
          />
        ))}
      </div>
      <div className="stats_today__games-stats">
        <GameStatsCard type={'audiocall'} name={'Аудиовызов'}></GameStatsCard>
        <GameStatsCard type={'sprint'} name={'Спринт'}></GameStatsCard>
      </div>
    </div>
  );
};

export default TodayStats;

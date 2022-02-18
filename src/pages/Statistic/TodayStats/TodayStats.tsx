import { useStats } from 'components/StatsContext/StatsContext';
import { IStatsDaily } from 'components/StatsContext/types';
import { FC, useEffect, useState } from 'react';
import GameStatsCard from '../Components/GamesStatsCard/GameStatsCard';
import WordsStatsCard from '../Components/WordsStatsCard/WordsStatsCard';
import './TodayStats.scss';
import { WordsCardsData } from './TodayStatsData';

const TodayStats: FC = () => {
  const { getStatistics } = useStats();
  const [stats, setStats] = useState<IStatsDaily | null>(null);

  useEffect(() => {
    const getStats = async () => {
      const data = await getStatistics();
      setStats(data.dailyStats);
    };
    getStats();
  }, []);

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
            stats={stats}
          />
        ))}
      </div>
      <div className="stats_today__games-stats">
        <GameStatsCard
          className={'audiocall'}
          name={'Аудиовызов'}
          stats={stats?.games.audiocall}
        ></GameStatsCard>
        <GameStatsCard
          className={'sprint'}
          name={'Спринт'}
          stats={stats?.games.sprint}
        ></GameStatsCard>
      </div>
    </div>
  );
};

export default TodayStats;

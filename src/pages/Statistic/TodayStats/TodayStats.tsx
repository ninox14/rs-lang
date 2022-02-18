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

  // const [newWords, setNewWords] = useState(0);
  // const [learned, setLearned] = useState(0);
  // const [audiocallTotal, setAudiocallTotal] = useState(0);
  // const [audiocallRight, setAudiocallRight] = useState(0);
  // const [audiocallNewWords, setAudiocallNewWords] = useState(0);
  // const [audiocallMaxChain, setAudiocallMaxChain] = useState(0);

  // const [sprintTotal, setSprintTotal] = useState(0);
  // const [sprintRight, setSprintRight] = useState(0);
  // const [sprintNewWords, setSprintNewWords] = useState(0);
  // const [sprintMaxChain, setSprintMaxChain] = useState(0);

  useEffect(() => {
    const getStats = async () => {
      const data = await getStatistics();
      setStats(data.dailyStats);
      // setNewWords(data.dailyStats.newWords);
      // setLearned(data.dailyStats.learned);
      // setAudiocallTotal(data.dailyStats.games.audiocall.percentage.total);
      // setAudiocallRight(data.dailyStats.games.audiocall.percentage.right);
      // setAudiocallNewWords(data.dailyStats.games.audiocall.newWords);
      // setAudiocallMaxChain(data.dailyStats.games.audiocall.maxChain);
      // setSprintTotal(data.dailyStats.games.sprint.percentage.total);
      // setSprintRight(data.dailyStats.games.sprint.percentage.right);
      // setSprintNewWords(data.dailyStats.games.sprint.newWords);
      // setSprintMaxChain(data.dailyStats.games.sprint.maxChain);
    };
    getStats();
  }, []);

  // const audiocallPercent = (audiocallRight * 100) / audiocallTotal;
  // const sprintPercent = (sprintRight * 100) / sprintTotal;

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

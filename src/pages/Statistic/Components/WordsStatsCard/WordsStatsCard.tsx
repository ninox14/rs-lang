import { GameKey } from 'api/ApiService';
import { useStats } from 'components/StatsContext/StatsContext';
import { IGameStats } from 'components/StatsContext/types.d';
import { FC, useEffect, useState } from 'react';
import './WordsStatsCard.scss';

interface IStatsKeys {
  type: 'newWords' | 'learned' | 'percentage';
  className: string;
  description: string;
}

function getPercent(games: Record<GameKey, IGameStats>): number {
  const audiocallRight = games.audiocall.percentage.right;
  const audiocallTotal = games.audiocall.percentage.total;
  const audiocallPercent = (audiocallRight * 100) / audiocallTotal;

  const sprintRight = games.sprint.percentage.right;
  const sprintTotal = games.sprint.percentage.total;
  const sprintPercent = (sprintRight * 100) / sprintTotal;

  const average = (audiocallPercent + sprintPercent) / 2 || 0;
  return average;
}

const WordsStatsCard: FC<IStatsKeys> = ({ className, description, type }) => {
  const { getStatistics } = useStats();
  const [stats, setStats] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const getStats = async () => {
      const data = await getStatistics();

      let gameData;
      if (type !== 'percentage') {
        gameData = data.dailyStats[type];
        setStats(gameData);
      } else {
        gameData = getPercent(data.dailyStats.games);
        setPercent(gameData);
      }
    };
    getStats();
  }, []);

  return (
    <div className={`words-stats__item words-stats__${className}`}>
      <span className="words-count">
        {type === 'percentage' ? `${percent}%` : stats}
      </span>
      {description}
    </div>
  );
};

export default WordsStatsCard;

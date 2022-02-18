import { useStats } from 'components/StatsContext/StatsContext';
import { IGameStats } from 'components/StatsContext/types';
import { FC, useEffect, useState } from 'react';
import './GameStatsCard.scss';

interface IGameStatsCard {
  type: 'audiocall' | 'sprint';
  name: string;
}

const GameStatsCard: FC<IGameStatsCard> = ({ type, name }) => {
  const { getStatistics } = useStats();
  const [stats, setStats] = useState<IGameStats | null>(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const getStats = async () => {
      const data = await getStatistics();
      const gameData = data.dailyStats.games[type];
      setStats(gameData);
      console.log(data);
      if (gameData) {
        let result = 0;
        if (gameData.percentage.right && gameData.percentage.total) {
          result =
            (gameData.percentage.right * 100) / gameData.percentage.total;
        }
        setPercentage(result);
      }
    };
    getStats();
  }, []);

  return (
    <div className={`games-stats-card game-stats-card_${type}`}>
      <h5 className="games-stats-card__title">{name}</h5>
      <div className="game-stats-card__content">
        <div className="game-stats-card__item game-stats-card__new-words">
          Количество новых слов:
          <span className="game-count">{stats?.newWords || 0}</span>
        </div>
        <div className="game-stats-card__item  game-stats-card__percent">
          Процент правильных ответов:
          <span className="game-count">{percentage}%</span>
        </div>
        <div className="game-stats-card__item  game-stats-card__combo">
          Самая длинная серия правильных ответов:
          <span className="game-count">{stats?.maxChain || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default GameStatsCard;

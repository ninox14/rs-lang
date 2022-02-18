import { GameKey } from 'api/ApiService';
import { IGameStats, IStatsDaily } from 'components/StatsContext/types';
import { FC } from 'react';
import './WordsStatsCard.scss';

interface IStatsKeys {
  type: 'newWords' | 'learned' | 'percentage';
  className: string;
  description: string;
  stats: IStatsDaily | null;
}

function getPercent(games: Record<GameKey, IGameStats>): number {
  const audiocallRight = games.audiocall.percentage.right;
  const audiocallTotal = games.audiocall.percentage.total;
  const audiocallPercent = (audiocallRight * 100) / audiocallTotal;

  const sprintRight = games.sprint.percentage.right;
  const sprintTotal = games.sprint.percentage.total;
  const sprintPercent = (sprintRight * 100) / sprintTotal;

  const average = (audiocallPercent + sprintPercent) / 2 || 0;
  return Math.floor(average);
}

const WordsStatsCard: FC<IStatsKeys> = ({
  className,
  description,
  type,
  stats,
}) => {
  let percentage = 0;
  if (stats) {
    percentage = getPercent(stats.games);
  }

  let count = 0;
  if (stats) {
    if (type === 'learned') {
      count = stats.learned;
    } else if (type === 'newWords') {
      count = stats.newWords;
    } else {
      count = percentage;
    }
  }
  return (
    <div className={`words-stats__item words-stats__${className}`}>
      <span className="words-count">{count}</span>
      {description}
    </div>
  );
};

export default WordsStatsCard;

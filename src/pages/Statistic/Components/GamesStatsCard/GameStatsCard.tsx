import { IGameStats } from 'components/StatsContext/types';
import { FC } from 'react';
import './GameStatsCard.scss';

interface IGameStatsCard {
  className: 'audiocall' | 'sprint';
  name: string;
  stats: IGameStats | undefined;
}

const GameStatsCard: FC<IGameStatsCard> = ({ className, name, stats }) => {
  let percentage = 0;
  if (stats) {
    percentage = (stats?.percentage.right * 100) / stats?.percentage.total || 0;
  }

  return (
    <div className={`games-stats-card game-stats-card_${className}`}>
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

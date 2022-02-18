import { StatsProvider } from 'components/StatsContext/StatsContext';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import './Statistic.scss';
import TodayStats from './TodayStats/TodayStats';

const Statistics: FC = () => {
  const userId = useAppSelector((state) => state.word.userId);
  const isLogged = !!userId;

  return (
    <StatsProvider game="sprint">
      <div className="page page_stats">
        {isLogged ? (
          <>
            <h3 className="stats__title">Статистика</h3>
            <TodayStats />
            <div className="stats_all-time">
              <h4 className="stats_all-time__title">Статистика за все время</h4>
            </div>
          </>
        ) : (
          <h3 className="stats__title">
            Для просмотра статистики нужно{' '}
            <Link to={'/auth'}>авторизоваться</Link>
          </h3>
        )}
      </div>
    </StatsProvider>
  );
};

export default Statistics;

import { StatsProvider } from 'components/StatsContext/StatsContext';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import LongtermStats from './LongtermStats/LongtermStats';
import './Statistic.scss';
import TodayStats from './TodayStats/TodayStats';

const Statistics: FC = () => {
  const userId = useAppSelector((state) => state.word.userId);
  const isLogged = !!userId;

  return (
    <StatsProvider game="sprint">
      <div className="page page_stats page_header">
        {isLogged ? (
          <>
            <h3 className="stats__title">Статистика</h3>
            <TodayStats />
            <LongtermStats />
          </>
        ) : (
          <h3 className="stats__title_auth">
            Для просмотра статистики нужно{' '}
            <Link className="stats__link_auth" to={'/auth'}>
              авторизоваться
            </Link>
          </h3>
        )}
      </div>
    </StatsProvider>
  );
};

export default Statistics;

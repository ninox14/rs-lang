import { useStats } from 'components/StatsContext/StatsContext';
import { ILongTerm } from 'components/StatsContext/types';
import { FC, useEffect, useState } from 'react';
import WordsPerDayStats from '../Components/WordsPerDayStats';
import AllLearnedStats from '../Components/AllLearnedStats';
import './LongtermStats.scss';

interface ILongTermStats {
  [date: string]: ILongTerm;
}

const LongtermStats: FC = () => {
  const { getStatistics } = useStats();
  const [stats, setStats] = useState<ILongTermStats | null>(null);

  const [dates, setDates] = useState<string[]>([
    'Вы еще не изучили ни одного слова',
  ]);

  const [newWordsCount, setNewWordsCount] = useState<number[]>([0]);
  const [learnedCount, setLearnedCount] = useState<number[]>([0]);

  useEffect(() => {
    const getStats = async () => {
      const data = await getStatistics();
      setStats(data.longTerm);
    };
    getStats();
  }, []);

  useEffect(() => {
    if (stats) {
      const keys = Object.keys(stats);
      const datesShort = keys.map((date) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'numeric',
        });
      });

      const newWords = keys.map((key) => stats[key].newWords);
      const learnedWords = keys.map((key) => stats[key].learned);

      if (newWords.length) {
        setNewWordsCount(newWords);
      }
      if (learnedWords.length) {
        setLearnedCount(learnedWords);
      }
      if (datesShort) {
        setDates(datesShort);
      }
    }
  }, [stats]);

  useEffect(() => {
    if (stats) {
      const keys = Object.keys(stats);
      const datesShort = keys.map((date) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'numeric',
        });
      });

      const count = keys.map((key) => stats[key].newWords);
      if (count.length) {
        setNewWordsCount(count);
      }
      if (datesShort.length) {
        setDates(datesShort);
      }
    }
  }, [stats]);

  return (
    <div className="stats_longterm">
      <h4 className="stats_longterm__title">Статистика за все время</h4>
      <div className="stats_longterm__chart-container stats_longterm__per-day">
        <h5 className="stats_longterm__subtitle">
          Количество новых слов за каждый день изучения
        </h5>
        <div className="chart-container">
          <WordsPerDayStats dates={dates} newWordsCount={newWordsCount} />
        </div>
      </div>

      <div className="stats_longterm__chart-container stats_longterm__all">
        <h5 className="stats_longterm__subtitle">Прогресс изучения слов</h5>
        <div className="chart-container">
          <AllLearnedStats dates={dates} learnedCount={learnedCount} />
        </div>
      </div>
    </div>
  );
};

export default LongtermStats;

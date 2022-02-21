import { getUserStatistics, updateUserStatistics } from 'api/ApiService';
import { createContext, FC, useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setErrorMsg } from 'redux/word.slice';
import {
  countNewWords,
  pickStatsToUpdate,
  saveUserWordStats,
  updateDailyStats,
  updateLongTern,
} from './services';
import { IStatsAll, IStatsContext, IStatsContextProviderProps } from './types';
import type { SaveStatsCallback } from './types';

const statsContextDefaults: IStatsContext = {
  saveStatistics: async ({ correct: [], wrong: [] }) => {},
  getStatistics: async () => pickStatsToUpdate(),
};
const StatsContext = createContext(statsContextDefaults);

export const StatsProvider: FC<IStatsContextProviderProps> = ({
  game,
  children,
}) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.word.userId);

  const getStatistics = async (): Promise<IStatsAll> => {
    try {
      const { data } = await getUserStatistics({ userId });
      return pickStatsToUpdate(data.optional);
    } catch (err) {
      console.error(err);
      return pickStatsToUpdate();
    }
  };

  const saveStatistics: SaveStatsCallback = async ({
    correct,
    wrong,
    maxInRow,
  }) => {
    if (userId) {
      try {
        const learnedWords = await saveUserWordStats({
          correct,
          wrong,
          userId,
          game,
        });
        const newWords = countNewWords({ correct, wrong });
        let statsToUpdate = await getStatistics();
        statsToUpdate = updateDailyStats({
          maxInRow,
          correctCount: correct.length,
          wrongCount: wrong.length,
          game,
          stats: statsToUpdate,
          learned: learnedWords,
          newWords,
        });
        statsToUpdate = updateLongTern({
          newWords,
          learned: learnedWords,
          stats: statsToUpdate,
        });
        const resp = await updateUserStatistics({
          userId,
          stats: statsToUpdate,
        });

        console.log(resp); // to be removed later
      } catch (err) {
        console.error(err); // to be removed later
        dispatch(
          setErrorMsg('Не получилось сохранить статистику пользователя')
        );
      }
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setErrorMsg(''));
    };
  }, []);

  return (
    <StatsContext.Provider
      value={{ saveStatistics, getStatistics }}
      children={children}
    />
  );
};

export const useStats = () => useContext(StatsContext);

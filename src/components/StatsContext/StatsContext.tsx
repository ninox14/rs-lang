import { getUserStatistics, updateUserStatistics } from 'api/ApiService';
import { createContext, FC, useContext } from 'react';
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
  // game: '',
  // correct: [],
  // wrong: [],
  // addCorrect: ([]) => {},
  // addWrong: ([]) => {},
  saveStatistics: async ({ correct: [], wrong: [] }) => {},
};
const StatsContext = createContext(statsContextDefaults);

export const StatsProvider: FC<IStatsContextProviderProps> = ({
  game,
  children,
}) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.word.userId);

  const getStatistics = async (): Promise<IStatsAll | undefined> => {
    try {
      const { data } = await getUserStatistics({ userId });
      return data.optional;
    } catch (err) {
      console.error(err);
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
        const currentStatistics = await getStatistics();
        let statsToUpdate = pickStatsToUpdate(currentStatistics);
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
        // console.log(learnedWords, statsToUpdate);

        console.log(resp);
      } catch (err) {
        console.error(err);
        dispatch(
          setErrorMsg('Не получилось сохранить статистику пользователя')
        );
      }
    }
  };

  return (
    <StatsContext.Provider value={{ saveStatistics }} children={children} />
  );
};

export const useStats = () => useContext(StatsContext);

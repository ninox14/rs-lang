import { GameKey, getUserStatistics } from 'api/ApiService';
import { createContext, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setErrorMsg } from 'redux/word.slice';
import { getDefaultAllStats } from './services';
import {
  IStatsAll,
  IStatsContext,
  IStatsContextProviderProps,
  IStatsDaily,
} from './types';
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

  const getStatistics = async () => {
    try {
      const { data } = await getUserStatistics({ userId });
      return data.optional;
    } catch (err) {
      console.error(err);
    }
  };

  const saveStatistics: SaveStatsCallback = async ({ correct, wrong }) => {
    if (userId) {
      try {
        let statsToUpdate: IStatsAll;
        const currentStatistics = await getStatistics();
        if (!currentStatistics) {
          statsToUpdate = getDefaultAllStats();
        } else {
          statsToUpdate = currentStatistics;
        }
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

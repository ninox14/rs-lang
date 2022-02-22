import { FC } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

interface IWordsPerDayStats {
  dates: string[];
  newWordsCount: number[];
}

// график, отображающий количество новых слов за каждый день изучения

const WordsPerDayStats: FC<IWordsPerDayStats> = ({ dates, newWordsCount }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Новых слов',
        data: newWordsCount,
        backgroundColor: '#1d98f1',
        base: 0,
        hoverBackgroundColor: '#40c0ff',
        minBarLength: 15,
        borderRadius: 5,
        yAxisID: 'yAxis',
        xAxisID: 'xAxis',
        maxBarThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 1.6,
    data: data,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        titleFont: {
          size: 14,
          family: '"Inter", sans-serif',
        },
        bodyFont: {
          size: 14,
          family: '"Inter", sans-serif',
        },
      },
    },
    scales: {
      yAxis: {
        title: {
          display: true,
          text: 'Кол-во слов',
          color: 'black',
          font: {
            size: 16,
            family: '"Inter", sans-serif',
          },
        },
        beginAtZero: true,
        ticks: {
          color: '#727272',
          font: {
            size: 14,
            family: '"Inter", sans-serif',
          },
        },
      },
      xAxis: {
        title: {
          display: true,
          text: 'Период изучения',
          color: 'black',
          font: {
            size: 16,
            family: '"Inter", sans-serif',
          },
        },
        ticks: {
          color: '#727272',
          font: {
            size: 14,
            family: '"Inter", sans-serif',
          },
        },
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export default WordsPerDayStats;

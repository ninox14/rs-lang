import { FC } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

interface IAllLearnedStats {
  dates: string[];
  learnedCount: number[];
}

// график, отображающий увеличение общего количества изученных слов за весь период обучения по дням

const AllLearnedStats: FC<IAllLearnedStats> = ({ dates, learnedCount }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  let progression = learnedCount;

  if (learnedCount.length) {
    const datesSum = progression.map((elem, index) =>
      progression.slice(0, index + 1).reduce((a, b) => a + b)
    );
    progression = datesSum;
  }

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Изучено слов',
        data: progression,
        backgroundColor: 'white',
        pointBorderWidth: 3,
        pointRadius: 5,
        borderColor: '#1d98f1',
        yAxisID: 'yAxis',
        xAxisID: 'xAxis',
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
            size: 14,
            family: '"Inter", sans-serif',
          },
        },
        beginAtZero: true,
        ticks: {
          color: 'black',
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
            size: 14,
            family: '"Inter", sans-serif',
          },
        },
        ticks: {
          color: 'black',
          font: {
            size: 14,
            family: '"Inter", sans-serif',
          },
        },
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default AllLearnedStats;

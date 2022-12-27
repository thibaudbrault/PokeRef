import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement,
  Filler,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { generations, types } from '@/utils/DataArrays';
import { MainDashboard } from '@/components/common/styles/Sizing';
import {
  DashGraph,
  DashList,
  DashTitle,
} from '@/components/pages/Dashboard/Styled.Dashboard';
import { useAbilities, useMoves } from '@/hooks/DataFetch';

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
);

function Dashboard() {
  const { data: moves } = useMoves();
  const { data: abilities } = useAbilities();

  const typesOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Number of Pokémon per type`,
        font: {
          size: 20,
        },
      },
    },
  };

  const genOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Number of Pokémon per generation`,
        font: {
          size: 20,
        },
      },
    },
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            min: 0,
            steps: 10,
            max: 200,
          },
        },
      ],
    },
  };

  const typesData: ChartData<'bar'> = {
    labels: Object.values(types),
    datasets: [
      {
        label: undefined,
        data: [
          85, 69, 61, 61, 60, 70, 76, 106, 60, 111, 70, 51, 119, 74, 98, 69, 66,
          146,
        ],
        backgroundColor: [
          `#9eb559`,
          `#555461`,
          `#1085a2`,
          `#dbb508`,
          `#ef9bb6`,
          `#d77a49`,
          `#db4249`,
          `#5983ef`,
          `#a2729a`,
          `#459f4d`,
          `#9a5e41`,
          `#6db5ba`,
          `#969592`,
          `#82549a`,
          `#e76e9a`,
          `#a28d79`,
          `#7d879a`,
          `#55b8e2`,
        ],
      },
    ],
  };

  const genData = {
    labels: Object.keys(generations)?.map((g) => generations[g].name),
    datasets: [
      {
        fill: true,
        data: [151, 100, 135, 107, 156, 72, 88, 96],
        backgroundColor: `rgba(22, 22, 22, 0.5)`,
      },
    ],
  };

  return (
    <MainDashboard>
      <DashTitle>Up to generation VIII</DashTitle>
      <DashList>
        <li>
          Pokémon
          <span>905</span>
        </li>
        <li>
          Moves
          <span>{moves?.length}</span>
        </li>
        <li>
          Abilities
          <span>{abilities?.length}</span>
        </li>
        <li>
          Types
          <span>18</span>
        </li>
      </DashList>
      <DashGraph>
        <Bar data={typesData} options={typesOptions} />
      </DashGraph>
      <DashGraph>
        <Line data={genData} options={genOptions} />
      </DashGraph>
    </MainDashboard>
  );
}

export default Dashboard;

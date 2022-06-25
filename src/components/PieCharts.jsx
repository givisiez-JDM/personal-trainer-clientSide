import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieCharts({ data }) {
  console.log("data from PieCharts", data)
  return (
    <>
    {data &&
      <Pie data={data} />
    }
    </>
  )
}
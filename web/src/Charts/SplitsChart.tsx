import React from 'react';

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DataPoint } from '../Activities/models';

type SplitsChartProps = {
  points: DataPoint[]
}

const SplitsChart = ({ points }: SplitsChartProps) => {
  const data = calculateSplits(points);

  function calculateSplits(points: DataPoint[]) {
    const data: object[] = [];

    if (!points.length || points.length === 0) { return data; }

    let currentSplit = 1; // 1st KM
    let startTime = points[0].time!;

    const filtered = points.filter(point => {
      return point.distance && point.time;
    });

    filtered.forEach((point, i) => {
      if (point.distance! < (currentSplit * 1000)) {
        return;
      }

      const seconds = (new Date(point.time!).getTime() - new Date(startTime).getTime()) / 1000;

      data.push({
        name: currentSplit,
        value: Number(1000 / seconds).toFixed(4)
      });
      currentSplit++;
      startTime = point.time!;
    });

    const lastPoint = points[points.length - 1];
    const seconds = (new Date(lastPoint.time!).getTime() - new Date(startTime).getTime()) / 1000;

    const dist = (lastPoint.distance! as number) - (1000 * (currentSplit - 1));

    // If the last split is less than 100m, ignore it
    if (dist < 100) {
      return data;
    }

    data.push({
      name: currentSplit,
      value: Number(seconds / dist).toFixed(2)
    });

    return data;
  }

  return (
    <ResponsiveContainer height={250} width='100%'>
      <BarChart data={data} >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#6fd450" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default SplitsChart;
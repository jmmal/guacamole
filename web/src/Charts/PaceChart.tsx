import React from 'react';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DataPoint } from '../Activities/models';

type PaceChartProps = {
  points: DataPoint[];
}

export const PaceChart = ({ points }: PaceChartProps) => {
  const data = points
    .filter(point => {
      return point.distance && point.speed;
    })
    .map(point => {
      return {
        distance: Number((point.distance as number) / 1000).toFixed(1),
        pace: Number(point.speed)
      };
    });

  return (
    <ResponsiveContainer height={250} width='100%'>
      <AreaChart
        data={data}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="distance" allowDecimals={false} tickCount={4} unit={'km'} minTickGap={20} />
        <YAxis allowDecimals={false} unit={'m/s'} />
        <Tooltip />
        <Area isAnimationActive={false} type="monotone" dataKey="pace" stroke="#5293fa" fill="#5293fa" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
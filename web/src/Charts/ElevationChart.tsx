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

type ElevationChartProps = {
  points: DataPoint[]
}

export const ElevationChart = ({ points }: ElevationChartProps) => {
  const data = points.filter(point => {
    return point.altitude && point.distance;
  }).map(point => {
    const elevation = point.altitude as number;
    const distance = point.distance as number;

    return {
      // TODO: Maybe be better to label with time
      distance: Number(distance / 1000).toFixed(1),
      elevation: Number(elevation).toFixed(1)
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
        <YAxis allowDecimals={false} unit={'m'} />
        <Tooltip />
        <Area isAnimationActive={false} type="monotone" dataKey="elevation" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
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
import { range } from '../Shared/utils';

type ElevationChartProps = {
  points: DataPoint[];
  distance: number;
}

const ElevationChart = ({ points, distance }: ElevationChartProps) => {
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

  const ticks = range(0, distance / 1000);

  const tooltipLabelFormat = (d: any) => {
    return `Distance: ${d}km`;
  }

  const valueFormatter = (d: any) => {
    return `${d}m`;
  }

  return (
    <ResponsiveContainer height={250} width='100%'>
      <AreaChart
        data={data}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="distance" ticks={ticks} unit={'km'} interval={1} />
        <YAxis allowDecimals={false} unit={'m'} />
        <Tooltip labelFormatter={tooltipLabelFormat} formatter={valueFormatter} />
        <Area isAnimationActive={false} type="monotone" dataKey="elevation" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default ElevationChart;
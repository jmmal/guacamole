import React from "react";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { DataPoint } from "../Shared/types";
import { formatPace } from "../Shared/formatters";

type PaceChartProps = {
  points: DataPoint[];
};

const MetersPerSecondToMinutesPerKMConversionFactor = 1000 / 60;

const PaceChart = ({ points }: PaceChartProps) => {
  let data = points
    .filter((point) => {
      return point.distance && point.speed;
    })
    .map((point) => {
      return {
        distance: Number((point.distance as number) / 1000).toFixed(1),
        pace:
          MetersPerSecondToMinutesPerKMConversionFactor / Number(point.speed),
      };
    });

  data = filterStanding(data);

  const valFormatter = (d: any) => {
    const val = d * 60;
    return `${formatPace(val)} min / km`;
  };

  return (
    <ResponsiveContainer height={250} width="100%">
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="distance"
          allowDecimals={false}
          tickCount={4}
          unit={"km"}
          minTickGap={20}
        />
        <YAxis allowDecimals={false} reversed />
        <Tooltip
          formatter={valFormatter}
          labelFormatter={(val) => `${val}km`}
        />
        <Line type="monotone" dataKey="pace" stroke="#8884d8" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

function filterStanding(data: any[]) {
  return data.filter((point) => point.pace <= 20);
}

export default PaceChart;

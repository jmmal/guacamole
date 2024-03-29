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
import { useCallback } from "react";

type PaceChartProps = {
  points: DataPoint[];
};

const MetersPerSecondToMinutesPerKMConversionFactor = 1000 / 60;

export const PaceChart = ({ points }: PaceChartProps) => {
  let data = points
    .filter((point) => {
      return point.distance && point.speed;
    })
    .map((point) => {
      return {
        distance: Number((point.distance as number) / 1000).toFixed(1),
        Pace:
          MetersPerSecondToMinutesPerKMConversionFactor / Number(point.speed),
      };
    });

  data = filterStanding(data);

  const valFormatter = useCallback((d: any) => {
    const val = d * 60;
    return `${formatPace(val)} min / km`;
  }, []);
  const labelFormatted = useCallback((d: any) => {
    return `${d}km`;
  }, []);

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
        <XAxis dataKey="distance" unit={"km"} />
        <YAxis allowDecimals={false} reversed />
        <Tooltip formatter={valFormatter} labelFormatter={labelFormatted} />
        <Line type="monotone" dataKey="Pace" stroke="#8884d8" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

function filterStanding(data: any[]) {
  return data.filter((point) => point.Pace <= 20);
}

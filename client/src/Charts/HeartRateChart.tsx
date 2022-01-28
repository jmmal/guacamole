import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { range } from "../Shared/utils";
import { DataPoint } from "../Shared/types";
import { useCallback } from "react";

export type Props = {
  streamData: DataPoint[];
  distance: number;
};

export const HeartRateChart = ({ streamData, distance }: Props) => {
  const data = streamData
    .filter((point) => {
      return point?.heartRate && point?.distance;
    })
    .map((point) => {
      return {
        distance: +Number(point.distance! / 1000).toFixed(2),
        heartRate: point.heartRate,
      };
    });

  const ticks = range(0, Number(distance / 1000));

  const tooltipLabelFormat = useCallback((d: any) => {
    return `Distance: ${d}km`;
  }, []);

  const valueFormatter = useCallback((d: any) => {
    return `${d}bpm`;
  }, []);

  return (
    <>
      {data && (
        <ResponsiveContainer height={250} width="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="distance" unit={"km"} ticks={ticks} />
            <YAxis allowDecimals={true} />
            <Tooltip
              labelFormatter={tooltipLabelFormat}
              formatter={valueFormatter}
            />
            <Area
              isAnimationActive={false}
              type="monotone"
              dataKey="heartRate"
              stroke="#F87666"
              fill="#F87666"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

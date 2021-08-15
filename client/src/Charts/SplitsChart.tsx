import { useCallback } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatPace } from "../Shared/formatters";
import { DataPoint } from "../Shared/types";

type SplitsChartProps = {
  points: DataPoint[];
};

const MetersPerSecondToMinutesPerKMConversionFactor = 1000 / 60;

const SplitsChart = ({ points }: SplitsChartProps) => {
  const data = calculateSplits(points);

  function calculateSplits(points: DataPoint[]) {
    const data: object[] = [];

    if (!points.length || points.length === 0) {
      return data;
    }

    let currentSplit = 1; // 1st KM
    let startTime = points[0].time!;

    const filtered = points.filter((point) => {
      return point.distance && point.time;
    });

    filtered.forEach((point, i) => {
      if (point.distance! < currentSplit * 1000) {
        return;
      }

      const seconds =
        (new Date(point.time!).getTime() - new Date(startTime).getTime()) /
        1000;

      data.push({
        name: currentSplit,
        value:
          MetersPerSecondToMinutesPerKMConversionFactor /
          Number(1000 / seconds),
      });
      currentSplit++;
      startTime = point.time!;
    });

    const lastPoint = points[points.length - 1];
    const seconds =
      (new Date(lastPoint.time!).getTime() - new Date(startTime).getTime()) /
      1000;

    const dist = (lastPoint.distance! as number) - 1000 * (currentSplit - 1);

    // If the last split is less than 100m, ignore it
    if (dist < 100) {
      return data;
    }

    data.push({
      name: currentSplit,
      value:
        MetersPerSecondToMinutesPerKMConversionFactor / Number(dist / seconds),
    });

    return data;
  }

  const valFormatter = useCallback((d: any) => {
    const val = d * 60;
    return `${formatPace(val)} min / km`;
  }, []);

  return (
    <ResponsiveContainer height={500} width="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" unit="km" />
        <YAxis />
        <Tooltip labelFormatter={(d) => `${d}km`} formatter={valFormatter} />
        <Bar dataKey="value" fill="#6fd450" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SplitsChart;

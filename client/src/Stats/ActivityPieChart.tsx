import { useMemo } from "react";
import { createUseStyles } from "react-jss";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ActivityTypeAggregation } from "../Shared/types";

type Props = {
  filters: ActivityTypeAggregation[];
};

const colors = [
  "#25CED1",
  "#FF8A5B",
  "#EA526F",
  "#E9C46A",
  "#264653",
  "#D9F4C7",
  "#F8FA90",
  "#FCEADE",
  "#F4EF88",
  "#AC9969",
  "#9DCDC0",
];

const useStyles = createUseStyles({
  header: {
    fontWeight: "600",
    margin: "0 0 12px 0",
  },
});

export function ActivityPieChart({ filters }: Props) {
  const styles = useStyles();

  const data = useMemo(() => {
    return filters.map((filter) => {
      return {
        name: filter.type,
        value: filter.total,
      };
    });
  }, [filters]);
  return (
    <>
      <p className={styles.header}>Type Breakdown</p>
      <ResponsiveContainer height={250} width="100%">
        <PieChart
          margin={{
            left: 50,
            right: 50,
            top: 0,
            bottom: 0,
          }}
        >
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

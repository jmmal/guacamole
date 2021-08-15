import { createUseStyles } from "react-jss";

import { StatsSummary } from "./Summary";
import { useStats } from "./useStats";
import { ActivityPieChart } from "./ActivityPieChart";
import { ActivityTypeAggregation } from "../Shared/types";

const useStyles = createUseStyles({
  container: {
    minWidth: 250,
    position: "sticky",
    top: "16px",
    display: "flex",
    flexDirection: "column",
    margin: "0 12px",
  },
});

type Props = {
  filters: ActivityTypeAggregation[];
};

export const Stats = ({ filters }: Props) => {
  const stats = useStats();
  const css = useStyles();

  if (!stats) {
    return null;
  }

  const { allTime, runs, year } = stats;

  return (
    <div className={css.container}>
      <StatsSummary summary={allTime} title="All Time" />
      <StatsSummary summary={runs} title="Runs" />
      <StatsSummary summary={year} title="2021" />
      <ActivityPieChart filters={filters} />
    </div>
  );
};

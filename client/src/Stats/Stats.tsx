import { Box } from "@primer/react";

import { StatsSummary } from "./Summary";
import { useStats } from "./useStats";
import { ActivityPieChart } from "./ActivityPieChart";
import { ActivityTypeAggregation } from "../Shared/types";

type Props = {
  filters: ActivityTypeAggregation[];
};

export const Stats = ({ filters }: Props) => {
  const stats = useStats();

  if (!stats) {
    return null;
  }

  const { allTime, runs, year } = stats;

  return (
    <Box
      sx={{
        minWidth: 250,
        position: "sticky",
        top: "16px",
        display: "flex",
        flexDirection: "column",
        margin: "0 12px",
      }}
    >
      <StatsSummary summary={allTime} title="All Time" />
      <StatsSummary summary={runs} title="Runs" />
      <StatsSummary summary={year} title="2021" />
      <ActivityPieChart filters={filters} />
    </Box>
  );
};

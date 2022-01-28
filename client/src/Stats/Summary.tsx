import { createUseStyles } from "react-jss";
import { Box, Text } from "@primer/react";

import { Summary } from "../Shared/types";
import { formatDuration } from "../Shared/formatters";

const useStyles = createUseStyles({
  title: {
    margin: 0,
  },
  value: {
    margin: 0,
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
  statsGroup: {
    marginBottom: 16,
  },
});

export type StatsSummaryProps = {
  summary: Summary;
  title: string;
};

export const StatsSummary = ({ summary, title }: StatsSummaryProps) => {
  const css = useStyles();

  return (
    <Box marginBottom={2}>
      <Text fontSize={2} as="p" fontWeight="bold">
        {title}
      </Text>
      <Box display="flex" justifyContent="space-between" marginBottom={1}>
        <Text className={css.title}>Total</Text>
        <Text className={css.value}>{summary.count}</Text>
      </Box>
      <Box display="flex" justifyContent="space-between" marginBottom={1}>
        <Box className={css.title}>Distance</Box>
        <Box className={css.value}>{summary.distance}km</Box>
      </Box>
      <Box display="flex" justifyContent="space-between" marginBottom={1}>
        <Box className={css.title}>Time</Box>
        <Box className={css.value}>{formatDuration(summary.duration)}</Box>
      </Box>
    </Box>
  );
};

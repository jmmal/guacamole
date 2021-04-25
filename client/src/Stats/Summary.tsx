import { createUseStyles } from "react-jss";

import { Summary } from "../Shared/types";
import { formatDuration } from "../Shared/formatters";

const useStyles = createUseStyles({
  header: {
    fontWeight: "600",
    margin: "0 0 12px 0",
  },
  title: {
    margin: 0,
    color: "#626262",
  },
  value: {
    margin: 0,
    color: "black",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
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
    <div className={css.statsGroup}>
      <p className={css.header}>{title}</p>
      <div className={css.row}>
        <p className={css.title}>Total</p>
        <p className={css.value}>{summary.count}</p>
      </div>
      <div className={css.row}>
        <p className={css.title}>Distance</p>
        <p className={css.value}>{summary.distance}km</p>
      </div>
      <div className={css.row}>
        <p className={css.title}>Time</p>
        <p className={css.value}>{formatDuration(summary.duration)}</p>
      </div>
    </div>
  );
};

import React from "react";
import { useHistory } from "react-router-dom";

import { format } from "date-fns";

import { Activity } from "./models";
import { formatDuration, formatPace } from "../Shared";
import { createUseStyles } from "react-jss";
import { Box, Heading, Text } from "grommet";

type ActivityPreviewProps = {
  activity: Activity;
  index: number;
  totalCount?: number;
};

const useStyles = createUseStyles({
  image: {
    width: "100%",
  },
  preview: {
    borderRadius: 3,
    border: "1px solid #e2e2e2",
    boxShadow: "0px 8px 24px rgba(13,13,18,0.04)",
    padding: "1rem 1rem 1rem 1rem",
    marginBottom: "1rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "0.5rem",
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "1rem",
  },
});

export const ActivityPreview = ({ activity, index }: ActivityPreviewProps) => {
  const history = useHistory();
  const css = useStyles();

  function openActivity() {
    history.push(`/activities/${activity._id}`);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ENTER") {
      openActivity();
    }
  }

  const { avg, min, max } = activity.heartRate;

  return (
    <article
      className={css.preview}
      aria-posinset={index}
      tabIndex={0}
      onClick={openActivity}
      onKeyDown={handleKeyDown}
    >
      <div className={css.header}>
        <Heading margin="none" level="4">
          {format(new Date(activity.startTime), "EEEE, LLLL d, yyyy")}
        </Heading>
        <Text>{activity.title}</Text>
      </div>

      {activity.imageURL && (
        <img
          src={activity.imageURL}
          alt="Activity GPS preview"
          className={css.image}
        />
      )}

      <div className={css.stats}>
        <FooterColumn
          title="Distance"
          value={`${Number(activity.distance / 1000).toFixed(2)} km`}
        />
        <FooterColumn
          title="Pace"
          value={`${formatPace(activity.pace.avg ?? 0)} min / km`}
        />
        <FooterColumn
          title="Elevation"
          value={`${Number(
            (activity.elevation.max ?? 0) - (activity.elevation.min ?? 0)
          ).toFixed(1)} m`}
        />
        <FooterColumn
          title="Elapsed Time"
          value={formatDuration(activity.elapsedTime)}
        />
        {activity.heartRate.avg && (
          <FooterColumn title="Heart Rate" value={`${min}/${avg}/${max}`} />
        )}
      </div>
    </article>
  );
};

type FooterColumnProps = {
  title: string;
  value: string;
};

const FooterColumn = ({ title, value }: FooterColumnProps) => {
  return (
    <Box direction="column">
      <Text className="title">{title}</Text>
      <Text className="value mb-0">{value}</Text>
    </Box>
  );
};

import React from "react";
import { useHistory } from "react-router-dom";

import { format } from "date-fns";

import { Activity } from "./models";
import { formatDuration, formatPace } from "../Shared";
import { createUseStyles } from "react-jss";
import { Heading, Text } from "grommet";
import {
  formatElevation,
  formatDistance,
  formatTitle,
} from "../Shared/formatters";

type ActivityPreviewProps = {
  activity: Activity;
  index: number;
  totalCount?: number;
};

const usePreviewStyles = createUseStyles({
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
    flexWrap: "wrap",
    margin: "0 -1rem",
  },
});

export const ActivityPreview = ({ activity, index }: ActivityPreviewProps) => {
  const history = useHistory();
  const css = usePreviewStyles();

  function openActivity() {
    history.push(`/activities/${activity._id}`);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ENTER") {
      openActivity();
    }
  }

  const { avg, max } = activity.heartRate;

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
        <Text>{formatTitle(activity.startTime, activity.type)}</Text>
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
          value={formatDistance(activity.distance)}
        />
        <FooterColumn
          title="Pace"
          value={`${formatPace(activity.pace.avg ?? 0)}/km`}
        />
        <FooterColumn
          title="Elevation"
          value={formatElevation(activity.elevation)}
        />
        <FooterColumn
          title="Elapsed Time"
          value={formatDuration(activity.elapsedTime)}
        />
        <FooterColumn title="Calories" value={activity.calories} />
        {activity.heartRate.avg && (
          <>
            <FooterColumn title="Avg Heart Rate" value={`${avg}bpm`} />
            <FooterColumn title="Max Heart Rate" value={`${max}bpm`} />
          </>
        )}
      </div>
    </article>
  );
};

type FooterColumnProps = {
  title: string;
  value: string | number;
};

const useFooterStyles = createUseStyles({
  title: {
    fontSize: 11,
    color: "#626262",
    marginBottom: 0,
    marginTop: 8,
    whiteSpace: "nowrap",
  },
  stat: {
    margin: 0,
    whiteSpace: "nowrap",
  },
  column: {
    flexGrow: 1,
    flexBasis: 0,
    display: "flex",
    flexDirection: "column",
    margin: "0 1rem",
  },
});

const FooterColumn = ({ title, value }: FooterColumnProps) => {
  const css = useFooterStyles();

  return (
    <div className={css.column}>
      <p className={css.title}>{title}</p>
      <p className={css.stat}>{value}</p>
    </div>
  );
};

import React from "react";
import { useNavigate } from "react-router-dom";

import { format } from "date-fns";

import { Activity } from "../Shared/types";
import { formatDuration, formatPace } from "../Shared/formatters";
import { createUseStyles } from "react-jss";
import { Box, Heading, Text } from "@primer/react";
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
});

export const ActivityPreview = ({ activity, index }: ActivityPreviewProps) => {
  const navigate = useNavigate();
  const css = usePreviewStyles();

  function openActivity() {
    navigate(`/activities/${activity._id}`);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ENTER") {
      openActivity();
    }
  }

  const { avg, max } = activity.heartRate;

  return (
    <Box
      as="article"
      borderColor="border.default"
      borderRadius={1}
      borderWidth={1}
      marginBottom={16}
      borderStyle="solid"
      padding={16}
      aria-posinset={index}
      tabIndex={0}
      onClick={openActivity}
      onKeyDown={handleKeyDown}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        marginBottom={1}
      >
        <Heading
          as="h3"
          sx={{
            fontSize: 3,
          }}
        >
          {format(new Date(activity.startTime), "EEEE, LLLL d, yyyy")}
        </Heading>
        <Text>{formatTitle(activity.startTime, activity.type)}</Text>
      </Box>

      {activity.imageURL && (
        <img
          src={activity.imageURL}
          alt="Activity GPS preview"
          className={css.image}
        />
      )}
      <Box display="flex" flexWrap="wrap" margin="0 -1rem">
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
      </Box>
    </Box>
  );
};

type FooterColumnProps = {
  title: string;
  value: string | number;
};

const FooterColumn = ({ title, value }: FooterColumnProps) => {
  return (
    <Box display="flex" flex="1 1 auto" flexDirection="column" margin="0 1rem">
      <Text as="p" color="fg.subtle" fontSize={0} marginBottom={0}>
        {title}
      </Text>
      <Text as="p" margin={0} whiteSpace="nowrap">
        {value}
      </Text>
    </Box>
  );
};

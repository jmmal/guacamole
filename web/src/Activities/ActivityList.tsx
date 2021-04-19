import React from "react";

import { ActivityPreview } from "./ActivityPreview";
import { Loading } from "../Shared";
import { useInfiniteActivities } from './hooks/useInfiniteActivities';
import { createUseStyles } from "react-jss";

type ActivityListProps = {
  filter: string;
}

const useStyles = createUseStyles({
  container: {
    paddingBottom: '2rem'
  }
})

export const ActivityList = ({ filter }: ActivityListProps) => {
  const {
    ref,
    activities,
    loading,
    hasNextPage,
    totalCount
  } = useInfiniteActivities(filter);
  const css = useStyles();

  return (
    <div
      role="feed"
      aria-label="Feed of activities sorted by most recent"
      aria-busy={loading}
      className={css.container}
    >
      {activities.map((activity, index) => (
        <ActivityPreview
          key={activity._id}
          activity={activity}
          index={index}
          totalCount={totalCount}
        />
      ))}
      {loading && <Loading />}
      {hasNextPage && <span ref={ref} /> }
    </div>
  );
};

import React, { useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";
import { ActivityPreview } from "./ActivityPreview";
import { Loading } from "../Shared";
import { Activity, GetAllResponse } from "./models";

const usePagination = () => {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage((prev) => {
      return prev + 1;
    });
  };

  return {
    page,
    nextPage,
  };
};

const useActivities = (filter: string) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [totalCount, setTotal] = useState<number>();
  const { page, nextPage } = usePagination();

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("pageSize", "5");

    setIsLoading(true);
    fetch("/activities?" + params.toString())
      .then<GetAllResponse>((resp) => resp.json())
      .then((json) => {
        const newData = json.data;

        setTotal(json.total);
        setActivities((prev) => {
          return prev.concat(newData);
        });
        setIsLoading(false);
      });
  }, [page]);

  useEffect(() => {
    if (totalCount && activities.length >= totalCount) {
      setFinished(true);
    }
  }, [totalCount, activities]);

  return {
    activities,
    isLoading,
    finished,
    nextPage,
    totalCount
  };
};

type ActivityListProps = {
  filter: string;
}

export const ActivityList = ({ filter }: ActivityListProps) => {
  const { activities, isLoading, finished, nextPage, totalCount } = useActivities(filter);

  const { ref, inView, entry } = useInView({
    threshold: 0,
    initialInView: false,
  });

  useEffect(() => {
    if (inView && !isLoading && !finished) {
      nextPage();
    }
  }, [inView]);

  return (
    <div
      role="feed"
      aria-label="Feed of activities sorted by most recent"
      aria-busy={isLoading}
    >
      {activities.map((activity, index) => (
        <ActivityPreview
          key={activity._id}
          activity={activity}
          index={index}
          totalCount={totalCount}
        />
      ))}
      <span ref={ref} />
      {isLoading && <Loading />}
    </div>
  );
};

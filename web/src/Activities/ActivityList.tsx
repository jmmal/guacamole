import React, { useEffect, useState } from 'react';

import { useInView } from 'react-intersection-observer';
import { ActivityPreview } from './ActivityPreview';
import { Filters } from './Filters';
import { Loading } from '../Shared';
import { Activity, GetAllResponse } from './models';

const usePagination = () => {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage(prev => {
      return prev + 1;
    })
  };

  return {
    page,
    nextPage
  };
};

const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [totalCount, setTotal] = useState<number>();
  const { page, nextPage } = usePagination();

  useEffect(() => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('pageSize', '5');

    setIsLoading(true);
    fetch('/activities?' + params.toString())
      .then<GetAllResponse>(resp => resp.json())
      .then(json => {
        const newData = json.data;

        setTotal(json.total);
        setActivities((prev) => {
          return prev.concat(newData);
        });
        setIsLoading(false)
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
    nextPage
  };
}

export const ActivityList = () => {
  const {
    activities,
    isLoading,
    finished,
    nextPage
  } = useActivities();

  const { ref, inView, entry } = useInView({
    threshold: 0,
    initialInView: false
  });

  useEffect(() => {
    if (inView && !isLoading && !finished) {
      nextPage();
    }
  }, [inView]);
  
  return (
    <div className="activity__list-wrapper">
      <div className="activity__list">
        <Filters onFilterChange={() => {}} />
        { activities.map(activity => (
          <ActivityPreview 
            key={activity._id}
            activity={activity}
          />
        ))}
        <span ref={ref} />
        { isLoading && (
          <Loading />
        )}
      </div>
    </div>
  )
}
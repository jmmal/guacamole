import { useEffect, useState } from 'react';

import { useInView } from 'react-intersection-observer';

import { Activity, GetAllResponse } from '../models';

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const useActivities = (filter: string) => {
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [totalCount, setTotalCount] = useState<number>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (activities.length === totalCount) {
      setHasNextPage(false);
    }
  }, [activities, totalCount]);

  // Reset the state if the filter changes
  useEffect(() => {
    setActivities([]);
    setPage(1);
    setHasNextPage(true);
    setTotalCount(undefined);
  }, [filter]);

  const onLoadMore = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('pageSize', '5');

    if (filter !== '' && filter !== 'All') {
      params.append('type', filter);
    }
    setPage(page + 1);

    const response: Response = await fetch(
      baseUrl + '/activities?' + params.toString()
    );
    const result: GetAllResponse = await response.json();

    setTotalCount(result.total);
    setActivities((current) => [...current, ...result.data]);
    setLoading(false);
  };

  return {
    loading,
    activities,
    hasNextPage,
    onLoadMore,
    totalCount,
  };
};

export const useInfiniteActivities = (filter: string) => {
  const {
    loading,
    activities,
    hasNextPage,
    onLoadMore,
    totalCount,
  } = useActivities(filter);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!loading && inView && hasNextPage) {
      // Using a setTimeout to prevent an extra call that happens during the render phase
      const timer = setTimeout(() => {
        onLoadMore();
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [onLoadMore, loading, inView, hasNextPage]);

  return {
    ref,
    activities,
    loading,
    hasNextPage,
    totalCount,
  };
};

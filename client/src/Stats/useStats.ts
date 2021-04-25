import { useEffect, useState } from 'react';
import { calculateStats } from '../Shared/utils';
import { StatsSummary } from '../Shared/types';

const baseUrl = process.env.REACT_APP_BASE_API_URL;

export const useStats = () => {
  const [stats, setStats] = useState<StatsSummary>();

  useEffect(() => {
    fetch(baseUrl + '/activities/stats')
      .then((resp) => resp.json())
      .then((json) => {
        const stats = calculateStats(json);
        setStats(stats);
      });
  }, []);

  return stats;
};

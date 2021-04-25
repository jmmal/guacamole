import { useEffect, useState } from 'react';
import { calculateStats } from '../Shared/utils';
import { StatsSummary } from '../Shared/types';

export const useStats = () => {
  const [stats, setStats] = useState<StatsSummary>();

  useEffect(() => {
    fetch('/activities/stats')
      .then((resp) => resp.json())
      .then((json) => {
        const stats = calculateStats(json);
        setStats(stats);
      });
  }, []);

  return stats;
};

import React, { useEffect, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { observer } from 'mobx-react-lite';

import { ActivityPreview } from './ActivityPreview';
import { Filters } from './Filters';
import { Loading } from '../Shared';
import { useStores } from '../Stores/useStores';
import { ActivityV2 } from './models';

const useActivities = () => {
  const [activities, setActivities] = useState<ActivityV2[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('/activities')
      .then(resp => resp.json())
      .then(json => {
        setActivities(json)
        setIsLoading(false)
      });
  }, []);

  return {
    activities,
    isLoading
  };
}

export const ActivityList = observer(() => {
  const  {
    activities,
    isLoading
  } = useActivities();
  
  return (
    <div className="activity__list-wrapper">
      <div className="activity__list">
        <Filters />
        { activities.map(activity => (
          <ActivityPreview 
            key={activity._id}
            activity={activity}
          />
        ))}
        { isLoading && (
          <Loading />
        )}
      </div>
    </div>
  )
})
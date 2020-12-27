import React, { useEffect } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { observer } from 'mobx-react-lite';

import { ActivityPreview } from './ActivityPreview';
import { Filters } from './Filters';
import { Loading } from '../Shared';
import { useStores } from '../Stores/useStores';

export const ActivityList = observer(() => {
  const { activityStore } = useStores();

  useEffect(() => {
    const fetch = async () => await activityStore.nextPage();
    fetch();
  }, [ activityStore ])

  return (
    <div className="activity__list-wrapper">
      <div className="activity__list">
        <Filters />
        <InfiniteScroll
          dataLength={activityStore.activities.length}
          next={activityStore.nextPage}
          hasMore={activityStore.activities.length < activityStore.totalActivities}
          loader={<></>}
        >
          { activityStore.activities.map(activity => (
            <ActivityPreview 
              key={activity.id}
              activity={activity}
            />
          ))}
        </InfiniteScroll>
        { activityStore.loading && (
          <Loading />
        )}
      </div>
    </div>
  )
})
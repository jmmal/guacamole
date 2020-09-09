import React, { useEffect, useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { ReactComponent as CloudIcon } from 'bootstrap-icons/icons/cloud-upload.svg';
import InfiniteScroll from 'react-infinite-scroll-component';

import { ActivityPreview } from './ActivityPreview';
import { ActivityService } from './ActivityService';

import { Activity, ActivityTypeAggregation } from './models';
import { Loading } from '../Shared';

export const ActivityList = () => {
  const history = useHistory()
  const [activities, setActivities] = useState<Array<Activity>>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Array<ActivityTypeAggregation>>([]);

  useEffect(() => {
    getActivities(page, null).then(resp => {
      updateActivities(resp.data.results, resp.data.totalCount)
    })

    ActivityService.getFilters().then(resp => {
      setFilters(resp.data);
    })
  }, []);

  function updateActivities(activities: Activity[], count: number) {
    setTotalCount(count);
    setActivities(activities);
  }

  function getActivities(pageNumber: number = 1, filter: string | null) {
    return ActivityService.getAllActivities(pageNumber, 3, filter);
  }

  function handleFilterChange(event: ChangeEvent<HTMLSelectElement>) {
    const filter = event.target.value;
  }

  function loadNext() {
    getActivities(page + 1, null).then(resp => {
      updateActivities([
        ...activities,
        ...resp.data.results
      ], resp.data.totalCount);
      setPage(page + 1);
    })
  }

  function onUploadClick() {
    history.push('/activities/upload')
  }

  return (
    <div className="activity__list-wrapper">
      <div className="activity__list">
        <div className="options">
          <button
            type="button"
            className="btn btn-outline-secondary upload-btn"
            onClick={onUploadClick}
          >Upload <CloudIcon />
          </button>
          {/* <select
            className="form-select type-filters"
            aria-label="Default select example"
            onChange={handleFilterChange}
          >
            <option value='All'>Filter by: All</option>
            { filters && filters.map(filter => (
              <option key={filter.Name} value={filter.Name}>{ filter.Name } ({filter.Total})</option>
            ))}
          </select> */}
        </div>
        <InfiniteScroll
          dataLength={activities.length}
          next={loadNext}
          hasMore={activities.length < totalCount}
          loader={<Loading />}
        >
          { activities.map(activity => (
            <ActivityPreview 
              key={activity.id}
              activity={activity}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  )
}
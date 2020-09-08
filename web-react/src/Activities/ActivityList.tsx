import React, { useEffect, useState, ChangeEvent } from 'react';

import { ReactComponent as CloudIcon } from 'bootstrap-icons/icons/cloud-upload.svg';

import { ActivityPreview } from './ActivityPreview';
import { ActivityService } from './ActivityService';

import { useHistory } from 'react-router-dom';
import { Activity, ActivityTypeAggregation } from './models';
import { Loading } from '../Shared';

export const ActivityList = () => {
  const history = useHistory()
  const [activities, setActivities] = useState<Array<Activity>>([]);
  const [filters, setFilters] = useState<Array<ActivityTypeAggregation>>([]);

  useEffect(() => {
    getActivities(null)

    ActivityService.getFilters().then(resp => {
      setFilters(resp.data);
    })
  }, [])

  function getActivities(filter: string | null) {
    ActivityService
      .getAllActivities(1, 20, filter)
      .then(resp => {
        setActivities(resp.data.results)
      });
  }

  function handleFilterChange(event: ChangeEvent<HTMLSelectElement>) {
    const filter = event.target.value;

    getActivities(filter)
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
          <select
            className="form-select type-filters"
            aria-label="Default select example"
            onChange={handleFilterChange}
          >
            <option value='All'>Filter by: All</option>
            { filters && filters.map(filter => (
              <option key={filter.Name} value={filter.Name}>{ filter.Name } ({filter.Total})</option>
            ))}
          </select>
        </div>
        { activities && activities.length > 0 ? activities.map(activity => (
          <ActivityPreview 
            key={activity.id}
            activity={activity}
          />
        )) : <Loading />
        }
      </div>
    </div>
  )
}
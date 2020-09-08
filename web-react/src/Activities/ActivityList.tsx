import React, { SyntheticEvent } from 'react';

import { ReactComponent as CloudIcon } from 'bootstrap-icons/icons/cloud-upload.svg';

import { ActivityPreview } from './ActivityPreview';
import { FakeActivity } from '../Mapbox/activity';
import { useHistory } from 'react-router-dom';

export const ActivityList = () => {
  const history = useHistory()
  const activity = FakeActivity;
  const filter = {
    Name: 'All',
    Total: 123
  };

  function onChange($event: SyntheticEvent) {
    console.log($event)
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
          <select className="form-select type-filters" aria-label="Default select example" onChange={onChange}>
            <option selected value=''>Filter by: All</option>
            <option value={'a'}>{ filter.Name } ({ filter.Total })</option>
          </select>
        </div>
        <ActivityPreview 
          activity={activity}
        />
      </div>
    </div>
  )
}
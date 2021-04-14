import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ReactComponent as CloudIcon } from 'bootstrap-icons/icons/cloud-upload.svg';
import { ActivityTypeAggregation } from './models';

const useFilters = () => {
  const [filters, setFilters] = useState<ActivityTypeAggregation[]>([]);
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
    fetch('/filters')
      .then(resp => resp.json())
      .then(json => setFilters(json));
  }, []);

  return {
    filter,
    changeFilter: setFilter,
    filters
  }
}

export const Filters = () => {
  const history = useHistory();
  const { 
    filter,
    changeFilter,
    filters
  } = useFilters();

  const onUploadClick = () => {
    history.push('/activities/upload')
  }

  const handleFilterChange = ($event: FormEvent<HTMLSelectElement>) => {
    changeFilter($event.currentTarget.value);
  }

  return (
    <div className="options">
      <button
        type="button"
        className="btn btn-outline-secondary upload-btn"
        onClick={onUploadClick}
      >Upload <CloudIcon />
      </button>
      <select
        className="form-select type-filters"
        aria-label="Filter by activity type"
        onChange={handleFilterChange}
      >
        <option value='All'>Filter by: All</option>
        { filters && filters.map(filter => (
          <option key={filter.type} value={filter.type}>{ filter.type } ({filter.total})</option>
        ))}
      </select>
    </div>
  )
};
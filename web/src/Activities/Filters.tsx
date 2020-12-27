import React, { FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { ReactComponent as CloudIcon } from 'bootstrap-icons/icons/cloud-upload.svg';

import { useStores } from '../Stores/useStores';

export const Filters = observer(() => {
  const history = useHistory()

  const { activityStore } = useStores();

  useEffect(() => {
    const fetch = async () => activityStore.loadFilters();
    fetch();
  }, [activityStore])

  const onUploadClick = () => {
    history.push('/activities/upload')
  }

  const handleFilterChange = ($event: FormEvent<HTMLSelectElement>) => {
    activityStore.setFilter($event.currentTarget.value);
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
        { activityStore.filters && activityStore.filters.map(filter => (
          <option key={filter.Name} value={filter.Name}>{ filter.Name } ({filter.Total})</option>
        ))}
      </select>
    </div>
  )
});
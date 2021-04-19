import { Select } from 'grommet';
import React, { useEffect, useState } from 'react';

import { ActivityTypeAggregation } from './models';

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const useFilters = () => {
  const [filters, setFilters] = useState<ActivityTypeAggregation[]>([]);
  
  useEffect(() => {
    fetch(baseUrl + '/filters')
      .then(resp => resp.json())
      .then(json => setFilters(json));
  }, []);

  return {
    filters
  };
};

type FiltersProps = {
  onFilterChange: (filter: string) => void;
}

type SelectOption = {
  label: string;
  value: string;
}

export const Filters = ({ onFilterChange }: FiltersProps) => {
  const { 
    filters
  } = useFilters();
  const [filter, setFilter] = useState<SelectOption>();
  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (filters.length === 0) {
      return;
    };

    const totalCount = filters.reduce((prev, curr) => prev + curr.total, 0);
    const all: SelectOption = {
      label: `All (${totalCount})`,
      value: 'All'
    };

    const options: SelectOption[] = [
      all,
      ...filters.map(filter => {
        return {
          label: filter.type + ` (${filter.total})`,
          value: filter.type
        }
      })
    ];

    setFilter(all);
    setOptions(options);
  }, [filters]);

  const handleSelect = (e: any) => {
    console.log(e.option);
    setFilter(e.option);
    onFilterChange(e.option.value);
  };

  return (
    <Select
      a11yTitle="Filter by activity type"
      options={options}
      labelKey='label'
      placeholder='-'
      value={filter}
      size="small"
      onChange={handleSelect}
    />
  );
};
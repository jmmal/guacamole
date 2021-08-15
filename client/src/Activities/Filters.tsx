import { Select } from "grommet";
import { useEffect, useState } from "react";
import { ActivityTypeAggregation } from "../Shared/types";

type FiltersProps = {
  onFilterChange: (filter: string) => void;
  filters: ActivityTypeAggregation[];
};

type SelectOption = {
  label: string;
  value: string;
};

export const Filters = ({ onFilterChange, filters }: FiltersProps) => {
  const [filter, setFilter] = useState<SelectOption>();
  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (filters.length === 0) {
      return;
    }

    const totalCount = filters.reduce((prev, curr) => prev + curr.total, 0);
    const all: SelectOption = {
      label: `All (${totalCount})`,
      value: "All",
    };

    const options: SelectOption[] = [
      all,
      ...filters.map((filter) => {
        return {
          label: filter.type + ` (${filter.total})`,
          value: filter.type,
        };
      }),
    ];

    setFilter(all);
    setOptions(options);
  }, [filters]);

  const handleSelect = (e: any) => {
    setFilter(e.option);
    onFilterChange(e.option.value);
  };

  return (
    <Select
      a11yTitle="Filter by activity type"
      options={options}
      labelKey="label"
      placeholder="-"
      value={filter}
      size="small"
      onChange={handleSelect}
    />
  );
};

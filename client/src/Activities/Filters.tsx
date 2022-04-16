import { Select } from "@primer/react";
import { ChangeEventHandler, useEffect, useState } from "react";
import { ActivityTypeAggregation } from "../Shared/types";

type FiltersProps = {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  filters: ActivityTypeAggregation[];
};

type SelectOption = {
  label: string;
  value: string;
};

export const Filters = ({ onChange, filters }: FiltersProps) => {
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

    setOptions(options);
  }, [filters]);

  return (
    <>
      <Select id="filters" onChange={onChange}>
        {options.map(({ value, label }) => (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};

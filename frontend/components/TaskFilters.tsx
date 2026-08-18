"use client";

import { Button } from "@/components/ui/button";

type StatusFilter = "all" | "completed" | "incomplete";

interface TaskFiltersProps {
  value: StatusFilter;
  onChange: (value: StatusFilter) => void;
}

const FILTERS: { label: string; value: StatusFilter }[] = [
  { label: "All", value: "all" },
  { label: "Incomplete", value: "incomplete" },
  { label: "Completed", value: "completed" },
];

export function TaskFilters({ value, onChange }: TaskFiltersProps) {
  return (
    <div className="flex gap-2">
      {FILTERS.map((filter) => (
        <Button
          key={filter.value}
          size="sm"
          variant={value === filter.value ? "default" : "secondary"}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}

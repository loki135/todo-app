import React from 'react';
import { Check, List, Clock } from 'lucide-react';
import { FilterStatus } from '../types';

interface TodoFiltersProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

const TodoFilters: React.FC<TodoFiltersProps> = ({ 
  currentFilter, 
  onFilterChange,
  counts
}) => {
  const filters: { value: FilterStatus; label: string; icon: React.ReactNode }[] = [
    { 
      value: 'all', 
      label: 'All', 
      icon: <List className="h-4 w-4" /> 
    },
    { 
      value: 'active', 
      label: 'Active', 
      icon: <Clock className="h-4 w-4" /> 
    },
    { 
      value: 'completed', 
      label: 'Completed', 
      icon: <Check className="h-4 w-4" /> 
    }
  ];

  return (
    <div className="bg-white p-2 rounded-lg shadow-sm mb-6 flex overflow-x-auto">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`flex items-center px-4 py-2 rounded-md flex-1 justify-center text-sm font-medium transition-colors duration-200 ${
            currentFilter === filter.value
              ? 'bg-indigo-100 text-indigo-800'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-current={currentFilter === filter.value ? 'page' : undefined}
          aria-label={`Filter by ${filter.label} tasks`}
        >
          {filter.icon}
          <span className="ml-1.5">{filter.label}</span>
          <span className="ml-1.5 bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded-full text-xs">
            {counts[filter.value]}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TodoFilters;
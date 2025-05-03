import React from 'react';
import { ClipboardList } from 'lucide-react';
import { FilterStatus } from '../types';

interface EmptyStateProps {
  filterStatus: FilterStatus;
}

const EmptyState: React.FC<EmptyStateProps> = ({ filterStatus }) => {
  const getMessage = () => {
    switch (filterStatus) {
      case 'active':
        return 'No active tasks found';
      case 'completed':
        return 'No completed tasks yet';
      default:
        return 'No tasks yet. Add your first task!';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-indigo-100 p-6 rounded-full mb-6">
        <ClipboardList className="h-12 w-12 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {getMessage()}
      </h3>
      {filterStatus === 'all' && (
        <p className="text-gray-500 max-w-md">
          Start by adding a new task using the form above. Once added, you can mark tasks as complete, 
          edit details, or remove them from your list.
        </p>
      )}
    </div>
  );
};

export default EmptyState;
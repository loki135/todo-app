import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Priority } from '../types';

interface AddTodoFormProps {
  onAdd: (title: string, description: string, priority: Priority) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() === '') {
      setError('Task title is required');
      return;
    }
    
    onAdd(title.trim(), description.trim(), priority);
    setTitle('');
    setDescription('');
    setPriority('medium');
    setError('');
    
    // Keep the form expanded if there's text in the description field
    if (description.trim() === '') {
      setIsExpanded(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md mb-6 transition-all duration-300">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim() !== '') {
                  setError('');
                }
              }}
              onFocus={() => setIsExpanded(true)}
              className={`w-full p-3 border ${
                error ? 'border-red-300 bg-red-50' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
              placeholder="What needs to be done?"
              aria-label="Task title"
            />
            
            {isExpanded && (
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  setTitle('');
                  setDescription('');
                  setPriority('medium');
                  setError('');
                }}
                className="ml-2 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                aria-label="Cancel adding task"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        
        {isExpanded && (
          <>
            <div className="mb-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Add description (optional)"
                rows={2}
                aria-label="Task description"
              />
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="w-full sm:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  aria-label="Task priority"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 flex items-center gap-1 ml-auto"
                aria-label="Add new task"
              >
                <Plus className="h-4 w-4" />
                <span>Add Task</span>
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default AddTodoForm;
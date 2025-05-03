import React, { useState } from 'react';
import { CheckCircle, Circle, Edit, Trash2, Save, X } from 'lucide-react';
import { Todo, Priority } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Todo>) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  onToggleComplete, 
  onDelete,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-amber-100 text-amber-800',
    high: 'bg-rose-100 text-rose-800'
  };

  const handleSaveEdit = () => {
    if (editTitle.trim() === '') return;
    
    onEdit(todo.id, {
      title: editTitle,
      description: editDescription,
      priority: editPriority
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setEditPriority(todo.priority);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow transition-all duration-300 hover:shadow-md border border-gray-100">
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Task title"
            autoFocus
          />
          
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Description (optional)"
            rows={2}
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Priority)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <button
              onClick={handleCancelEdit}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Cancel editing"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
            <button
              onClick={handleSaveEdit}
              className="p-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition-colors"
              aria-label="Save changes"
              disabled={editTitle.trim() === ''}
            >
              <Save className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-white p-4 rounded-lg shadow transition-all duration-300 hover:shadow-md border border-gray-100 ${
        todo.completed ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`flex-shrink-0 mt-1 transition-transform duration-300 ${
            todo.completed ? 'text-emerald-500' : 'text-gray-400 hover:text-indigo-500'
          }`}
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.completed ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3 
              className={`text-lg font-medium break-words ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}
            >
              {todo.title}
            </h3>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ml-2 ${priorityColors[todo.priority]}`}>
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>
          </div>
          
          {todo.description && (
            <p className={`text-sm mt-1 text-gray-600 break-words ${
              todo.completed ? 'line-through opacity-75' : ''
            }`}>
              {todo.description}
            </p>
          )}
          
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">
              {new Date(todo.createdAt).toLocaleDateString()}
            </span>
            
            <div className="flex space-x-1">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Edit task"
              >
                <Edit className="h-4 w-4 text-gray-500" />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-1.5 rounded-md hover:bg-red-100 transition-colors"
                aria-label="Delete task"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
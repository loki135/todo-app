import { Todo } from '../types';

const STORAGE_KEY = 'react-todo-list';

export const getTodos = (): Todo[] => {
  const storedTodos = localStorage.getItem(STORAGE_KEY);
  if (!storedTodos) return [];
  
  try {
    return JSON.parse(storedTodos);
  } catch (error) {
    console.error('Failed to parse todos from localStorage:', error);
    return [];
  }
};

export const saveTodos = (todos: Todo[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import TodoFilters from './TodoFilters';
import EmptyState from './EmptyState';
import { Todo, Priority, FilterStatus } from '../types';
import { getTodos, saveTodos } from '../utils/storage';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  
  // Load todos from localStorage on initial render
  useEffect(() => {
    const loadedTodos = getTodos();
    setTodos(loadedTodos);
  }, []);
  
  // Save todos to localStorage whenever they change
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);
  
  const addTodo = (title: string, description: string, priority: Priority) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      createdAt: Date.now(),
      priority
    };
    
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };
  
  const toggleTodoComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  
  const editTodo = (id: string, updates: Partial<Todo>) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  };
  
  const filterTodos = () => {
    switch (filterStatus) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };
  
  // Compute counts for filters
  const counts = {
    all: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  };
  
  const filteredTodos = filterTodos();

  return (
    <div className="mx-auto w-full max-w-2xl">
      <AddTodoForm onAdd={addTodo} />
      
      <TodoFilters
        currentFilter={filterStatus}
        onFilterChange={setFilterStatus}
        counts={counts}
      />
      
      {filteredTodos.length > 0 ? (
        <div className="space-y-4 animate-fadeIn">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={toggleTodoComplete}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </div>
      ) : (
        <EmptyState filterStatus={filterStatus} />
      )}
    </div>
  );
};

export default TodoList;
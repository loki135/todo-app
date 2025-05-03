export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
  priority: Priority;
}

export type FilterStatus = 'all' | 'active' | 'completed';
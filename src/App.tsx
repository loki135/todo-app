//App .tsx

import TodoList from './components/TodoList';
import { ClipboardList } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <ClipboardList className="h-7 w-7 mr-2" />
            <h1 className="text-2xl font-bold">TaskMaster</h1>
          </div>
          <p className="text-center mt-2 text-indigo-100 text-sm">
            Organize your tasks with ease
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <TodoList />
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          TaskMaster &copy; {new Date().getFullYear()} - Your tasks, organized
        </div>
      </footer>
    </div>
  );
}

export default App;
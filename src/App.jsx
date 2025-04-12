// src/App.jsx
import { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import api from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Apply filters whenever tasks, search query, or category filter changes
  useEffect(() => {
    applyFilters();
  }, [tasks, searchQuery, categoryFilter]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...tasks];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(query) || 
        task.description.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(task => task.category === categoryFilter);
    }
    
    setFilteredTasks(result);
  };

  const addTask = async (task) => {
    try {
      const response = await api.post('/tasks', task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await api.put(`/tasks/${id}`, updatedTask);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const taskToUpdate = tasks.find(task => task._id === id);
      const updatedTask = { ...taskToUpdate, completed: !completed };
      await updateTask(id, updatedTask);
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <TaskForm 
            onSubmit={editingTask ? updateTask.bind(null, editingTask._id) : addTask} 
            initialData={editingTask} 
            onCancel={editingTask ? () => setEditingTask(null) : undefined}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="md:w-2/3">
            <SearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
          </div>
          <div className="md:w-1/3">
            <CategoryFilter 
              categoryFilter={categoryFilter} 
              setCategoryFilter={setCategoryFilter} 
            />
          </div>
        </div>
        
        <TaskList 
          tasks={filteredTasks}
          loading={loading}
          onDelete={deleteTask}
          onEdit={setEditingTask}
          onToggleComplete={toggleComplete}
        />
      </main>
    </div>
  );
}

export default App;
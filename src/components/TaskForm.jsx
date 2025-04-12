// src/components/TaskForm.jsx
import { useState, useEffect } from 'react';
import { FaPlus, FaSave, FaTimes } from 'react-icons/fa';

const CATEGORIES = ['Work', 'Personal', 'Shopping', 'Health', 'Finance', 'Other'];

function TaskForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: 'Other',
    completed: false
  });

  useEffect(() => {
    if (initialData) {
      // Format the due date for the input field (YYYY-MM-DD)
      const formattedDueDate = initialData.dueDate 
        ? new Date(initialData.dueDate).toISOString().split('T')[0]
        : '';
        
      setFormData({
        ...initialData,
        dueDate: formattedDueDate
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    
    // Only reset the form if we're not editing
    if (!initialData) {
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        category: 'Other',
        completed: false
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? 'Edit Task' : 'Add New Task'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter task title"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter task description"
            rows="3"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="dueDate" className="block text-gray-700 font-medium mb-1">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-gray-700 font-medium mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-input"
            >
              {CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          {initialData && (
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary flex items-center"
            >
              <FaTimes className="mr-1" /> Cancel
            </button>
          )}
          
          <button
            type="submit"
            className="btn btn-primary flex items-center"
          >
            {initialData ? (
              <>
                <FaSave className="mr-1" /> Update Task
              </>
            ) : (
              <>
                <FaPlus className="mr-1" /> Add Task
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
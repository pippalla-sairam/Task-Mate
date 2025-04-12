// src/components/TaskItem.jsx
import { useState } from 'react';
import { FaEdit, FaTrash, FaCheck, FaHourglass } from 'react-icons/fa';

// Category colors for badges
const CATEGORY_COLORS = {
  Work: 'bg-blue-100 text-blue-800',
  Personal: 'bg-purple-100 text-purple-800',
  Shopping: 'bg-green-100 text-green-800',
  Health: 'bg-red-100 text-red-800',
  Finance: 'bg-yellow-100 text-yellow-800',
  Other: 'bg-gray-100 text-gray-800'
};

function TaskItem({ task, onDelete, onEdit, onToggleComplete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Format the due date for display
  const formattedDate = task.dueDate 
    ? new Date(task.dueDate).toLocaleDateString() 
    : 'No due date';
  
  // Check if task is overdue
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden ${
        task.completed ? 'border-l-4 border-green-500' : 
        isOverdue ? 'border-l-4 border-red-500' : ''
      }`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <button
              onClick={() => onToggleComplete(task._id, task.completed)}
              className={`mt-1 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center ${
                task.completed ? 'bg-green-500 text-white' : 'border-2 border-gray-300'
              }`}
            >
              {task.completed && <FaCheck className="text-xs" />}
            </button>
            
            <div onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer">
              <h3 
                className={`font-medium ${
                  task.completed ? 'text-gray-500 line-through' : 'text-gray-800'
                }`}
              >
                {task.title}
              </h3>
              
              <div className="flex items-center mt-1 space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${CATEGORY_COLORS[task.category]}`}>
                  {task.category}
                </span>
                
                <span className={`text-xs flex items-center ${
                  isOverdue ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {isOverdue ? <FaHourglass className="mr-1" /> : null}
                  {formattedDate}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(task)}
              className="text-gray-500 hover:text-blue-600 transition-colors"
              aria-label="Edit task"
            >
              <FaEdit />
            </button>
            
            <button
              onClick={() => onDelete(task._id)}
              className="text-gray-500 hover:text-red-600 transition-colors"
              aria-label="Delete task"
            >
              <FaTrash />
            </button>
          </div>
        </div>
        
        {/* Expanded content */}
        {isExpanded && task.description && (
          <div className="mt-3 pl-8">
            <p className="text-gray-600 text-sm whitespace-pre-line">
              {task.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
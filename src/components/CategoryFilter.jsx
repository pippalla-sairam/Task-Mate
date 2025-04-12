// src/components/CategoryFilter.jsx
import { FaFilter } from 'react-icons/fa';

const CATEGORIES = ['all', 'Work', 'Personal', 'Shopping', 'Health', 'Finance', 'Other'];

function CategoryFilter({ categoryFilter, setCategoryFilter }) {
  return (
    <div className="relative">
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="form-input pl-10 appearance-none"
      >
        {CATEGORIES.map(category => (
          <option key={category} value={category}>
            {category === 'all' ? 'All Categories' : category}
          </option>
        ))}
      </select>
      <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
}

export default CategoryFilter;
// src/components/Header.jsx
import { FaClipboardList } from 'react-icons/fa';

function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center max-w-4xl">
        <div className="flex items-center">
          <FaClipboardList className="text-2xl mr-2" />
          <h1 className="text-2xl font-bold">Task Mate</h1>
        </div>
        <p className="ml-4 text-blue-100">Advanced To-Do List App</p>
      </div>
    </header>
  );
}

export default Header;
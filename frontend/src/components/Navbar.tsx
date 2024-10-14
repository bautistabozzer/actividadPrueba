// src/components/Navbar.tsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null; // No renderizar el Navbar si no está autenticado
  }

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-40">
      {/* Botón para abrir el Sidebar */}
      <button onClick={toggleSidebar} className="mr-4 focus:outline-none">
        {/* Icono de menú */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <h1 className="text-xl font-bold">Music App</h1>
      <ul className="flex space-x-4">
        <li>
          <Link
            to="/dashboard"
            className="hover:text-gray-400 transition-colors"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/artists"
            className="hover:text-gray-400 transition-colors"
          >
            Artistas
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="
              bg-transparent 
              border 
              border-white 
              px-3 
              py-1 
              rounded 
              hover:bg-gray-700 
              transition-colors 
              cursor-pointer
            "
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

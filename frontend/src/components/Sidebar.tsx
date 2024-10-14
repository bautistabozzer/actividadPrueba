// src/components/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { FaTimes, FaTachometerAlt, FaMusic } from 'react-icons/fa';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    return null; // No renderizar la Sidebar si no está autenticado
  }

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full bg-gray-800 text-white p-4 transition-width duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-20'}
        z-50
        flex flex-col justify-between
      `}
    >
      {/* Sección Superior: Botón para cerrar la Sidebar y enlaces */}
      <div>
        {/* Botón para cerrar la Sidebar (visible solo cuando está abierta) */}
        {isOpen && (
          <div className="flex justify-end mb-6">
            <button
              onClick={toggleSidebar}
              aria-label="Cerrar Sidebar"
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <FaTimes size={24} />
            </button>
          </div>
        )}

        {/* Enlaces de Navegación */}
        <ul className="space-y-4">
          {/* Dashboard */}
          <li>
            <Link
              to="/dashboard"
              className={`
                flex items-center p-2 rounded hover:bg-gray-700 transition-colors
                ${location.pathname === '/dashboard' ? 'bg-gray-700' : ''}
              `}
            >
              <FaTachometerAlt size={20} />
              {isOpen && <span className="ml-4">Dashboard</span>}
            </Link>
          </li>

          {/* Artistas */}
          <li>
            <Link
              to="/artists"
              className={`
                flex items-center p-2 rounded hover:bg-gray-700 transition-colors
                ${location.pathname === '/artists' ? 'bg-gray-700' : ''}
              `}
            >
              <FaMusic size={20} />
              {isOpen && <span className="ml-4">Artistas</span>}
            </Link>
          </li>

          {/* Puedes añadir más enlaces aquí */}
        </ul>
      </div>

      {/* Botón para togglear el Sidebar */}
      <button
        onClick={toggleSidebar}
        className="
          w-full 
          bg-gray-700 
          text-white 
          py-2 
          rounded 
          hover:bg-gray-600 
          transition-colors 
          flex 
          items-center 
          justify-center
        "
        aria-label={isOpen ? 'Cerrar Sidebar' : 'Abrir Sidebar'}
      >
        {isOpen ? 'Cerrar' : 'Abrir'}
      </button>
    </aside>
  );
};

export default Sidebar;

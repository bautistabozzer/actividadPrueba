// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { FaTimes } from 'react-icons/fa'; // Icono para cerrar

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return null; // No renderizar la Sidebar si no está autenticado
  }

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full bg-gray-800 text-white p-4 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-52 z-50
      `}
      id="sidebar"
      aria-hidden={!isOpen}
    >
      {/* Botón para cerrar la Sidebar */}
      <div className="flex justify-end mb-6">
        <button onClick={toggleSidebar}>
          <FaTimes size={24} className="text-gray-300 hover:text-white transition-colors" />
        </button>
      </div>

      <ul className="space-y-4">
        <li>
          <Link
            to="/dashboard"
            className="block hover:text-gray-400 transition-colors"
            onClick={toggleSidebar} // Cerrar Sidebar al hacer clic
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/artists"
            className="block hover:text-gray-400 transition-colors"
            onClick={toggleSidebar} // Cerrar Sidebar al hacer clic
          >
            Artistas
          </Link>
        </li>
        {/* Añadir más enlaces si es necesario */}
      </ul>

      {/* Botón para togglear el Sidebar (posición fija en la parte inferior) */}
      <button
        onClick={toggleSidebar}
        className="
          absolute bottom-4 left-0 
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
      >
        {isOpen ? 'Cerrar' : 'Abrir'}
      </button>
    </aside>
  );
};

export default Sidebar;

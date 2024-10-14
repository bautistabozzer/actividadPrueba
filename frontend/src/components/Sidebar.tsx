// src/components/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { FaTimes, FaTachometerAlt, FaMusic } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip'; // Importar Tooltip correctamente

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
    <>
      <aside
        className={`
          fixed top-0 left-0 h-full bg-gray-800 text-white p-4 transition-all duration-300 ease-in-out
          ${isOpen ? 'w-52' : 'w-20'}
          z-50
          flex flex-col justify-between
          md:static md:h-auto md:w-52
          shadow-lg
        `}
        id="sidebar"
        aria-hidden={!isOpen}
      >
        {/* Sección Superior: Botón para cerrar la Sidebar y enlaces */}
        <div>
          {/* Botón para cerrar la Sidebar (visible solo cuando está abierta) */}
          {isOpen && (
            <div className="flex justify-end mb-6">
              <button onClick={toggleSidebar} aria-label="Cerrar Sidebar">
                <FaTimes size={24} className="text-gray-300 hover:text-white transition-colors" />
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
                data-tooltip-id="dashboardTip" // Asociar con el Tooltip
                data-tooltip-content="Dashboard" // Contenido del Tooltip
              >
                <FaTachometerAlt size={20} />
                {isOpen && <span className="ml-4">Dashboard</span>}
              </Link>
              {/* Tooltip para Dashboard */}
              {!isOpen && <Tooltip id="dashboardTip" place="right" />}
            </li>

            {/* Artistas */}
            <li>
              <Link
                to="/artists"
                className={`
                  flex items-center p-2 rounded hover:bg-gray-700 transition-colors
                  ${location.pathname === '/artists' ? 'bg-gray-700' : ''}
                `}
                data-tooltip-id="artistsTip"
                data-tooltip-content="Artistas"
              >
                <FaMusic size={20} />
                {isOpen && <span className="ml-4">Artistas</span>}
              </Link>
              {/* Tooltip para Artistas */}
              {!isOpen && <Tooltip id="artistsTip" place="right" />}
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
          aria-label={isOpen ? 'Cerrar Sidebar' : 'Abrir Sidebar'} // Mejora de accesibilidad
        >
          {isOpen ? 'Cerrar' : 'Abrir'}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;

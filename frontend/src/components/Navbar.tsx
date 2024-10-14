// src/components/Navbar.tsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext'; // Asegúrate de que la ruta es correcta

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Llama al método logout del contexto de autenticación
    navigate('/login'); // Redirige al usuario a la página de login
  };

  if (!isAuthenticated) {
    return null; // No renderizar el Navbar si el usuario no está autenticado
  }

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-40">
      {/* Botón para abrir el Sidebar */}
      <button
        onClick={toggleSidebar}
        aria-label="Abrir Sidebar"
        className="mr-4 focus:outline-none"
      >
        <FaBars size={24} className="text-gray-300 hover:text-white transition-colors" />
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
            aria-label="Cerrar Sesión"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

// src/pages/Welcome.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">¡Bienvenido a Music App!</h1>
        <p className="text-gray-600 mb-8">
          Descubre y gestiona tus artistas favoritos de manera fácil y rápida.
        </p>
        <div className="flex flex-col space-y-4">
          <Link
            to="/register"
            className="
              bg-gray-800 
              text-white 
              py-2 
              px-4 
              rounded 
              hover:bg-gray-700 
              transition-colors 
              text-lg
              font-medium
            "
          >
            Registrarse
          </Link>
          <Link
            to="/login"
            className="
              bg-transparent 
              border 
              border-gray-800 
              text-gray-800 
              py-2 
              px-4 
              rounded 
              hover:bg-gray-800 
              hover:text-white 
              transition-colors 
              text-lg
              font-medium
            "
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

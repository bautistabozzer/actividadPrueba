// src/pages/Login.tsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido al iniciar sesión');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 border border-gray-300 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="
              w-full 
              px-3 
              py-2 
              border 
              border-gray-300 
              rounded 
              focus:outline-none 
              focus:ring-2 
              focus:ring-gray-800
            "
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              w-full 
              px-3 
              py-2 
              border 
              border-gray-300 
              rounded 
              focus:outline-none 
              focus:ring-2 
              focus:ring-gray-800
            "
          />
        </div>
        <button
          type="submit"
          className="
            w-full 
            py-2 
            bg-gray-800 
            text-white 
            rounded 
            cursor-pointer 
            hover:bg-gray-700 
            transition-colors
          "
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;

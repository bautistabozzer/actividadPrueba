// src/pages/Register.tsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validaciones básicas
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      setError('');
      setSuccess('');
      setLoading(true);
      await register(username, email, password); // Asegúrate de que la función register soporte el email
      setSuccess('Registro exitoso. Redirigiendo al dashboard...');
      // Opcional: Redirigir después de un breve retraso para mostrar el mensaje de éxito
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido al registrar el usuario.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Registrarse</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Nombre de Usuario:</label>
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
          <label className="block mb-2 font-medium">Correo Electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <label className="block mb-2 font-medium">Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
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
        <div className="mb-6">
          <label className="block mb-2 font-medium">Confirmar Contraseña:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
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
          disabled={loading}
          className="
            w-full 
            py-2 
            bg-gray-800 
            text-white 
            rounded 
            cursor-pointer 
            hover:bg-gray-700 
            transition-colors 
            disabled:opacity-50
          "
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default Register;

// src/pages/Dashboard.tsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { fetchUserData } from '../services/userService'; // Asegúrate de tener este servicio
import { UserData } from '../types'; // Define la interfaz UserData según tus necesidades

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const data = await fetchUserData();
        setUserData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error desconocido al cargar los datos del usuario.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      getUserData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null; // O puedes redirigir al usuario a la página de login
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      {loading ? (
        <p className="text-gray-700">Cargando datos...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : userData ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Información del Usuario</h3>
          <p className="mb-2">
            <span className="font-medium">Nombre:</span> {userData.name}
          </p>
          <p className="mb-2">
            <span className="font-medium">Correo Electrónico:</span> {userData.email}
          </p>
          {/* Añade más información según tus necesidades */}
        </div>
      ) : (
        <p className="text-gray-700">No hay datos disponibles.</p>
      )}
    </div>
  );
};

export default Dashboard;

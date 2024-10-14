// src/pages/Dashboard.tsx
import React from 'react';
import { FaChartLine, FaUsers, FaMusic } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6">
      {/* Encabezado */}
      <h2 className="text-3xl font-semibold">Dashboard</h2>

      {/* Sección de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Estadística 1 */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
          <FaChartLine size={40} className="text-blue-500" />
          <div>
            <p className="text-gray-500">Total Ventas</p>
            <p className="text-2xl font-bold">$25,000</p>
          </div>
        </div>

        {/* Estadística 2 */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
          <FaUsers size={40} className="text-green-500" />
          <div>
            <p className="text-gray-500">Usuarios Activos</p>
            <p className="text-2xl font-bold">1,200</p>
          </div>
        </div>

        {/* Estadística 3 */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
          <FaMusic size={40} className="text-purple-500" />
          <div>
            <p className="text-gray-500">Nuevos Artistas</p>
            <p className="text-2xl font-bold">75</p>
          </div>
        </div>
      </div>

      {/* Gráfico de Ventas */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Ventas Mensuales</h3>
        {/* Aquí puedes integrar un gráfico utilizando una librería como Chart.js o Recharts */}
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-400">Gráfico de Ventas Aquí</p>
        </div>
      </div>

      {/* Lista de Actividades Recientes */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Actividades Recientes</h3>
        <ul className="space-y-3">
          <li className="flex items-center space-x-4">
            <FaUsers className="text-green-500" />
            <div>
              <p className="font-semibold">Nuevo Usuario Registrado</p>
              <p className="text-gray-500 text-sm">Hace 2 horas</p>
            </div>
          </li>
          <li className="flex items-center space-x-4">
            <FaChartLine className="text-blue-500" />
            <div>
              <p className="font-semibold">Incremento de Ventas</p>
              <p className="text-gray-500 text-sm">Hace 5 horas</p>
            </div>
          </li>
          <li className="flex items-center space-x-4">
            <FaMusic className="text-purple-500" />
            <div>
              <p className="font-semibold">Nuevo Artista Agregado</p>
              <p className="text-gray-500 text-sm">Hace 1 día</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

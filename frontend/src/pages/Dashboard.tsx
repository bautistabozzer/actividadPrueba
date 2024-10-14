// frontend/src/pages/Dashboard.tsx
import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div className="pt-20 px-4"> {/* Ajuste para evitar solapamiento con el Navbar */}
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                
                {/* Contenedor Principal del Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Tarjeta 1 */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-2">Ingresos Totales</h2>
                        <p className="text-2xl text-green-500">$50,000</p>
                    </div>
                    
                    {/* Tarjeta 2 */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-2">Ventas Mensuales</h2>
                        <p className="text-2xl text-blue-500">120</p>
                    </div>
                    
                    {/* Tarjeta 3 */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-2">Nuevos Clientes</h2>
                        <p className="text-2xl text-purple-500">75</p>
                    </div>
                    
                    {/* Agrega más tarjetas o componentes según sea necesario */}
                </div>
                
                {/* Sección de Gráficos */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Estadísticas</h2>
                    {/* Aquí puedes integrar gráficos utilizando bibliotecas como Chart.js o Recharts */}
                    <div className="bg-white shadow-md rounded-lg h-64 flex items-center justify-center">
                        <p className="text-gray-400">Gráfico de ejemplo</p>
                    </div>
                </div>
                
                {/* Sección de Tablas */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Últimas Transacciones</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Cliente</th>
                                    <th className="py-2 px-4 border-b">Producto</th>
                                    <th className="py-2 px-4 border-b">Cantidad</th>
                                    <th className="py-2 px-4 border-b">Total</th>
                                    <th className="py-2 px-4 border-b">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Itera sobre tus datos y renderiza las filas */}
                                <tr>
                                    <td className="py-2 px-4 border-b">Juan Pérez</td>
                                    <td className="py-2 px-4 border-b">Producto A</td>
                                    <td className="py-2 px-4 border-b">10</td>
                                    <td className="py-2 px-4 border-b">$1,000</td>
                                    <td className="py-2 px-4 border-b">2024-10-01</td>
                                </tr>
                                {/* Agrega más filas según sea necesario */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

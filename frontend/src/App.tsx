// frontend/src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Artists from './pages/Artists';
import IncomeDetails from './pages/IncomeDetails'; // Nuevo Componente
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
    return (
        <Routes>
            {/* Ruta de bienvenida */}
            <Route path="/" element={<Welcome />} />

            {/* Rutas de autenticación */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas protegidas */}
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Layout>
                            <Dashboard />
                        </Layout>
                    </PrivateRoute>
                }
            />
            <Route
                path="/artists"
                element={
                    <PrivateRoute>
                        <Layout>
                            <Artists />
                        </Layout>
                    </PrivateRoute>
                }
            />
            <Route
                path="/income-details"
                element={
                    <PrivateRoute>
                        <Layout>
                            <IncomeDetails />
                        </Layout>
                    </PrivateRoute>
                }
            />

            {/* Ruta wildcard */}
            <Route path="*" element={<Welcome />} />
        </Routes>
    );
};

export default App;

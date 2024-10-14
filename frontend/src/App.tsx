// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Artists from './pages/Artists';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <Navbar />
            <Sidebar />
            <main className="main-content">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/artists"
                        element={
                            <PrivateRoute>
                                <Artists />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<Login />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;

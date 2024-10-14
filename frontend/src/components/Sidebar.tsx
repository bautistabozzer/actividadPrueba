// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Crear este archivo para estilos

const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar">
            <ul>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/artists">Artistas</Link>
                </li>
                {/* Añadir más enlaces si es necesario */}
            </ul>
        </aside>
    );
};

export default Sidebar;

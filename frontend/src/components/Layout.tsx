// src/components/Layout.tsx
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Estado para manejar la visibilidad del Sidebar, inicializado desde localStorage
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    const storedState = localStorage.getItem('isSidebarOpen');
    return storedState ? JSON.parse(storedState) : true;
  });

  // Función para togglear el Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Efecto para guardar el estado en localStorage
  useEffect(() => {
    localStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Espaciado para el Navbar fijo */}
        <div className="mt-16"></div> {/* Ajusta según la altura del Navbar */}

        {/* Contenido */}
        <main className="p-6 flex-1 overflow-auto mb-16"> {/* Ajusta el margen inferior para el Footer fijo */}
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

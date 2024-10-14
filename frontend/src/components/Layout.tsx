// frontend/src/components/Layout.tsx
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar'; // Asegúrate de tener un componente Sidebar
import { useState } from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <main className="pt-20 pl-0 md:pl-64"> {/* Ajusta pl-64 si tu Sidebar tiene un ancho de 16rem (256px) */}
                {children}
            </main>
        </>
    );
};

export default Layout;

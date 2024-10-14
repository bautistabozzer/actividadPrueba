// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="
        bg-gray-800 
        text-white 
        py-2 
        px-4 
        rounded 
        cursor-pointer 
        transition-colors 
        hover:bg-gray-700
      "
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

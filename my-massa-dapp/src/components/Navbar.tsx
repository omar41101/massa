import React from 'react';
import logo from '../assets/Asset 16.png';
import { Button } from '@massalabs/react-ui-kit';

interface NavbarProps {
  onConnectClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onConnectClick }) => {
  return (
    <nav className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="Dar Blockchain Logo" className="w-12 h-12 object-contain" />
          <h1 className="text-xl font-bold">Dar Blockchain</h1>
        </div>

        {/* Right: Connect Button */}
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
          onClick={onConnectClick}
        >
          Connect
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;

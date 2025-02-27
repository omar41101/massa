import React from "react";
import logo from "../assets/Asset 16.png";
import { Button } from "@massalabs/react-ui-kit";

interface NavbarProps {
  onConnectClick: () => void;
  walletAddress: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ onConnectClick, walletAddress }) => {
  return (
    <nav className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-3 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />

        {/* ✅ Dynamic Button: Show Address if Connected */}
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
          onClick={onConnectClick}
        >
          {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-6)}` : "Connect"}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;

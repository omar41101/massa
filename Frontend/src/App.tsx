import { useState } from "react";
import Navbar from "./components/Navbar";
import { ConnectMassaWallet, useAccountStore } from "@massalabs/react-ui-kit";
 import MintNFT from "./utils/mintNFT";
 
function App() {
  const { connectedAccount } = useAccountStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <Navbar
        onConnectClick={() => setIsModalOpen(true)}
        walletAddress={connectedAccount?.address ?? null}
      />

      {/* Main Content */}
       <MintNFT />
      

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
          onClick={() => setIsModalOpen(false)} // Close modal when clicking outside
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <h2 className="text-xl font-semibold mb-4">Connect Wallet</h2>
            <div className="theme-light">
            <ConnectMassaWallet />
            </div>
            <button
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
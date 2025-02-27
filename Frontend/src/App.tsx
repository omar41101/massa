import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import {
  ConnectMassaWallet,
  PopupModal,
  PopupModalContent,
  PopupModalHeader,
} from "@massalabs/react-ui-kit";
import { getWallets } from "@massalabs/wallet-provider"; // ✅ Fetch wallet data

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(
    localStorage.getItem("walletAddress") // ✅ Load from localStorage
  );

  // ✅ Function to Check & Save Wallet Connection
  const checkWalletConnection = async () => {
    try {
      const wallets = await getWallets();
      if (wallets.length > 0) {
        const wallet = wallets[0];
        const accounts = await wallet.accounts();
        if (accounts.length > 0) {
          const address = accounts[0].address;
          setWalletAddress(address);
          localStorage.setItem("walletAddress", address); // ✅ Save to localStorage
          setIsModalOpen(false); // ✅ Close modal after successful connection
        }
      }
    } catch (error) {
      console.error("Error fetching wallet:", error);
    }
  };

  // ✅ Run on Mount & After Connection
  useEffect(() => {
    checkWalletConnection();
  }, []);

  return (
    <>
      {/* ✅ Navbar with Dynamic Wallet Address */}
      <Navbar
        onConnectClick={() => setIsModalOpen(true)}
        walletAddress={walletAddress} // ✅ Pass Wallet Address
      />

      {/* ✅ Popup Modal for Wallet Connection */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
          <PopupModal
            onClose={() => setIsModalOpen(false)}
            className="rounded-2xl shadow-xl bg-white text-gray-900 max-w-md w-full p-6"
          >
            {/* ✅ Modal Header */}
            <PopupModalHeader className="flex justify-between items-center pb-2 border-b border-gray-300">
              <h2 className="text-lg font-bold">Connect Wallet</h2>
              <button
                className="text-gray-600 text-xl hover:text-gray-400 transition"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </PopupModalHeader>

            {/* ✅ Modal Content */}
            <PopupModalContent className="py-6 flex justify-center">
              <div className="w-full max-w-sm">
                <ConnectMassaWallet /> {/* ✅ No onConnect Prop Needed */}
              </div>
            </PopupModalContent>
          </PopupModal>
        </div>
      )}
    </>
  );
}

export default App;

import React, { useState } from "react";
import { useAccountStore } from "@massalabs/react-ui-kit";
import { JsonRPCClient, SmartContract, Args, Operation } from "@massalabs/massa-web3";

export const NftComponent = () => {
  const [owner, setOwner] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Call the hook directly in the component body
  const { connectedAccount } = useAccountStore();

  const handleGetNft = async () => {
    setLoading(true);
    setError("");

    try {
      const client = JsonRPCClient.buildnet();
      const contractAddress = "AS1W5ihxqXJeVWKrFYSg8e5oJvsVRxEr12kDM8NPuujEDX1iv7p4";
      const contract = new SmartContract(connectedAccount as any, contractAddress);

      // Call the smart contract
      const data: Operation = await contract.call("getUserNFT", new Args(), {
        maxGas: BigInt(2100000),
        coins: BigInt(0),
      });

      // Log the raw data for debugging
      console.log("Raw data from contract:", data);

      // Convert the Operation to a string (or extract the relevant data)
      const resultStr = JSON.stringify(data, null, 2);
      setOwner(resultStr); // Now passing a string to setOwner
    } catch (error) {
      console.error("❌ Error fetching NFTs:", error);
      setError("Failed to fetch NFTs: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Get NFT by Owner</h1>
      <div className="flex justify-center">
        <button
          onClick={handleGetNft}
          disabled={loading}
          className={`px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Loading..." : "Get NFT"}
        </button>
      </div>
      {error && (
        <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
      )}
      {owner && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Owner:</h2>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            {owner}
          </pre>
        </div>
      )}
    </div>
  );
};
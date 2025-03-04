import { useState } from "react";
import { getNFTsByOwner } from "../utils/getNft";

const NFTOwnerAssets = () => {
  const [address, setAddress] = useState("");
  const [nftList, setNftList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNFTs = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getNFTsByOwner(address);
      setNftList(result);
    } catch (err) {
      setError("Failed to fetch NFTs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-3">Your NFTs</h2>
      <input
        type="text"
        placeholder="Enter Wallet Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-400"
      />
      <button
        onClick={fetchNFTs}
        disabled={loading || !address}
        className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Fetching..." : "Get NFTs"}
      </button>
      {error && <p className="mt-3 text-red-500">{error}</p>}
      {nftList.length > 0 && (
        <ul className="mt-3 bg-gray-100 p-2 rounded-lg">
          {nftList.map((id) => (
            <li key={id}>NFT ID: {id}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NFTOwnerAssets;

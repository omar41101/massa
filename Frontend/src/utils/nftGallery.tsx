import { useState, useEffect } from "react";
import { useAccountStore } from "@massalabs/react-ui-kit";
import { getNFTsByOwner } from "./getNft";
 
const NFTGallery = () => {
  const { connectedAccount } = useAccountStore();
  const [nfts, setNFTs] = useState<void[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

   useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const nfts = await getNFTsByOwner();
        setNFTs(nfts);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        setError("❌ Failed to fetch NFTs: " + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [connectedAccount]);

  // Parse NFT data
  const parseNFTData = (nft: string) => {
    try {
      return JSON.parse(nft); // Assuming the NFT data is stored as a JSON string
    } catch (error) {
      console.error("Error parsing NFT data:", error);
      return null;
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-3">Your NFTs</h2>
      {loading && <p className="text-gray-600">Loading NFTs...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && nfts.length === 0 && (
        <p className="text-gray-600">No NFTs found.</p>
      )}
      {!loading && !error && nfts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {nfts.map((nft, index) => {
            const nftData = parseNFTData(nft);
            if (!nftData) return null;

            return (
              <div key={index} className="border rounded-lg p-4 shadow-sm">
                <img
                  src={nftData.image}
                  alt={nftData.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="mt-2">
                  <h3 className="text-lg font-semibold">{nftData.name}</h3>
                  <p className="text-sm text-gray-600">{nftData.hobby}</p>
                  <p className="text-sm text-gray-600">Age: {nftData.age}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NFTGallery;
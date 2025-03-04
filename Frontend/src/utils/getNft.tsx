import { SmartContract, Args, JsonRPCClient } from "@massalabs/massa-web3";
import { useAccountStore } from "@massalabs/react-ui-kit";
import { useState } from "react";

export async function GetNftByOwner() {
  const [owner, setOwner] = useState("");
  const client = JsonRPCClient.buildnet();
  if (client) {
    try {
      const { connectedAccount } = useAccountStore();
      const contractAddress =
        "AS1W5ihxqXJeVWKrFYSg8e5oJvsVRxEr12kDM8NPuujEDX1iv7p4";
      const contract = new SmartContract(
        connectedAccount as any,
        contractAddress
      );
      const data = await contract.call("getUserNFT", new Args(), {
        maxGas: BigInt(2100000),
        coins: BigInt(0),
      });
      const resultStr = data.toString();
      console.log("nft", resultStr);
      const owner = JSON.parse(resultStr);
      setOwner(owner);

      /*if (!result.value || result.value.length === 0) {
      console.warn(" No NFTs found for:", address);
      return [];
    }

    const decodedResult = new TextDecoder().decode(result.value);
    console.log(" Fetched NFT Data (decoded):", decodedResult);

    return decodedResult.includes("|") ? [decodedResult] : [];
    */
    } catch (error) {
      console.error("❌ Error fetching NFTs:", error);
      throw new Error("Failed to fetch NFTs: " + (error as Error).message);
    }
  }
}

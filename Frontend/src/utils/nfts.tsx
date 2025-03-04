import {
    Account,
    JsonRpcProvider,
    SmartContract,
    Args,
  } from "@massalabs/massa-web3";
  
 export  async function getNFTOwner(nftID: number): Promise<string> {
    // ✅ Fix return type
    try {
      const contractAddress =
        "AS1sf38dJXm9rNWhosyjiu21M5qXD1fJFfmofTKj9m5i6NscGBko";
        const privateKey = import.meta.env.VITE_PRIVATE_KEY;  
        const account = await Account.fromPrivateKey(privateKey);
       const provider = JsonRpcProvider.buildnet(account);
      const contract = new SmartContract(provider, contractAddress);
    
      const args = new Args().addU64(BigInt(nftID));
      const result = await contract.read("getNFTOwner", args);
  
      // ✅ Extract NFT owner correctly
      const nftOwner = result?.value?.toString() || "None";
  
      console.log(`Owner of NFT ${nftID}: ${nftOwner}`);
  
      return nftOwner; // ✅ Return string instead of void
    } catch (error) {
      console.error("Error getting NFT owner:", error);
      return "Error"; // ✅ Return an error message instead of void
    }
  }
  
  // ✅ Example Usage
  getNFTOwner(1).then((owner) =>
    console.log("Returned NFT Owner Address:", owner)
  );

   
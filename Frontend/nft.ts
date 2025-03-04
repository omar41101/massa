import {
  Account,
  JsonRpcProvider,
  SmartContract,
  Args,
} from "@massalabs/massa-web3";

export async function getNFTsByOwner(address: string): Promise<string[]> {
  try {
    const contractAddress =
      "AS1W5ihxqXJeVWKrFYSg8e5oJvsVRxEr12kDM8NPuujEDX1iv7p4";
     const account = await Account.fromEnv( );
    const provider = JsonRpcProvider.buildnet(account);
    const contract = new SmartContract(provider, contractAddress);

    const args = new Args().addString(address);
    const result = await contract.read("getNFTsByOwner", args);

    let decodedResult = new TextDecoder().decode(result.value);

    console.log("Fetched NFT IDs (decoded):", decodedResult);

    return decodedResult ? decodedResult.split(",") : [];
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return [];
  }
}
getNFTsByOwner("AU184oAH5c4htSao4YfHdKkXrCsb8CxDJ48VXkwpm8jfYA7FfCbV")
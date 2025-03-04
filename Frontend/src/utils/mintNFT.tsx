import {
  Account,
  JsonRpcProvider,
  SmartContract,
  Args,
  OperationStatus,
} from "@massalabs/massa-web3";
import { useAccountStore } from "@massalabs/react-ui-kit";
import { useEffect, useState } from "react";

const MintNFT = () => {
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");
  const [age, setAge] = useState("");
  const [pictureURL, setPictureURL] = useState("");
  const [mintStatus, setMintStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { connectedAccount } = useAccountStore();
   useEffect(() => {
     mintNFT();
  }, []);

  const validateInputs = () => {
    if (!name || !hobby || !age || !pictureURL) {
      throw new Error("All fields are required.");
    }
    if (isNaN(Number(age))) {
      throw new Error("Age must be a valid number.");
    }
    if (Number(age) <= 0) {
      throw new Error("Age must be greater than 0.");
    }
    try {
      new URL(pictureURL);
    } catch (error) {
      throw new Error("Invalid picture URL.");
    }
  };

  const resetForm = () => {
    setName("");
    setHobby("");
    setAge("");
    setPictureURL("");
  };

  async function mintNFT(){
      setIsLoading(true);
      validateInputs();

      const contractAddress =
        "AS1W5ihxqXJeVWKrFYSg8e5oJvsVRxEr12kDM8NPuujEDX1iv7p4";
      const contract = new SmartContract(connectedAccount as any, contractAddress);
      const args = new Args()
        .addString(name)
        .addString(hobby)
        .addU32(BigInt(Number(age)))
        .addString(pictureURL);

        const response = await contract.call("mintNFT", args, {
          maxGas: BigInt(2100000),
          coins: BigInt(0),
        });
        console.log("Transaction response:", response); 
        resetForm()
  }
      
    


     /* const operation = await contract.call("mintNFT", args);
      setMintStatus("✅ Transaction Sent. Waiting for Confirmation...");
      const speculativeStatus = await operation.waitSpeculativeExecution();
      if (speculativeStatus !== OperationStatus.SpeculativeSuccess) {
        throw new Error("Transaction failed in speculative execution.");
      }

      const finalStatus = await operation.waitFinalExecution();
      if (finalStatus !== OperationStatus.Success) {
        throw new Error("Transaction failed in final execution.");
      }

      setMintStatus("✅ NFT Minted Successfully!");
      resetForm();
    } catch (error) {
      setMintStatus("❌ Error: " + ( error));
    } finally {
      setIsLoading(false);
    }*/
 

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-3">Mint NFT</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg"
      />
      <input
        type="text"
        placeholder="Hobby"
        value={hobby}
        onChange={(e) => setHobby(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg mt-2"
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg mt-2"
      />
      <input
        type="text"
        placeholder="Picture URL"
        value={pictureURL}
        onChange={(e) => setPictureURL(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg mt-2"
      />
      <button
        onClick={mintNFT}
         className={`w-full mt-3 px-4 py-2  
          "bg-green-600"
        } text-white rounded-lg hover:bg-green-700`}
      >
        mint
       </button>
         <p className="mt-3 p-2 bg-gray-100 border rounded-lg"> </p>
     
    </div>
  );
};

export default MintNFT;
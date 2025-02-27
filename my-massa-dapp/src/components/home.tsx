import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-darkbg px-6">
       <div className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal to-neonpink text-transparent bg-clip-text">
          Seamless Cross-Chain Bridging
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mt-4">
          Transfer assets securely and efficiently across multiple blockchain networks with **Dar Blockchain**.
        </p>
      </div>

       <div className="mt-8">
        <img src="/assets/bridge-animation.png" alt="Cross-Chain Bridge" className="w-full max-w-md" />
      </div>

       <div className="mt-8">
        <a
          href="/bridge"
          className="px-6 py-3 bg-gradient-to-r from-teal to-deepblue text-white font-semibold rounded-lg shadow-md hover:from-deepblue hover:to-neonpink transition text-lg"
        >
          🌉 Explore Bridging
        </a>
      </div>
    </div>
  );
};

export default Home;

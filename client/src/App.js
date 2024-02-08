import { Toaster } from "react-hot-toast";
import "./App.css";
import ConnectModal from "./components/ConnectModal";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [wallet, setWallet] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateWallet = (wallet) => {
    setWallet(wallet);
  };
  const showConnectModal = (value) => {
    setIsModalOpen(value);
  };

  return (
    <div className="app">
      <Navbar updateWallet={updateWallet} wallet={wallet} showConnectModal={showConnectModal} />
      <Toaster />
      <ConnectModal
        isModalOpen={isModalOpen}
        showConnectModal={showConnectModal}
        updateWallet={updateWallet}
      />
    </div>
  );
}

export default App;

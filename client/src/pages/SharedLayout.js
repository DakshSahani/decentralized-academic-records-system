import { Toaster } from "react-hot-toast";
import ConnectModal from "../components/ConnectModal";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function SharedLayout({wallet, setWallet}) 
{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const updateWallet = (wallet) => {
    setWallet(wallet);
  };
  const showConnectModal = (value) => {
    setIsModalOpen(value);
  };

  return (
    <div className="app min-h-[100vh]">
      <Navbar updateWallet={updateWallet} wallet={wallet} showConnectModal={showConnectModal} />
      
      <Toaster />
      
      <ConnectModal
        isModalOpen={isModalOpen}
        showConnectModal={showConnectModal}
        updateWallet={updateWallet}
      />
      <main className="min-h-[84vh] flex items-center">
        <Outlet />
      </main>
    </div>
  );
}
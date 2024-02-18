import { Toaster } from "react-hot-toast";
import ConnectModal from "../components/ConnectModal";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../context/Context";

export default function SharedLayout() {
  const { wallet, setWallet } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showConnectModal = (value) => {
    setIsModalOpen(value);
  };

  return (
    <div className="app min-h-[100vh]">
      <Navbar setWallet={setWallet} wallet={wallet} showConnectModal={showConnectModal} />
      
      <Toaster position="top-center"/>
      
      <ConnectModal
        isModalOpen={isModalOpen}
        showConnectModal={showConnectModal}
        setWallet={setWallet}
      />
      <main className="min-h-[84vh] flex items-center">
        <Outlet />
      </main>
    </div>
  );
}
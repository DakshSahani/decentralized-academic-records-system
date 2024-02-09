import { Toaster } from "react-hot-toast";
import ConnectModal from "../components/ConnectModal";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import DefaultPage from "./DefaultPage";
import LoggedInHomePage from "./LoggedInHomePage";

export default function HomePage({wallet, setWallet}) 
{
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

      {
        wallet ?
        <LoggedInHomePage wallet={wallet}/>
        :
        <DefaultPage />
      }
    </div>
  );
}
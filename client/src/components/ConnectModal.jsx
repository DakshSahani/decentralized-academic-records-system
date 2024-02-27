import React, { useState } from "react";
import { Input, Modal } from "antd";
import { Wallet, validateMnemonic, VoyageProvider } from "js-moi-sdk";
import { useAppContext } from "../context/Context";

const provider = new VoyageProvider("babylon");
const account = "m/44'/6174'/7020'/0/0"; // 0th account path derivation

const ConnectModal = ({ isModalOpen, showConnectModal }) => {
  const { setWallet, setAdmin, loginLoading } = useAppContext();
  const [mnemonic, setMnemonic] = useState("");
  const [error, setError] = useState("");

  const handleConnect = async (mnemonic) => {
    try {
      if (!validateMnemonic(mnemonic)) {
        return setError("Incorrect mnemonic");
      }

      const wallet = new Wallet(provider);
      await wallet.fromMnemonic(mnemonic, account);
      await setAdmin(wallet);
      setWallet(wallet);
      showConnectModal(false);
      
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setError("");
    showConnectModal(false);
  };

  return (
    <>
      <Modal
        title="Enter Mnemonic"
        open={isModalOpen}
        onOk={() => handleConnect(mnemonic)}
        okButtonProps={{ style: { backgroundColor: "#2563eb",} }} 
        onCancel={handleCancel}
        destroyOnClose={true}
        confirmLoading={loginLoading}
      >
        <Input
          style={{ border: "1px solid black" }}
          onChange={(e) => setMnemonic(e.target.value)}
        />
        {error && <p style={{ color: "red", fontWeight: 700, textAlign: "center" }}>{error}</p>}
      </Modal>
    </>
  );
};
export default ConnectModal;

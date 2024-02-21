import React, { useState } from "react";
import { Input, Modal } from "antd";
import { Wallet, validateMnemonic, VoyageProvider } from "js-moi-sdk";
import { toastError } from "../utils/toastWrapper";
import { useAppContext } from "../context/Context";
// import logic from "../interface/logic";

const provider = new VoyageProvider("babylon");
const account = "m/44'/6174'/7020'/0/0"; // 0th account path derivation

const ConnectModal = ({ isModalOpen, showConnectModal }) => {
  const { setWallet } = useAppContext();
  const [mnemonic, setMnemonic] = useState("");
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  const handleConnect = async (mnemonic) => {
    // if(loading) return
    // setLoading(true)
    try {
      if (!validateMnemonic(mnemonic)) {
        return setError("Incorrect mnemonic");
      }

      const wallet = new Wallet(provider);
      await wallet.fromMnemonic(mnemonic, account);
      // const res = await logic.isAdmin(wallet)
      // if(res){
      setWallet(wallet, true);
      // }else{
      //   toastError("The Mnemonic does not match")
      // }
      setError("");
      showConnectModal(false);
    } catch (error) {
      toastError(error.message);
    }
    // finally{
    //   setLoading(false)
    // }
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
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        {/* {loading && <p style={{ color: "red"}}>loading...</p>} */}
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

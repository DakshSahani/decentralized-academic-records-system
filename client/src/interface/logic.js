import { VoyageProvider, Wallet, getLogicDriver } from "js-moi-sdk";

const provider = new VoyageProvider("babylon");
const logicId = process.env.REACT_APP_LOGIC_ID;

const constructBaseWallet = async () => {
  const wallet = new Wallet(provider);
  await wallet.fromMnemonic(process.env.REACT_APP_BASE_MNEMONIC, "m/44'/6174'/7020'/0/0");
  return wallet;
};

// Base wallet should only be used for making read calls when user has not connected his wallet
const baseWallet = await constructBaseWallet();

////////////////////////
// Mutate/Write Calls
///////////////////////

////////////////////////
// Observe/Read Calls
///////////////////////

const logic = {
  // Add Call Methods
};

export default logic;

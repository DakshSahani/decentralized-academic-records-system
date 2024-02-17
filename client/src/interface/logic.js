import { VoyageProvider, Wallet, getLogicDriver } from "js-moi-sdk";

const provider = new VoyageProvider("babylon"); // start node, through which we will interact, it has exposed its IP for RPC calls
const logicId = process.env.REACT_APP_LOGIC_ID;

const constructBaseWallet = async () => { 
  // gonna change in future
  // As we don't need wallet for read calls
  const wallet = new Wallet(provider);
  await wallet.fromMnemonic(
    process.env.REACT_APP_BASE_MNEMONIC, 
    "m/44'/6174'/7020'/0/0"
  );
  return wallet;
};

// Base wallet should only be used for making read calls when user has not connected his wallet
const baseWallet = await constructBaseWallet();   // Going to change in future.

// In order to execute write operations -> we use [wallet] inside React.
////////////////////////
// Mutate/Write Calls
///////////////////////

// const changeOwner = async (wallet, newOwner) => {
//   const logicDriver = await getLogicDriver(logicId, wallet);
//   const ixResponse = await logicId.routines.
//   // const {} = await isResponse.wait() -> in case if no output.
//   // .wait() return a recite
//   const {
//     /* returned by backend */ 
//     temp
//   } = await ixResponse.result();
// }

const addRecord = async (wallet, studentName, studentId)=>{

}

const addCourse = async (wallet, recordId, courseName, courseGrade)=>{

}

////////////////////////
// Observe/Read Calls
///////////////////////

const getRecords = async ()=>{
  const logicDriver = await getLogicDriver(logicId, baseWallet);
  const { owner } = logicDriver.routines.GetOwner(/* argumets */); // GetOwner -> inside logic inside coco (backend)
}

const logic = {
  addRecord,
  addCourse,
  getRecords,
  
};

export default logic;

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

const addRecord = async (wallet, studentName, studentId)=>{
  const logicDriver = await getLogicDriver(logicId, wallet);
  const ix = await logicDriver.routines.AddRecord(studentName, studentId);
  const {addedRecord} = await ix.result();
  return addedRecord
}

const addCourse = async (wallet, recordId, courseName, courseGrade)=>{
  const logicDriver = await getLogicDriver(logicId, wallet);
  const ix = await logicDriver.routines.AddCourse(recordId, courseName, courseGrade);
  await ix.wait();
}

////////////////////////
// Observe/Read Calls
///////////////////////

// We can get primitive state variables like this
const isAdmin = async (wallet) => {
  const logicDriver = await getLogicDriver(logicId, wallet);
  const {result} = await logicDriver.routines.isAdmin();
  return result
};

const getRecords = async ()=>{
  const logicDriver = await getLogicDriver(logicId, baseWallet)
  //FIX: not sure about "await" below
  const {records} = await logicDriver.routines.GetRecords();
  return records
}

const logic = {
  addRecord,
  addCourse,
  getRecords,
  isAdmin
};

// const logicDriver = await getLogicDriver(logicId, wallet);
// const ix = await logicDriver.routines.addCourse(recordId, courseName, courseGrade);
// //if to return something
// const {data} = await ix.result()
// return data
// //if not to return
// await ix.wait()

export default logic;

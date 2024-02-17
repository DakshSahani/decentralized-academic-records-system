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

const addRecord = async (wallet, studentName, studentId)=>{
  const logicDriver = await getLogicDriver(logicId, wallet);
  const ix = await logicDriver.routines.addRecord(studentId, studentName);
  const {addedRecord} = await ix.result();
  return addedRecord
}

const addCourse = async (wallet, recordId, courseName, courseGrade)=>{
  const logicDriver = await getLogicDriver(logicId, wallet);
  const ix = await logicDriver.routines.addCourse(recordId, courseName, courseGrade);
  await ix.wait();
}

////////////////////////
// Observe/Read Calls
///////////////////////

// We can get primitive state variables like this
const getOwner = async () => {
  const logicDriver = await getLogicDriver(logicId, baseWallet);
  return logicDriver.persistentState.get("admin");
};

const getRecords = async ()=>{
  const logicDriver = await getLogicDriver(logicId, baseWallet)
  const {records} = await logicDriver.routines.GetRecords();
  return records
}

const logic = {
  addRecord,
  addCourse,
  getRecords,
  getOwner,
  
};

// const logicDriver = await getLogicDriver(logicId, wallet);
// const ix = await logicDriver.routines.addCourse(recordId, courseName, courseGrade);
// //if to return something
// const {data} = await ix.result()
// return data
// //if not to return
// await ix.wait()

export default logic;

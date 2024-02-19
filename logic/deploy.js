require("dotenv").config();
const { VoyageProvider, Wallet, LogicFactory } = require("js-moi-sdk");
const recordAppManifest = require("./coco/academicrecordsplatform.json");

// ------- Update with your Mnemonic ------------------ //
const MNEMONIC = process.env.MNEMONIC;

// JsonRpcProvider to interact with MOI Network (Here we are using public RPC from Voyage)
const provider = new VoyageProvider("babylon");

// Function to instantiate a wallet with provider and sender account
const constructWallet = async () => {
  const wallet = new Wallet(provider);

  // The path derives your account from the mnemonic
  const accountPath = "m/44'/6174'/7020'/0/0";

  await wallet.fromMnemonic(MNEMONIC, accountPath);
  return wallet;
};

const deployRecordsAppLogic = async () => {
  // getting wallet To sign and send the ix to the network
  const wallet = await constructWallet();

  // Create logic instance using Logic factory
  const recordsAppLogic = new LogicFactory(recordAppManifest, wallet)
  // Deploy the logic get ixResponse
  const ixResponse = await recordsAppLogic.deploy("Init!", {
    fuelLimit: 5000,
  })
  console.log("-----Deploying Logic-----")
  console.log(ixResponse)


  // await ixResponse.wait() for ixReceipt

  const ixReceipt = await ixResponse.wait();
  console.log("-----Deployed Logic Successfully-----")
  console.log(ixReceipt);


   // Get the logic_id from ixReceipt and start making ixn from client app
  console.log("-----Logic ID-----");
  console.log(ixReceipt.extra_data.logic_id)
};

deployRecordsAppLogic();

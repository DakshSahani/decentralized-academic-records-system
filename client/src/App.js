import "./App.css";
import { useState } from "react";
import HomePage from "./pages/HomePage";

function App() {
  const [wallet, setWallet] = useState(true);

  return(
    <HomePage wallet={wallet} setWallet={setWallet} />
  )
}

export default App;

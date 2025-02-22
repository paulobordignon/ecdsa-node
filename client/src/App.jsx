import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        // GET PRIVATE KEY TO SIGN THE MESSAGE AND AUTHENTICATE THE TRANSACTION 
        privateKey = {privateKey}
        setPrivateKey = {setPrivateKey}
      />
      <Transfer setBalance={setBalance} privateKey={privateKey} />
    </div>
  );
}

export default App;

import { useState } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1" 
import { sha256 } from "ethereum-cryptography/sha256"
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils"

function Transfer({ privateKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    
    try {
      const msg = "sendBallance"
      const hashMsg = toHex(sha256(utf8ToBytes(msg)))
      //SIGN THE MESSAGE
      const signature = await secp.sign(hashMsg, privateKey)
      let publicKey = toHex(secp.getPublicKey(privateKey))

      const {
        data: { balance },
      } = await server.post(`send`, {
        msg: msg,
        signature: toHex(signature),
        senderPublicKey: publicKey,
        amount: parseInt(sendAmount),
        recipientAddress: recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="10"
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address like: fd795e05891f028c69c2fd03b961dbe887a17a5c"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;

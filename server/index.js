const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { hexToBytes, toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { sha256 } = require("ethereum-cryptography/sha256");

app.use(cors());
app.use(express.json());

const balances = {
  "aff9f6cf1adfe7a23e43993fc30ac25b41f54db4": 100,
  "fd795e05891f028c69c2fd03b961dbe887a17a5c": 50,
  "951257829b40bc01e083ec00ea60397005933917": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { msg, signature, senderPublicKey, amount, recipientAddress } = req.body;

  let messageHash = toHex(sha256(utf8ToBytes(msg)))
  // ONLY TRANSFER IF THE SENDER REALLY SIGN THE MESSAGE
  const isValid = secp.verify(signature, messageHash, senderPublicKey)

  if (isValid) {
    let publicKeyInBytes = hexToBytes(senderPublicKey)
    const hash = keccak256(publicKeyInBytes.slice(1));
    const senderAddress = toHex(hash.slice(12));
    setInitialBalance(senderAddress);
    setInitialBalance(recipientAddress);
    
    if (balances[senderAddress] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[senderAddress] -= amount;
      balances[recipientAddress] += amount;
      res.send({ balance: balances[senderAddress] });
    }
  } else {
    res.status(400).send({ message: "Not valid signature!" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

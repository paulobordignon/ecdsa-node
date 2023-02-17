const { keccak256 } = require("ethereum-cryptography/keccak");
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.utils.randomPrivateKey();
console.log("private key: ", toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);
console.log("public key: ", toHex(publicKey));

const hash = keccak256(publicKey.slice(1));
const address = toHex(hash.slice(12));
console.log("address: ", address);

/* 
private key:  f9e0cb9af6260f4590da5086bc474efc438bfed748a15e7aed25b7ba9756784b
public key:  04dd7c95b763985ab0ccda24165d12b69e26cf947457824029ab0333f0f31c3ba18212f517b8507ed771d63a5496f84646201076c871ebdafcc6279c417a1ad755
address:  aff9f6cf1adfe7a23e43993fc30ac25b41f54db4

private key:  cc196d92bbbd349efb40097b719d7c506169e38c7d15cf115d704cd43f3beaa8
public key:  043ead0f5a4e09d8b19db48b6e58576e20a9612d290cfa6c84591e7b2b5de8cec915ad18e450724be27ff7cc0a9a3c5601734302b436228a931d9a9bbc3ba4611e
address:  fd795e05891f028c69c2fd03b961dbe887a17a5c

private key:  49d1b6772de1e6108db3669045da19ba8e6b5dd35cb708b7dfa28f41fe5a3660
public key:  0456029338bc498294428cc922a6be32df591007a6809ae2497faa3019e4c3cf751eca38c7bc120210151185c9bb1172480197a7c5bda3171bcfec142e23db1b56
address:  951257829b40bc01e083ec00ea60397005933917

*/

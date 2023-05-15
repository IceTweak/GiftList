const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() { 
  const merkleTree = new MerkleTree(niceList);
  const proverName = process.argv.slice(2).join(" ");
  const nameIndex = niceList.findIndex(n => n === proverName);
  const proof = merkleTree.getProof(nameIndex);
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    prover: proverName,
    proof: proof,
  });

  console.log({ gift });
}

main();
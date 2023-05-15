const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');

const port = 1225;

const app = express();
app.use(express.json());

const niceList = require('../utils/niceList');
const merkleTree = new MerkleTree(niceList);
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = merkleTree.getRoot();

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {prover, proof} = req.body;
  const isInTheList = verifyProof(proof, prover, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

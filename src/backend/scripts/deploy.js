const { artifacts } = require("hardhat");
const { json } = require("react-router");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
const fs = require("fs");
  
  // Get the ContractFactories and Signers here.
  const NFT = await ethers.getContractFactory("NFT");
  
  const nft = await NFT.deploy();
  const marketplace = await ethers.getContractFactory("Marketplace");
  
  const Marketplace =  await marketplace.deploy(1);
  await Marketplace.deployed();
  const count = await Marketplace.getcount();
  console.log(count);
   const contractsDir = __dirname + "/../../frontend/contractsData";
   fs.mkdirSync(contractsDir); 
  const data = {
    name:"anjali",
    class:11,
    college:"csjm"
  }
  const jsondata = JSON.stringify(data,undefined,1);
  console.log(jsondata);
  const nft_artifacts = artifacts.readArtifactSync("NFT");
  const marketplace_artifacts = artifacts.readArtifactSync("Marketplace")
  const N_path = contractsDir + `/nft.json`;
  const m_path = contractsDir + `/marketplace.json`
  //console.log(artifactss)
  fs.writeFileSync(N_path,JSON.stringify(nft_artifacts,null,2))
  fs.writeFileSync(m_path,JSON.stringify(marketplace_artifacts,null,2))
  fs.writeFileSync(contractsDir + `/nft-address.json`,JSON.stringify({address:nft.address}))
  fs.writeFileSync(contractsDir + `/marketplace-address.json`,JSON.stringify({address:Marketplace.address}))
  
  
  
  // Save copies of each contracts abi and address to the frontend.
 
}



main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
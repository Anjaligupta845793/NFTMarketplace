require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.4",
   networks: {
   sepolia: {
        url:API_URL,
        accounts: [`0x${PRIVATE_KEY}`],
        chainId:11155111,
     }
  },
  
  paths: {
    
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
};

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Home } from "./Home";
import marketplace_address from "../contractsData/marketplace-address.json";
import marketplace_abi from "../contractsData/marketplace.json";
import nft_address from "../contractsData/nft-address.json";
import nft_abi from "../contractsData/nft.json";
import { Create } from "./Create";
import { ethers } from "ethers";
import { useState,useEffect } from "react";
import { Allnft } from "./Allnft";


import './App.css';

function App() {
  const [nft, setnft] = useState({});
  const [marketplaces, setmarketplaces] = useState({});
  useEffect(() => {
     data()
  }, [])
  
//fetching nft contract
 const data = async() => {
   const provider = new ethers.providers.Web3Provider(window.ethereum);
 const signer = provider.getSigner()
 const nftcontract = new ethers.Contract(nft_address.address, nft_abi.abi, signer);
 setnft(nftcontract)
 console.log(nft)
//fetching marketplace contract
const marketplace_contract = new ethers.Contract(marketplace_address.address, marketplace_abi.abi, signer);
setmarketplaces(marketplace_contract)

//console.log(marketplace_contract)
console.log(marketplaces);
 //const tokencount = await marketplaces.itemCount();
//console.log(tokencount.toNumber()) 

 }




 
      return (
        <div className='w-full h-screen '>
          <Home />
          <Create nft = {nft} market = {marketplaces} />
          <Allnft market = {marketplaces} nftdata ={nft}/> 
        </div>
      )
  
}

export default App;

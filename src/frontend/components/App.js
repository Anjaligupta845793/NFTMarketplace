import {
  BrowserRouter,
  Routes,
  Route,
  Router,
  Link
} from "react-router-dom";
import { Home } from "./Home";
import { Component } from "./New";
import { Create } from "./Create";
import { ethers } from "ethers";
import { useState,useEffect, useContext } from "react";
import { Allnft } from "./Allnft";
import { Purchasenft } from "./Purchasenft";
import {Listednft} from "./Listednft";
import { nftcontext } from "../context/nftcontext";



import './App.css';

function App() {
 const {loadlistednft,Listeditem} = useContext(nftcontext)
  useEffect(() => {
    
     
  }, [])
  
//handling change in account

//fetching nft contract
 




 
      return (
        
        <div >
          <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}/>
               <Route path="/Create" element={<Create/>}/>
              <Route path="/Listednft" element={<Listednft  Listeditem={loadlistednft}/>}/>
              <Route path="/Purchasednft" element={<Purchasenft />}/>
              <Route path="/Allnft" element={<Allnft />}/>
              
              

            
          </Routes>
          </BrowserRouter>
         
        </div>

      )
       
        
      
  
}

export default App;

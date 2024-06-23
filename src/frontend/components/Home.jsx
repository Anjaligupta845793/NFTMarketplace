import React, { useContext } from 'react'
import { ethers } from 'ethers';
import { useState,useEffect  } from 'react';
import { nftcontext } from '../context/nftcontext';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';
import { Button } from 'react-bootstrap';
import { button } from '@material-tailwind/react';

export const Home = () => {
  const {account,connectwallet} = useContext(nftcontext);
   
   const [openNav, setOpenNav] = React.useState(false);


  // Toggle function to handle the navbar's display
 
     useEffect(()=> {
          console.log(account)
     },[])
 
 
  return (
    <>
    <Navbar/>

      <section className="bg-gray-100 py-20 h-screen ">
        <div className="container flex flex-col items-center text-center gap-6 px-4 md:px-6 lg:flex-row lg:items-start lg:gap-12 mt-[150px] ">
          <div className="space-y-4 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
             Mint Your Own NFTS
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
               World's largest web3 marketplace for NFTs and crypto collectibles
            </p>
            {account ? <p>Address ....{account}</p> : (<Button onClick={connectwallet} className="bg-slate-500 border-none">connect</Button>)}
           
          </div>
          
        </div>
      </section>
      
 


    
      
    </>
  )



    
  
}


import React from 'react'
import { ethers } from 'ethers';
import { useState } from 'react';

export const Home = () => {
  const [account, setaccount] = useState([])
  const connectwallet = async() => {
          //const provider = await window.ethereum.Web3Provider(window.ethereum);
          const provider = new ethers.providers.Web3Provider(window.ethereum)
         const accounts =  await provider.send("eth_requestAccounts",[])
         setaccount(accounts[0]);
          const signer = await provider.getSigner();
          
  }
  return (
    <>
      <div >
             <nav className='container border-solid border-black border-1 md:max-w-[1493px] mt-5 h-[100px] pt-[40px]'>
                   <div className='flex justify-between '>
                    <h1>Marketplace</h1>
                    <ul className='flex justify-between gap-3 font-bold text-xl'>
                      <li>Create</li>
                      <li>Listeditem</li>
                      <li>Purchased</li>
                      <button className='border-1 border-solid border-black py-1 rounded-xl px-1 font-normal' onClick={connectwallet}>connect wallet</button>
                    </ul>
                   </div>
             </nav>
             <h1>account address : {account}</h1>
      </div>
    </>
  )
}


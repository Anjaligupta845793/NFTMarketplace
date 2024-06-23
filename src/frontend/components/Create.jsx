import axios from 'axios';
import { ethers } from 'ethers';
import React, { useContext } from 'react';
import { useState ,useEffect} from 'react';
import { nftcontext } from '../context/nftcontext';
import { Loader } from './Loader';



export  const Create = () => {
  const {mintandlist,submit,handlefiles,discription,name,price,submiting,loading} = useContext(nftcontext);
  useEffect(() => {
    
 
  
    
  }, [])
 
   

    
    
   
  
  return (
    <div className="w-full h-screen">
        <div  className="container m-auto lg:max-w-[1023px] md:max-w-[767px] ">
             
            <form action="" className=' flex flex-col  mt-[100px]  '>
               <h1 className='text-center font-bold text-3xl'>Mint and List NFT</h1>
                 {loading && <Loader className=" w-[50px] h-[50px] "/> }<input type="file" name="image" onChange={handlefiles} className="mb-3"  />
                 Name <input type="text" name="name" id="" placeholder='name' onChange={(e) => name.current = e.target.value} className='border-1 rounded border-solid
                  border-black mb-3 py-1 px-2' />
                 Discription <input type="text"  placeholder='discription'  name="discription" onChange={(e) => discription.current = e.target.value} className='border-1 border-solid
                  border-black mb-3 py-1 px-2 rounded'/>
                  
                 Price <input type="text" name="price" id=""  onChange={(e) => price.current = e.target.value} placeholder='price' className='border-1 border-solid
                  border-black mb-3 rounded py-1 px-2'/>
                 {submiting? <Loader/>:(
                  <button onClick={submit} className="bg-black text-white font-bold rounded py-2 w-[400px] mx-auto"  >Submit</button>
                 )}

            </form>
        </div>
        
    </div>
  )
}



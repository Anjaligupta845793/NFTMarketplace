import React, { useEffect } from 'react'
import { useContext } from 'react';
import { nftcontext } from "../context/nftcontext";
import { Link } from 'react-router-dom';
import { Loader } from './Loader';

export const Listednft = () => {
  const {listeditem,MyListLoader} = useContext(nftcontext) ;
  useEffect(() => {
    
  },[])
  return (
    <div>
        <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6 max-w-xl mx-auto lg:max-w-none">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h2 className="text-2xl font-bold tracking-tight">Shop by Category</h2>
            <p className="text-gray-500 dark:text-gray-400">Browse our selection of products by category.</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
         {
            MyListLoader ?<Loader/>:
             (
              listeditem.current.map((item,index) => (
                <div className="grid gap-4 relative w-[300px] rounded border-solid border-1 border-black group">
           
            <img
              alt="Apparel"
              className="rounded-lg object-cover w-full aspect-[1/1] group-hover:opacity-50 transition-opacity"
              height="450"
              src={item.image.current}
              width="400"
            />
            <div className="grid gap-1 px-2 py-2">
              <h3 className="font-semibold">{item.name.current}</h3>
              <p className="text-sm leading-none ">{item.discription.current}</p>
              <p className="text-sm leading-none">{item.price.current}</p>
              
            </div>
          </div>
            )) 
            )
           
          } 
           
          
        </div>
      </div>
    </section>
   </div>
  )
}


import React, { useEffect,useState } from 'react'

 export const Allnft = ({market,nftdata}) => {
    const [nft, setnft] = useState();
    const [img, setimg] = useState("")
    useEffect(() => {
            getting_nft()
    },[])
    const getting_nft = async() => {
        const nfts =  await market.itemCount();
        console.log("numbers of nfts")
        const nftnumber =  nfts.toNumber();
        let nft = [];
        for (let index = 1; index <= nftnumber; index++) {
            const ntt = await market.items(index);
            console.log(ntt.tokenid.toNumber());
            const uri = await nftdata.tokenURI(ntt.tokenid);
            console.log(uri);
            const response = await fetch(uri);
            const metadata = await response.json();
            console.log("response");
            nft.push({
                discription :metadata.discription,
                img:metadata.image,
                name:metadata.name,
                price:metadata.price

            });
            
                
            }
            setnft(nft);
        //console.log(nft);

        }

    
  return (
    <div>
        <p className="text-center font-bold text-2xl ">All listed nfts</p>
    <div className="container grid mt-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 lg:max-w-[ 1023px]
      md:max-w-[767px]  ">
        
          {
            nft.map((item,index) => (
                <div className=' border-solid border-black border-2'>
                     <p>{item.discription}</p> 
                     <img src={item.img} alt="" className="w-[200px] h-[300px]"/>
                     <p>{item.name}</p>
                     <p>{item.price}</p>
                </div>
            ))
           
          }
           
    </div>
   </div> 
  )
  }


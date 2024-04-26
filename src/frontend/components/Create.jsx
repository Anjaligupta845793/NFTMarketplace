import axios from 'axios';
import { ethers } from 'ethers';
import React from 'react';
import { useState ,useEffect} from 'react';


export  const Create = ({nft,market}) => {
  useEffect(() => {
    
  console.log(market)
  
    
  }, [])
  
   const [image, setimage] = useState("");
   const [name, setname] = useState("");
   const [discription, setdiscription] = useState("");
   const [price, setprice] = useState(null);

    
    
   
   const handlefiles =async(e) => {
    
        e.preventDefault();
      const file = e.target.files[0];
      if (typeof file !== 'undefined'){
         try {
        const filedata = new FormData();
        filedata.append("file",file);
        console.log("gonna fetch")
        const responsedata = await axios({
          method:"post",
          url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: filedata,
          headers :{
            pinata_api_key: "2bbe57d01fe1d1503172",
            pinata_secret_api_key: "bde386ad667f4643e976f67ec156351f4b5b777022adbc7c56ae5e4670c404ab",
            "Content-Type":"multipart/form-data",
          }
        })
        console.log("fetching url");
        console.log(responsedata);
        const fileurl = "https://gateway.pinata.cloud/ipfs/" + responsedata.data.IpfsHash;
        console.log(fileurl);
        setimage(fileurl)

      } catch (error) {
        console.log(error)
      }
      }
      else {
        console.log("we didn't get the file path")
      }
           } 


     const submit = async(e) => {
        e.preventDefault();
      
         try {
        
          const jsondata = JSON.stringify({name,discription,image,price});
          console.log("gonna fetch")
          const responsedata = await axios({
          method:"POST",
          url:"https://api.pinata.cloud/pinning/pinJSONToIPFS",
          data: jsondata,
          headers :{
            pinata_api_key: "2bbe57d01fe1d1503172",
            pinata_secret_api_key: "bde386ad667f4643e976f67ec156351f4b5b777022adbc7c56ae5e4670c404ab",
            "Content-Type":"application/json",
          }
        })
        console.log("fetching url");
        console.log(responsedata);
        const fileurl = "https://gateway.pinata.cloud/ipfs/" + responsedata.data.IpfsHash;
        console.log(fileurl)
        mintandlist(fileurl);
       

      } catch (error) {
        console.log(error)
      }
      
      
       
    };   
    const mintandlist = async(fileurl) => {
      await(await nft.mintnft(fileurl)).wait;
        console.log("minted successfully!");
      
       const id =  await nft.tokens();
       console.log("token id ...")
       console.log(id);
       console.log("approving nft to marketplace ...")
       await(await nft.setApprovalForAll(market.address , true)).wait();
      console.log("converting eth to weii...")
       const listing_price = ethers.utils.parseEther(price.toString());
       console.log("listing the nft to marketplace...")
       console.log(id);
       console.log(nft.address)
       console.log(listing_price)
       await(await market.listitem(id, nft.address, listing_price,{gasLimit:300000})).wait();
       console.log("it's confirmed!!!!!")
    }    
  return (
    <div>
        <div >
            <form action="" className='container flex flex-col '>
                 <input type="file" name="image" onChange={handlefiles} />
                 name <input type="text" name="name" id="" placeholder='name' onChange={(e) => setname(e.target.value)} className='border-1 border-solid
                  border-black' />
                 discription <input type="text"  placeholder='discription' name="discription" onChange={(e) => setdiscription(e.target.value)} className='border-1 border-solid
                  border-black'/>
                 price <input type="text" name="price" id=""  onChange={(e) => setprice(e.target.value)} placeholder='price' className='border-1 border-solid
                  border-black'/>
                 <button onClick={submit} >mint and list on marketplace</button>

            </form>
        </div>
    </div>
  )
}



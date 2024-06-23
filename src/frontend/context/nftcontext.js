import { Children, createContext, useEffect,useState ,useRef} from "react";
import React from "react";
import marketplace_address from "../contractsData/marketplace-address.json";
import marketplace_abi from "../contractsData/marketplace.json";
import nft_address from "../contractsData/nft-address.json";
import nft_abi from "../contractsData/nft.json";
import { ethers } from "ethers";
import axios from "axios";

 export const nftcontext = React.createContext();
export const NFtprovider = ({children} ) => {
     const data = useRef([]);
     const nfts = useRef();
     const marketplaces = useRef();
     const [account, setAccount] = useState(null);
     
    const nft = useRef([]);
     const image = useRef("");
    
     const [AllnftLoader, setAllnftLoader] = useState(true);
     const [submiting, setsubmiting] = useState(false);
    const [PurnftLoader, setPurnftLoader] = useState(true);
    const [MyListLoader, setMyListLoader] = useState(true)
     const name = useRef("");
     const discription = useRef("");
     const price = useRef(null);
     const purchasenft = useRef([]);
     const listeditem = useRef([]);
     const [loading, setloading] = useState(false);
     
     const [purchasebutton, setpurchasebutton] = useState(false)

  
       useEffect(async() => {
           
           fetching_contracts();
           console.log(nfts.current)

           console.log(marketplaces.current)
           
           console.log(account)
            console.log(`this is allnft market data `) ;
            console.log("the events data")
           if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return() => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
           
      
       
     
  },[account])
      

      const fetching_contracts = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
 const signer = provider.getSigner()
 const nftcontract = new ethers.Contract(nft_address.address, nft_abi.abi, signer);
 nfts.current = nftcontract
 console.log(`nft raw data ${nftcontract}`)
 //console.log(nftcontract)
 console.log(`this is the nft${nfts}`)
//fetching marketplace contract
const marketplace_contract = new ethers.Contract(marketplace_address.address, marketplace_abi.abi, signer);
marketplaces.current = marketplace_contract;
console.log("nft contract")

console.log(`this is the ${marketplaces}`);
 
 
 

 }
  
      function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
     
    } else {
      
      setAccount(null);
    }
  }
      const connectwallet = async() => {
          //const provider = await window.ethereum.Web3Provider(window.ethereum);
          if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        //const providers = new ethers.providers.Web3Provider(window.ethereum);
        
        
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const accounts = await signer.getAddress();
        setAccount(accounts);
        console.log(accounts)
        loadlistednft(accounts);
        console.log(listeditem)
        purchasednft(accounts);

        console.log("Metamask Connected : " + accounts);
        
        
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser")
    }
  
          getting_nft()
          
          
          console.log(data.current)
          console.log("consoling nfts states");
          console.log(nft)
          console.log(account)
          console.log("loading listed nfts");
          
          console.log(listeditem)
          
  }
      const getting_nft = async() => {
            //const provider = new ethers.providers.Web3Provider(window.ethereum)
           console.log(marketplaces)
            const nftCount =  await marketplaces.current.itemCount(); 
            console.log("numbers of nfts")
            console.log(nftCount.toNumber())
            console.log(account)
           
        const nftnumber =  nftCount.toNumber();
        let nftitem = [];
        for (let index = 1; index <= nftnumber; index++) { 
            const ntt = await marketplaces.current.items(index);
            console.log(ntt.tokenid.toNumber());
            
            
            const itemid = ntt.itemid;
              console.log("consoleing itemid..")
              console.log(itemid)
            console.log("consoling status of nft");
            
            if(!ntt.sold ){
            const uri = await nfts.current.tokenURI(ntt.tokenid);
            console.log(uri);
            const response = await fetch(uri);
            const metadata = await response.json();
            const totalprice = await marketplaces.current.getTotalPrice(ntt.itemid);
            console.log("response");
            nftitem.push({
                totalprice,
                discription :metadata.discription,
                img:metadata.image,
                name:metadata.name,
                price:metadata.price,
                itemid:itemid

            });
            
                
            }
            
            }
           // console.log(nftdata)
             nft.current = nftitem;
            console.log("console the nftss")
            console.log(nft);
            setAllnftLoader(false);
            
        //console.log(nft);
        }
      const purchase_nft = async(item) => {
        setpurchasebutton(true)
       const itemii = item.totalprice;
       console.log(itemii);
       console.log(item.itemid);
       console.log(marketplaces.current)
        await (await marketplaces.current.purchaseitem(item.itemid,{gasLimit:300000,value: item.totalprice})).wait() 
        console.log("it's purchased");
        setpurchasebutton(false)
        window.location.reload()
              }  
      const handlefiles =async(e) => {
      setloading(true)
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
        image.current = fileurl;
        console.log("consoleinge image....")
        console.log(image);
         setloading(false)
       

      } catch (error) {
        console.log(error)
      }
      }
      else {
        console.log("we didn't get the file path")
      }
           } 
    

     const submit = async(e) => {
       
        setsubmiting(true);
         try {
          console.log(name.current,image.current,discription.current,price.current);
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
        setsubmiting(false);
        
       
       

      } catch (error) {
        console.log(error)
      }
      
      
       
    };   
     const mintandlist = async(fileurl) => {
      await(await nfts.current.mintnft(fileurl)).wait;
        console.log("minted successfully!");
      
       const id =  await nfts.current.tokens();
       console.log("token id ...")
       console.log(id);
       console.log("approving nft to marketplace ...")
       await(await nfts.current.setApprovalForAll(marketplaces.current.address , true)).wait();
      console.log("converting eth to weii...")
       const listing_price = ethers.utils.parseEther(price.current.toString());
       console.log("listing the nft to marketplace...")
       console.log(id);
       console.log(nfts.current.address)
       console.log(listing_price)
       await(await marketplaces.current.listitem(id, nfts.current.address, listing_price,{gasLimit:300000})).wait();
       console.log("it's confirmed!!!!!");
       window.location.reload() 
    }  
    const purchasednft = async(_accounts) => {
      const purchasenfts = [];
      marketplaces.current.on("bought", (itemid,tokenid,nft,seller,price,buyer)=>{

        let transferEvent ={
            itemid:itemid,
            tokenid:tokenid,
            nft:nft,
            seller:seller,
            price:price,
            buyer:buyer
        }

        console.log(JSON.stringify(transferEvent, null, 4))

    })
    console.log(_accounts)
    const filter = marketplaces.current.filters.bought(null,null,null,null,null,_accounts);
    console.log(filter)
    const result = await marketplaces.current.queryFilter(filter)  ;
    console.log(result)
   
     const purchases = await Promise.all(result.map(async i => {
      i = i.args
      const uri = await nfts.current.tokenURI(i.tokenid);
      console.log(uri);
      const response = await fetch(uri);
      console.log(response)
      const totalprice = await  marketplaces.current.getTotalPrice(i.tokenid);
      //const price = totalprice.toNumber();

      const metadata = await response.json();
      console.log(metadata)
      purchasenfts.push( {
        totalprice,
        tokenid:i.tokenid,
        itemid:i.itemid,
        name:metadata.name,
        image:metadata.image,
        discription:metadata.discription,
        
      })
      
      
     })) 
     
     purchasenft.current = purchasenfts;
     console.log(purchasenft);
     setPurnftLoader(false)
    } 
    const loadlistednft = async(_account) => {
      console.log("loadlistednft starting")
      const items = await marketplaces.current.itemCount();
      console.log(items)
      const num_items = items.toNumber();
       const provider = new ethers.providers.Web3Provider(window.ethereum);
        
      console.log(num_items)
      let listeditems = [];
      for (let index = 1; index <= items; index++) {
        const i = await marketplaces.current.items(index);
        console.log("i can't go futher")
        console.log(_account)
        console.log(i.seller === _account)
        
        if(i.seller === _account){
          const uri = await nfts.current.tokenURI(i.tokenid);
         console.log(uri );
         const response = await fetch(uri);
         console.log(response);
         const total = await marketplaces.current.getTotalPrice(i.itemid)
         const metadata = await response.json();
         console.log(metadata);
         listeditems.push( 
          {
            total,
            price:metadata.price,
            name:metadata.name,
            discription:metadata.discription,
            image:metadata.image
          })
         
        }
        
       listeditem.current = listeditems; 
      console.log(listeditem);
      setMyListLoader(false)
      }
      
      
    }
    
    
    

   return (
    <nftcontext.Provider value={{nfts,
      purchasebutton,
    marketplaces,
    connectwallet,
    account,
    nft,
    listeditem,
    purchase_nft,
    mintandlist,
    submit,
    handlefiles,
    name,
    image,
    AllnftLoader,
    MyListLoader,
    PurnftLoader,
    discription,
    price,
    purchasenft,
    purchasednft,
    submiting,
   loading,
    loadlistednft}}>
        {children}
        </nftcontext.Provider>
   )
}
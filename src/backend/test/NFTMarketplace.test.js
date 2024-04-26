const {expect} = require("chai");
const { ethers } = require("hardhat");
//const { ethers } = require("ethers");
const towei = (num) => ethers.utils.parseEther(num.toString());
const toeth = (num) => ethers.utils.formatEther(num)
describe("NFT Marketplace" ,  function(){
  let NFT;
  let nft;
  let marketplace;
  let Marketplace;
  let feepercent = 1;
  let add1;
  let add2;
  let addrs;
  let owner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  let tokenuri = "tokenuri"
  let itemcount = 1;
  beforeEach(async () => {
     NFT =  await ethers.getContractFactory("NFT")
     Marketplace =  await ethers.getContractFactory("Marketplace");
     [add1,add2,...addrs] = await ethers.getSigners();
     nft = await NFT.deploy();
     marketplace = await Marketplace.deploy(feepercent);
  })
  describe("deployment of contract" , function(){
    it("it should check the name and symbol of nft",async() => {
      let name = "AN";
      let symbol = "ANFT";
       expect(await nft.name()).to.equal(name);
       expect(await nft.symbol()).to.equal(symbol);
    })
    it("it would check the price" , async() => {
      expect(await marketplace.feePercent()).to.equal(1);
      

    })
    it("it would check the owner of the contreact", async() => {
      expect(await marketplace.feeAccount()).to.equal(owner);
    })
  })
  describe("minting the nft..",function(){
    //minting from the first account
     it("it would mint  the nft from first account", async() => {
      await nft.connect(add1).mintnft(tokenuri);
      expect(await nft.tokens()).to.equal(itemcount);
      expect(await nft.balanceOf(add1.address)).to.equal(1)
      expect(await nft.tokenURI(1)).to.equal(tokenuri)

      await nft.connect(add2).mintnft(tokenuri);
      expect(await nft.tokens()).to.equal(2);
      expect(await nft.balanceOf(add2.address)).to.equal(1)
      expect(await nft.tokenURI(2)).to.equal(tokenuri)
      
     })
    // minting from the second account
     
     
  })
  describe("it would list the nft in nftmarketplace",function(){
      let price = 2;
      beforeEach(async function(){
          await nft.connect(add1).mintnft(tokenuri);
          await nft.connect(add1).setApprovalForAll(marketplace.address,true)
          
      });
      it("it will track the newly created item and list it to marketplace" , async function(){
            expect(await marketplace.connect(add1).listitem(1,nft.address,towei(price))).to.emit(marketplace,"offered").withArgs(
              1,
              1,
              nft.address,
              add1,
              towei(price)
              
            )
            expect(await nft.ownerOf(1)).to.equal(marketplace.address);
            expect( await marketplace.itemCount()).to.equal(1);
            const item = await marketplace.items(1);
            expect( item.itemid).to.equal(1);
            expect(item.tokenid).to.equal(1);
            expect(item.nft).to.equal(nft.address);
            
            expect(item.price).to.equal(towei(price));
            expect(item.sold).to.equal(false)
      })
  })
  describe("it would check the purchase nft function" ,function() {
      beforeEach(async function(){
        await nft.connect(add1).mintnft(tokenuri);
        await nft.connect(add1).setApprovalForAll(marketplace.address,true);
        await nft.connect(add1).listitem(1,nft.address, towei(price))
      })
      it("it would check the all functnlity",async function() {
        expect( await marketplace.connect(add2).purchaseitem(1)).emit(marketplace,"bought").to.withArgs
      })
  })
})
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


import "hardhat/console.sol";


contract Marketplace is ReentrancyGuard {
    address payable public feeAccount;//fees that account will receieve
    uint public  feePercent;//the percentage that marketplace receving
    uint public itemCount;
    constructor(uint _feepercent){
          feePercent = _feepercent;
          feeAccount = payable(msg.sender);
    }

    
    struct item {
        uint itemid;
        uint tokenid;
        IERC721 nft;
        address payable seller;
        uint price;
        bool sold;
    }
    mapping(uint => item) public items;
    event offered(
        uint itemid,
        uint  tokenid,
        address indexed nft,
        address indexed seller,
        uint price
        
    );
    event bought(
        uint  itemid,
        uint tokenid,
        address indexed nft,
        address indexed seller,
        uint price,
        address indexed buyer
        
    );
    function listitem(uint tokenid ,IERC721 nft , uint price) external nonReentrant {
        itemCount++;
        nft.transferFrom(msg.sender,address(this),tokenid);
        items[itemCount] = item(
            itemCount ,
            tokenid,
            nft, 
            payable(msg.sender) ,
            price ,
            false
        );
        emit offered(
            itemCount,
            tokenid,
            address(nft),
            msg.sender,
            price
        );

    }
    function purchaseitem(uint itemid ) external  payable nonReentrant{
        uint totalprice = getTotalPrice(itemid);
        item storage nft =   items[itemid] ;
        require(msg.value >= totalprice, "you doesn't have enough money");
        require(!nft.sold,"nft is already sold");
        nft.seller.transfer(nft.price);
        feeAccount.transfer(totalprice - nft.price);
        nft.nft.transferFrom(address(this),msg.sender,nft.tokenid);
        nft.sold = true;
        emit bought(
          itemCount,
          nft.tokenid,
          address(nft.nft),
          payable(nft.seller),
          nft.price,
          msg.sender
        
    );

    }
    function getTotalPrice(uint _itemId) view public returns(uint){
        return((items[_itemId].price*(100 + feePercent))/100);
    }
    function getcount() public view returns(uint){
        return itemCount;
    }

}
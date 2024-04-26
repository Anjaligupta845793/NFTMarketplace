// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


import "hardhat/console.sol";

/* contract Marketplace is ReentrancyGuard {

    // Variables
    address payable public immutable feeAccount; // the account that receives fees
    uint public immutable feePercent; // the fee percentage on sales 
    uint public itemCount; 

    struct Item {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        bool sold;
    }

    // itemId -> Item
    mapping(uint => Item) public items;

    event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );
    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );

    constructor(uint _feePercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    // Make item to offer on the marketplace
    function makeItem(IERC721 _nft, uint _tokenId, uint _price) external nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        // increment itemCount
        itemCount ++;
        // transfer nft
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        // add new item to items mapping
        items[itemCount] = Item (
            itemCount,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            false
        );
        // emit Offered event
        emit Offered(
            itemCount,
            address(_nft),
            _tokenId,
            _price,
            msg.sender
        );
    }

    function purchaseItem(uint _itemId) external payable nonReentrant {
        uint _totalPrice = getTotalPrice(_itemId);
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require(msg.value >= _totalPrice, "not enough ether to cover item price and market fee");
        require(!item.sold, "item already sold");
        // pay seller and feeAccount
        item.seller.transfer(item.price);
        feeAccount.transfer(_totalPrice - item.price);
        // update item to sold
        item.sold = true;
        // transfer nft to buyer
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);
        // emit Bought event
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }
    function getTotalPrice(uint _itemId) view public returns(uint){
        return((items[_itemId].price*(100 + feePercent))/100);
    }
} */
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
        require(msg.value > totalprice, "you doesn't have enough money");
        require(!nft.sold,"nft is already sold");
        nft.seller.transfer(nft.price);
        feeAccount.transfer(totalprice-nft.price);
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
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    uint public tokens = 1;
    constructor() ERC721("AN" , "ANFT"){}
    function mintnft(string memory _tokenURI) external returns(uint256){
        
        _safeMint(msg.sender,tokens);
        _setTokenURI(tokens,_tokenURI);
         tokens++;
        return(tokens);
    }
}
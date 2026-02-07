// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RentofyContract {
    string public ownerName;
    uint256 public rentalPrice;
    uint256 public maxRentingTime;
    uint256 public lateReturnFee;

    struct RentingInfo {
        bool isRenting;
        uint256 rentalTime;
        uint256 expectedReturnTime;
        string renterName;
    }

    struct Products {
        string ownerName;
        string[] itemName;
    }

    mapping(address => Products) public productOwner;
    mapping(string => RentingInfo) public rentingInfo;

    constructor(
        string memory _ownerName,
        string[] memory _ownerProducts,
        uint256 _rentalPrice,
        uint256 _maxRentingTime,
        uint256 _lateReturnFee
    ) 
    {
        ownerName = _ownerName;
        productOwner[msg.sender] = Products(_ownerName, _ownerProducts);
        rentalPrice = _rentalPrice; // In terms of INR
        maxRentingTime = _maxRentingTime; //give it in the terms of days...
        lateReturnFee = _lateReturnFee; // In terms of INR
    }

    function rent(string memory _renterName) external {
        uint256 timeInDays = block.timestamp / 86400;
        for (uint256 i; i < productOwner[msg.sender].itemName.length; i++) {
            require(
                !rentingInfo[productOwner[msg.sender].itemName[i]].isRenting,
                "Already renting"
            );
            rentingInfo[productOwner[msg.sender].itemName[i]] = RentingInfo(
                true,
                timeInDays,
                timeInDays + maxRentingTime,
                _renterName
            );
        }
    }

    function returnItem() external {
        uint256 timeInDays = block.timestamp / 86400;

        for (uint256 i; i < productOwner[msg.sender].itemName.length; i++) {
            require(rentingInfo[productOwner[msg.sender].itemName[i]].isRenting, "Not renting");
            uint256 lateFee = 0;
            if (
                timeInDays > rentingInfo[productOwner[msg.sender].itemName[i]].expectedReturnTime
            ) {
                lateFee =
                    (timeInDays -
                        rentingInfo[productOwner[msg.sender].itemName[i]].expectedReturnTime) *
                    lateReturnFee;
            }
            delete rentingInfo[productOwner[msg.sender].itemName[i]];
        }
    }
}

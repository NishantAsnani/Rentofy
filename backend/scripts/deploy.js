const { ethers, run, network } = require("hardhat")

async function main() {
    const rentofyContractFectory = await ethers.getContractFactory("RentofyContract")
    console.log("Deploying contract...")

    // string memory _ownerName,
    // string[] memory _ownerProducts,
    // uint256 _rentalPrice,
    // uint256 _maxRentingTime,
    // uint256 _lateReturnFee

    const rentofyContract = await rentofyContractFectory.deploy("Nishant", ["Rocket", "GSLV"], 100000, 10, 10000)
    // const rentofyContract = await rentofyContractFectory.deploy("Neel", ["Rocket", "GSLV"], 100000, 10, 10000)




    // const rentofyContract = await rentofyContractFectory.deploy()
    await rentofyContract.deployed()
    console.log(`Deployed contract to: ${rentofyContract.address}`)

    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    //   const currentValue = await simpleStorage.retrieve()
    //   console.log(`Current Value is: ${currentValue}`)

    //   // Update the current value
    //   const transactionResponse = await simpleStorage.store(7)
    //   await transactionResponse.wait(1)
    //   const updatedValue = await simpleStorage.retrieve()
    //   console.log(`Updated Value is: ${updatedValue}`)
}

const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

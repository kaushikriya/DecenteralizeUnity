const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("MultiSignatureContract");
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log('deployed')

  console.log(
    `Contract deployed at ${contract.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

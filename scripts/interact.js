const API_KEY = process.env.ALCHEMY_API_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY;

const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "rinkeby"),
  API_KEY
);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract Instance
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
);
async function main() {
  const message = await helloWorldContract.message();
  console.log(`The message is ${message}`);

  console.log(`Updating the message`);
  const tx = await helloWorldContract.update(`This is the new message`);
  await tx.wait();

  const tx2 = await helloWorldContract.favoriteNumber(6);
  await tx2.wait();

  const favoriteNumber = await helloWorldContract.retrieve();
  const newMessage = await helloWorldContract.message();
  console.log(
    `The new message is: ${newMessage} and your favorite number is ${favoriteNumber}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

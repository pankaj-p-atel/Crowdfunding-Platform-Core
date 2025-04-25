const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🚀 Deploying CrowdFund contract with:", deployer.address);

  const CrowdFund = await hre.ethers.getContractFactory("CrowdFund");
  const contract = await CrowdFund.deploy();
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log("✅ CrowdFund deployed at:", contractAddress);

  // 🧪 OPTIONAL: Launch a campaign
  const goal = hre.ethers.parseEther("1"); // 1 ETH goal
  const duration = 60 * 60 * 24 * 3; // 3 days
  const tx = await contract.launch(goal, duration);
  await tx.wait();
  console.log("📢 Campaign launched with goal:", goal.toString(), "and duration:", duration);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

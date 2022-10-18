require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
    solidity: {
        version: "0.8.12",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    dependencyCompiler: {
        paths: ["@tableland/evm/contracts/TablelandTables.sol"],
    },
    contractSizer: {
        alphaSort: true,
        disambiguatePaths: false,
        runOnCompile: false,
        strict: true,
        only: [],
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
    },
    networks: {
        mumbai: {
            url: `https://polygon-mumbai.g.alchemy.com/v2/`,
            accounts: [""],
        },
    },
    etherscan: {
        apiKey: "",
    },
}
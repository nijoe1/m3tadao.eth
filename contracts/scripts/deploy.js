// scripts/deploy_upgradeable_box.js
const { ethers, upgrades } = require("hardhat");

async function main() {


    const M3taDao = await ethers.getContractFactory("m3taDao");
    console.log("Deploying m3taDao...");

    const m3taDao = await M3taDao.deploy("0xD504d012D78B81fA27288628f3fC89B0e2f56e24");

    await m3taDao.deployed();
    console.log("m3taDao deployed to:", m3taDao.address);

    // // Deploying the m3taSuperTreasure
    let HOST = '0xEB796bdb90fFA0f28255275e16936D25d3418603';
    let MATICx = '0x96B82B65ACF7072eFEb00502F45757F254c2a0D4';
    let GELATO_OPS = '0xB3f5503f93d5Ef84b06993a1975B9D21B962892F';
    let GELATO_TREASURY = '0x527a819db1eb0e34426297b03bae11F2f8B3A19E';

    const M3taSuperTreasure = await ethers.getContractFactory("m3taSuperTreasure");
    console.log("Deploying m3taSuperTreasure...");
    const m3taSuperTreasure = await M3taSuperTreasure.deploy(HOST, MATICx, GELATO_OPS, GELATO_TREASURY);

    await m3taSuperTreasure.deployed();

    console.log("m3taSuperTreasure deployed to:", m3taSuperTreasure.address);

}

main();
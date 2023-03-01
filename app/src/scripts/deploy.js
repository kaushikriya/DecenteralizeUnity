import { ethers } from 'ethers';
import { contractAddress } from '../constants/util';
import contractAbi from '../constants/contractAbi.json'

export default async function deploy(signer, value, name, description) {
    const factory = new ethers.ContractFactory(
      contractAbi.abi, contractAbi.bytecode,
      signer
    );
    return factory.deploy(name, description, {value});
  }
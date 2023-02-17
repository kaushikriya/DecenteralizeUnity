import React, { useEffect, useState } from "react";
import { contractAddress } from "../constants/util";
import * as contractAbi from "../constants/contractAbi.json";
import { ethers } from "ethers";
import deploy from "../scripts/deploy";

export const ContractContext = React.createContext();

const { ethereum } = window;

const getSignatureContract = () => {
  console.log("getting signature contract");
  const provider = new ethers.providers.Web3Provider(ethereum);
  console.log(provider);
  const signer = provider.getSigner();
  console.log(signer);
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);

  console.log(provider, signer, contract);
};

export const ContractProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [signer, setSigner] = useState();
  const [amount, setAmount] = useState();
  const [contracts, setContracts] = useState();

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  const createContract = async () => {
    if (!amount) {
      return alert("Please enter the amount");
    }
    const multiSignatureContract = await deploy(signer, amount);
    console.log(multiSignatureContract.address);

    // const contract = {
    //   owner: signer,
    //   address: multiSignatureContract.address,
    //   requiredAmount: amount,
    //   participants: [signer],
    //   addParticipants: await multiSignatureContract
    //     .connect(signer)
    //     .addParticipant(),
    // };

    // setContracts([...contracts, contract]);
    // console.log(contracts);
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask");
      } else {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        const provider = new ethers.providers.Web3Provider(ethereum);
        if (accounts.length) {
          setCurrentAccount(accounts[0]);
          setSigner(provider.getSigner());
          console.log(accounts);
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error("Could not connect with ethereum");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask");
      } else {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContractContext.Provider
      value={{
        checkIfWalletIsConnected,
        connectWallet,
        getSignatureContract,
        createContract,
        currentAccount,
        handleAmount,
        contracts,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

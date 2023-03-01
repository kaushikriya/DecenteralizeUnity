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
  const [contracts, setContracts] = useState([]);
  const [contractForm, setContractForm] = useState();

  const handleFormData = (e) => {
    console.log(e.target.value, e.target.name);
    setContractForm({ ...contractForm, [e.target.name]: e.target.value });
  };

  // const handleAmount = (event) => {
  //   setAmount(event.target.value);
  // };

  const addParticipant = async (contract, _signer, value, key) => {
    console.log("Adding participant");
    const addParticipantTxn = await contract
      .connect(_signer)
      .addParticipant({ value });
    await addParticipantTxn.wait();
  };

  const addTransaction = async (
    contract,
    name,
    description,
    amount,
    _signer
  ) => {
    console.log("Adding Transaction");
    const addParticipantTxn = await contract
      .connect(_signer)
      .createTransaction(name, description, amount);
    await addParticipantTxn.wait();
  };

  const getParticipants = async (contract, _signer) => {
    console.log("gettingParticipants");
    const allParticipants = await contract
      .connect(_signer)
      .getAllParticipants();
    console.log(allParticipants);
    return allParticipants;
  };

  const getTransactions = async (contract, _signer) => {
    console.log("getting transactions");
    const transactions = await contract.connect(_signer).getTransactions();
    console.log(transactions);
    return transactions;
  };

  const confirmTransaction = async (contract, _signer, transactionId) => {
    await contract.connect(_signer).confirmTransaction(transactionId);
  };

  const createContract = async () => {
    try {
      if (!contractForm.amount) {
        return alert("Please enter the amount");
      }
      const multiSignatureContract = await deploy(
        signer,
        // amount,
        // "Test",
        // "Please fix me"
        contractForm.amount,
        contractForm.name,
        contractForm.description
      );
      console.log(multiSignatureContract.address);

      await multiSignatureContract.deployed();

      if (multiSignatureContract) {
        const contract = {
          owner: signer,
          address: multiSignatureContract.address,
          contractInfo: contractForm,
          handleAddParticipant: async (key) => {
            console.log("handling", key);
            await addParticipant(
              multiSignatureContract,
              signer,
              contractForm.amount,
              key
            );
          },
          getParticipants: () => {
            return getParticipants(multiSignatureContract, signer);
          },
          getTransactions: () => {
            return getTransactions(multiSignatureContract, signer);
          },
          handleAddTransaction: async (name, description, amount) => {
            await addTransaction(
              multiSignatureContract,
              name,
              description,
              amount,
              signer
            );
          },
          confirmTransaction: async (transactionId) => {
            await confirmTransaction(
              multiSignatureContract,
              signer,
              transactionId
            );
          },
        };

        setContracts([...contracts, contract]);
        console.log(contracts);
      }
    } catch (e) {
      console.log(e);
      throw new Error("Could not create contract");
    }
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
        contracts,
        handleFormData,
        contractFormData: { contractForm },
        setContractForm,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

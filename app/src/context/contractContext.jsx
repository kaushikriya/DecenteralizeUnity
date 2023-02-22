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
  const [contracts, setContracts] = useState([]);
  const [contractForm, setContractForm] = useState();

  const handleFormData = (e) => {
    console.log(e.target.value, e.target.name);
    setContractForm({ ...contractForm, [e.target.name]: e.target.value });
  };

  const handleAmount = (event) => {
    console.log(event.target.value);
    setContractForm({
      ...contractForm,
      [event.target.name]: event.target.value,
    });
  };

  const addParticipant = async (contract, _signer, value, key) => {
    console.log("Adding participant");
    const addParticipantTxn = await contract
      .connect(_signer)
      .addParticipant({ value });
    await addParticipantTxn.wait();
    getParticipants(contract, _signer, key);
  };

  const getParticipants = async (contract, _signer, key) => {
    console.log("gettingParticipants");
    const allParticipants = await contract
      .connect(_signer)
      .getAllParticipants();
    const newContracts = contracts;

    console.log(allParticipants, newContracts, key);
    newContracts[key].participants = allParticipants;
    setContracts([...newContracts]);
  };

  const createContract = async () => {
    try {
      if (contractForm.amount == 0) {
        return alert("Please enter the amount");
      }
      const multiSignatureContract = await deploy(
        signer,
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
          requiredAmount: contractForm.amount,
          participants: [],
          handlelAddParticipant: async (key) => {
            console.log("handling", key);
            await addParticipant(
              multiSignatureContract,
              signer,
              contractForm.amount,
              key
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
        handleAmount,
        setContractForm,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

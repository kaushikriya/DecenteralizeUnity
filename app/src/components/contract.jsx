import React, { useContext, useEffect, useState } from "react";
import CreateTransaction from "./createTransaction";
import Participants from "./participants";
import Transactions from "./transactions";
import ethLogo from "../assets/images/ethereum-eth-logo.png";
import joinLogo from "../assets/images/join.png";
import participantsLogo from "../assets/images/participants.png";
import showTransactions from "../assets/images/show-transactions.jpg";
import showParticipants from "../assets/images/show-participants.png";
import createTransactionLogo from "../assets/images/createTransaction.png";
import { ContractContext } from "../context/contractContext";

export const Contract = ({ contract, index }) => {
  const [participants, setParticipants] = useState([]);
  const [showParticipants, setShowParticipants] = useState(false);
  const [transactions, setTransactions] = useState();
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [isMember, setIsMember] = useState(true);

  const { currentAccount } = useContext(ContractContext);

  // useEffect(() => {
  //   const getParticipants = async () => {
  //     const allParticipants = await contract.getParticipants();
  //     console.log(allParticipants);
  //     setParticipants(allParticipants);
  //     if (currentAccount in allParticipants) {
  //       setIsMember(true);
  //     }
  //   };
  //   getParticipants();
  // }, []);

  const handleShowParticipants = async () => {
    const allParticipants = await contract.getParticipants();
    console.log(allParticipants);
    setParticipants(allParticipants);
    setShowParticipants(!showParticipants);
  };

  const handleShowTransactions = async () => {
    const transactions = await contract.getTransactions();
    setTransactions(transactions);
    setShowTransactions(!showTransactions);
    console.log(transactions[0]);
  };

  const handleShowAddTransaction = () => {
    setShowAddTransaction(!showAddTransaction);
  };

  const btnStyle =
    "rounded-full bg-blue-300 hover:bg-blue-200 cursor-pointer px-1 py-2 mx-2 w-[20%] backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100";

  return (
    <div class="w-[70%] bg-opacity-10 border border-gray-100 bg-gradient-to-r from-slate-500 to-[#cbd5e1] my-5 p-4 bg-white justify-center grid rounded-2xl justify-self-center">
      <div class="w-full flex justify-between">
        <p class="w-[98%] font-bold antialiased text-xl">
          {contract.contractInfo.name}
        </p>
        <div class="flex justify-end text-xl font-semibold">
          <p>{contract.contractInfo.amount}</p>
          <img class="mx-2 w-[3%] " src={ethLogo} alt="eth" />
        </div>
      </div>

      <p class="mt-3 font-semibold antialiased text-l">
        {contract.contractInfo.description}
      </p>
      <p class="my-2 color-slate-300 italic font-thin antialiased text-xs">
        {contract.address}
      </p>
      <div class="w-full flex justify-between">
        {/* {isMember ? null : ( */}
        <button
          class={btnStyle}
          onClick={() => contract.handleAddParticipant(index)}
        >
          Join
        </button>
        {/* )} */}

        {showAddTransaction ? (
          <CreateTransaction
            contract={contract}
            handleShowAddTransaction={handleShowAddTransaction}
          />
        ) : (
          <button class={btnStyle} onClick={handleShowAddTransaction}>
            Add Transaction
          </button>
        )}
        {showTransactions ? (
          <Transactions
            transactions={transactions}
            confirmTransaction={contract.confirmTransaction}
            setShowTransactions={setShowTransactions}
          />
        ) : (
          <button class={btnStyle} onClick={handleShowTransactions}>
            Show Transactions
          </button>
        )}
        {showParticipants ? (
          <Participants
            participants={participants}
            setShowParticipants={setShowParticipants}
          />
        ) : (
          <button class={btnStyle} onClick={handleShowParticipants}>
            Show Participants
          </button>
        )}
      </div>
    </div>
  );
};

export default Contract;

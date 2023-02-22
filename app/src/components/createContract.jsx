import React, { useContext } from "react";
import { ContractContext } from "../context/contractContext";

export const CreateContract = () => {
  const {
    handleFormData,
    connectWallet,
    createContract,
    currentAccount,
    contractFormData,
    // handleAmount,
    setContractForm,
  } = useContext(ContractContext);

  console.log(contractFormData);

  const ContractForm = () => (
    <div class="grid">
      {/* <Input
        placeholder="Amount"
        name="amount"
        id="amount"
        {...{ setContractForm, contractFormData }}
      /> */}
      <input
        class="rounded-full px-4 justify-center py-2  my-3"
        placeholder="Amount"
        name="amount"
        id="amount"
        value={contractFormData.amount}
        onChange={(e) => handleFormData(e)}
      ></input>
      <input
        class="rounded-full px-4 justify-center py-2  my-3"
        placeholder="Name"
        name="name"
        id="name"
        value={contractFormData.name}
        onChange={(e) => handleFormData(e)}
      ></input>
      <input
        class="rounded-full px-4 justify-center py-2  my-3"
        placeholder="Description"
        name="description"
        value={contractFormData.description}
        id="decription"
        onChange={(e) => handleFormData(e)}
      ></input>
      <button
        class="mx-4 rounded-full bg-blue-300 hover:bg-blue-200 cursor-pointer px-2 py-2"
        value="submit"
        onClick={createContract}
      >
        Create Contract
      </button>
    </div>
  );

  return (
    <div class="flex justify-center my-10 rounded-tl-2xl">
      <div class="w-[30%] flex justify-center rounded-tl-2xl rounded-br-2xl py-10 color-yellow-100 bg-blue-100">
        {currentAccount ? (
          <ContractForm />
        ) : (
          <button
            class="mx-4 rounded-full bg-blue-300  hover:bg-blue-200 cursor-pointer px-2 py-2"
            onClick={connectWallet}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateContract;

import React, { useContext, useEffect } from "react";
import { ContractContext } from "../context/contractContext";

export const CreateContract = () => {
  const {
    handleFormData,
    connectWallet,
    createContract,
    currentAccount,
    contractFormData,
    handleAmount,
    // setContractForm,
  } = useContext(ContractContext);

  useEffect(() => {
    console.log(contractFormData);
  }, [contractFormData]);


  return (
    <div class="flex justify-center my-10 rounded-tl-2xl">
      <div class="w-[30%] flex justify-center rounded-tl-2xl rounded-br-2xl py-10 bg-opacity-10 border border-gray-100 bg-gradient-to-r from-slate-500 to-[#cbd5e1]">
        {currentAccount ? (
          <div class="grid">
            <input
              class="rounded-full px-4 justify-center py-2  my-3 border border-gray-300"
              placeholder="Amount"
              name="amount"
              id="amount"
              value={contractFormData.amount}
              onChange={(e) => handleFormData(e)}
            ></input>
            <input
              class="rounded-full px-4 justify-center py-2  my-3 border border-gray-300"
              placeholder="Name"
              name="name"
              id="name"
              value={contractFormData.name}
              onChange={(e) => handleFormData(e)}
            ></input>
            <input
              class="rounded-full px-4 justify-center py-2  my-3 border border-gray-300"
              placeholder="Description"
              name="description"
              value={contractFormData.description}
              id="decription"
              onChange={(e) => handleFormData(e)}
            ></input>
            <button
              class="mx-4 rounded-full bg-[#f5f5f5] hover:bg-blue-200 cursor-pointer px-2 py-2"
              value="submit"
              onClick={createContract}
            >
              Create Deal
            </button>
          </div>
        ) : (
          <button
            class="mx-4 rounded-full bg-[#f5f5f5]  hover:bg-blue-200 cursor-pointer px-2 py-2"
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

import React, { useContext } from "react";
import { ContractContext } from "../context/contractContext";

export const CreateContract = () => {
  const {
    getSignatureContract,
    connectWallet,
    createContract,
    currentAccount,
    handleAmount,
  } = useContext(ContractContext);

  return (
    <div>
      <input placeholder="amount" onChange={(e) => handleAmount(e)}></input>
      <button value="submit" onClick={createContract}>
        Create contract
      </button>
      {!currentAccount ? (
        <button onClick={connectWallet}>Connect</button>
      ) : null}
    </div>
  );
};

export default CreateContract;

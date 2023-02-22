import React from "react";
export const Contract = ({ contract, index }) => {
  console.log(contract, index);
  return (
    <div>
      <p>Got the contract</p>
      {/* <p>{contract.owner}</p> */}
      <p>{contract.requiredAmount}</p>
      {contract.particpants?.map((participant) => (
        <p>{participant}</p>
      ))}
      <p>{contract.address}</p>
      <button onClick={() => contract.handlelAddParticipant(index)}>
        Add Participants
      </button>
    </div>
  );
};

export default Contract;

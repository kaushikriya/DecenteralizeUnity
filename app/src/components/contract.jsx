import React from "react";
export const Contract = ({ contract }) => {
  return (
    <div>
      <h>{contract.owner}</h>
      <h>{contract.requiredAmount}</h>
      <h>{contract.address}</h>
      <button onClick={contract.addParticipant}>Add Participants</button>
    </div>
  );
};

import React from "react";
import { Contract } from "./contract";
import { useContext } from "react";
import { ContractContext } from "../context/contractContext";

export const AllContracts = ({ contracts }) => {
  console.log(contracts);

  return (
    <div>
      {contracts?.length > 0
        ? contracts.map((contract) => {
            <Contract contract={contract} />;
          })
        : null}
    </div>
  );
};

export default AllContracts;

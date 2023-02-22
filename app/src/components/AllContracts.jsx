import React from "react";
import { Contract } from "./contract";
import { useContext } from "react";
import { ContractContext } from "../context/contractContext";

export const AllContracts = ({ contracts }) => {
  console.log(contracts);

  return (
    <div>
      <div></div>
      {contracts?.map((contract, index) => (
        <Contract contract={contract} index={index} />
      ))}
    </div>
  );
};

export default AllContracts;

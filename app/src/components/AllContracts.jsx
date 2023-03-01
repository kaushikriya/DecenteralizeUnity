import React from "react";
import { Contract } from "./contract";
import { useContext } from "react";
import { ContractContext } from "../context/contractContext";

export const AllContracts = ({ contracts }) => {
  console.log(contracts);

  return (
    <div class="w-full grid justify-center rounded-xl">
      <h class="w-full flex justify-center p-4 text-l">Contracts</h>

      {contracts?.map((contract, index) => (
        <Contract contract={contract} index={index} />
      ))}
    </div>
  );
};

export default AllContracts;

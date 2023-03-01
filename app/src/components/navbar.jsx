import React, { useContext } from "react";
import { ContractContext } from "../context/contractContext";

export const Navbar = () => {
  return (
    // <nav className="w-full bg-blue-500">
    //   <p className="color-blue-500">Navbar</p>
    // </nav>
    <nav class=" w-full flex justify-between justify-center bg-gradient-to-r from-slate-500 via-gray-500 to-slate-500 px-10 py-4">
      <ul class="flex justify-center">
        <li class="px-2 py-2 cursor-pointer text-white">Home</li>
        <li class="px-2 py-2 cursor-pointer text-white">About</li>
        <li class="px-2 py-2 cursor-pointer text-white">Pricing</li>
        <li class="px-2 py-2 cursor-pointer text-white">Join us!</li>
      </ul>
      <button class=" bg-white rounded-full py-2 px-7 mx-4 color-white-100 cursor-pointer hover:bg-yellow-100">
        Login
      </button>
    </nav>
  );
};

export default Navbar;

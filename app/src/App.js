import { useContext } from "react";
import { AllContracts, CreateContract, Navbar } from "./components";
import { ContractContext } from "./context/contractContext";


const App=()=> {
  const {contracts}= useContext(ContractContext)
  // console.log(contracts);
  return (
 <div class='bg-gradient-to-r from-[#243c5a] justify-between'>
      <Navbar/>
      <CreateContract/>
      <AllContracts contracts={contracts}/>
    </div>
   
  );
}

export default App;

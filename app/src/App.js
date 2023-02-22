import { useContext } from "react";
import { AllContracts, CreateContract, Navbar } from "./components";
import { ContractContext } from "./context/contractContext";


const App=()=> {
  const {contracts}= useContext(ContractContext)
  // console.log(contracts);
  return (
 <div>
      <Navbar/>
      <CreateContract/>
      <AllContracts contracts={contracts}/>
    </div>
   
  );
}

export default App;

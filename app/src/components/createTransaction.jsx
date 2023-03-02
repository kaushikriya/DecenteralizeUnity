import { useContext, useState } from "react";
import { ContractContext } from "../context/contractContext";

export const CreateTransaction = ({ contract, handleShowAddTransaction }) => {
  const { currentAccount, connectWallet } = useContext(ContractContext);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "",
  });

  const handleFormData = (e) => {
    console.log(e.target.value, e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createTransaction = async () => {
    await contract.handleAddTransaction(
      formData.name,
      formData.description,
      formData.amount
    );
    handleShowAddTransaction();
  };

  const btnStyle =
    "w-[30%] rounded-full bg-[#f5f5f5] justify-self-center hover:bg-blue-200 cursor-pointer px-1 py-2 mx-2 my-2";

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
      <div className="relative w-[90%] my-10 mx-5 max-w-2xl border-b border-solid border-gray-300">
        <div className=" border border-gray-100 bg-gradient-to-r from-slate-400 rounded-lg shadow-lg grid w-full bg-white outline-none focus:outline-none">
          <div className="flex justify-center p-10 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font=semibold">Create Transaction</h3>
          </div>
          <div class="flex justify-center my-10 rounded-tl-2xl">
            <div class="w-[90%] flex justify-center rounded-2xl py-10 border border-gray-500">
              {currentAccount ? (
                <div class="grid w-[90%] items-center">
                  <input
                    class="w-full rounded-full px-4 justify-center py-2  my-3 border border-gray-400"
                    placeholder="Amount"
                    name="amount"
                    id="amount"
                    value={formData.amount}
                    onChange={(e) => handleFormData(e)}
                  ></input>
                  <input
                    class="w-full rounded-full px-4 justify-center py-2  my-3 border border-gray-400"
                    placeholder="Name"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleFormData(e)}
                  ></input>
                  <input
                    class="w-full rounded-full px-4 justify-center py-2  my-3 border border-gray-400"
                    placeholder="Description"
                    name="description"
                    value={formData.description}
                    id="decription"
                    onChange={(e) => handleFormData(e)}
                  ></input>
                  <button
                    class="w-[30%] justify-self-center mx-4 rounded-full bg-[#f5f5f5] hover:bg-blue-200 cursor-pointer px-2 py-2"
                    value="submit"
                    onClick={createTransaction}
                  >
                    Create Transaction
                  </button>
                </div>
              ) : (
                <button class={btnStyle} onClick={connectWallet}>
                  Connect
                </button>
              )}
            </div>
          </div>
          <button class={btnStyle} onClick={handleShowAddTransaction}>
            Close
          </button>
          {/* <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                class="rounded-full bg-blue-300 hover:bg-blue-200 cursor-pointer px-1 py-2"
                type="button"
                onClick={() => setShowParticipants(false)}
              >
                Close
              </button>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default CreateTransaction;

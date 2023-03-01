import ethLogo from "../assets/images/ethereum-eth-logo.png";

export const Transactions = ({
  transactions,
  confirmTransaction,
  setShowTransactions,
}) => {
  console.log(transactions);

  const handleTransactionVote = (transaction) => {
    confirmTransaction(transaction.transactionId);
  };

  const btnStyle =
    "justify-self-center rounded-full bg-blue-300 hover:bg-blue-200 cursor-pointer px-1 py-2 m-2 w-[20%] backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100";

  return (
    <div>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className="relative w-[60%] my-10 mx-5 max-w-2xl border-b border-solid border-gray-300">
          <div className="border border-gray-100 bg-gradient-to-r from-slate-400 rounded-lg shadow-lg grid w-full bg-white outline-none focus:outline-none">
            {transactions.map((t) => (
              <div class="grid p-5 border border-gray-100 m-5 rounded-xl">
                <div class="w-full flex justify-between">
                  <p class="w-[98%] font-bold antialiased text-lg">{t.name}</p>
                  <div class="flex justify-end text-base font-semibold">
                    <p>{t.amount.toNumber()}</p>
                    <img class="mx-2 w-[20%] h-5 " src={ethLogo} alt="eth" />
                  </div>
                </div>

                <p class="mt-3 font-semibold antialiased text-base">
                  {t.description}
                </p>

                <button
                  class={btnStyle}
                  onClick={() => handleTransactionVote(t)}
                >
                  Vote
                </button>
              </div>
            ))}
            <button class={btnStyle} onClick={() => setShowTransactions(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;

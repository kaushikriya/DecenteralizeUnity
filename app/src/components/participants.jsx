export const Participants = ({ participants, setShowParticipants }) => {
  console.log("in", participants);

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className="relative w-[90%] my-10 mx-5 max-w-2xl rounded-xl border border-solid border-gray-300">
          <div className="border border-gray-100 bg-gradient-to-r from-slate-400 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-center p-10 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold">All Participants</h3>
            </div>
            <div className=" grid items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
              <div class="my-5 w-full border p-3 border-solid border-blueGray-200 rounded-xl">
                {participants.map((par) => (
                  <p>{par}</p>
                ))}
              </div>

              <button
                class="w-[30%] justify-self-center rounded-full bg-blue-300 hover:bg-blue-200 cursor-pointer px-1 py-2"
                type="button"
                onClick={() => setShowParticipants(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
    // <div>
    //   {participants.map((p) => {
    //     <p>{p}</p>;
    //   })}
    // </div>
  );
};

export default Participants;

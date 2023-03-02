export const Participants = ({ participants, setShowParticipants }) => {
  console.log("in", participants);

  const btnStyle =
    "justify-self-center rounded-full bg-[#f5f5f5] hover:bg-blue-200 cursor-pointer px-1 py-2 m-2 w-full backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100";

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className="relative w-[60%] my-10 mx-5 max-w-2xl rounded-xl border border-solid border-gray-300">
          <div className="border border-gray-100 bg-gradient-to-r from-slate-400 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-center p-10 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold">All Participants</h3>
            </div>
            <div className="w-full grid items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
              <div class="my-5 w-full border p-3 border-solid border-blueGray-200 rounded-xl">
                {participants.length > 0 ? (
                  participants.map((par) => (
                    <p class="italic justify-self-center color-slate-300 font-semibold antialiased text-base">
                      {par}
                    </p>
                  ))
                ) : (
                  <p class="italic justify-self-center color-slate-300 font-semibold antialiased text-base">
                    No participants to show!
                  </p>
                )}
              </div>

              <button
                class={btnStyle}
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

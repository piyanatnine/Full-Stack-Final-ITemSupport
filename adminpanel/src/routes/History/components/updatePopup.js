function UpdateModal({target, setUpdatePopup, update}){
  console.log(target)

    return(
        <>
        <div
          id="popup-modal"
          className="justify-center fade flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 border border-gray-200 drop-shadow-xl">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="popup-modal"
                onClick={() => setUpdatePopup({status: false, target: null})}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <div className="p-6 text-center mt-6">
                <h3 className="mb-2 text-lg font-semibold text-gray-500">
                  Are you sure you want to update {<br/>} status of item { target.itemCode } from
                </h3>
                <span className="mb-2 text-md font-bold text-gray-700">BORROWING</span>
                <span className="mx-5 mb-2 text-lg font-semibold text-gray-500">to</span>
                <span className="mb-2 text-md font-bold text-gray-700">RETURNED</span>
                <div className="mt-5 flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                    <button type="button" className="px-2 mx-2 text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                    onClick={() => setUpdatePopup({status: false, target: null})}
                    >
                        No, cancle
                    </button>
                    <button type="button" className="px-2 text-white bg-sky-600 hover:bg-sky-500 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10"
                    onClick={() => update(target.itemCode, target._id)}
                    >
                        Yes, I'm sure
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default UpdateModal;
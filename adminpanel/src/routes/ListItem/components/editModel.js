import React, { useState } from "react";

function EditModel({item, setEditPopup, editItem}) {
  const [name, setName] = useState(item.name)
  const [description, setDescription] = useState(item.description)
  

  return (
    <>
      <div
        id="popup-modal"
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 border border-gray-200 drop-shadow-xl">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="popup-modal"
              onClick={() => setEditPopup({status: false, target: null})}
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
            <div className="p-6 text-center">
            <form class="px-8 pt-6 mb-4">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                  Name
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="name"/>
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                  Description
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="description"/>
              </div>
            </form>  
              <button
                data-modal-toggle="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 
                focus:ring-4 focus:outline-none focus:ring-red-300
                font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={() => editItem()}
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={() => setEditPopup({status: false, target: null})}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditModel;

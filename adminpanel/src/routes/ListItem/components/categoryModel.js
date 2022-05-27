import React, { useState } from "react";

function CategoryModel({setCategoryPopup, createCategory, category}) {
  const [name, setName] = useState("");
  const [exits, setExits] = useState(false);

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
              onClick={() => setCategoryPopup({status: false})}
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
            <form className="px-8 pt-6 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Category Name
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="text" placeholder="name" onChange={(event) => {
                    setName(event.target.value)
                    let val = category.filter((data)=>{
                        return (data.name).toUpperCase() === event.target.value.toUpperCase()
                    })
                    setExits(val.length > 0)
                }} />
              </div>
              {exits && <p className="text-red-500 text-xs italic">Category Name "{name}" is already exits</p>}
            </form>  
            <button
                disabled={exits}
                data-modal-toggle="popup-modal"
                type="button"
                className="text-white bg-lime-600 hover:bg-lime-800 
                focus:ring-4 focus:outline-none focus:ring-lime-300
                disabled:opacity-25
                font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={() => createCategory(name)}
              >
                Yes, Create Category
              </button>            
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryModel;
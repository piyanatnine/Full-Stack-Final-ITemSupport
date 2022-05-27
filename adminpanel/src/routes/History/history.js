import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "./components/table";
import UpdateModal from "./components/updatePopup";

function History() {

  const [history, setHistory] = useState(null);
  const [show, setShow] = useState("");
  const [updatePopup, setUpdatePopup] = useState({status: false, target: null});

  const getHistory = () => {
    axios({
      url: process.env.REACT_APP_GRAPHQL_URL,
      method: "post",
      data: {
        query: `
          query{
            history{
              _id
              username
              itemCode
              status
              createdAt
              updatedAt
            }
          }
        `
      }
    }).then((result) => {
      setHistory(result.data.data.history);
    })
  }

  const updateHistory = async (itemCode, _id) => {
    const createData = () => {
      let graphql = ` 
        mutation{
          updateHistory(ItemCode: "${itemCode}", _id: "${_id}"){
            itemCode
            username
            status
        }
      }
      `
      console.log(graphql)
      axios({
        url: process.env.REACT_APP_GRAPHQL_URL,
        method: "post",
        data: {
          "query": graphql
        },
        headers: {
          'content-type': 'application/json'
        }
      }
      ).then((result) => {
        console.log(result)
        getHistory()
      })
    }

    await createData()
    await setUpdatePopup({status: false, target: null})
  }

  useEffect(()=>{
    getHistory()
  },[])

    return (<>
      {history && 
      <div className="History">
        <div className="grid grid-cols-5">
          <div className='font-bold text-3xl'> Borrow History</div>
          <div className="col-end-6">
              <input type="search" className="px-3 py-1.5 w-full justify-center text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded m-0" 
                placeholder="Search by Item Code or User"
                onChange={(event)=> {setShow(event.target.value)}}
              />
          </div>
        </div>
        <div className="table-auto my-5 shadow-md p-5">
          <Table dataHistory={history} show={show} setUpdatePopup={setUpdatePopup}/>
        </div>
        {updatePopup.status ? <UpdateModal  target={updatePopup.target} setUpdatePopup={setUpdatePopup} update={updateHistory}/> : null}
      </div>}</>
    );
  }
  
  export default History;
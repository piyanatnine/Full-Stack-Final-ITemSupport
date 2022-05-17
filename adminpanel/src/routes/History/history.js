import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "./components/table";

function History() {

  const [history, setHistory] = useState(null);
  const [item, setItem] = useState(null);
  const [show, setShow] = useState("");

  const getHistory = () => {
    axios({
      url: 'http://localhost:3000/graphql',
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
            item {
              itemCode
              name
            }
          }
        `
      }
    }).then((result) => {
      setHistory(result.data.data.history);
      setItem(result.data.data.item);
    })
  }

  useEffect(()=>{
    getHistory()
  },[])

    return (<>
      {history && 
      <div className="History">
        <div className="grid">
          <div className='col-start-1 font-bold text-2xl'> Borrow History</div>
        </div>
        <div className="table-auto my-5 shadow-md p-5">
          <Table dataHistory={history} show={show}/>
        </div>
      </div>}</>
    );
  }
  
  export default History;
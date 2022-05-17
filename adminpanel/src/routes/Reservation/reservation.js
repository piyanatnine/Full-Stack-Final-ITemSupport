import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "./components/table";
import UpdateModal from "./components/updatePopup";

function Reservation() {

  const [reservation, setReservation] = useState(null);
  const [item, setItem] = useState(null);
  const [show, setShow] = useState("");
  const [updatePopup, setUpdatePopup] = useState({status: false, target: null});

  const getReservation = () => {
    axios({
      url: 'http://localhost:3000/graphql',
      method: "post",
      data: {
        query: `
          query{
            Reservation{
              _id
              username
              itemCode
              status
              reservedTime
              createdAt
            }
            item{
              itemCode
              name
              description
              imageUrl
              tags
            }
          }
        `
      }
    }).then((result) => {
      setReservation(result.data.data.Reservation);
      setItem(result.data.data.item);
    })
  }

  const updateReservation = (id, username, completed) =>{
    const updateData = () => {
      let createHistory = `createHistory(
        record:{
          username: "${username}"
          itemCode: "${id}"
          status: "borrowing"
        }) {
          recordId
          record {
            username
            itemCode
            status
          }
        }`

      let graphql = `mutation {
        updateReservation(filter: {itemCode: "${id}", username: "${username}", status: "waiting"}
        record:{
          status: "${completed ? "completed" : "canceled"}"
        }) {
          recordId
          record {
            status
          }
        },${
          completed ? createHistory: ""
        }
      }`

      console.log(graphql)
      axios({
        url: 'http://localhost:3000/graphql',
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
        getReservation()
        setUpdatePopup({status: false, target: null})
      })
    }

    updateData();
  }

  const count = (status) => {
    return reservation.filter((data)=>{ return data.status === status }).length
  }

  useEffect(()=>{
    getReservation()
  },[])

    return (<>
      {reservation && 
      <div className="Reservation">
        <div className="grid">
          <div className='col-start-1 font-bold text-2xl'> List Reservation</div>
        </div>
        <div className="grid grid-cols-4 gap-12 mt-5">
          <div className="grid h-48 w-full bg-indigo-500 hover:bg-indigo-600 drop-shadow-lg place-content-center"
          onClick={()=>{setShow("")}}
          >
            <span className="text-7xl text-white text-center">{reservation.length}</span>
            <div className="w-full my-3 bg-slate-600 rounded-full h-1">
              <div className="bg-white h-1 rounded-full" style={{width: "100%"}}></div>
            </div>       
            <span className="text-lg text-white text-center">All RESERVATION</span>
          </div>
          <div className="grid h-48 w-full bg-lime-500 hover:bg-lime-600 drop-shadow-lg place-content-center"
          onClick={()=>{setShow("completed")}}
          >
            <span className="text-7xl text-white text-center">{count("completed")}</span>
            <div className="w-full my-3 bg-slate-600 rounded-full h-1">
              <div className="bg-white h-1 rounded-full" style={{width: ((count("completed")/reservation.length)*100)+"%"}}></div>
            </div>
            <span className="text-lg text-white text-center">COMPLETE RESERVATION</span>    
          </div>
          <div className="grid place-content-center h-48 w-full bg-amber-500 hover:bg-amber-600 drop-shadow-lg"
          onClick={()=>{setShow("waiting")}}
          >
            <span className="text-7xl text-white text-center">{count("waiting")}</span>
            <div className="w-full my-3 bg-slate-600 rounded-full h-1">
              <div className="bg-white h-1 rounded-full" style={{width: ((count("waiting")/reservation.length)*100)+"%"}}></div>
            </div>
            <span className="text-lg text-white mt-3 text-center">WAITING RESERVATION</span> 
          </div>
          <div className="grid place-content-center h-48 w-full bg-red-500 hover:bg-red-600 drop-shadow-lg"
          onClick={()=>{setShow("canceled")}}
          >
            <span className="text-7xl text-white text-center">{count("canceled")}</span>
            <div className="w-full my-3 bg-slate-600 rounded-full h-1">
              <div className="bg-white h-1 rounded-full" style={{width: ((count("canceled")/reservation.length)*100)+"%"}}></div>
            </div>
            <span className="text-lg text-white mt-3 text-center">CANCELED RESERVATION</span> 
          </div>
        </div>
        <div className="table-auto my-5 shadow-md p-5">
          <Table dataReservation={reservation} show={show} updatePopup={setUpdatePopup}/>
        </div>
      </div>}
      {updatePopup.status ? <UpdateModal  target={updatePopup.target} setUpdatePopup={setUpdatePopup} update={updateReservation}/> : null}
      </>
      
    );
  }
  
  export default Reservation;
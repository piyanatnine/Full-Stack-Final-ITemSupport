import '../App.css';
import { Container,  Row, Button } from 'react-bootstrap';
import {
    useQuery,
    gql,
    useMutation 
  } from "@apollo/client";
import React from 'react';
export default function User(){
    const user = JSON.parse(localStorage.User)
    const USERDATA = gql`
    query{
        Reservation(filter:{
          username:"${user.email}",
          status:"waiting"
        }){
          itemCode
          reservedTime
        },
        history(filter:{
          username:"${"it"+user.email.split('@')[0]}"
        }){
          itemCode
          status
          createdAt
        },
        item{
            itemCode
            name
            imageUrl
          }
      }
    `;
    const { loading, error, data } = useQuery(USERDATA)
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const reservItemsCode = data.Reservation.map(i => i.itemCode);
    const reservItemsList = data.item.filter(obj => {
        return reservItemsCode.includes(obj.itemCode)
    });
    console.log(reservItemsList)

    return(
        <div className="App">
            <header className="App-header">
                User
            </header>
            <div className="App-body">
            <Container style={{padding: 10, textAlign: "center"}}>
                <div className='row'>
                    <div className='col-3'>
                        <img src={user.photoURL} alt="userimg"/>
                        <p>{user.email}</p>
                    </div>
                    <div className='col-9' style={{borderLeft:"1px solid black"}}>
                        <b>รายการที่จองไว้</b>
                        {reservItemsList.map((item) => {
                            var reservTime = new Date(data.Reservation.filter(obj => {
                                return obj.itemCode === item.itemCode
                            })[0].reservedTime);
                            var status = "",diff = 0,diffday,diffhour;
                            var current = new Date();
                            // console.log(reservTime)
                            if(current > reservTime){
                                diff = Math.ceil(Math.abs(current - reservTime)/ (1000 * 60 * 60 ))
                                 diffday = Math.ceil(diff/24)-1
                                 diffhour = diff%24-1
                                status = "เลยเวลาจองมาแล้ว ";
                                if(diffday > 0){status = status.concat(diffday+" วัน ")}
                                status = status.concat(diffhour+" ชั่วโมง")
                            }else{
                                diff = Math.ceil(Math.abs(reservTime - current)/ (1000 * 60 * 60 ))
                                 diffday = Math.ceil(diff/24)-1
                                 diffhour = diff%24-1
                                status = "เหลือเวลาอีก ";
                                if(diffday > 0){status = status.concat(diffday+" วัน ")}
                                status = status.concat(diffhour+" ชั่วโมง")
                            }
                            return(
                                <div key={item.itemCode} className=' m-2' style={{ textAlign: "left"}}>
                                    <div className='row'>
                                        <div className="col-1 py-3 px-5">
                                            <img src={item.imageUrl} alt="img" height={70} width={70}/>
                                        </div>
                                        <div className='col-10 py-3 px-5'>
                                                <h4>{item.name}</h4>
                                                <div>จองไว้เวลา: {reservTime.toString()}</div>
                                                {status}
                                    </div></div>
                                </div>
                            );
                        })}
                        <b>ประวัติการยืม</b>
                        {data.history.map((item) => {
                            var itdata = data.item.filter(obj => {
                                return obj.itemCode === item.itemCode
                            })[0];
                            var state;
                            if(item.status === "borrowing"){state="ยังไม่คืน";}
                            else if(item.status === "returned"){state="คืนไปแล้ว";}
                            return(
                                <div key={item.itemCode} className=' m-2' style={{ textAlign: "left"}}>
                                    <div className='row'>
                                        <div className="col-1 py-3 px-5">
                                            <img src={itdata.imageUrl} alt="img" height={70} width={70}/>
                                        </div>
                                        <div className='col-10 py-3 px-5'>
                                                <h4>{itdata.name}</h4>
                                                <p>{state}</p>
                                    </div></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container></div>
        </div>
    );
}
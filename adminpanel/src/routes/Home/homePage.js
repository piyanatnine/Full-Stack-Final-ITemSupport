import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase.config';
import { Route, Routes, useParams } from "react-router-dom";

//Components
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
// import Footer from "./components/footer";
import OverViewForum from './components/overview';
import ListItem from '../ListItem/listItem';
import History from '../History/history';
import Reservation from '../Reservation/reservation';

function App() {

  //data
  const info = [
    {title: "รายการอุปกรณ์", content: "ตารางแสดงข้อมูลของอุปกรณ์ทั้งหมดสำหรับจัดการ เพิ่ม ลบ อุปกรณ์จากสถาบัน", path: "listItem"},
    {title: "รายการจองอุปกรณ์", content: "ตารางแสดงข้อมูลการจองอุปกรณ์ผ่านระบบ ITem Support ของนักศึกษาเเละบุคลากรภายในคณะ สามารถจัดการคำสั่งจอง และตรวจสอบประวัติและสถานะการสั่งจองได้ของไอเทมเเต่ละชิ้นได้", path: "reservation"},
    {title: "รายการยืมคืนอุปกรณ์", content: "ตารางแสดงข้อมูลการยืมคืนอุปกรณ์ทั้งหมดของนักศึกษาและบุคลากรภายในคณะ สำหรับจัดการสถานะของอุปกรณ์ รวมถึงตรวจสอบประวัติการยืมเเละคืนอุปกรณ์ของเเต่ละบุคคล", path: "history"}
  ]
  const { id } = useParams();

  //props
  const [navBar, setNavBar] = useState(true)
  const [user, setUser] = useState({})
  
  const toggle = () => {
    setNavBar(!navBar)
  }

  const signOut = async () => {
    await auth.signOut();
    localStorage.removeItem('User');
    //กลับไปหน้า login
    window.location.reload();
  }
  
  useEffect(()=> {
    const data = JSON.parse(localStorage.getItem('User'));
    if(data){
      setUser(data)
    }
  },[])

  return (
    <div className="App bg-slate-100 h-screen">
        <div className="flex">
          <Sidebar show={navBar} menu={info} selectPath={id}/>
          <div className={`absolute right-0 ${navBar ? "w-[82vw]":"w-full"} duration-500`}>
            <div className='h-20'>  
              <Navbar click={toggle} show={navBar} user={user} signOut={signOut}/>
            </div>
            <div className='flex-col m-10 '>
              <Routes>
                <Route exact path="" index element={<OverViewForum card={info}/>}/>
                <Route exact path="listItem" element={<ListItem/>}/>
                <Route exact path="reservation" element={<Reservation/>}/>
                <Route exact path="history" element={<History/>}/>
              </Routes>
            </div>
          </div>
        </div>

    </div>
  );
}

export default App;

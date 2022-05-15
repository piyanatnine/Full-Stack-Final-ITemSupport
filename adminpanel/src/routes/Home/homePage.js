import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase.config';
import { Route, Routes } from "react-router-dom";

//Components
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import OverViewForum from './components/overview';
import ListItem from '../ListItem/listItem';

function App() {

  //data
  const info = [
    {title: "รายการอุปกรณ์", content: "ตารางแสดงข้อมูลของอุปกรณ์ทั้งหมดสำหรับจัดการ เพิ่ม ลบ อุปกรณ์จากสถาบัน", path: "listItem"},
    {title: "testB", content: "ตารางแสดงข้อมูลของอุปกรณ์ทั้งหมดสำหรับจัดการ เพิ่ม ลบ อุปกรณ์จากสถาบัน ", path: "listItem"},
    {title: "testC", content: "ตารางแสดงข้อมูลของอุปกรณ์ทั้งหมดสำหรับจัดการ เพิ่ม ลบ อุปกรณ์จากสถาบัน", path: "listItem"}
  ]

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
          <Sidebar show={navBar} menu={info}/>
          <div className={`absolute right-0 ${navBar ? "w-[82vw]":"w-full"} duration-500`}>
            <div className='h-20'>  
              <Navbar click={toggle} show={navBar} user={user} signOut={signOut}/>
            </div>
            <div className='flex-col m-10 '>
              <Routes>
                <Route index element={<OverViewForum card={info}/>}/>
                <Route path="listItem" element={<ListItem/>}/>
              </Routes>
            </div>
          </div>
        </div>

    </div>
  );
}

export default App;

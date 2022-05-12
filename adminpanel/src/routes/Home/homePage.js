import React, { useState, useEffect } from 'react';
import firebase, { auth } from '../../firebase.config';
import { Navigate } from "react-router-dom";

//Components
import Header from "./components/header";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import OverViewForum from './components/overview';

function App() {

  //data
  const info = [
    {title: "testA", content: "ตารางแสดงข้อมูลของอุปกรณ์ทั้งหมดสำหรับจัดการ เพิ่ม ลบ อุปกรณ์จากสถาบัน"},
    {title: "testB", content: "ตารางแสดงข้อมูลของอุปกรณ์ทั้งหมดสำหรับจัดการ เพิ่ม ลบ อุปกรณ์จากสถาบัน "},
    {title: "testC", content: "ตารางแสดงข้อมูลของอุปกรณ์ทั้งหมดสำหรับจัดการ เพิ่ม ลบ อุปกรณ์จากสถาบัน"}
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
      console.log(data)
      setUser(data)
    }
  },[])

  return (
    <div className="App bg-slate-100 h-screen">
        <div className="flex">
          <Navbar show={navBar}/>
          <div className='w-screen'>      
            <Header click={toggle} show={navBar} user={user} signOut={signOut}/>
            <div className='flex-col m-10 '>
              <div className='flex'>
                <span className='text-2xl font-bold'>Overview</span>
              </div>
              <div className='m-5 grid grid-cols-3 gap-6'>
                 <OverViewForum card={info}/>
              </div>
              
            </div>
          </div>
        </div>

    </div>
  );
}

export default App;

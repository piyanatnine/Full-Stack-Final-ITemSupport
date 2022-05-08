import React, { useState, useEffect } from 'react';
import firebase, { auth } from '../../firebase.config';
import { Navigate } from "react-router-dom";

//Components
import Header from "./components/header";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";

function App() {
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
          <Navbar show={navBar}/>
          <div className='w-screen'>      
            <Header click={toggle} show={navBar} user={user} signOut={signOut}/>
            <div>
              
            </div>
          </div>
        </div>

    </div>
  );
}

export default App;

import React, { useState } from 'react';

//components
import Header from "./components/header";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";

function App() {
  //props
  const [navBar, setNavBar] = useState(true)
  const [user, setUser] = useState({
    name: 'Mr.Test',
    img: "https://pbs.twimg.com/media/FRmR0TUVgAA7zmF?format=jpg&name=small"
  })
  const toggle = () => {
    setNavBar(!navBar)
  }
  
  return (
    <div className="App bg-slate-100 h-screen">
        <div className="flex">
          <Navbar show={navBar}/>      
          <Header click={toggle} show={navBar} user={user}/> 
        </div>

    </div>
  );
}

export default App;

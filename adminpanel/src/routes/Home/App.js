import React, { useState } from 'react';
 

//components
import Header from "./components/header";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";

function App() {
  //props
  const [navBar, setNavBar] = useState(true)
  const toggle = () => {
    setNavBar(!navBar)
  }
  
  return (
    <div className="App bg-slate-100 h-screen">
        <div className="flex">
          <Navbar show={navBar}/>      
          <Header click={toggle} show={navBar} /> 
        </div>

    </div>
  );
}

export default App;

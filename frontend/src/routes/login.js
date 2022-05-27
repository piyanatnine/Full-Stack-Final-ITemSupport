import '../App.css';
// import { Card } from 'react-bootstrap';
// import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import firebase, { signInWithGoogle } from '../firebase.config';
import {Navigate} from "react-router-dom";

export default function Login(){
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('User', JSON.stringify(user))
  }, [user])

  if (user !== null){
    return <Navigate to="/list"/>;
  }

    return (
        <div className="App">
          <header className="App-header">
             <div className='col-1' style={{paddingLeft:"10px"}}><img src={require("../it-logo.png")} alt="logo" height={40}/></div>
          </header>
          <div className="App-body loginPage">
          <div style={{paddingTop:"10%",display:"flex", textAlign:"center",justifyContent:"center",color:'white'}}>
            <div style={{paddingTop:"40px",height:"200px" ,width:"600px" ,backgroundColor:"rgba(0, 0, 0, .5)"}}>
              <h1 className="textLogin"> จองและยืมอุปกรณ์ IT</h1>
            <p className="textLogin">คณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</p>
            <button className="button" onClick={signInWithGoogle}>
              
              Sign in with google
            </button>
            </div>
            
          </div>
          </div>
            
        </div>
      );
}
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
            Login
          </header>
          <div className="App-body">
          <div>
            <button className="button" onClick={signInWithGoogle}>
              
              Sign in with google
            </button>
          </div>
          </div>
            
        </div>
      );
}
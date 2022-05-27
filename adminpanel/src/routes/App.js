import { useState, useEffect } from 'react';
import {Navigate} from "react-router-dom";
import Login from './LogIn/login';
import firebase from '../firebase.config';

function App() {
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
    return <Navigate to="/adminpanel"/>;
  }

  return (
    <div className="app">
      <Login />
    </div>
  );
}

export default App;
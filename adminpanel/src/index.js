import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

//CSS
import './index.css';

//route path
import Protected from './routes/Protected';
import App from './routes/App';
import Home from './routes/Home/homePage'

const loggedIn = JSON.parse(localStorage.getItem('User'));
const root = ReactDOM.createRoot(document.getElementById('root'));
document.title = "ItemSupport @KMITL"
root.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={
           loggedIn == null ?  <Navigate to="/login" /> : <Navigate to="/adminpanel" /> 
        }/>
        <Route path="/login" element={<App/>}/>
        <Route path="/adminpanel" element={ 
          <Protected>
            <Home />
          </Protected>
        }>
          <Route exact path="" index/>
          <Route exact path="listItem"/>
          <Route exact path="history"/>
          <Route exact path="reservation"/>
        </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();

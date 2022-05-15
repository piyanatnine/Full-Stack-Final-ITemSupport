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
import ListItem from './routes/ListItem/listItem';
import OverViewForum from './routes/Home/components/overview';


const loggedIn = JSON.parse(localStorage.getItem('User'));
const root = ReactDOM.createRoot(document.getElementById('root'));
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
        </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();

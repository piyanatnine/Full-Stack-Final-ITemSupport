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
import Footer from './routes/Home/components/footer';
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
          <Route index element={<OverViewForum/>}/>
          <Route path="listItem" element={<Footer/>}/>
        </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();

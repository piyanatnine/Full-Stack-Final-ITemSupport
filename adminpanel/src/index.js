import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Router, Navigate} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

//CSS
import './index.css';

//route path
import Protected from './routes/Protected';
import App from './routes/App';
import Home from './routes/Home/homePage'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/adminpanel" element={ 
          <Protected>
            <Home />
          </Protected>
        }/>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();

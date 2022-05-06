import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';

//CSS bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

//route path
import App from './routes/AdminPanel/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();

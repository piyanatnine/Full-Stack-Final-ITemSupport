import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,
  Routes,
  Route,
 } from 'react-router-dom';
import './index.css';
import App from './App';
import DetailItem from "./routes/detailItem"
import ListItem from './routes/listItem';
import Login from './routes/login'
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="detail" element={<DetailItem />} />
        <Route path="list" element={<ListItem />} />
        <Route path="login" element={<Login />} />
      </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

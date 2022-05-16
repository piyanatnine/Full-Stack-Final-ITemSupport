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
import Login from './routes/login';
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  
} from "@apollo/client";

const rootElement = document.getElementById("root");

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="detail/:id" element={<DetailItem />} />
          <Route path="list" element={<ListItem />} />
          <Route path="login" element={<Login />} />
        </Routes>
    </BrowserRouter>
  </ApolloProvider>
  ,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

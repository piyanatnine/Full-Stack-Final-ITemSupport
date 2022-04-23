import '../App.css';
import { Card } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import { useState } from 'react';

export default function DetailItem(){
  const {state} = useLocation();
  const { itemData } = state;
  console.log(itemData)
  return (
    <div className="App">
      <header className="App-header">
        Detail
      </header>
      <div className="App-body"></div>
        
    </div>
  );
    
}
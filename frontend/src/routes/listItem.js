import '../App.css';
import { Card, Container, Image, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useState } from 'react';
import CardItem from '../components/cardItem';

export default function ListItem() {
  const [items, setItem] = useState([{"name":"1","description":"Test Item","inStock":3},
  {"name":"2","description":"Test Item","inStock":3}, {"name":"3","description":"Test Item","inStock":3},
  {"name":"4","description":"Test Item","inStock":3},{"name":"5","description":"Test Item","inStock":3}])

  function renderListcol(list){
    let itembyrow = [];
    for (let i = 0; i < list.length; i++) {
      if(i%2 === 0){
        itembyrow.push([list[i]])
      }else{
        itembyrow[Math.floor(i/2)].push(list[i])
      }
    }
    return itembyrow;
  } 

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <Container>
        {renderListcol(items).map((item, index) => <Row key={index} style={{margin: 10}}>
          <CardItem item={item[0]}/>
          {item.length > 1 ? <CardItem item={item[1]}/> : <div/>}
           </Row>)}
      </Container>
    </div>
  );
}

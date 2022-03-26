import '../App.css';
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useState } from 'react';

export default function ListItem() {
  const [items, setItem] = useState([{"name":"Test","description":"Test Item","inStock":3},
  {"name":"Test","description":"Test Item","inStock":3}])
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <div className="App-body">
        {items.map((item, index) => <Card className='Card' key={index} style={{marginBottom: 10}}>
                                    <Card.Body>
                                      <Card.Img variant="top" src="image-placeholder.jpg" />
                                      <Card.Title><Link className='postTitle' to="/detail">{item.name}</Link></Card.Title>
                                      <Card.Text>{item.description}</Card.Text>
                                    </Card.Body>
                                    </Card>)}</div>
    </div>
  );
}

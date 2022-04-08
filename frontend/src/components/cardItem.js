import '../App.css';
import { Card, Image, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useState } from 'react';

export default function CardItem(props){
    const itemData = props.item
    console.log(itemData)
    return(
        <Card className='Card' style={{padding: 10, flexDirection: "row",width: '50%'}}>
                                    <Image src={require('../image-placeholder.jpg')} style={{width: "200px", height: "auto"}} />
                                    <Card.Body style={{textAlign: 'left'}}>
                                        
                                        
                                        <Card.Title>{itemData.name}</Card.Title>
                                        <Card.Text>{itemData.description}</Card.Text>
                                        <Button variant="primary">ดูรายละเอียด</Button>
                                    </Card.Body>
                                    </Card>
    );
}
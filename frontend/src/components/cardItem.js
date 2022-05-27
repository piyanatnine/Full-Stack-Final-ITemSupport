import '../App.css';
import { Card } from 'react-bootstrap';

export default function CardItem(props){
    const itemData = props.item
    return(
        <div style={{display: "flex", flexDirection: "row",justifyContent: "flex-start"}}>
                                    <Card.Body style={{textAlign: 'left'}}>
                                        <Card.Title>{itemData.name.charAt(0).toUpperCase()+ itemData.name.slice(1)}</Card.Title>
                                    </Card.Body>
        </div>
                                    
    );
}
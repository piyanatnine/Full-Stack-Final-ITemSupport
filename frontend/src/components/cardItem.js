import '../App.css';
import { Card, Image } from 'react-bootstrap';

export default function CardItem(props){
    const itemData = props.item
    return(
        <div style={{display: "flex", flexDirection: "row",justifyContent: "flex-start"}}>
                                    <Image src={require('../image-placeholder.jpg')} style={{width: "200px", height: "auto"}} />
                                    <Card.Body style={{textAlign: 'left'}}>
                                        <Card.Title>{itemData.name}</Card.Title>
                                        <Card.Text>
                                            {itemData.description}
                                        </Card.Text>
                                        <Card.Text>Instock: {itemData.inStock}</Card.Text>
                                        
                                    </Card.Body>
        </div>
                                    
    );
}
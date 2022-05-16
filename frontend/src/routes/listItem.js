import '../App.css';
import { Container,  Row, Button } from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";
import CardItem from '../components/cardItem';
import { Card } from 'react-bootstrap';
import {
  useQuery,
  gql
} from "@apollo/client";
import { useEffect,useState } from 'react';

export default function ListItem() {

  const navigate = useNavigate();
  // const [items, setItem] = useState([])
  const [navi, setnavi] = useState('');
  const ITEM_DATA = gql`
    query {
      category {
        name
        id
      }
    }
    `;

  const { loading, error, data } = useQuery(ITEM_DATA);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log(data.category)

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

    function handleClick(itemdata) {
      navigate(`/detail/${itemdata}`);
      // item[0].itemCode
      }

  return (
    <div className="App">
      <header className="App-header">
      
      </header>
      <Container>
        {renderListcol(data.category).map((item, index) => <Row key={index} style={{margin: 10}}>
        <Card className='Card' style={{padding: 10, width: '50%'}}>
          <CardItem item={item[0]}/>
          <Button onClick={() => handleClick(item[0].name)} variant="primary" style={{marginTop:"5px"}}>ดูรายละเอียด</Button>
        </Card>
          {item.length > 1 ? <Card className='Card' style={{padding: 10, width: '50%'}}>
            <CardItem item={item[1]}/>
            <Button onClick={() => handleClick(item[1].name)} variant="primary" style={{marginTop:"5px"}}>ดูรายละเอียด</Button>
            </Card> : <div/>}
           </Row>)}
      </Container>
    </div>
  );
}

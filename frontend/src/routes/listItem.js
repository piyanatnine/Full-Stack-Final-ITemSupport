import '../App.css';
import { Container,  Row, Button } from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";
import CardItem from '../components/cardItem';
import { Card, Dropdown } from 'react-bootstrap';
import {
  useQuery,
  gql
} from "@apollo/client";
import { useEffect,useState } from 'react';
import { auth } from '../firebase.config';

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
    function toUserProflie(){
      navigate(`/user`);
    }
    function tolist(){
      navigate(`/list`);
    }
    const signOut = async () => {
      await auth.signOut();
      localStorage.removeItem('User');
      //กลับไปหน้า login
      navigate(`/login`);
    }

  return (
    <div className="App">
      <header className="App-header">
        <div className='row' style={{height:"100px"}}>
          <div className='col-1 userprofile' style={{display: "flex",justifyContent:"center",alignItems: "center"}} onClick={tolist}>Home</div>
          <div className='col-9'></div>
          <div className="col-1" style={{marginRight:"10px", display: "flex",justifyContent:"center",alignItems: "center"}}>
            <Dropdown>
            <Dropdown.Toggle className="userprofile" style={{backgroundColor:"#282c34", border:"none", height:"100px"}} >
            <img src={JSON.parse(localStorage.User).photoURL} alt="profliepic" style={{borderRadius: "50%",marginRight:"10px"}} height={40} width="auto"/>
            {JSON.parse(localStorage.User).displayName}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{width:"240px"}}>
              <Dropdown.Item onClick={toUserProflie}>Profile</Dropdown.Item>
              <Dropdown.Item onClick={signOut}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
            </div>
        </div>
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

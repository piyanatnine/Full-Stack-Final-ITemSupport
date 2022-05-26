import { useParams } from 'react-router-dom';
import '../App.css';
import Item from '../components/DetailItem/item'
import { useNavigate  } from "react-router-dom";
import {
  useQuery,
  gql,
  useMutation 
} from "@apollo/client";
import Modal from 'react-modal';
import {  Dropdown } from 'react-bootstrap';
import { useState } from 'react';
import { auth } from '../firebase.config';

export default function DetailItem(){
  const navigate = useNavigate();
  Modal.setAppElement('#root');
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalItem, setModalItem] = useState({
    description: "",
    imageUrl: "",
    itemCode: "",
    name: "",
  })
  const [avanum, setavanum] = useState(0)
  const [dateReserv, setDate] = useState("");
  const [timeReserv, setTime] = useState("");
  const [modalReservby, setReservby] = useState("");
  const [modalReservtype, setReservtype] = useState("");
  let { id } = useParams();
  const ITEM_DATA = gql`
    query {
      item(filter:{
        tags : ["${id}"]
      }) {
        _id
        itemCode
        name
        description
        imageUrl
      }
      Reservation (filter:{
        status: "waiting"
      }){
        _id
    		username
    		itemCode
        reservedTime
      }
  		history (filter:{
        status: "borrowing"
      }){
        _id
        username
        itemCode
        createdAt
      }
    }

    
    `;
  
    const RESERVATION = gql`
    mutation ($username:String!, $itemCode:String!,
      $reservedTime:Date!, $status:String!){
        createReservation(username:$username
                          itemCode:$itemCode
                          reservedTime: $reservedTime
                          status: $status
        ){
          username
          itemCode
          reservedTime
          status
          updatedAt
          createdAt
        }
      }
    `;
  const [postReserv, reservData] = useMutation(RESERVATION)
  const { loading, error, data } = useQuery(ITEM_DATA);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log(data)
  const user = JSON.parse(localStorage.User);
  var numall = data.item.length, numnotava = 0;
  var notavaliable = [...data.Reservation, ...data.history]
  const reservButton = (props) => {
    
      return(
        <button className='col-1 bg-success' onClick={() => {openModal(props.itemData, props.isavaliable)}} style={{color:"white", paddingTop: "15px"}}>
              <p>ดูรายละเอียด</p>
            </button>
      );
    
    
  }

  const newReservation = () => {
      const datenow = new Date();
      const dateTimeReserv = new Date(dateReserv);
      var arrTimeReserv = timeReserv.split(':');
      dateTimeReserv.setHours(arrTimeReserv[0]);
      dateTimeReserv.setMinutes(arrTimeReserv[1])
      console.log(modalItem.itemCode)
      // JSON.parse(localStorage.User).email
      // modalItem.itemCode
      // dateTimeReserv
      postReserv({variables:{
        
          username: JSON.parse(localStorage.User).email,
          itemCode: modalItem.itemCode,
          reservedTime: dateTimeReserv,
          status: "waiting"
        
      }}).then(() => {
        console.log(reservData)
        closeModal();
      })
      
  }

  const sortedItemdata = data.item.slice().sort((a,b) => (a.name > b.name) - (a.name < b.name))
  const ListItem = () => {
    return sortedItemdata.map((item) => {
      var avaliable = true;
      for (let j = 0; j < notavaliable.length; j++) {
            if(item.itemCode === notavaliable[j].itemCode){
              avaliable = false
              numnotava+=1;
              break;
            }
          }
          setavanum(numall-numnotava)
      return (
        
        <Item data={item} isavaliable={avaliable} Button={reservButton} key={item._id}/>
      )
    })
  }

  function openModal(itemData, isavaliable){
    if(!isavaliable){
      var reservby = notavaliable.filter(i => i.itemCode === itemData.itemCode);
      setReservby(reservby[0].username)
      setReservtype(reservby[0].__typename)
    }
    console.log(itemData)
    setModalItem(itemData)
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setDate("")
    setReservby("")
    setReservtype("")
    setTime("")
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
      <div className="App-body">
        <div className='container my-5'>
          <div className='container m-3'>
            <div className='row'>
              <div className='col-2'>
                <img src="http://via.placeholder.com/150" className="img-fluid" alt="..." />
              </div>
              <div className='col-8' >
                <h1>{id.toUpperCase()}</h1>
                
              </div>
              <div className='col-2'>
                <h1>{avanum}/{numall}</h1>
              </div>
            </div>
            <div className='mt-5'>
              <div className=''>
                  <p>List of Item</p>
              </div>
              <ListItem/>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Reservation Date"
        style={{content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width:'40%',
          border: '1px solid black',
          backgroundColor: '#F3F3F3'
        },
      }}>
          <div><b>{modalItem.name}</b></div>
          <div style={{marginTop:"10px"}} className='row'>
            <div className='col-3' style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}}>
              <img alt='toreservimg' src={modalItem.imageUrl} height={80} width="auto"/>
              
            </div>
            <div className='col-8'>
              <form>
                <div style={{textAlign: "right"}}>
                    <label style={{float:"left"}}>เลือกเวลาที่จะมารับอุปกรณ์:</label>
                        <input disabled={modalReservby} style={{ marginBottom:"20px"}} type="date" value={dateReserv} onChange={e=> setDate(e.target.value)}/>
                        <input disabled={modalReservby} style={{ marginBottom:"20px" ,width:"140px"}} type="time" value={timeReserv} onChange={e=> setTime(e.target.value)}/></div>
                        {!modalReservby ? <p>จองโดย: <b>{user.displayName}</b></p>
                        : modalReservtype === "historys" ? <p>ตอนนี้ถูกยืมโดย: <b>{modalReservby}</b></p>:
                        <p>ถูกจองแล้วโดย: <b>{modalReservby}</b></p>}
              </form>
              <button disabled={!(dateReserv && timeReserv) || modalReservby} onClick={newReservation} style={{width:"100%"}}>จอง</button>
            </div>
          </div>
          <div style={{marginTop:"10px"}} className='row'>
            <b>Description:</b>
            <p>{modalItem.description}</p>
          </div>
        </Modal>  
        
    </div>
  );
    
}
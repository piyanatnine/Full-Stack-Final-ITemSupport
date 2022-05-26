import { useParams } from 'react-router-dom';
import '../App.css';
import Item from '../components/DetailItem/item'
import {
  useQuery,
  gql,
  useMutation 
} from "@apollo/client";
import Modal from 'react-modal';
import { useState } from 'react';

export default function DetailItem(){
  Modal.setAppElement('#root');
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalItem, setModalItem] = useState({
    description: "",
    imageUrl: "",
    itemCode: "",
    name: "",
  })
  const [avanum, setavanum] = useState()
  const [dateReserv, setDate] = useState("");
  const [timeReserv, setTime] = useState("");
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
    mutation ($record:CreateOnereservationsInput!){
      createReservation(record:$record){
      recordId
      record{
        username
        itemCode
        reservedTime
        status
        updatedAt
        createdAt
      }
    }
  }
    `;
  const [postReserv, reservData] = useMutation(RESERVATION)
  const { loading, error, data } = useQuery(ITEM_DATA);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log(data)
  const user = JSON.parse(localStorage.User);
  var numall = data.item.length, numava = numall;
  var notavaliable = [...data.Reservation, ...data.history]
  const reservButton = (props) => {
    if(props.isavaliable){
      return(
        <button className='col-1 bg-primary text-center' onClick={() => {openModal(props.itemData)}} style={{color:"white", paddingTop: "15px"}}>
              <p>จอง</p>
            </button>
      );
    }else{
      return(
        <button className='col-1 bg-danger text-center' style={{color:"white",paddingTop: "15px"}} disabled={true}>
            <p>ยังไม่พร้อม</p>
          </button>
      );
    }
    
  }

  const newReservation = () => {
      const datenow = new Date();
      const dateTimeReserv = new Date(dateReserv);
      var arrTimeReserv = timeReserv.split(':');
      dateTimeReserv.setHours(arrTimeReserv[0]);
      dateTimeReserv.setMinutes(arrTimeReserv[1])
      console.log(dateTimeReserv)
      // JSON.parse(localStorage.User).email
      // modalItem.itemCode
      // dateTimeReserv
      postReserv({variables:{
        record:{
          username: JSON.parse(localStorage.User).email,
          itemCode: modalItem.itemCode,
          reservedTime: dateTimeReserv,
          status: "waiting"
        }
      }})
      
  }

  const sortedItemdata = data.item.slice().sort((a,b) => (a.name > b.name) - (a.name < b.name))
  const ListItem = () => {
    return sortedItemdata.map((item) => {
      var avaliable = true;
      for (let j = 0; j < notavaliable.length; j++) {
            if(item.itemCode === notavaliable[j].itemCode){
              avaliable = false
              numava-=1;
              setavanum(numava)
              break;
            }
          }
      return (
        
        <Item data={item} isavaliable={avaliable} Button={reservButton} key={item._id}/>
      )
    })
  }

  function openModal(itemData){
    console.log(itemData)
    setModalItem(itemData)
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setDate("")
    setTime("")
  }

  return (
    <div className="App">
      <header className="App-header">
        Detail
      </header>
      <div className="App-body">
        <div className='container my-5 bg-light'>
          <div className='container m-3'>
            <div className='row'>
              <div className='col-2'>
                <img src="http://via.placeholder.com/150" className="img-fluid" alt="..." />
              </div>
              <div className='col-8' style={{paddingTop:'10px'}}>
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
          border: '1px solid black'
        },
      }}>
          <div><b>{modalItem.name}</b></div>
          <div style={{marginTop:"10px"}} className='row'>
            <div className='col-3' style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}}>
              <img alt='toreservimg' src={modalItem.imageUrl} height={80} width={80}/>
              
            </div>
            <div className='col-8'>
              <form>
                <div style={{textAlign: "right"}}>
                    <label style={{float:"left"}}>เลือกเวลาที่จะมารับอุปกรณ์:</label>
                        <input style={{ marginBottom:"20px"}} type="date" value={dateReserv} onChange={e=> setDate(e.target.value)}/>
                        <input style={{ marginBottom:"20px" ,width:"140px"}} type="time" value={timeReserv} onChange={e=> setTime(e.target.value)}/></div>
                        <p>จองโดย: <b>{user.displayName}</b></p>
                    <button disabled={!(dateReserv && timeReserv)} onClick={newReservation} style={{width:"100%"}}>จอง</button>
              </form>
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
import { useParams } from 'react-router-dom';
import '../App.css';
import Item from '../components/DetailItem/item'
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import {
  useQuery,
  gql,
  useMutation 
} from "@apollo/client";
import Modal from 'react-modal';
import {  Dropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { auth } from '../firebase.config';

export default function DetailItem(){
  const navigate = useNavigate();
  Modal.setAppElement('#root');
  const [allData, setdata] = useState([])
  const [itemsData, setItemdata] = useState([]);
  const [user, setUser] = useState("")
  const [notavaliable, setnotava] = useState([]);
  const [countAva, setavaitem] = useState(0)
  const [countItems, setcount] = useState(0)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalconfirm, setconfirm] = useState('')
  const [modalItem, setModalItem] = useState({
    description: "",
    imageUrl: "",
    itemCode: "",
    name: "",
    status:""
  })
  const [avanum, setavanum] = useState(0)
  const [dateReserv, setDate] = useState("");
  const [timeReserv, setTime] = useState("");
  const [modalReservby, setReservby] = useState("");
  const [modalReservtype, setReservtype] = useState("");
  const [modalBorrowed, setBorrowed] = useState("");
  let { id } = useParams();
  const ITEM_DATA = `
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
        status
      }
  		history (filter:{
        status: "borrowing"
      }){
        _id
        username
        itemCode
        createdAt
        status
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
        }
      }
    `;
  const [postReserv, reservData] = useMutation(RESERVATION,
    {
      onCompleted: (data) => {
        if(data.createReservation.username === "Error: item already reserved"){
          setconfirm(data.createReservation.username)
        }else{
          setconfirm("Success")
        }
        console.log(data) // the response
      },
      onError: (error) => {
        console.log(error); // the error if that is the case
      },
    });
    const getReservation = () => {
      axios({
        url: process.env.REACT_APP_GRAPHQL_URL,
        method: "post",
        data: {
          query: ITEM_DATA
        },
        headers: {
          'content-type': 'application/json'
        }
      }).then((result) => {
        setdata(result.data.data);
        setUser(JSON.parse(localStorage.User))
        let countitemava = result.data.data.item.length;
        setcount(countitemava)
        var notavalist = [...result.data.data.Reservation, ...result.data.data.history];
        setnotava(notavalist)
        const itemcodeitems = result.data.data.item.map(o => o.itemCode)
        notavalist = notavalist.map(o => o.itemCode)
        for (let i = 0; i < notavalist.length; i++) {
          if(itemcodeitems.includes(notavalist[i])){
            countitemava-=1;
          }
        }
        console.log(notavalist)
        setavaitem(countitemava)
        setItemdata(result.data.data.item.slice().sort((a,b) => (a.name > b.name) - (a.name < b.name)))
        // const user = JSON.parse(localStorage.User);
        // var numall = data.item.length, numnotava = 0;
        // var notavaliable = [...data.Reservation, ...data.history]
      })
    }
    useEffect(() => {
      getReservation();
    },[]
    )
  // const { loading, error, data } = useQuery(ITEM_DATA);
  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;
  // console.log(data)
  // const user = JSON.parse(localStorage.User);
  // var numall = data.item.length, numnotava = 0;
  // var notavaliable = [...data.Reservation, ...data.history]
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
        
      }})
      
  }

  
  
  const ListItem = () => {
    return itemsData.map((item) => {
      var avaliable = !notavaliable.map(o => o.itemCode).includes(item.itemCode);
      // var numnotava = 0;
      // for (let j = 0; j < notavaliable.length; j++) {
      //       if(item.itemCode === notavaliable[j].itemCode){
      //         avaliable = false
      //         numnotava+=1;
      //         break;
      //       }
      //     }
          // setavaitem(numall-numnotava)
      return (
        
        <Item data={item} isavaliable={avaliable} Button={reservButton} key={item._id}/>
      )
    })
  }

  const toReturn = (dEnd, dStart) => {
    var t2 = dEnd.getTime();
    var t1 = dStart.getTime();    
    var totalday = Math.floor((t2-t1)/(24*3600*1000));
    return totalday +" day "+(totalday%24) +" hours";
}

  function openModal(itemData, isavaliable){
    if(!isavaliable){
      var reservby = notavaliable.filter(i => i.itemCode === itemData.itemCode);
      if(reservby[0].status === "borrowing"){
        setBorrowed(toReturn(new Date(), new Date(reservby[0].createdAt)))
        console.log(reservby[0].createdAt)
      }
      setReservby(reservby[0].username)
      setReservtype(reservby[0].status)
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
    setconfirm('')
    getReservation()
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
          <div className='col-1 userprofile' style={{display: "flex",justifyContent:"center",alignItems: "center"}} onClick={tolist}>
            <img src={require("../it-logo.png")} alt="logo" height={40}/>
          </div>
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
                <h1>{countAva}/{countItems}</h1>
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
          backgroundColor: '#F3F3F3',
          zindex: '1'
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
                        : modalReservtype === "borrowing" ? <p>ตอนนี้ถูกยืมโดย: <b>{modalReservby}</b> <br/>เป็นเวลา {modalBorrowed}</p>:
                        <p>ถูกจองไปแล้ว</p>}
              </form>
              <button disabled={!(dateReserv && timeReserv) || modalReservby} onClick={newReservation} style={{width:"100%"}}>จอง</button>
            </div>
          </div>
          <div style={{marginTop:"10px"}} className='row'>
            <b>Description:</b>
            <p>{modalItem.description}</p>
          </div>
        </Modal>  
        <Modal
        isOpen={modalconfirm}
        onRequestClose={closeModal}
        style={{content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width:'40%',
          height: '20%',
          border: '1px solid black',
          backgroundColor: '#F3F3F3',
          zindex: '2'
        }}}
      >
        {modalconfirm === "Success" ? <h2>Success</h2> : <h2>Error</h2>}
        <div>{modalconfirm}</div>
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
  );
    
}
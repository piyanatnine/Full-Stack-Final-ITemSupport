import { useParams } from 'react-router-dom';
import '../App.css';
import Item from '../components/DetailItem/item'
import {
  useQuery,
  gql
} from "@apollo/client";
import Modal from 'react-modal';
import { useState } from 'react';

export default function DetailItem(){

  const [modalIsOpen, setIsOpen] = useState()
  const [avanum, setavanum] = useState()
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

  const { loading, error, data } = useQuery(ITEM_DATA);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log(data)
  var numall = data.item.length, numava = numall;
  var notavaliable = [...data.Reservation, ...data.history]
  const ListItem = () => {
    return data.item.map((item) => {
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
        <Item data={item} isavaliable={avaliable} func={openModal} key={item._id}/>
      )
    })
  }

  function openModal(){
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
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
        contentLabel="Example Modal"
        style={{content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}>
          <div>เลือกเวลาที่จะมารับอุปกรณ์</div>
          <form>
            <input type="date"/>
            
            <button>จอง</button>
          </form>
        </Modal>  
    </div>
  );
    
}
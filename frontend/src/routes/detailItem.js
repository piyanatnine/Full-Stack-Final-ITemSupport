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
  let { id } = useParams();
  const ITEM_DATA = gql`
    query GetItems {
      item(filter:{
        tags : ["${id}"]
      }) {
        _id
        itemCode
        name
        description
        imageUrl
      }
    }
    `;

  const { loading, error, data } = useQuery(ITEM_DATA);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log(data.item)
  const ListItem = () => {
    return data.item.map((item) => {
      return (
        <Item data={item} func={openModal} key={item._id}/>
        
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
              <div className='col-8'>
                <h1>{id}</h1>
                
              </div>
              <div className='col-2'>
                <h1>6/6</h1>
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
        <button onClick={openModal}>Open Modal</button>
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
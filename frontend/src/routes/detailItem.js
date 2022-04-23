import '../App.css';
import Item from '../components/DetailItem/item'

export default function DetailItem(){

  const items = [1,1,1,1,1,1]

  const ListItem = () => {
    return items.map((item) => {
      return (
        <Item/>
      )
    })
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
                <img src="http://via.placeholder.com/150" class="img-fluid" alt="..." />
              </div>
              <div className='col-8'>
                <h1>Title</h1>
                <p>description</p>
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

      </div>
        
    </div>
  );
    
}
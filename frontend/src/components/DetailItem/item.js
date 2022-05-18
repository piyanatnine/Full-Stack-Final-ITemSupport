export default function Item(props){
  const itemData = props.data
    return(
        <div className='col-11 bg-info m-2'>
        <div className='row'>
          <div className="col-1 py-3 px-5">
              <img src={itemData.imageUrl} alt="img" height={70} width={70}/>
          </div>
          <div className='col-10 py-3 px-5'>
                <h4>{itemData.name}</h4>
                <div>{itemData.description}</div>
          </div>
          {props.isavaliable ? 
          <button className='col-1 bg-primary text-center' onClick={props.func} style={{color:"white", paddingTop: "15px"}}>
            <p>จอง</p>
          </button>:
          <button className='col-1 bg-danger text-center' style={{color:"white",paddingTop: "15px"}} disabled={true}>
            <p>ยังไม่พร้อม</p>
          </button>
        }
          
        </div>
      </div>
    )
}
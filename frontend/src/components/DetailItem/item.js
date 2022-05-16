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
          <div className='col-1 bg-danger text-center' onClick={props.func} style={{paddingTop: "35px",textAlign: "center"}}>
            <p>จอง</p>
          </div>
        </div>
      </div>
    )
}
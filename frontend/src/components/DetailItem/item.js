export default function Item(props){
  const itemData = props.data
  const placeholder = (ev) => {
    ev.target.src = require('../../image-placeholder.jpg')
  }
    return(
        <div className='col-11 bg-light rounded m-2' style={{color:'black'}}>
        <div className='row'>
          <div className="col-2 py-3 px-5" style={{textAlign:'center'}}>
              <img onError={placeholder} src={itemData.imageUrl} alt="img" height={70} width="auto"/>
          </div>
          <div className='col-8 py-3 px-5 border-start'>
                <h4>{itemData.name}</h4>
                <div>{itemData.description}</div>
          </div>
          {props.isavaliable ? <div className='col-1 bg-primary rounded-left text-center' style={{color:"white", justifyItems:"center",paddingTop:"35px"}}>
              <p>Avaliable</p>
          </div>
          : <div className='col-1 bg-danger rounded-left text-center' style={{color:"white", justifyItems:"center",paddingTop:"25px"}}>
            <p>Not Avaliable</p>
          </div>
          }
          <props.Button itemData={itemData} isavaliable={props.isavaliable}/>
          
        </div>
      </div>
    )
}
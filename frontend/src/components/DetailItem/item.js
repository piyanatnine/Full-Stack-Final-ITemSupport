import {
  useQuery,
  gql
} from "@apollo/client";
export default function Item(props){
  const itemData = props.data
    return(
        <div className='col-11 m-2'>
        <div className='row'>
          <div className="col-1 py-3 px-5">
              <img src={itemData.imageUrl} alt="img" height={70} width={70}/>
          </div>
          <div className='col-10 py-3 px-5'>
                <h4>{itemData.name}</h4>
                <div>{itemData.description}</div>
          </div>
          <props.Button itemData={itemData} isavaliable={props.isavaliable}/>
          
        </div>
      </div>
    )
}
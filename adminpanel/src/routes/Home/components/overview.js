import { Link } from "react-router-dom";

function OverViewForum({card}) {

    const OverView = ({data_card}) => {
        return(data_card.map((data, index) => {
            return(<OverViewCard data={data} key={data.title+"-"+index}/>)
        }))
    }


    const OverViewCard = ({data}) => {
        return(
        <div className='p-3 shadow-lg'>
          <div className='flex'>
              <div className='font-bold text-2xl'> {data.title} </div>
          </div>
          <div className='my-3 min-h-[12vh]'>
            {data.content}
          </div>
          <p className="h-1 w-90 my-2 bg-gray-200"></p>
          <Link to={data.path}>
            <button className="m-3 p-2 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-400 w-full">
                Open Page
            </button>
          </Link>
        </div>)
    }
    return (
        <div>
            <div className='flex'>
                <span className='text-2xl font-bold'>Overview</span>
            </div>
            <div className='m-5 grid grid-cols-3 gap-6'>
                <OverView data_card={card}/>
            </div>
        </div>
    );
  }
  
  export default OverViewForum;
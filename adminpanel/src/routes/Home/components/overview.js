function OverViewForum({card}) {

    const OverView = ({data_card}) => {
        console.log('a'+data_card[0].title)
        return(data_card.map((data) => {
            return(<OverViewCard data={data}/>)
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
          <button className="m-3 p-2 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-400 w-full">Open Page</button>
        </div>)
    }
    return (
        <OverView data_card={card}/>
    );
  }
  
  export default OverViewForum;
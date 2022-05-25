import { useEffect } from "react"

function Table({dataHistory, show, setUpdatePopup}) {

    const toReturn = (dEnd, dStart) => {
        var t2 = dEnd.getTime();
        var t1 = dStart.getTime();
        return Math.floor((t2-t1)/(24*3600*1000)) +" day";
    }

    const DataItem = () => {

        const reverse = dataHistory

        return (reverse.map((data) => {

            const Status = () => {
                return(<Labels status={data.status} key={data.status+"-"+data._id}/>)
            }

            if (data.status === show || show === "" || data.username.includes(show)){
            return (
            <tr className="bg-white border-b" key={data._id}>
                <td className="p-4"><Status/></td>
                <td className="p-4">{data.itemCode}</td>
                <td className="p-4">{data.username}</td>
                <td className="p-4">{(new Date(data.createdAt)).toLocaleString().split(",")[0]}</td>
                <td className="p-4" >
                    {data.status === "returned" ? (new Date(data.updatedAt)).toLocaleString().split(",")[0] : "-"}
                </td>
                <td className="p-4">
                {data.status === "returned" ? toReturn(new Date(data.updatedAt), new Date(data.createdAt)) : toReturn(new Date(), new Date(data.createdAt))}
                </td>
                <td onClick={ () => setUpdatePopup({status: true, target: data})}>
                    {data.status === "borrowing" ? 
                    <span className="text-lime-600 hover:text-lime-800">Update</span>
                    :<></>}
                </td>
                
                
            </tr>)
            }
            return<></>
        }))
    }
    
    const Labels = ({status}) => {
        return( 
            <span className={`text-xs font-semibold inline-block py-1 px-2 rounded uppercase
            ${status === "borrowing" ? "text-amber-600 bg-amber-200": ""}
            ${status === "returned" ? "text-lime-600 bg-lime-200": ""}`}>
                {status}
            </span> 
        )
    }

    useEffect(()=>{
    },[])

    return (
        <table className="w-full h-24 min-h-full overflow- text-md text-left bg-gray-100">
            <thead className="text-lg text-gray-700 bg-gray-50">
            <tr>
                <th className="p-4">Status</th>
                <th className="p-4">Item #</th>
                <th className="p-4">User</th>
                <th className="p-4">Borrow Date</th>
                <th className="p-4">Returned Date</th>
                <th className="p-4">Total Time</th>
                <th></th>
            </tr>
            </thead>
            <tbody className="my-3">
                <DataItem/>
            </tbody>
        </table>
    )
}

export default Table;
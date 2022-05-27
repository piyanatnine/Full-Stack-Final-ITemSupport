import { useEffect } from "react"

function Table({dataReservation, show, updatePopup}) {

    const dataReverse = structuredClone(dataReservation);
    dataReverse.reverse()
    

    const DataItem = () => {

        return (dataReverse.map((data) => {
            const Status = () => {
                return(<Labels status={data.status} key={data.status+"-5"+data._id}/>)
            }

            if (data.status === show || show === "" || data.itemCode.includes(show.toLowerCase()) || data.username.includes(show.toLowerCase())){
            return (
            <tr className="bg-white border-b" key={data._id} >
                <td className="p-4"><Status/></td>
                <td className="p-4">{data.itemCode}</td>
                <td className="p-4">{data.username}</td>
                <td className="p-4">{(new Date(data.createdAt)).toLocaleString().split(",")[0]}</td>
                <td className="p-4">{(new Date(data.reservedTime)).toLocaleString()}</td>
                { data.status === "waiting" && (<>
                <td className="p-4" onClick={() => updatePopup({status: true, target: {itemCode: data.itemCode, username: data.username, approved: false}})}>
                    <span className="text-red-600 hover:text-red-800">Cancle</span>
                </td>
                <td className="p-4" onClick={() => updatePopup({status: true, target: {itemCode: data.itemCode, username: data.username, approved: true}})}>
                    <span className="text-lime-600 hover:text-lime-800" >Approve</span>
                </td>
                </>)}
                { data.status !== "waiting" && (
                    <td colSpan={2} className="p-4">
                        <span className={`text-xs font-semibold inline-block py-1 px-2 rounded-full 
                        ${data.status === "completed" ? "text-lime-600 bg-lime-200": "text-red-600 bg-red-200"}`}>
                            This Order has been {data.status}
                        </span>  
                    </td>
                )}
            </tr>)
            }
            return<tr key={data._id}></tr>
        }))
    }
    
    const Labels = ({status}) => {
        return( 
            <span className={`text-xs font-semibold inline-block py-1 px-2 rounded uppercase
            ${status === "completed" ? "text-lime-600 bg-lime-200": ""}
            ${status === "canceled" ? "text-red-600 bg-red-200": ""}
            ${status === "waiting" ? "text-amber-600 bg-amber-200": ""}`}>
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
                <th className="p-4">Item Request</th>
                <th className="p-4">User</th>
                <th className="p-4">Request Time</th>
                <th className="p-4">Reservation Time</th>
                <th></th>
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
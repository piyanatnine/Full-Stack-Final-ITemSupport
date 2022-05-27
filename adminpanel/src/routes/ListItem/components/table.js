function Table({ dataItem, setDeletePopup, setEditPopup, show}) {
    const DataItem = () => {
        return dataItem.map((data) => {
            const Tags = () => {
                return (data.tags.map((tag) => {
                    return(<Labels tag={tag} key={data.itemCode+"-"+tag}/>)
                }))
            }
            if (show === "" || data.itemCode.includes(show.toLowerCase()) || data.name.toLowerCase().includes(show.toLowerCase())){
            return (
            <tr className="bg-white border-b" key={data.itemCode}>
                <td className="p-4">{data.itemCode}</td>
                <td className="p-4">{data.name}</td>
                <td className="p-4">{data.description}</td>
                <td className="p-4">
                    <Tags/>
                </td>
                <td className="p-4" onClick={() => setEditPopup({status: true, target: data})} >
                    <span className="text-blue-600 hover:text-blue-800">Edit</span>
                </td>
                <td className="p-4" onClick={() => setDeletePopup({status: true, target: data})}>
                    <span className="text-red-600 hover:text-red-800" >Delete</span>
                </td>
            </tr>)}
        })
    }
    
    const Labels = ({tag}) => {
        return( 
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-sky-600 bg-sky-200 uppercase">
            {tag}
        </span>
        )
    }

    return (
        <table className="w-full h-24 min-h-full overflow- text-md text-left bg-gray-100">
            <thead className="text-lg text-gray-700 bg-gray-50">
            <tr>
                <th className="p-4">#</th>
                <th className="p-4">Name</th>
                <th className="p-4">Description</th>
                <th className="p-4">tags</th>
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
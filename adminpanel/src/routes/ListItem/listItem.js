import React, { useState, useEffect } from "react";
import axios from "axios"

import Table from "./components/table"
import DeleteModel from "./components/deleteModel";
import EditModel from "./components/editModel";
import CreateModel from "./components/createModel";
import CategoryModel from "./components/categoryModel";

function ListItem() {
  const [category, setCategory] = useState(null);
  const [item, setItem] = useState(null);
  const [show, setShow] = useState("");
  const [deletePopup, setDeletePopup] = useState({status: false, target: null});
  const [editPopup, setEditPopup] = useState({status: false, target: null});
  const [createPopup, setCreatePopup] = useState({status: false});
  const [categoryPopup, setCategoryPopup] = useState({status: false});

  const getData = () => {
    axios({
      url: process.env.REACT_APP_GRAPHQL_URL,
      method: "post",
      data: {
        query: `
          query{
            category{
              id
              name
            },
            item{
              itemCode
              name
              description
              imageUrl
              tags
            } 
          }
        `
      }
    }).then((result) => {
      setCategory(result.data.data.category);
      setItem(result.data.data.item);
    })
  }

  const deleteItem = async () => {
    const deleteData = (data) => {
      let graphql = `mutation { deleteItem(filter: { itemCode: "${data}" }, sort: ITEMCODE_ASC) {recordId record {itemCode}}}`
      console.log(graphql)
      axios({
        url: process.env.REACT_APP_GRAPHQL_URL,
        method: "post",
        data: {
          "query": graphql
        },
        headers: {
          'content-type': 'application/json'
        }
      }
      ).then((result) => {
        console.log(result)
        getData()
      })
    }

    await deleteData(deletePopup.target.itemCode);
    await setDeletePopup({status: false, target: null});
  }

  const editItem = async (name, description, tag, img) => {
    const editData = () => {
      let graphql = ` 
        mutation{
          updateItem(record:{itemCode:"${editPopup.target.itemCode}", name:"${name}", description:"${description}", imageUrl:"${img}", tags:["${tag}"]}, filter:{itemCode: "${editPopup.target.itemCode}"}){
            record{
              name
              description
              imageUrl
              tags
              itemCode
              _id
            }
          }
        }
      `
      console.log(graphql)
      axios({
        url: process.env.REACT_APP_GRAPHQL_URL,
        method: "post",
        data: {
          "query": graphql
        },
        headers: {
          'content-type': 'application/json'
        }
      }
      ).then((result) => {
        console.log(result)
        getData()
      })
    }

    await editData()
    await setEditPopup({status: false, target: null})
  }

  const createItem = async (name, description, tag, img) => {
    const createData = () => {
      let graphql = ` 
        mutation{
          createItem(name: "${name}",description:"${description}",ImageUrl:"${img}",tags: ["${tag}"]){
            itemCode
            _id
            name
          }
        }
      `
      console.log(graphql)
      axios({
        url: process.env.REACT_APP_GRAPHQL_URL,
        method: "post",
        data: {
          "query": graphql
        },
        headers: {
          'content-type': 'application/json'
        }
      }
      ).then((result) => {
        console.log(result)
        getData()
      })
    }

    await createData()
    await setCreatePopup({status: false})
  }

  const createCategory = async (name) => {
    const createData = () => {
      let graphql = ` 
        mutation{
          createCatagory(name:"${name}", prefix:"${name.substr(0, 4)}"){
            id
            _id
            name
            prefix
          }
      }
      `
      console.log(graphql)
      axios({
        url: process.env.REACT_APP_GRAPHQL_URL,
        method: "post",
        data: {
          "query": graphql
        },
        headers: {
          'content-type': 'application/json'
        }
      }
      ).then((result) => {
        console.log(result)
        getData()
      })
    }

    await createData()
    await setCategoryPopup({status: false})
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="ListItem">
      <div className='grid grid-cols-6'>
          <div className='col-start-1 font-bold text-3xl'> List Item</div>
          <div className='col-end-7 col-span-5 flex font-bold text-md justify-end'> 
            <button className="disabled:opacity-25 mx-3 bg-white border border-sky-500 hover:text-sky-600 text-sky-500 py-2 px-4 rounded"
              onClick={() => setCategoryPopup({status:true})}
              disabled={category == null}
            >
                Add New Category
            </button>
            <button className="disabled:opacity-25 mx-3 bg-white border border-sky-500 hover:text-sky-600 text-sky-500 py-2 px-4 rounded"
            onClick={() => setCreatePopup({status:true})}
            disabled={item == null}
            >
                Add New Item
            </button>
            <input type="search" className="px-3 py-1.5 w-80 justify-center text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded m-0" 
                placeholder="Search by Item Code or Name"
                onChange={(event)=> {setShow(event.target.value)}}
              />
          </div>
      </div>
      <div className="table-auto my-5 shadow-md p-5">
        {category && item && 
          <Table dataItem={item} setDeletePopup={setDeletePopup} setEditPopup={setEditPopup} show={show}/>
        }
      </div>
      {deletePopup.status ? <DeleteModel item={deletePopup.target} setDeletePopup={setDeletePopup} deleteItem={deleteItem}/> : null}
      {editPopup.status ? <EditModel item={editPopup.target} setEditPopup={setEditPopup} editItem={editItem} category={category}/> : null}
      {createPopup.status ? <CreateModel setCreatePopup={setCreatePopup} createItem={createItem} category={category}/> : null}
      {categoryPopup.status ? <CategoryModel setCategoryPopup={setCategoryPopup} createCategory={createCategory} category={category}/> : null}
    </div>
  );
}

export default ListItem;
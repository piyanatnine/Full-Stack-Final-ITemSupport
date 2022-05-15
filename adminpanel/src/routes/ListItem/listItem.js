import React, { useState, useEffect } from "react";
import axios from "axios"

import Table from "./components/table"
import DeleteModel from "./components/deleteModel";

function ListItem() {
  const [category, setCategory] = useState(null);
  const [item, setItem] = useState(null);
  const [deletePopup, setDeletePopup] = useState({status: false, target: null});

  const getCategory = () => {
    axios({
      url: 'http://localhost:3000/graphql',
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
        url: 'http://localhost:3000/graphql',
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
        getCategory()
      })
    }

    deleteData(deletePopup.target.itemCode);
    setDeletePopup({status: false, target: null});
  }

  useEffect(() => {
    getCategory();
  }, [])

  return (
    <div className="ListItem">
      ListItem
      <div className="table-auto my-5 shadow-md p-5">
        {category && item && 
          <Table dataList={category} dataItem={item} setDeletePopup={setDeletePopup}/>
        }
      </div>
      {deletePopup.status ? <DeleteModel item={deletePopup.target} setDeletePopup={setDeletePopup} deleteItem={deleteItem}/> : null}
    </div>
  );
}

export default ListItem;
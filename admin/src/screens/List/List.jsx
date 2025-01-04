import React from'react'
import './List.css'
import axios from 'axios'
import {toast} from'react-toastify'
import { useState, useEffect } from 'react'


const List = () => {

  const url = 'http://localhost:4000'
  const [list,setList] = useState([])

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    console.log(response.data)
    if(response.data.success){
    setList(response.data.data)
    }
      else{
      toast.error(response.data.message)
  
  }
}
useEffect(() => {
  fetchList()
}, [])
 
const removeFood = async(FoodId) =>{
  const response = await axios.delete(`${url}/api/food/remove`,{params:{id:FoodId}})
  await fetchList()
  console.log(response.data)
}
  return (
    <div className="List add flex-col">

      <p><b>All Foods List</b></p>
      <div className="list-table">
        <div className="list-table-format title">
      <p><b>Image</b></p>
      <p><b>Name</b></p>
      <p><b>Category</b></p>
      <p><b>Price</b></p>
      <p><b>Action</b></p>

      </div>
      {
        list.map((item,index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/${item.image}`} alt=""/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })
      }

      </div>
    </div>
  )
}

export default List
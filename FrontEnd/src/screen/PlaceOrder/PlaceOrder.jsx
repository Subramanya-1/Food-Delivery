import React, { useContext,useState,useEffect} from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
const PlaceOrder=()=> {

  const {getTotalCartAmount,food_list,cartItems,url,token}=useContext(StoreContext)
  
  const [data,setData]= useState({
    first_name:"",
    last_name: '',
    email: '',
    street: '',
    zip_code: '',
    country:"",
    phone:"",
    city:"",
    state:""
  })

  const onSubmitHandler= async (e)=>{
    console.log(getTotalCartAmount())
    e.preventDefault()
    let orderItems=[]
    food_list.map((item,index)=>{
      if(cartItems[index._id]>0){
        let itemInfo=item;
        itemInfo.quantity=cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData={
      address:data,
      items: orderItems,
      amount: getTotalCartAmount()+2
    }
    try{
      let response= await axios.post(url+"/api/order/place",orderData,{headers:{token}})
      const {session_url}=response.data
      window.location.replace(session_url)
    }catch(error){
     
    }
  }

  const onChangeHandler=(e)=>{
    const {name,value}=e.target
    setData({...data,[name]:value})
  }

  return (
    <div className='order'>
      <div className='delivery-information'>
        <h2>Delivery Information</h2>
        <div className="customer-info">
          <form onSubmit={onSubmitHandler} >
            <div className="person-name">
            <input type="text" placeholder='First Name' name="first_name" value={data.first_name} onChange={(e)=>onChangeHandler(e)} required/>
            <input type="text" placeholder='Last Name' name="last_name" value={data.last_name} onChange={(e)=>onChangeHandler(e)} required/>
            </div>
            <div className="person-email">
              <input type='email' placeholder='Email address' name="email" value={data.email} onChange={(e)=>onChangeHandler(e)} required/>
            </div>
            <div className="person-street">
              <input type='text' placeholder='Street' name="street" value={data.street} onChange={(e)=>onChangeHandler(e)} required/>
              <input type='text' placeholder='City' name="city" value={data.city} onChange={(e)=>onChangeHandler(e)} required/>
              <input type='text' placeholder='State' name="state" value={data.state} onChange={(e)=>onChangeHandler(e)} required/>
            </div>
            <div className="person-address">
              <input type='text' placeholder='Zip Code' name='zip_code' value={data.zip_code} onChange={(e)=>onChangeHandler(e)} required/>
              <input type='text' placeholder='Country'  name="country"  value={data.country} onChange={(e)=>onChangeHandler(e)} required/>
            </div>
            <div className="person-phoneno">
             <input type='tel' placeholder='Phone number' name="phone" value={data.phone} onChange={(e)=>onChangeHandler(e)} required/>
            </div>
          </form>
        </div>
      </div>
      <div className="cart-bottom">
      <div className="cart-total">
        <h2>Cart Total</h2>
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>{getTotalCartAmount()}</p>
        </div>
        <hr/>
        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>{getTotalCartAmount()==0?0:2}</p>
        </div>
        <hr/>
        <div className="cart-total-details">
          <p>Total</p>
          <p>{getTotalCartAmount()==0?0:getTotalCartAmount()+2}</p>
        </div>
        <hr/>
        <button onClick={onSubmitHandler} type="submit">Proceed to payment</button>
      </div>
    </div>
    </div>
  )
}

export default PlaceOrder
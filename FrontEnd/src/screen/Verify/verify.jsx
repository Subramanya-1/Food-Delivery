import React from 'react'
import './verify.css'
import {useSearchParams,useNavigate} from "react-router-dom";
import {StoreContext} from "../../Context/StoreContext"
import {useContext,useEffect} from "react";
import axios from "axios";
const verify=()=> {
  const [seachParams,setSearchParams] = useSearchParams();
  const success = seachParams.get('success');
  const orderId = seachParams.get('orderId');
  const {url}=useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url+"/api/order/verify",{success,orderId})
    if(response.data.success)
      navigate("/myorders")
    else
      navigate("/")
  }
  useEffect(() => {
    verifyPayment()
  }, [])

  return (
    <div className="verify">
        <div className="spinner">

        </div>
    </div>
  )
}

export default verify
import React, { useContext,useState,useEffect } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const LoginPopUp = ({setShowLogin}) => {
    const {url,setToken} = useContext(StoreContext)
    const [curState, setState] = useState('Log In')
    const [data, setData] = useState({
      name:"",
      email:"",
      password:""
    })
    const onChangeHandler = (e) => {
      const {name,value}=e.target;
      setData({...data,[name]:value})
    }
    // useEffect(()=>{
    //   console.log(data)
    // },[data])

    const onLogin = async (e) => {
      e.preventDefault()
      let newUrl = url
      if(curState==='Sign Up'){
        newUrl += '/api/user/register'
    }
      else{
        newUrl += '/api/user/login'
      }
      const response = await axios.post(newUrl, data)
      if(response.data.token){
        setToken(response.data.token)
        localStorage.setItem('token',response.data.token)
        setShowLogin(false)
      }
    }
    
  return (
    <div className='login-popup'>
       <form onSubmit={onLogin} action='' className='login-popup-container'>
          <div className="login-popup-title">
            <h2>{curState}</h2>
            <img src={assets.cross_icon} onClick={()=>setShowLogin(false)} alt=""/>
          </div>
          <div className="login-popup-inputs">
            {curState!=="Log In" ? <input name="name" onChange={onChangeHandler} value={data.name} type='text' placeholder='Your Name' required />:<></>}
           <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="E-mail" required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
          </div>
          <button type='submit' className='btn'>{curState ==='Sign Up'? 'Create Account' : 'Log In'}</button>
          <div className="login-popup-condition">
            <input type="checkbox"/>
            <p>By continuing, I agree to the terms and conditions</p>
          </div>
          {
            curState ==='Sign Up'
              ?<p>Already have an account?<span onClick={()=>setState('Log In')}>Log In</span></p>
              :<p>Create a new account?<span onClick={()=>setState('Sign Up')}>Click here</span></p>
          }
       </form>
    </div>
  )
}

export default LoginPopUp
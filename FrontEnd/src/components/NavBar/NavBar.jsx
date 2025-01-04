import React, { useState,useContext } from 'react'
import './NavBar.css'
import {assets} from '../../assets/assets.js'
import { Link, Navigate } from 'react-router-dom'
import {StoreContext} from '../../Context/StoreContext.jsx'

const NavBar = ({setShowLogin}) => {
  const [menu,setMenu] =useState('home')
  const {getTotalCartAmount,token,setToken}=useContext(StoreContext)

  const logout =()=>{
    localStorage.removeItem("token")
    setToken("")
    Navigate("/")
  }
  return (
    <div className='navbar'>
        <Link to='/' ><img className="logo" src={assets.logo} alt=""/></Link>
        <ul className="navbar-menu">
          <Link to='/' className={menu=== 'home' ?  'active': ''} onClick={()=>setMenu('home')}>home</Link>
          <a href='#explore-menu' className={menu=== 'menu' ? 'active': ''} onClick={()=>setMenu('menu')}>menu</a>
          <a href='#app-download' className={menu=== 'mobile-app' ? 'active': ''} onClick={()=>setMenu('mobile-app')}>mobile-app</a>
          <a href='#footer' className={menu=== 'contact-us' ? 'active': ''} onClick={()=>setMenu('contact-us')}>contact-us</a>
        </ul>
        <div className='navbar-right'>
          <img src={assets.search_icon} alt=""/>
          <div className='navbar-cart-icon'>
            <Link to='/cart'><img src={assets.basket_icon} alt=""/></Link>
            <div className='dot'>{getTotalCartAmount()}</div>
          </div>
          {
             !token
              ? <button className='navbar-login-btn' onClick={()=>setShowLogin(true)}>Sign Up</button>
              : <div className="navbar-profile">
                <img src={assets.profile_icon} alt=""/>
                <ul className="navbar-profile-dropdown">
                  <li><img src={assets.bag_icon} alt=""/>Orders</li>
                  <hr/>
                  <li onClick={logout}><img src={assets.logout_icon} alt=""/>Logout</li>
                </ul>
              </div>
          }
        </div>
    </div>
  )
}

export default NavBar
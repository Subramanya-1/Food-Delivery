import React from 'react'
import { NavLink } from'react-router-dom'
import './SideBar.css'
import { assets } from '../../assets/admin_assets/assets'

const SideBar = () => {
  return (
    <div className="sidebar">
        <div className="sidebar-options">
            <NavLink to="/add" className="sidebar-option">
                <img src={assets.add_icon} alt=""/>
                <p><b>Add items</b></p>
                </NavLink>
            
            <NavLink to="/list" className="sidebar-option">
                <img src={assets.order_icon} alt=""/>
                <p><b>List items</b></p>
                </NavLink>
            
            <NavLink to="/orders" className="sidebar-option">
                <img src={assets.order_icon} alt=""/>
                <p><b>Orders</b></p>
                </NavLink>
            </div>
            </div>
        
    
  )
}

export default SideBar
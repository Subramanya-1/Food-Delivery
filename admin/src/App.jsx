import React from 'react'
import {Routes,Route} from'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import NavBar from './components/NavBar/NavBar'
import Add from './screens/Add/Add'
import List from './screens/List/List'
import Orders from './screens/Orders/Orders'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const url = 'http://localhost:10000'
  return (
    <div className='app'>
      <ToastContainer />
      <NavBar />
      <hr/>
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add/>}></Route>
          <Route path='/list' element={<List/>}></Route>
          <Route path='/orders' element={<Orders/>}></Route>
        </Routes>
      </div>


    </div>
  )
}

export default App

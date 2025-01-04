import {Routes,Route} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar.jsx'
import Home from './screen/Home/Home.jsx'
import Cart from './screen/Cart/Cart.jsx'
import PlaceOrder from './screen/PlaceOrder/PlaceOrder.jsx'
import Footer from './components/Footer/Footer.jsx'
import LoginPopUp from './components/LoginPopUp/LoginPopUp.jsx'
import { useState } from 'react'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return(
    <>
    {
      showLogin ? <LoginPopUp setShowLogin={setShowLogin}/> : <></>
    }
    <div className='app'>
      <NavBar setShowLogin={setShowLogin}/>
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
      </Routes>
    </div>
    <Footer/>
    </>
  )
  
}

export default App



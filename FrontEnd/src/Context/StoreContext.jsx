import { createContext, useEffect, useState } from "react";

import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  

  const [token,setToken]=useState("")

  
  const url="https://food-delivery-3dgq.onrender.com"
  const [cartItems, setCartItems] = useState({});
  const addToCart = async(itemId) => {
        if (!cartItems[itemId]) {
        setCartItems({ ...cartItems, [itemId]: 1 });
        } 
        else {
        setCartItems({ ...cartItems, [itemId]: cartItems[itemId] + 1 });
        }
        if(token)
          await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        //
    }
    const removeFromCart = async(itemId) => {
      setCartItems({ ...cartItems, [itemId]: cartItems[itemId] - 1 });
      if(token)
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    };
    const getTotalCartAmount=()=>{
      let total=0;
      for (let item in cartItems) {
        if(cartItems[item]>0){
        let itemInfo=food_list.find((food)=>food._id===item);
        total += itemInfo.price * cartItems[item];
        }
      }
      console.log(total)
        return total; 
    }
    const  [food_list, setFoodList] = useState([]);
    const fetchFoodList = async () => { 
      const response = await axios.get(url+"/api/food/list")
      setFoodList(response.data.data)
    }

    const loadCartData  = async (token) => {
      const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
      setCartItems(response.data.data)

    }
    useEffect(() => {
      async function loadData() {
        await fetchFoodList();
        if(localStorage.getItem("token")){
          setToken(localStorage.getItem("token"))
          await loadCartData(localStorage.getItem("token"));
          
        
      }}
      loadData();//
    },[] )

    const ContextValues = {
      token,
      setToken,
      url,
      food_list,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      
    };
    return (
      <StoreContext.Provider value={ContextValues}>
        {props.children}
      </StoreContext.Provider>
    );
  
}

export { StoreContextProvider }

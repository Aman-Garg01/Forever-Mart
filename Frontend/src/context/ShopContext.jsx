import { createContext, useEffect, useState } from "react";
// import { products } from '../assets/assets'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {

  const currency = '₹';
  const delivery_fee = 50;
  const backEndUrl = process.env.REACT_APP_BACKEND_URL_

  const [search, setSearch] = useState('');
  const [showsearch, setShowsearch] = useState(false)
  const [cartItem, setCartItem] = useState({});
  const [products, setProducts] = useState([])
  const [token, setToken] = useState("")
  const navigate = useNavigate()

  const addToCart = async (itemId, size) => {

    if (!size) {
      toast.error('Select Product Size')
      return;
    }
    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      }
      else {
        cartData[itemId][size] = 1;
      }
    }
    else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItem(cartData);



    if (token) {
      try {

        await axios.post(backEndUrl + '/api/cart/add', { itemId, size }, { headers: { token } })

      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
  }

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItem) {
      for (const items in cartItem[item]) {
        try {
          if (cartItem[item][items] > 0) {
            totalCount += cartItem[item][items];
          }
        } catch (error) {

        }
      }
    }
    return totalCount
  }

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem)

    cartData[itemId][size] = quantity;

    setCartItem(cartData)

    if (token) {
      try {

        await axios.post(backEndUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
  }

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items)
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item]
          }
        } catch (error) {

        }
      }
    }
    return totalAmount
  }

  // useEffect(()=>{
  //    console.log(cartItem);
  // })

  const getProductData = async () => {
    try {
      const response = await axios.get(backEndUrl + '/api/cloth/list')
      if (response.data.success) {
        setProducts(response.data.data)

      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backEndUrl + '/api/cart/get', {}, { headers: { token } })

      if (response.data.success) {
        setCartItem(response.data.cartData)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getProductData()
  }, [])

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }
  }, [])

  const value = {
    products, currency, delivery_fee,
    search, setSearch, showsearch, setShowsearch, cartItem, setCartItem, addToCart, getCartCount,
    updateQuantity, getCartAmount, navigate, backEndUrl, setToken, token
  }

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
}


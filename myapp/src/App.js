import Home from "./components/Home";
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup";
import Products from "./components/Product/Products";
import Product from "./components/Product/Product";
import Order from "./components/Order";
import MyOrders from "./components/MyOrders";
import AdminPage from "./components/AdminPage";
import Cart from './components/cart/Cart';
import { getProducts } from './actions/product';
import { loadCart } from './actions/cart';
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Admin from "./components/admin/Admin";
import AdminOrders from './components/admin/AdminOrders';
import PrivateRoute from "./routing/PrivateRoute";
import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token == 'null') {
      //dispatch an action that modifies the store
      // console.log(token)
      dispatch({
        type: "SET_AUTH_TOKEN",
        payload: { token: null }
      })
    }
    else {
      dispatch({
        type: "SET_AUTH_TOKEN",
        payload: { token }
      })
    }
  }, [])

  useEffect(() => {
    console.log('lorem')
    dispatch(getProducts())
    dispatch(loadCart())
  }, [])

  return (
    <div className="App">
      <div><Toaster /></div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<PrivateRoute child={<Login />} />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop" element={<Products />} />
        <Route path="/shop/:productId" element={<Product />} />
        {/* <Route path="/admin" element={<AdminPage />} /> */}
        <Route path='/admin' element={<Admin />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/admin/orders" element={<PrivateRoute requiredRole="admin"><AdminOrders /></PrivateRoute>} />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;

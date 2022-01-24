import Home from "./components/Home";
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup";
import Products from "./components/Product/Products";
import Product from "./components/Product/Product";
import Order from "./components/Order";
import MyOrders from "./components/MyOrders";
import AdminPage from "./components/AdminPage";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import PrivateRoute from "./routing/PrivateRoute";
import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

const App = () => {
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
      </Routes>
      <Footer />

    </div>
  );
}

export default App;

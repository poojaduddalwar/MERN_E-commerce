import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Products from "./components/Products";
import Product from "./components/Product";
import Order from "./components/Order";
import MyOrders from "./components/MyOrders";
import AdminPage from "./components/AdminPage";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import PrivateRoute from "./routing/PrivateRoute";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PrivateRoute child={<Login />} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Product />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;

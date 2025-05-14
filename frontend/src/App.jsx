import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductView from "./components/ProductsView";
import ProductDetails from "./components/ProductDetails";
import Header from "./components/Header";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import UserLogin from "./components/UserLogin";
import RegisterUser from "./components/RegisterUser";
import Profile from "./components/UserProfile";
import Orders from "./components/Orders";
import OrderSummary from "./components/OrderSummary";
import Address from "./components/Address";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:category" element={<ProductView />} />
          <Route path="/product" element={<ProductView />} />
          <Route path="/productDetails/:proId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/registerUser" element={<RegisterUser />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orderSummary" element={<OrderSummary />} />
          <Route path="/address" element={<Address />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

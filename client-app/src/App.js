import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import HomePage from "./pages/HomePage/HomePage";
import ShopPage from "./pages/ShopPage/ShopPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUp";
import Navbar from "./components/Navbar/Navbar";
import ChatBox from "./pages/ChatBox/ChatBox";
import ThankYou from "./components/ThankYou/ThankYou";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import Footer from "./components/Footer/Footer";
import { UserProvider } from "./utils/UserContext";

function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/detail/:productId" element={<DetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/order-history/:userId" element={<OrderHistory />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<SignUpPage />} />
            </Routes>
            <ChatBox />
            <Footer />
          </div>
        </Router>
      </UserProvider>
    </Provider>
  );
}

export default App;

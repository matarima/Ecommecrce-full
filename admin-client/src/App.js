import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import ProductList from "./components/ProductsList/ProductsList";
import AddProduct from "./components/AddProduct/AddProduct";
import UpdateProduct from "./components/UpdateProduct/UpdateProduct";
import Dashboard from "./components/AdminDashBoard/Dashboard";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import AdminChat from "./components/AdminChat/AdminChat";
import { UserProvider } from "./utils/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/order-details" element={<OrderDetails />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
          <Route path="/admin-chat" element={<AdminChat />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

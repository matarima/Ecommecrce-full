// App.js
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
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { UserProvider } from "./utils/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-product"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-details"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-product/:id"
            element={
              <ProtectedRoute>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-chat"
            element={
              <ProtectedRoute>
                <AdminChat />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

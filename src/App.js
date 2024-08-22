import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Clients from "./pages/Clients"
import AddClients from "./pages/AddClient"
import Products from "./pages/Products";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
//import Scanner from "./components/Scanner";  
//import TrafficLight from "./components/TrafficLight";
import CalendarPage from './pages/CalendarPage';
import ClientTasks from './pages/ClientTasks';


function App() {
  return (
    <div>
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/clients/add" element={<AddClients />} />

          <Route path="/client-tasks/:clientId" element={<ClientTasks />} /> 
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/calendar" element={<CalendarPage />} />


          


      </Routes>
      </Router>
      </div>

  );
}

export default App;

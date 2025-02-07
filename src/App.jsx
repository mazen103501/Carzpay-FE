import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tickets from "./pages/Tickets/Tickets";
import TicketDetails from "./pages/Tickets/TicketDetails/TicketDetails";
import RepairShopDetails from "./pages/RepairShops/RepairShopDetails/RepairShopDetails";
import RepairShops from "./pages/RepairShops/RepairShops";
import { AuthContext } from "./context/AuthContext";
import Users from "./pages/Users/Users";
import UsersDetails from "./pages/Users/UsersDetails/UsersDetails";

function App() {
  const { authToken } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          authToken ? (
            <div className="app-container">
              <Navbar />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:userId" element={<UsersDetails />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/tickets/:ticketId" element={<TicketDetails />} />
                <Route path="/repair-shops" element={<RepairShops />} />
                <Route
                  path="/repair-shops/:shopId"
                  element={<RepairShopDetails />}
                />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;

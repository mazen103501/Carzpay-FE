import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tickets from "./pages/Tickets/Tickets";
import TicketDetails from "./pages/Tickets/TicketDetails/TicketDetails";
import RepairShopDetails from "./pages/RepairShops/RepairShopDetails/RepairShopDetails";
import RepairShops from "./pages/RepairShops/RepairShops";

function App() {
  const isAuthenticated = true; // Replace with actual authentication logic

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <div className="app-container">
                <Navbar />
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/tickets" element={<Tickets />} />
                  <Route
                    path="/tickets/:ticketId"
                    element={<TicketDetails />}
                  />
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
    </Router>
  );
}

export default App;

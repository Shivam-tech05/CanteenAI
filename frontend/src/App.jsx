import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import DemandPrediction from "./pages/DemandPrediction";
import FoodManagement from "./pages/FoodManagement";
import WasteAnalytics from "./pages/WasteAnalytics";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        {/* Sidebar */}
        <aside className="sidebar">

          <div className="brand">
            <div className="brand-icon">C</div>

            <div>
              <h2>CanteenAI</h2>
              <span>Smart Canteen System</span>
            </div>
          </div>

          <nav className="nav-menu">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/prediction"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              Demand Prediction
            </NavLink>

            <NavLink
              to="/food"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              Food Management
            </NavLink>

            <NavLink
              to="/waste"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              Waste Analytics
            </NavLink>

            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              Reports
            </NavLink>

          </nav>

          <div className="sidebar-bottom">

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              Settings
            </NavLink>

          </div>

        </aside>

        {/* Page Content */}
        <main className="main-content">

          <Routes>

            <Route path="/" element={<Dashboard />} />

            <Route
              path="/prediction"
              element={<DemandPrediction />}
            />

            <Route
              path="/food"
              element={<FoodManagement />}
            />

            <Route
              path="/waste"
              element={<WasteAnalytics />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

          </Routes>

        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;
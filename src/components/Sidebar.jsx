import {
  LayoutGrid,
  ShoppingBasket,
  Utensils,
  CreditCard,
  Building,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";




const Sidebar = ({ isOpen, toggle }) => {
  const companyData = JSON.parse(localStorage.getItem("company"));
  const restaurantData = JSON.parse(localStorage.getItem("restaurant"));
  console.log("this is restaurant data", restaurantData);
  console.log("this is company data", companyData);

  if (companyData) {
    return <CompanySidebar isOpen={isOpen} toggle={toggle} />;
  }
  if (restaurantData) {
    return <RestaurantSidebar isOpen={isOpen} toggle={toggle} />;
  }

  return null; // nothing if neither exists
};

// Lets now handle logout
const handleLogout = () => {
  localStorage.removeItem("company");
  localStorage.removeItem("restaurant");
  window.location.href = "/";
  
};


const CompanySidebar = ({ isOpen, toggle }) => (
  
  <div
    className={`text-white position-fixed h-100 p-3 transition-all ${
      isOpen ? "d-block" : "d-none"
    } d-lg-block`}
    style={{ backgroundColor: "#28a745", width: "250px", zIndex: 1000 }}
  >
    <div className="d-flex justify-content-between align-items-center mb-4">
      <span className="fw-bold fs-4">DishDash</span>
      <button className="btn btn-sm btn-light d-lg-none" onClick={toggle}>
        ✕
      </button>
    </div>

    <ul className="nav flex-column mt-3">
      <li className="nav-item d-flex align-items-center p-2">
        <LayoutGrid className="me-2" />
        <Link to="/dashboardcomp" className="nav-link text-white">
          Dashboard
        </Link>
      </li>
      <li className="nav-item d-flex align-items-center p-2">
        <Building className="me-2" />
        <Link to="/restaurants" className="nav-link text-white">
          Restaurants
        </Link>
      </li>
      <li className="nav-item d-flex align-items-center p-2">
        <ShoppingBasket className="me-2" />
        <Link to="/orders" className="nav-link text-white">
          Orders
        </Link>
      </li>
      <li className="nav-item d-flex align-items-center p-2">
        <CreditCard className="me-2" />
        <Link to="/payments" className="nav-link text-white">
          Payments
        </Link>
      </li>
    </ul>

    <div className="position-absolute bottom-0 start-0 w-100 p-3">
      <button className="btn btn-outline-light btn-sm w-100" onClick={handleLogout}>Logout</button>
    </div>
  </div>
);

const RestaurantSidebar = ({ isOpen, toggle }) => (
  <div
    className={`text-white position-fixed h-100 p-3 transition-all ${
      isOpen ? "d-block" : "d-none"
    } d-lg-block`}
    style={{ backgroundColor: "#28a745", width: "250px", zIndex: 1000 }}
  >
    <div className="d-flex justify-content-between align-items-center mb-4">
      <span className="fw-bold fs-4">DishDash</span>
      <button className="btn btn-sm btn-light d-lg-none" onClick={toggle}>
        ✕
      </button>
    </div>

    <ul className="nav flex-column mt-3">
      <li className="nav-item d-flex align-items-center p-2">
        <LayoutGrid className="me-2" />
        <Link to="/dashboardres" className="nav-link text-white">
          Dashboard
        </Link>
      </li>
      <li className="nav-item d-flex align-items-center p-2">
        <ShoppingBasket className="me-2" />
        <Link to="/orders" className="nav-link text-white">
          Orders
        </Link>
      </li>
      <li className="nav-item d-flex align-items-center p-2">
        <Utensils className="me-2" />
        <Link to="/meals" className="nav-link text-white">
          Meals
        </Link>
      </li>
      <li className="nav-item d-flex align-items-center p-2">
        <CreditCard className="me-2" />
        <Link to="/finance" className="nav-link text-white">
          Finance
        </Link>
      </li>
    </ul>

    <div className="position-absolute bottom-0 start-0 w-100 p-3">
      {/* the logout button to redirect to the landing page   */}
      <button className="btn btn-outline-light btn-sm w-100" onClick={handleLogout} >Logout</button>
    </div>
  </div>
);



export default Sidebar;

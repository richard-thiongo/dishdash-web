// Topbar.jsx
import {
  CircleUser,
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import AuthApi from "../Apis/Auth";

const Topbar = ({ toggle }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("User"); 
  const dropdownRef = useRef(null);

  

  // useEffect to get the username from the local storage where you first check the user logged in if they are restaurant or company
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("company"));
    console.log("this is user in topbar", user);
    if (user?.company) {
      setUserName(user?.company?.company_name);
    }
    else {
      const user = JSON.parse(localStorage.getItem("restaurant"));
      if (user?.restaurant) {
        setUserName(user?.restaurant?.restaurant_name);
      }
    }
  })

  console.log(userName)
                                


  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar navbar-expand-lg navbar-light shadow-sm backdrop-blur sticky-top" style={{ zIndex: 1030 }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Sidebar toggle button on small screens */}
        <button onClick={toggle} className="btn btn-outline-primary d-lg-none">
          <Menu />
        </button>

        {/* Right side content */}
        <div className="ms-auto d-flex align-items-center">
          {/* User dropdown */}
          <div className="dropdown ms-2" ref={dropdownRef}>
            <button
              className="btn btn-link text-decoration-none d-flex align-items-center p-1"
              onClick={toggleDropdown}
              style={{ border: "none" }}
            >
              <CircleUser size={20} className="text-muted" />
              <span className="ms-2 text-dark d-none d-sm-inline">{userName}</span>
              <ChevronDown
                size={16}
                className={`ms-1 text-muted transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                style={{ transition: "transform 0.2s ease" }}
              />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div
                className="dropdown-menu dropdown-menu-end show position-absolute"
                style={{
                  minWidth: "180px",
                  top: "100%",
                  right: "0",
                  zIndex: 1050,
                }}
              >
                <div className="px-3 py-2 border-bottom">
                  <small className="text-muted">Signed in as</small>
                  <div className="fw-medium">{userName}</div>
                </div>

                <button className="dropdown-item d-flex align-items-center py-2">
                  <User size={16} className="me-2" />
                  Profile
                </button>

                <button className="dropdown-item d-flex align-items-center py-2">
                  <Settings size={16} className="me-2" />
                  Settings
                </button>

                <div className="dropdown-divider"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;

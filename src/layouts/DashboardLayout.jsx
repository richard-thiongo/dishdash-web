import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import React from "react";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Close sidebar by default on mobile, open on desktop
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Main container styles
  const containerStyles = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#0f111a"
  };

  // Main content area styles
  const mainContentStyles = {
    flexGrow: 1,
    marginLeft: isMobile ? "0" : (isOpen ? "280px" : "0"),
    transition: "margin-left 0.3s ease",
    minHeight: "100vh"
  };

  // Content area styles (below topbar)
  const contentAreaStyles = {
    padding: isMobile ? "1rem 0.5rem" : "2rem",
    marginTop: "64px", // Account for fixed topbar
    minHeight: "calc(100vh - 64px)",
    backgroundColor: "#0f111a"
  };

  return (
    <div style={containerStyles}>
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />

      {/* Main Content */}
      <div style={mainContentStyles}>
        <Topbar toggle={toggleSidebar} />
        <div style={contentAreaStyles}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
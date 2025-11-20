import {
  LayoutGrid,
  Building,
  Utensils,
  Menu,
  X
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggle }) => {
  const companyData = JSON.parse(localStorage.getItem("company"));
  const restaurantData = JSON.parse(localStorage.getItem("restaurant"));

  if (companyData) {
    return <CompanySidebar isOpen={isOpen} toggle={toggle} />;
  }
  if (restaurantData) {
    return <RestaurantSidebar isOpen={isOpen} toggle={toggle} />;
  }

  return null;
};

const handleLogout = () => {
  localStorage.removeItem("company");
  localStorage.removeItem("restaurant");
  window.location.href = "/";
};

const CompanySidebar = ({ isOpen, toggle }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const sidebarStyles = {
    backgroundColor: "#0f111a",
    width: isMobile ? (isOpen ? "280px" : "0") : "280px",
    height: "100vh",
    position: "fixed",
    left: "0",
    top: "0",
    zIndex: 1000,
    borderRight: "1px solid #334155",
    padding: isMobile ? (isOpen ? "1.5rem 1rem" : "1.5rem 0") : "1.5rem 1rem",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease",
    overflow: isMobile && !isOpen ? "hidden" : "visible",
    transform: isMobile && !isOpen ? "translateX(-100%)" : "translateX(0)"
  };

  const mobileToggleStyles = {
    position: "fixed",
    top: "1rem",
    left: "1rem",
    zIndex: 1001,
    backgroundColor: "#0f111a",
    border: "1px solid #334155",
    borderRadius: "8px",
    padding: "0.5rem",
    color: "#ffffff",
    cursor: "pointer",
    display: isMobile ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease"
  };

  const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    display: isMobile && isOpen ? "block" : "none"
  };

  const linkBaseStyles = {
    display: "flex",
    alignItems: "center",
    padding: "0.75rem 1rem",
    textDecoration: "none",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    fontSize: isMobile ? "0.9rem" : "1rem",
    border: "1px solid transparent"
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          style={overlayStyles}
          onClick={toggle}
        />
      )}

      {/* Mobile Toggle Button - Only show when sidebar is closed on mobile */}
      {isMobile && !isOpen && (
        <button 
          style={mobileToggleStyles}
          onClick={toggle}
        >
          <Menu size={20} />
        </button>
      )}

      {/* Sidebar */}
      <div style={sidebarStyles}>
        {/* Header with close button on mobile */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid #334155"
        }}>
          <span style={{
            fontWeight: "700",
            fontSize: isMobile ? "1.25rem" : "1.5rem",
            color: "#ffffff",
            background: "linear-gradient(135deg, #4ade80, #22c55e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            DishDash
          </span>
          
          {/* Close button for mobile */}
          {isMobile && (
            <button 
              onClick={toggle}
              style={{
                backgroundColor: "transparent",
                border: "1px solid #334155",
                borderRadius: "6px",
                padding: "0.25rem",
                color: "#94a3b8",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#1e293b";
                e.target.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#94a3b8";
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <ul style={{
          listStyle: "none",
          padding: "0",
          margin: "0",
          flex: "1"
        }}>
          <li style={{ marginBottom: "0.5rem" }}>
            <Link 
              to="/dashboardcomp" 
              style={{
                ...linkBaseStyles,
                color: isActive("/dashboardcomp") ? "#4ade80" : "#e2e8f0",
                backgroundColor: isActive("/dashboardcomp") ? "#1e293b" : "transparent",
                border: isActive("/dashboardcomp") ? "1px solid #334155" : "1px solid transparent"
              }}
              onMouseEnter={(e) => {
                if (!isActive("/dashboardcomp")) {
                  e.target.style.backgroundColor = "#1e293b";
                  e.target.style.color = "#4ade80";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive("/dashboardcomp")) {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#e2e8f0";
                }
              }}
              onClick={() => isMobile && toggle()}
            >
              <LayoutGrid 
                size={isMobile ? 18 : 20} 
                style={{ 
                  marginRight: "0.75rem",
                  color: isActive("/dashboardcomp") ? "#4ade80" : "#94a3b8"
                }} 
              />
              Dashboard
            </Link>
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <Link 
              to="/restaurants" 
              style={{
                ...linkBaseStyles,
                color: isActive("/restaurants") ? "#4ade80" : "#e2e8f0",
                backgroundColor: isActive("/restaurants") ? "#1e293b" : "transparent",
                border: isActive("/restaurants") ? "1px solid #334155" : "1px solid transparent"
              }}
              onMouseEnter={(e) => {
                if (!isActive("/restaurants")) {
                  e.target.style.backgroundColor = "#1e293b";
                  e.target.style.color = "#4ade80";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive("/restaurants")) {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#e2e8f0";
                }
              }}
              onClick={() => isMobile && toggle()}
            >
              <Building 
                size={isMobile ? 18 : 20} 
                style={{ 
                  marginRight: "0.75rem",
                  color: isActive("/restaurants") ? "#4ade80" : "#94a3b8"
                }} 
              />
              Restaurants
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        <div style={{
          paddingTop: "1rem",
          borderTop: "1px solid #334155"
        }}>
          <button 
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              backgroundColor: "transparent",
              border: "1px solid #475569",
              borderRadius: "8px",
              color: "#94a3b8",
              cursor: "pointer",
              fontWeight: "500",
              transition: "all 0.2s ease",
              fontSize: isMobile ? "0.9rem" : "1rem"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#dc2626";
              e.target.style.borderColor = "#dc2626";
              e.target.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.borderColor = "#475569";
              e.target.style.color = "#94a3b8";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

const RestaurantSidebar = ({ isOpen, toggle }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const sidebarStyles = {
    backgroundColor: "#0f111a",
    width: isMobile ? (isOpen ? "280px" : "0") : "280px",
    height: "100vh",
    position: "fixed",
    left: "0",
    top: "0",
    zIndex: 1000,
    borderRight: "1px solid #334155",
    padding: isMobile ? (isOpen ? "1.5rem 1rem" : "1.5rem 0") : "1.5rem 1rem",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease",
    overflow: isMobile && !isOpen ? "hidden" : "visible",
    transform: isMobile && !isOpen ? "translateX(-100%)" : "translateX(0)"
  };

  const mobileToggleStyles = {
    position: "fixed",
    top: "1rem",
    left: "1rem",
    zIndex: 1001,
    backgroundColor: "#0f111a",
    border: "1px solid #334155",
    borderRadius: "8px",
    padding: "0.5rem",
    color: "#ffffff",
    cursor: "pointer",
    display: isMobile ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease"
  };

  const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    display: isMobile && isOpen ? "block" : "none"
  };

  const linkBaseStyles = {
    display: "flex",
    alignItems: "center",
    padding: "0.75rem 1rem",
    textDecoration: "none",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    fontSize: isMobile ? "0.9rem" : "1rem",
    border: "1px solid transparent"
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          style={overlayStyles}
          onClick={toggle}
        />
      )}

      {/* Mobile Toggle Button - Only show when sidebar is closed on mobile */}
      {isMobile && !isOpen && (
        <button 
          style={mobileToggleStyles}
          onClick={toggle}
        >
          <Menu size={20} />
        </button>
      )}

      {/* Sidebar */}
      <div style={sidebarStyles}>
        {/* Header with close button on mobile */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid #334155"
        }}>
          <span style={{
            fontWeight: "700",
            fontSize: isMobile ? "1.25rem" : "1.5rem",
            color: "#ffffff",
            background: "linear-gradient(135deg, #4ade80, #22c55e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            DishDash
          </span>
          
          {/* Close button for mobile */}
          {isMobile && (
            <button 
              onClick={toggle}
              style={{
                backgroundColor: "transparent",
                border: "1px solid #334155",
                borderRadius: "6px",
                padding: "0.25rem",
                color: "#94a3b8",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#1e293b";
                e.target.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#94a3b8";
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <ul style={{
          listStyle: "none",
          padding: "0",
          margin: "0",
          flex: "1"
        }}>
          <li style={{ marginBottom: "0.5rem" }}>
            <Link 
              to="/meals" 
              style={{
                ...linkBaseStyles,
                color: isActive("/meals") ? "#4ade80" : "#e2e8f0",
                backgroundColor: isActive("/meals") ? "#1e293b" : "transparent",
                border: isActive("/meals") ? "1px solid #334155" : "1px solid transparent"
              }}
              onMouseEnter={(e) => {
                if (!isActive("/meals")) {
                  e.target.style.backgroundColor = "#1e293b";
                  e.target.style.color = "#4ade80";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive("/meals")) {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#e2e8f0";
                }
              }}
              onClick={() => isMobile && toggle()}
            >
              <Utensils 
                size={isMobile ? 18 : 20} 
                style={{ 
                  marginRight: "0.75rem",
                  color: isActive("/meals") ? "#4ade80" : "#94a3b8"
                }} 
              />
              Meals
            </Link>
          </li>
        </ul>

        {/* Feature Notice */}
        <div style={{
          marginTop: "auto",
          marginBottom: "1rem",
          padding: "1rem",
          backgroundColor: "#1e293b",
          border: "1px solid #334155",
          borderRadius: "8px"
        }}>
          <p style={{
            color: "#4ade80",
            fontSize: isMobile ? "0.7rem" : "0.75rem",
            fontWeight: "500",
            margin: "0 0 0.5rem 0",
            textAlign: "center"
          }}>
            🚀 More Features Available
          </p>
          <p style={{
            color: "#94a3b8",
            fontSize: isMobile ? "0.65rem" : "0.7rem",
            margin: "0",
            textAlign: "center",
            lineHeight: "1.3"
          }}>
            Download our mobile app to access orders, finance tracking, and more features!
          </p>
        </div>

        {/* Logout Button */}
        <div style={{
          paddingTop: "1rem",
          borderTop: "1px solid #334155"
        }}>
          <button 
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              backgroundColor: "transparent",
              border: "1px solid #475569",
              borderRadius: "8px",
              color: "#94a3b8",
              cursor: "pointer",
              fontWeight: "500",
              transition: "all 0.2s ease",
              fontSize: isMobile ? "0.9rem" : "1rem"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#dc2626";
              e.target.style.borderColor = "#dc2626";
              e.target.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.borderColor = "#475569";
              e.target.style.color = "#94a3b8";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
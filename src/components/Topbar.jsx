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
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("company"));
    if (user?.company) {
      setUserName(user?.company?.company_name);
    } else {
      const user = JSON.parse(localStorage.getItem("restaurant"));
      if (user?.restaurant) {
        setUserName(user?.restaurant?.restaurant_name);
      }
    }
  }, []);

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

  // Topbar container styles
  const topbarStyles = {
    position: "fixed",
    top: 0,
    left: isMobile ? "0" : "280px",
    right: 0,
    height: "64px",
    backgroundColor: "#0f111a",
    borderBottom: "1px solid #334155",
    zIndex: 999,
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center"
  };

  const topbarContainerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: isMobile ? "0 1rem" : "0 2rem"
  };

  const toggleButtonStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: "1px solid #334155",
    borderRadius: "8px",
    padding: "0.5rem",
    color: "#e2e8f0",
    cursor: "pointer",
    transition: "all 0.2s ease"
  };

  const userContainerStyles = {
    position: "relative",
    display: "flex",
    alignItems: "center"
  };

  const userButtonStyles = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "transparent",
    border: "1px solid #334155",
    borderRadius: "8px",
    padding: "0.5rem 0.75rem",
    color: "#e2e8f0",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: isMobile ? "0.875rem" : "0.9rem"
  };

  const dropdownStyles = {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: "0.5rem",
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "8px",
    padding: "0.5rem",
    minWidth: "200px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
    zIndex: 1000
  };

  const dropdownHeaderStyles = {
    padding: "0.75rem",
    borderBottom: "1px solid #334155",
    marginBottom: "0.25rem"
  };

  const dropdownItemStyles = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "0.5rem 0.75rem",
    backgroundColor: "transparent",
    border: "none",
    color: "#e2e8f0",
    cursor: "pointer",
    borderRadius: "6px",
    fontSize: "0.875rem",
    transition: "all 0.2s ease",
    textAlign: "left"
  };

  const dividerStyles = {
    height: "1px",
    backgroundColor: "#334155",
    margin: "0.5rem 0"
  };

  const textMutedStyles = {
    color: "#94a3b8",
    fontSize: "0.75rem",
    margin: "0 0 0.25rem 0"
  };

  const userNameStyles = {
    color: "#ffffff",
    fontSize: "0.875rem",
    fontWeight: "500",
    margin: "0"
  };

  const chevronStyles = {
    transition: "transform 0.2s ease",
    transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0)"
  };

  return (
    <div style={topbarStyles}>
      <div style={topbarContainerStyles}>
        {/* Sidebar toggle button */}
        <button 
          onClick={toggle}
          style={toggleButtonStyles}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#1e293b";
            e.target.style.borderColor = "#475569";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.borderColor = "#334155";
          }}
        >
          <Menu size={20} />
        </button>

        {/* Right side user dropdown */}
        <div style={userContainerStyles} ref={dropdownRef}>
          <button 
            style={userButtonStyles}
            onClick={toggleDropdown}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#1e293b";
              e.target.style.borderColor = "#475569";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.borderColor = "#334155";
            }}
          >
            <CircleUser size={20} />
            <span style={{ 
              maxWidth: isMobile ? "100px" : "150px", 
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}>
              {userName}
            </span>
            <ChevronDown
              size={16}
              style={chevronStyles}
            />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div style={dropdownStyles}>
              <div style={dropdownHeaderStyles}>
                <div style={textMutedStyles}>Signed in as</div>
                <div style={userNameStyles}>{userName}</div>
              </div>

              <button 
                style={dropdownItemStyles}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#334155";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                <User size={16} style={{ marginRight: "0.5rem" }} />
                Profile
              </button>

              <button 
                style={dropdownItemStyles}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#334155";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                <Settings size={16} style={{ marginRight: "0.5rem" }} />
                Settings
              </button>

              <div style={dividerStyles}></div>

              <button 
                style={{
                  ...dropdownItemStyles,
                  color: "#ef4444"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#dc2626";
                  e.target.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#ef4444";
                }}
              >
                <LogOut size={16} style={{ marginRight: "0.5rem" }} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
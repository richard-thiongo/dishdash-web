import { EyeOff, Loader2, Lock, Mail, Briefcase } from "lucide-react";
import React, { useState } from "react";
import Auth from "../Apis/Auth";
import { toast } from "react-toastify";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // clear the data in localStorage before login
    localStorage.removeItem("company");
    localStorage.removeItem("restaurant");
    setLoading(true);
    try {
      let response;
      if (role === "company") {
        response = await Auth.CompanyLogin(email, password);
        if (response.message === "Login successful") {
          toast.success("Company Login successful");
          localStorage.setItem("company", JSON.stringify(response));
          setTimeout(() => {
            window.location.href = "/dashboardcomp";
          }, 2000);
        } else {
          toast.error(response.message);
        }
      } else if (role === "restaurant") {
        response = await Auth.RestaurantLogin(email, password);
        if (response.message === "Restaurant login successful") {
          toast.success("Restaurant Login successful");
          localStorage.setItem("restaurant", JSON.stringify(response));
          setTimeout(() => {
            window.location.href = "/meals";
          }, 2000);
        } else {
          toast.error(response.message);
        }
      } else {
        toast.error("Please select a role.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form glass">
        <div className="login-header">
          <div className="login-icon">
            <Briefcase size={32} />
          </div>
        </div>
        <h2 className="login-title">DishDash</h2>
        <p className="login-subtitle">Corporate Delivery Login</p>

        <form onSubmit={handleLogin}>
          {/* Role Selection */}
          <div className="role-selection">
            <label className="role-label">Login as:</label>
            <div className="role-options">
              <label className="role-option">
                <input
                  type="radio"
                  id="company"
                  value="company"
                  checked={role === "company"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span className="role-custom-radio"></span>
                <span className="role-text">Company</span>
              </label>
              
              <label className="role-option">
                <input
                  type="radio"
                  id="restaurant"
                  value="restaurant"
                  checked={role === "restaurant"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span className="role-custom-radio"></span>
                <span className="role-text">Restaurant</span>
              </label>
            </div>
          </div>

          {/* Email input */}
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-text">
                <Mail size={18} />
              </span>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password input */}
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-text">
                <Lock size={18} />
              </span>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="input-group-text">
                <EyeOff size={18} />
              </span>
            </div>
          </div>

          {/* Remember me */}
          <div className="form-check">
            <input
              type="checkbox"
              id="rememberMe"
              className="form-check-input"
            />
            <label htmlFor="rememberMe" className="form-check-label">
              Remember Me
            </label>
          </div>

          {/* Submit button */}
          <button
            className="submit-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="spin" />
                Loading...
              </>
            ) : (
              "Login"
            )}
          </button>

          <p className="signup-link">
            Don&apos;t have an account?
            <a href="register">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
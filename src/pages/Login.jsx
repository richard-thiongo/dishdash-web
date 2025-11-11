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
            window.location.href = "/dashboardres";
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
    <div className="row justify-content-center align-items-center vh-100 bg-light">
      <div className="col-md-5 col-sm-10 bg-white shadow rounded-4 p-5 text-center">
        <div className="d-flex justify-content-center align-items-center mb-3">
          <div className="bg-success rounded-circle p-3">
            <Briefcase className="text-white" size={32} />
          </div>
        </div>
        <h2 className="fw-bold text-success">DishDash</h2>
        <p className="text-muted mb-4">Corporate Delivery Login</p>

        <form onSubmit={handleLogin}>
          {/* Role Selection */}
          <div className="mb-3 text-start">
            <label className="fw-semibold mb-2">Login as:</label>
            <div>
              <input
                type="radio"
                id="company"
                value="company"
                checked={role === "company"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="company" className="ms-2 me-3">
                Company
              </label>
              <input
                type="radio"
                id="restaurant"
                value="restaurant"
                checked={role === "restaurant"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="restaurant" className="ms-2">
                Restaurant
              </label>
            </div>
          </div>

          {/* Email input */}
          <div className="mb-3">
            <div className="input-group border rounded">
              <span className="input-group-text bg-white border-end-0">
                <Mail size={18} />
              </span>
              <input
                type="email"
                id="email"
                className="form-control border-start-0"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password input */}
          <div className="mb-3">
            <div className="input-group border rounded">
              <span className="input-group-text bg-white border-end-0">
                <Lock size={18} />
              </span>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="form-control border-start-0"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="input-group-text bg-white border-start-0">
                <EyeOff size={18} />
              </span>
            </div>
          </div>

          {/* Remember me */}
          <div className="mb-3 form-check text-start">
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
            className="btn btn-success w-100 py-2 fw-bold"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="me-2 spin" />
                Loading...
              </>
            ) : (
              "Login"
            )}
          </button>

          <p className="mt-3">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-success fw-semibold">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

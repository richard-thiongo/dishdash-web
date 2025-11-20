import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const SignupForm = () => {
  const [formData, setFormData] = useState({
    type: 'company', // 'company' or 'restaurant'
    company_name: '',
    restaurant_name: '',
    company_address: '',
    restaurant_address: '',
    company_email: '',
    restaurant_email: '',
    company_phone: '',
    restaurant_description: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      type
    }));
    setMessage({ type: '', text: '' });
  };

  const validateForm = () => {
    const { type, password, confirmPassword } = formData;

    // Check required fields based on type
    if (type === 'company') {
      if (!formData.company_name || !formData.company_address || !formData.company_email || !formData.company_phone) {
        setMessage({ type: 'error', text: 'Please fill all required fields' });
        return false;
      }
    } else {
      if (!formData.restaurant_name || !formData.restaurant_address || !formData.restaurant_email || !formData.restaurant_description) {
        setMessage({ type: 'error', text: 'Please fill all required fields' });
        return false;
      }
    }

    // Password validation
    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
      return false;
    }

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return false;
    }

    // Email validation
    const email = type === 'company' ? formData.company_email : formData.restaurant_email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!validateForm()) return;

    setLoading(true);

    try {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://10.113.174.41:5001/';
      
      let endpoint, payload;

      if (formData.type === 'company') {
        endpoint = `${baseUrl}companies/create`;
        payload = {
          company_name: formData.company_name,
          company_address: formData.company_address,
          company_email: formData.company_email,
          company_phone: formData.company_phone,
          company_logo: "", // Empty for now as discussed
          password: formData.password
        };
      } else {
        endpoint = `${baseUrl}restaurants/create`;
        payload = {
          restaurant_name: formData.restaurant_name,
          restaurant_address: formData.restaurant_address,
          restaurant_email: formData.restaurant_email,
          till_no: 0, // Default integer value to fix the MySQL error
          restaurant_description: formData.restaurant_description,
          restaurant_status: "active", // Default value
          restaurant_password: formData.password
        };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: `${formData.type === 'company' ? 'Company' : 'Restaurant'} registered successfully! Redirecting...` 
        });
        
        // REDIRECTION CODE - Store data and redirect to appropriate dashboard
        if (formData.type === 'company') {
          localStorage.setItem("company", JSON.stringify(data));
          setTimeout(() => {
            window.location.href = "/dashboardcomp";
          }, 2000);
        } else {
          localStorage.setItem("restaurant", JSON.stringify(data));
          setTimeout(() => {
            window.location.href = "/dashboardres";
          }, 2000);
        }
        
        // Reset form
        setFormData({
          type: formData.type,
          company_name: '',
          restaurant_name: '',
          company_address: '',
          restaurant_address: '',
          company_email: '',
          restaurant_email: '',
          company_phone: '',
          restaurant_description: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: data.message || 'Registration failed. Please try again.' 
        });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form glass">
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Choose your account type and fill in the details</p>

        {/* Type Selection */}
        <div className="type-selection">
          <div className="type-options">
            <label className={`type-option ${formData.type === 'company' ? 'active' : ''}`}>
              <input
                type="radio"
                name="type"
                value="company"
                checked={formData.type === 'company'}
                onChange={() => handleTypeChange('company')}
              />
              <div className="option-content">
                <span className="option-icon">🏢</span>
                <span className="option-text">Company</span>
              </div>
            </label>
            
            <label className={`type-option ${formData.type === 'restaurant' ? 'active' : ''}`}>
              <input
                type="radio"
                name="type"
                value="restaurant"
                checked={formData.type === 'restaurant'}
                onChange={() => handleTypeChange('restaurant')}
              />
              <div className="option-content">
                <span className="option-icon">🍽️</span>
                <span className="option-text">Restaurant</span>
              </div>
            </label>
          </div>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-grid">
            {/* Dynamic Fields based on selection */}
            {formData.type === 'company' ? (
              /* Company Fields */
              <>
                <div className="form-group">
                  <label className="form-label">Company Name *</label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter company name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Company Address *</label>
                  <input
                    type="text"
                    name="company_address"
                    value={formData.company_address}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter company address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Company Email *</label>
                  <input
                    type="email"
                    name="company_email"
                    value={formData.company_email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter company email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="company_phone"
                    value={formData.company_phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </>
            ) : (
              /* Restaurant Fields */
              <>
                <div className="form-group">
                  <label className="form-label">Restaurant Name *</label>
                  <input
                    type="text"
                    name="restaurant_name"
                    value={formData.restaurant_name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter restaurant name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Restaurant Address *</label>
                  <input
                    type="text"
                    name="restaurant_address"
                    value={formData.restaurant_address}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter restaurant address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Restaurant Email *</label>
                  <input
                    type="email"
                    name="restaurant_email"
                    value={formData.restaurant_email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter restaurant email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea
                    name="restaurant_description"
                    value={formData.restaurant_description}
                    onChange={handleInputChange}
                    className="form-input textarea"
                    placeholder="Describe your restaurant"
                    rows="3"
                    required
                  />
                </div>
              </>
            )}

            {/* Common Password Fields */}
            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter password (min 6 characters)"
                required
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Registering...
              </>
            ) : (
              `Sign up ${formData.type === 'company' ? 'company' : 'restaurant'}`
            )}
          </button>

          {/* Already have an account link */}
          <p className="login-link">
            Already have an account?
            <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
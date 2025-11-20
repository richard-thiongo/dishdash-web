import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
  const [formData, setFormData] = useState({
    department_name: '',
    company_id: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [companyInfo, setCompanyInfo] = useState(null);
  const navigate = useNavigate();

  const baseUrl = process.env.REACT_APP_API_URL;

  // Styles
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#010409',
      padding: '3rem 1rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'start'
    },
    card: {
      maxWidth: 500,
      width: '100%',
      backgroundColor: '#0f111a',
      borderRadius: 12,
      boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      padding: '2rem'
    },
    header: {
      textAlign: 'center',
      marginBottom: '1.5rem'
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: 700,
      color: '#ffffff',
      marginBottom: 4
    },
    subtitle: {
      color: '#9ca3af',
      fontSize: '0.875rem'
    },
    message: {
      marginBottom: '1rem',
      padding: '0.75rem 1rem',
      borderRadius: 8,
      border: '1px solid'
    },
    input: {
      padding: '0.5rem 0.75rem',
      borderRadius: 8,
      border: '1px solid #334155',
      backgroundColor: '#1e293b',
      color: '#f1f5f9',
      outline: 'none',
      transition: 'border 0.2s',
      width: '100%'
    },
    button: {
      padding: '0.75rem',
      borderRadius: 8,
      fontWeight: 600,
      color: '#f1f5f9',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      width: '100%'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }
  };

  useEffect(() => {
    const companyData = JSON.parse(localStorage.getItem("company"));
    if (companyData) {
      // Extract company information from the nested structure
      const companyDetails = companyData.company;
      setCompanyInfo({
        company_name: companyDetails?.company_name,
        email: companyDetails?.company_email,
        company_id: companyDetails?.company_id,
        access_token: companyData.access_token
      });
      
      // Auto-fill company_id from localStorage
      if (companyDetails?.company_id) {
        setFormData(prev => ({ 
          ...prev, 
          company_id: companyDetails.company_id 
        }));
      }
    }
  }, []);

  const getAuthHeaders = () => {
    const companyData = JSON.parse(localStorage.getItem("company"));
    if (companyData?.access_token) {
      return {
        'Authorization': `Bearer ${companyData.access_token}`,
        'Content-Type': 'application/json'
      };
    }
    return { 'Content-Type': 'application/json' };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that company_id is available
    if (!formData.company_id) {
      setMessage('Company information not loaded. Please refresh the page.');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const response = await axios.post(
        `${baseUrl}/companies/department/create`,
        formData,
        { headers: getAuthHeaders() }
      );
      
      if (response.status === 201) {
        setMessage('Department created successfully! Redirecting to dashboard...');
        setMessageType('success');
        
        // Reset form
        setFormData({ 
          department_name: '', 
          company_id: formData.company_id // Keep the company_id for potential next submission
        });

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/dashboardcomp');
        }, 2000);
      }
    } catch (error) {
      console.error('Error creating department:', error);
      
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setMessage('Unauthorized: Please check your authentication.');
            break;
          case 500:
            setMessage('Department creation failed. Please try again.');
            break;
          default:
            setMessage('An error occurred. Please try again.');
        }
      } else {
        setMessage('Network error. Please check your connection.');
      }
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const getMessageStyle = () => ({
    ...styles.message,
    borderColor: messageType === 'success' ? '#22c55e' : '#f87171',
    backgroundColor: messageType === 'success' ? '#ecfdf5' : '#fee2e2',
    color: messageType === 'success' ? '#166534' : '#991b1b'
  });

  const getButtonStyle = () => ({
    ...styles.button,
    backgroundColor: loading ? '#334155' : '#2563eb',
    cursor: loading ? 'not-allowed' : 'pointer'
  });

  const handleButtonHover = (e, isHover) => {
    if (!loading) {
      e.target.style.backgroundColor = isHover ? '#04ca4cff' : '#078836ff';
    }
  };

  const handleInputFocus = (e, isFocus) => {
    e.target.style.borderColor = isFocus ? '#60a5fa' : '#334155';
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Add New Department</h2>
          <p style={styles.subtitle}>Create a new department for your company</p>
        </div>

        {message && (
          <div style={getMessageStyle()}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Only show department name input to the user */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="department_name" style={{ color: '#f1f5f9', fontWeight: 500 }}>
              Department Name
            </label>
            <input
              type="text"
              id="department_name"
              name="department_name"
              value={formData.department_name}
              onChange={handleChange}
              required
              placeholder="Enter department name"
              style={styles.input}
              onFocus={(e) => handleInputFocus(e, true)}
              onBlur={(e) => handleInputFocus(e, false)}
              disabled={loading}
            />
          </div>

          {/* Hidden company_id field - handled in background */}
          <input
            type="hidden"
            name="company_id"
            value={formData.company_id}
          />

          <button
            type="submit"
            disabled={loading || !formData.company_id}
            style={getButtonStyle()}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
          >
            {loading ? 'Creating Department...' : 'Create Department'}
          </button>
        </form>

        {/* Quick info about what's happening in the background */}
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#1e3b2cff', borderRadius: 8 }}>
          <p style={{ color: '#22c55e', fontSize: '0.875rem', textAlign: 'center', margin: 0 }}>
            <strong>Note:</strong> Department will be automatically linked to your company ({companyInfo?.company_name || 'Loading...'})
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddDepartment;
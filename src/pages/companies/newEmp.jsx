import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    employee_email: '',
    department_id: '',
    employee_password: ''
  });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const baseUrl = process.env.REACT_APP_API_URL;

  // Create Employee function inside the same file
  const createEmployee = async (employeeData) => {
    try {
      const companyData = JSON.parse(localStorage.getItem("company"));
      const token = companyData?.access_token;

      const response = await fetch(`${baseUrl}/employees/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(employeeData)
      });

      const data = await response.json();
      
      if (response.status === 201) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message || 'Failed to create employee' };
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Styles matching your department form
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
    select: {
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
    // Load departments from localStorage
    const loadDepartments = () => {
      const savedDepartments = localStorage.getItem("departments");
      if (savedDepartments) {
        const deptData = JSON.parse(savedDepartments);
        setDepartments(deptData.data || []);
      }
    };

    loadDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get company data from localStorage
    const companyData = JSON.parse(localStorage.getItem("company"));
    const companyId = companyData?.company?.company_id;

    if (!companyId) {
      setMessage('Company information not found. Please log in again.');
      setMessageType('error');
      return;
    }

    if (!formData.department_id) {
      setMessage('Please select a department');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      // Prepare the complete payload
      const employeePayload = {
        ...formData,
        company_id: companyId,
        employee_status: 1,
        profile_pic: "default.jpg"
      };

      console.log('Sending employee data:', employeePayload);

      // Use the local createEmployee function
      const result = await createEmployee(employeePayload);

      if (result.success) {
        setMessage('Employee created successfully! Redirecting to dashboard...');
        setMessageType('success');
        
        // Reset form
        setFormData({
          first_name: '',
          last_name: '',
          employee_email: '',
          department_id: '',
          employee_password: ''
        });

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/dashboardcomp');
        }, 2000);
      } else {
        setMessage(result.error || 'Failed to create employee');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      setMessage('An error occurred. Please try again.');
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
      e.target.style.backgroundColor = isHover ? '#1d4ed8' : '#2563eb';
    }
  };

  const handleInputFocus = (e, isFocus) => {
    e.target.style.borderColor = isFocus ? '#60a5fa' : '#334155';
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Add New Employee</h2>
          <p style={styles.subtitle}>Register a new employee in your company</p>
        </div>

        {message && (
          <div style={getMessageStyle()}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="first_name" style={{ color: '#f1f5f9', fontWeight: 500 }}>
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              placeholder="Enter first name"
              style={styles.input}
              onFocus={(e) => handleInputFocus(e, true)}
              onBlur={(e) => handleInputFocus(e, false)}
              disabled={loading}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="last_name" style={{ color: '#f1f5f9', fontWeight: 500 }}>
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              placeholder="Enter last name"
              style={styles.input}
              onFocus={(e) => handleInputFocus(e, true)}
              onBlur={(e) => handleInputFocus(e, false)}
              disabled={loading}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="employee_email" style={{ color: '#f1f5f9', fontWeight: 500 }}>
              Email Address
            </label>
            <input
              type="email"
              id="employee_email"
              name="employee_email"
              value={formData.employee_email}
              onChange={handleChange}
              required
              placeholder="Enter employee email"
              style={styles.input}
              onFocus={(e) => handleInputFocus(e, true)}
              onBlur={(e) => handleInputFocus(e, false)}
              disabled={loading}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="department_id" style={{ color: '#f1f5f9', fontWeight: 500 }}>
              Department
            </label>
            <select
              id="department_id"
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
              required
              style={styles.select}
              onFocus={(e) => handleInputFocus(e, true)}
              onBlur={(e) => handleInputFocus(e, false)}
              disabled={loading}
            >
              <option value="">Select a department</option>
              {departments.map((dept) => (
                <option key={dept.department_id} value={dept.department_id}>
                  {dept.department_name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="employee_password" style={{ color: '#f1f5f9', fontWeight: 500 }}>
              Password
            </label>
            <input
              type="password"
              id="employee_password"
              name="employee_password"
              value={formData.employee_password}
              onChange={handleChange}
              required
              placeholder="Set employee password"
              style={styles.input}
              onFocus={(e) => handleInputFocus(e, true)}
              onBlur={(e) => handleInputFocus(e, false)}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={getButtonStyle()}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
          >
            {loading ? 'Creating Employee...' : 'Create Employee'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#1e293b', borderRadius: 8 }}>
          <p style={{ color: '#93c5fd', fontSize: '0.875rem', textAlign: 'center', margin: 0 }}>
            <strong>Note:</strong> Employee will be automatically linked to your company and set as active.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
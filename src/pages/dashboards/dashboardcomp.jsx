import React, { useEffect, useState } from "react";
import CompanyApi from "../../Apis/Company";
import { Eye, Building, Users, Plus, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboardcomp = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentcount, setDepartmentCount] = useState(0);
  const [employeescount, setEmployeesCount] = useState(0);

  const companyData = JSON.parse(localStorage.getItem("company"));
  const id = companyData?.company?.company_id;

  // Function to save departments to localStorage
  const saveDepartmentsToLocalStorage = (deptData) => {
    try {
      localStorage.setItem("departments", JSON.stringify(deptData));
      console.log("Departments saved to localStorage:", deptData);
      console.log("Full localStorage departments object:", JSON.parse(localStorage.getItem("departments")));
    } catch (error) {
      console.error("Error saving departments to localStorage:", error);
    }
  };

  // Function to load departments from localStorage
  const loadDepartmentsFromLocalStorage = () => {
    try {
      const savedDepartments = localStorage.getItem("departments");
      if (savedDepartments) {
        const parsedData = JSON.parse(savedDepartments);
        console.log("Departments loaded from localStorage:", parsedData);
        return parsedData;
      } else {
        console.log("No departments found in localStorage");
        return null;
      }
    } catch (error) {
      console.error("Error loading departments from localStorage:", error);
      return null;
    }
  };

  useEffect(() => {
    console.log("useEffect triggered - Fetching departments for company ID:", id);
    
    const fetchDepartments = async () => {
      // Check if departments exist in localStorage first
      const cachedDepartments = loadDepartmentsFromLocalStorage();
      
      if (cachedDepartments && cachedDepartments.companyId === id) {
        console.log("Using cached departments for company:", id);
        console.log("Cached departments data:", cachedDepartments.data);
        setDepartments(cachedDepartments.data);
        return;
      }

      console.log("No valid cache found, fetching from API...");
      // If not in cache, fetch from API
      const response = await CompanyApi.getDepartmentsByCompanyId(id);
      const departmentsData = response.departments || [];
      
      console.log("API Response received:", response);
      console.log("Raw departments data from API:", departmentsData);
      
      // Save to localStorage with company ID for validation
      saveDepartmentsToLocalStorage({
        companyId: id,
        data: departmentsData,
        timestamp: new Date().getTime()
      });
      
      setDepartments(departmentsData);
    };
    
    if (id) fetchDepartments();
  }, [id]);

  useEffect(() => {
    const fetchDepartmentsCount = async () => {
      const response = await CompanyApi.getDepartmentsCountByCompanyId(id);
      console.log("Departments count response:", response);
      setDepartmentCount(response.count);
    };
    if (id) fetchDepartmentsCount();
  }, [id]);

  useEffect(() => {
    const fetchEmployeesCount = async () => {
      const response = await CompanyApi.getEmployeesCountByCompanyId(id);
      console.log("Employees count response:", response);
      setEmployeesCount(response.count);
    };
    if (id) fetchEmployeesCount();
  }, [id]);

  useEffect(() => {
    console.log("Employee count enrichment triggered for departments:", departments);
    
    const countEmployeesInDepartments = async () => {
      const updatedDepartments = [];
      
      for (const department of departments) {
        console.log("Processing department:", department.department_name, department.department_id);
        
        if (department._enriched) {
          console.log("Department already enriched:", department.department_name);
          updatedDepartments.push(department);
          continue;
        }
        
        await new Promise((resolve) => setTimeout(resolve, 200));
        const countResponse = await CompanyApi.getEmployeesCountByDepartmentId(
          department?.department_id
        );

        console.log("Employee count for department", department.department_name, ":", countResponse);

        const updatedDepartment = {
          ...department,
          employeeCount: countResponse.count3,
          count3: countResponse.count3, // Make sure this matches your table display
          _enriched: true,
        };
        
        updatedDepartments.push(updatedDepartment);
        console.log("Updated department with employee count:", updatedDepartment);
      }
      
      // Update state with enriched departments
      setDepartments(updatedDepartments);
      
      // Also update localStorage with the enriched data
      if (updatedDepartments.length > 0) {
        console.log("Saving enriched departments to localStorage...");
        saveDepartmentsToLocalStorage({
          companyId: id,
          data: updatedDepartments,
          timestamp: new Date().getTime()
        });
      }
    };
    
    if (departments.length > 0 && departments.some(dept => !dept._enriched)) {
      console.log("Starting employee count enrichment process...");
      countEmployeesInDepartments();
    } else {
      console.log("Skipping enrichment - no departments or all already enriched");
    }
  }, [departments, id]);

  // Function to refresh departments (useful after adding a new department)
  const refreshDepartments = async () => {
    console.log("Manual refresh triggered");
    if (!id) return;
    
    const response = await CompanyApi.getDepartmentsByCompanyId(id);
    const departmentsData = response.departments || [];
    
    console.log("Fresh departments data from API:", departmentsData);
    
    // Save updated departments to localStorage
    saveDepartmentsToLocalStorage({
      companyId: id,
      data: departmentsData,
      timestamp: new Date().getTime()
    });
    
    setDepartments(departmentsData);
  };

  // Optional: Add cache invalidation (e.g., cache expires after 5 minutes)
  const isCacheValid = (cachedData) => {
    if (!cachedData || !cachedData.timestamp) {
      console.log("Cache invalid: no data or timestamp");
      return false;
    }
    
    const FIVE_MINUTES = 5 * 60 * 1000; // 5 minutes in milliseconds
    const isFresh = (new Date().getTime() - cachedData.timestamp) < FIVE_MINUTES;
    
    console.log("Cache freshness check:", isFresh ? "Fresh" : "Stale");
    return isFresh;
  };

  // Update the first useEffect with cache validation
  useEffect(() => {
    const fetchDepartments = async () => {
      const cachedDepartments = loadDepartmentsFromLocalStorage();
      
      // Check if cache exists and is valid
      if (cachedDepartments && 
          cachedDepartments.companyId === id && 
          isCacheValid(cachedDepartments)) {
        console.log("Using valid cached departments");
        setDepartments(cachedDepartments.data);
        return;
      }

      console.log("Cache invalid or missing, fetching fresh data...");
      // Fetch fresh data
      const response = await CompanyApi.getDepartmentsByCompanyId(id);
      const departmentsData = response.departments || [];
      
      saveDepartmentsToLocalStorage({
        companyId: id,
        data: departmentsData,
        timestamp: new Date().getTime()
      });
      
      setDepartments(departmentsData);
    };
    
    if (id) fetchDepartments();
  }, [id]);

  // Log when departments state changes
  useEffect(() => {
    console.log("Departments state updated:", departments);
    console.log("Number of departments:", departments.length);
  }, [departments]);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title text-success">Dashboard</h1>
          <p className="dashboard-subtitle">
            Welcome back! Manage your departments and employees.
          </p>
        </div>
        {/* Optional: Add refresh button */}
        <button 
          onClick={refreshDepartments}
          className="btn btn-outline-success"
          style={{ marginLeft: 'auto' }}
        >
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon">
              <Building size={24} />
            </div>
          </div>
          <p className="stat-title">Total Departments</p>
          <h2 className="stat-value">{departmentcount.count || 0}</h2>
          <div className="stat-change">
            <span>Active departments</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon">
              <Users size={24} />
            </div>
          </div>
          <p className="stat-title">Total Employees</p>
          <h2 className="stat-value">{employeescount.count2 || 0}</h2>
          <div className="stat-change">
            <span>Registered employees</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
 
<div className="quick-actions">
  <h2 className="section-title text-success">Quick Actions</h2>
  <div className="actions-grid">
    <Link to="/newDept" className="action-card text-decoration-none">
      <div className="action-icon">
        <Plus size={24} />
      </div>
      <h3 className="action-title">Add Department</h3>
      <p className="action-description">Create new department</p>
    </Link>

    {/* Fixed: Changed from button to Link */}
    <Link to="/newEmp" className="action-card text-decoration-none">
      <div className="action-icon">
        <UserPlus size={24} />
      </div>
      <h3 className="action-title">Add Employee</h3>
      <p className="action-description">Register new employee</p>
    </Link>
  </div>
</div>

      {/* Departments Table */}
      <div className="overview-section">
        <div className="overview-card-header">
          <h2 className="section-title text-success">Departments</h2>
        </div>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Department Name</th>
                <th>Number of Employees</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(departments) && departments.length > 0 ? (
                departments.map((department, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{department.department_name}</td>
                    <td>{department.count3 || department.employeeCount || 0}</td>
                    <td>
                      <Link
                        to={"/department/" + department.department_id}
                        className="view-btn"
                      >
                        <Eye size={18} className="me-1" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="empty-state-cell">
                    <div className="empty-state">
                      <div className="empty-state-icon">
                        <Building size={48} />
                      </div>
                      <h3 className="empty-state-title">No Departments Found</h3>
                      <p className="empty-state-description">
                        Get started by creating your first department.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboardcomp;
import React, { useEffect, useState } from "react";
import CompanyApi from "../../Apis/Company";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboardcomp = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentcount, setDepartmentCount] = useState(0);
  const [employeescount, setEmployeesCount] = useState(0);

  const companyData = JSON.parse(localStorage.getItem("company"));
  const id = companyData?.company?.company_id;
  // useEffect to fetch all the departments using the company id from the localStorage
  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await CompanyApi.getDepartmentsByCompanyId(id);
      setDepartments(response.departments);
    };
    if (id) {
      fetchDepartments();
    }
  }, []);

  // useEffect to fetch the count of departments using the company id from the localStorage
  useEffect(() => {
    const fetchDepartmentsCount = async () => {
      const response = await CompanyApi.getDepartmentsCountByCompanyId(id);
      setDepartmentCount(response.count);
    };
    if (id) {
      fetchDepartmentsCount();
    }
  }, []);
  console.log("This is the count of departments", departmentcount);

  // useEffect to fetch the count of employees using the company id from the localStorage
  useEffect(() => {
    const fetchEmployeesCount = async () => {
      const response = await CompanyApi.getEmployeesCountByCompanyId(id);
      setEmployeesCount(response.count);
    };
    if (id) {
      fetchEmployeesCount();
    }
  }, []);
  console.log("This is the count of employees", employeescount);

  useEffect(() => {
    const countEmployeesInDepartments = async () => {
      const updatedDepartments = [];
      for (const department of departments) {
        if (department._enriched) return department;
        await new Promise((resolve) => setTimeout(resolve, 200));
        const countResponse = await CompanyApi.getEmployeesCountByDepartmentId(
          department?.department_id
        );

        updatedDepartments.push({
          ...department,
          employeeCount: countResponse.count3,
          _enriched: true,
        });
      }

      setDepartments(updatedDepartments);
    };
    if (departments.length > 0) {
      countEmployeesInDepartments();
    }
  }, [departments]);
  console.log("This are the departments", departments);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric", hour: '2-digit', minute: '2-digit' });
  };

  // Mock recent activity data for layout purposes
  const latestOrders = [
    { order_id: 201, employee_id: 11, menu_id: 7, is_paid: 1, order_date: "2025-09-26T09:30:00Z" },
    { order_id: 202, employee_id: 12, menu_id: 9, is_paid: 0, order_date: "2025-09-26T10:05:00Z" },
    { order_id: 203, employee_id: 13, menu_id: 5, is_paid: 1, order_date: "2025-09-26T11:40:00Z" },
  ];
  const latestPayments = [
    { payment_id: 801, payment_code: "PMT-2025-0101", employee_id: 11, payment_amount: 12.5, created_at: "2025-09-26T09:45:00Z" },
    { payment_id: 802, payment_code: "PMT-2025-0102", employee_id: 13, payment_amount: 8.75, created_at: "2025-09-26T11:50:00Z" },
    { payment_id: 803, payment_code: "PMT-2025-0103", employee_id: 12, payment_amount: 5.0, created_at: "2025-09-26T12:15:00Z" },
  ];

  return (
    // Dashboard to show the number of departments and number of user in the company
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Dashboard</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-primary">Add Department</button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Departments</h5>
              <p className="card-text">{departmentcount.count}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Employees</h5>
              <p className="card-text">{employeescount.count2}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table to show departments */}
      <div className="card shadow-sm my-3">
        <div className="card-header">
          <h5>Departments</h5>
        </div>
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Department Name</th>
                <th>Number of employees</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(departments) &&
              departments.length > 0 ? (
                departments.map((departments, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{departments.department_name}</td>
                    <td>{departments.employeeCount}</td>
                    <td>
                      {/* A link redirecting to the department page */}
                      <Link
                        to={"/department/" + departments.department_id}
                        className="btn btn-outline-primary btn-sm"
                      >
                        <Eye size={18} className="me-1" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No departments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="my-4">
        <h4 className="mb-3">Recent activity</h4>
        <div className="row g-3">
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white">
                <h6 className="mb-0">Latest orders</h6>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover table-striped align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{width: 90}}>Order</th>
                        <th>Employee</th>
                        <th>Menu</th>
                        <th>Status</th>
                        <th style={{minWidth: 160}}>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {latestOrders.map((o) => (
                        <tr key={o.order_id}>
                          <td>#{o.order_id}</td>
                          <td>{o.employee_id}</td>
                          <td>{o.menu_id}</td>
                          <td>
                            <span className={`badge rounded-pill ${o.is_paid === 1 ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-danger-subtle text-danger border border-danger-subtle'}`}>
                              {o.is_paid === 1 ? 'Paid' : 'Unpaid'}
                            </span>
                          </td>
                          <td>{formatDate(o.order_date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white">
                <h6 className="mb-0">Latest payments</h6>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover table-striped align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{width: 110}}>Code</th>
                        <th>Employee</th>
                        <th>Amount</th>
                        <th style={{minWidth: 160}}>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {latestPayments.map((p) => (
                        <tr key={p.payment_id}>
                          <td className="text-monospace">{p.payment_code}</td>
                          <td>{p.employee_id}</td>
                          <td>${Number(p.payment_amount).toFixed(2)}</td>
                          <td>{formatDate(p.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardcomp;

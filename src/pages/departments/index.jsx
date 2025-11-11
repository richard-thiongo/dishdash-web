import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CompanyApi from "../../Apis/Company";
import { ArrowBigLeft, PlusIcon } from "lucide-react";

const Departments = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();
  // fetch all the employees using the department id from the url
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await CompanyApi.getEmployeesByDepartmentId(id);
      setEmployees(response.employees);
    };
    if (id) {
      fetchEmployees();
    }
  }, []);
  console.log(employees);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  };

  const getInitials = (firstName = "", lastName = "") => {
    const f = (firstName || "").trim().charAt(0).toUpperCase();
    const l = (lastName || "").trim().charAt(0).toUpperCase();
    return `${f}${l}` || "?";
  };

  const filteredEmployees = Array.isArray(employees)
    ? employees.filter((e) => {
        const name = `${e.first_name || ""} ${e.last_name || ""}`.toLowerCase();
        const email = (e.employee_email || "").toLowerCase();
        const term = (searchTerm || "").toLowerCase();
        return name.includes(term) || email.includes(term);
      })
    : [];

  return (
    <div className="container-fluid py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="mb-1">Department</h2>
          <small className="text-muted">Employees assigned to this department</small>
        </div>
        <div className="d-flex gap-2">
          <Link to="/dashboardcomp" className="btn btn-outline-success">
             <ArrowBigLeft className="me-2" /> Back
          </Link>
          <Link to={`/department/${id}/add-employee`} className="btn btn-primary">
            <PlusIcon className="me-2" /> Add Employee
          </Link>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex flex-column flex-md-row gap-2 gap-md-3 justify-content-between align-items-md-center">
          <h5 className="mb-0">Employees</h5>
          <div className="ms-md-auto w-100 w-md-auto" style={{maxWidth: 360}}>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive table-responsive-sticky">
            <table className="table table-striped table-hover table-bordered align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{width: 60}}>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th style={{minWidth: 140}}>Reg Date</th>
                  <th style={{width: 120}}>Status</th>
                  <th style={{width: 140}}>Action</th>
                </tr>
              </thead>
              <tbody>
                { Array.isArray(employees) &&
                 filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="avatar avatar-sm bg-primary-subtle text-primary fw-bold">
                            {getInitials(employee.first_name, employee.last_name)}
                          </div>
                          <div className="d-flex flex-column">
                            <span className="fw-semibold">
                              {employee.first_name} {employee.last_name}
                            </span>
                            <small className="text-muted">ID: {employee.employee_id || "-"}</small>
                          </div>
                        </div>
                      </td>
                      <td className="text-break">{employee.employee_email}</td>
                      <td>{formatDate(employee.reg_date)}</td>
                      <td>
                        <span className={`badge rounded-pill ${employee.employee_status === 1 ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-danger-subtle text-danger border border-danger-subtle'}`}>
                          {employee.employee_status === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex">
                          <button className="btn btn-outline-danger btn-sm me-1 btn-sm">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ):(
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-5">
                      <div className="d-flex flex-column align-items-center gap-2">
                        <div className="avatar bg-light text-secondary">∅</div>
                        <div>
                          <div className="fw-semibold">No employees found</div>
                          <small>Try adjusting your search or add a new employee.</small>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;

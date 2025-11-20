import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CompanyApi from "../../Apis/Company";
import { ArrowBigLeft } from "lucide-react";

const Departments = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await CompanyApi.getEmployeesByDepartmentId(id);
      setEmployees(response.employees);
    };
    if (id) {
      fetchEmployees();
    }
  }, [id]);

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

  // Inline styles for improved dark theme UI/UX
  const styles = {
    container: {
      padding: "2rem",
      backgroundColor: "#0d1117",
      minHeight: "100vh",
      color: "#c9d1d9",
      fontFamily: "'Inter', sans-serif",
    },
    header: { marginBottom: "0.25rem", fontWeight: "600" },
    subtitle: { color: "#8b949e", fontSize: "0.9rem" },
    card: {
      backgroundColor: "#161b22",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
      color: "#c9d1d9",
      marginTop: "1rem",
      overflow: "hidden",
    },
    cardHeader: {
      backgroundColor: "#21262d",
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "0.5rem",
      padding: "1rem 1.5rem",
      borderBottom: "1px solid #30363d",
    },
    searchInput: {
      padding: "0.5rem 0.75rem",
      borderRadius: "8px",
      border: "1px solid #30363d",
      backgroundColor: "#0d1117",
      color: "#c9d1d9",
      width: "100%",
      maxWidth: "360px",
      outline: "none",
      transition: "all 0.2s ease",
    },
    searchInputFocus: {
      borderColor: "#58a6ff",
      boxShadow: "0 0 5px rgba(88, 166, 255, 0.5)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      color: "#c9d1d9",
      minWidth: "700px",
    },
    th: {
      backgroundColor: "#161b22",
      color: "#8b949e",
      textAlign: "left",
      padding: "0.75rem 1rem",
      borderBottom: "1px solid #30363d",
      fontWeight: "500",
    },
    td: {
      padding: "0.75rem 1rem",
      borderBottom: "1px solid #30363d",
      verticalAlign: "middle",
    },
    rowHover: {
      transition: "all 0.2s ease",
      cursor: "default",
    },
    rowHoverActive: {
      backgroundColor: "#21262d",
    },
    badgeActive: {
      backgroundColor: "#238636",
      color: "#fff",
      padding: "0.25rem 0.6rem",
      borderRadius: "8px",
      fontSize: "0.75rem",
      fontWeight: "500",
    },
    badgeInactive: {
      backgroundColor: "#8b0000",
      color: "#fff",
      padding: "0.25rem 0.6rem",
      borderRadius: "8px",
      fontSize: "0.75rem",
      fontWeight: "500",
    },
    noData: {
      textAlign: "center",
      color: "#8b949e",
      padding: "3rem",
    },
    avatar: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      backgroundColor: "#238636",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "600",
      fontSize: "0.85rem",
      flexShrink: 0,
    },
    actionBtn: {
      backgroundColor: "transparent",
      border: "1px solid #dc3545",
      color: "#dc3545",
      padding: "0.3rem 0.6rem",
      borderRadius: "6px",
      fontSize: "0.8rem",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    actionBtnHover: {
      backgroundColor: "#dc3545",
      color: "#fff",
    },
  };

  return (
    <div style={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          <h2 style={styles.header}>Department</h2>
          <small style={styles.subtitle}>Employees assigned to this department</small>
        </div>
        <div>
          <Link
            to="/dashboardcomp"
            style={{ color: "#58a6ff", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            <ArrowBigLeft size={20} /> Back
          </Link>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h5 style={{ margin: 0 }}>Employees</h5>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
            onFocus={(e) => e.target.style.border = "1px solid #58a6ff"}
            onBlur={(e) => e.target.style.border = "1px solid #30363d"}
          />
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ ...styles.th, width: 60 }}>#</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={{ ...styles.th, minWidth: 140 }}>Reg Date</th>
                <th style={{ ...styles.th, width: 120 }}>Status</th>
                <th style={{ ...styles.th, width: 140 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee, index) => (
                  <tr
                    key={index}
                    style={styles.rowHover}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#21262d"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    <td style={styles.td}>{index + 1}</td>
                    <td style={styles.td}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={styles.avatar}>{getInitials(employee.first_name, employee.last_name)}</div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ fontWeight: "600" }}>
                            {employee.first_name} {employee.last_name}
                          </span>
                          <small style={{ color: "#8b949e" }}>ID: {employee.employee_id || "-"}</small>
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>{employee.employee_email}</td>
                    <td style={styles.td}>{formatDate(employee.reg_date)}</td>
                    <td style={styles.td}>
                      <span style={employee.employee_status === 1 ? styles.badgeActive : styles.badgeInactive}>
                        {employee.employee_status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button
                        style={styles.actionBtn}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#dc3545";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#dc3545";
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={styles.noData}>
                    <div>No employees found</div>
                    <small>Try adjusting your search.</small>
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

export default Departments;

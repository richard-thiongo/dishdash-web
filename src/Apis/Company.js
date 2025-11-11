import axios from "axios";
const API = process.env.REACT_APP_API_URL;

class CompanyApi {
  // Get departments by company id
  async getDepartmentsByCompanyId(id) {
    try {
      const response = await axios.post(
        `${API}companies/departments`,
        { company_id: id },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("company")).access_token
            }`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

//   Get the count for departments by company id
  async getDepartmentsCountByCompanyId(id) {
    try {
      const response = await axios.post(
        `${API}companies/departments/count`,
        { company_id: id },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("company")).access_token
            }`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

//   Get the count for employees by company id
  async getEmployeesCountByCompanyId(id) {
    try {
      const response = await axios.post(
        `${API}companies/employees/all/count`,
        { company_id: id },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("company")).access_token
            }`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  // Get the count of employees by department 
  async getEmployeesCountByDepartmentId(id) {
    try {
      const response = await axios.post(
        `${API}companies/employees/count`,
        { department_id: id },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("company")).access_token
            }`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get employees by department id
  async getEmployeesByDepartmentId(id) {
    try {
      const response = await axios.post(
        `${API}companies/employees`,
        { department_id: id },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("company")).access_token
            }`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}

export default new CompanyApi();

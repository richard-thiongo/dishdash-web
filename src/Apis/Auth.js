// We define the authentication functions like login, register, logout
// We use axios to make the requests
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

class AuthApi {
  // Restaurant login
  async RestaurantLogin(restaurant_email, restaurant_password) {
    try {
      const response = await axios.post(`${API}restaurants/login`, {
        restaurant_email,
        restaurant_password,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Company login
  async CompanyLogin(company_email, password) {
    try {
      const response = await axios.post(`${API}companies/login`, {
        company_email,
        password,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  as
}

export default new AuthApi();

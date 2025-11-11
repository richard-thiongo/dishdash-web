import axios from "axios";
const API = process.env.REACT_APP_API_URL;


class RestaurantApi {
    //  Get view Restaurants
    async getRestaurants() {
      try {
        const response = await axios.get(`${API}restaurants/view`);
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }


    // Get menus by restaurant id
    async getMenusByRestaurantId(id) {
      try {
        const response = await axios.post(
          `${API}menus/view`,
          { restaurant_id: id },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("restaurant")).access_token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    // Create a new menumeal
    async createMenu(formData) {
      try {
        const response = await axios.post(
          `${API}menus/create`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("restaurant")).access_token}`,
              'Content-Type': 'multipart/form-data',
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

export default new RestaurantApi();
import { Calendar, Info, Mail, MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";
import RestaurantApi from "../../Apis/Restaurant";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all the restaurants using useEffect
  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await RestaurantApi.getRestaurants();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setRestaurants(response.restaurants);
    };
    fetchRestaurants();
  }, []);
  console.log("This are the restaurants", restaurants);
  return (
    <div className="container mt-4">
      <h3 className="mb-2">Restaurants</h3>
      {/* A small text talking about the page */}
      <span className="text-muted">
        A list of all registered restaurants in the system
      </span>

      <div className="row">
        {Array.isArray(restaurants) &&
        restaurants.length > 0 ? (
          restaurants.map((restaurants) => (
            <div
              className="col-sm-12 col-md-6 col-lg-4 mb-4 mt-4"
              key={restaurants.restaurant_id}
            >
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold">
                    {restaurants.restaurant_name}
                  </h5>

                  <p className="card-text">
                    <MapPin size={16} className="me-2 text-muted" />
                    {restaurants.restaurant_address}
                  </p>

                  <p className="card-text">
                    <Mail size={16} className="me-2 text-muted" />
                    {restaurants.restaurant_email}
                  </p>

                  <p className="card-text">
                    <Info size={16} className="me-2 text-muted" />
                    {restaurants.restaurant_description}
                  </p>

                  <p className="card-text">
                    <Calendar size={16} className="me-2 text-muted" />
                    {restaurants.reg_date}
                  </p>

                  <p>
                    <strong>Status: </strong>
                    {restaurants.restaurant_status=== 1 ? (
                      <span className="badge bg-success">Active</span>
                    ) : (
                      <span className="badge bg-danger">Inactive</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h5 className="card-title fw-bold">No Restaurants</h5>
        )}
      </div>
    </div>
  );
};

export default Restaurants;

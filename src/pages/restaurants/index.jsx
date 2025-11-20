import { Calendar, Info, Mail, MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";
import RestaurantApi from "../../Apis/Restaurant";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await RestaurantApi.getRestaurants();
      setRestaurants(response.restaurants);
      setTimeout(() => setLoading(false), 2000);
    };
    fetchRestaurants();
  }, []);

  const styles = {
    container: {
      padding: "1rem 2rem",
      backgroundColor: "#0d1117",
      minHeight: "100vh",
      color: "#c9d1d9",
    },
    header: {
      marginBottom: "0.5rem",
    },
    subtitle: {
      color: "#8b949e",
      fontSize: "0.9rem",
    },
    row: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: "1rem",
      gap: "1rem",
    },
    card: {
      backgroundColor: "#161b22",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
      flex: "1 1 calc(33% - 1rem)",
      minWidth: "250px",
      color: "#c9d1d9",
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    cardBody: {
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      flex: 1,
    },
    icon: {
      color: "#8b949e",
      marginRight: "0.5rem",
    },
    badgeActive: {
      backgroundColor: "#238636",
      color: "#fff",
      padding: "0.25rem 0.5rem",
      borderRadius: "6px",
      fontSize: "0.75rem",
    },
    badgeInactive: {
      backgroundColor: "#dc3545",
      color: "#fff",
      padding: "0.25rem 0.5rem",
      borderRadius: "6px",
      fontSize: "0.75rem",
    },
    noData: {
      marginTop: "2rem",
      textAlign: "center",
      width: "100%",
      fontSize: "1.25rem",
      color: "#8b949e",
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Restaurants</h3>
      <span style={styles.subtitle}>
        A list of all registered restaurants in the system
      </span>

      <div style={styles.row}>
        {loading ? (
          <p style={styles.noData}>Loading...</p>
        ) : Array.isArray(restaurants) && restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div key={restaurant.restaurant_id} style={styles.card}>
              <div style={styles.cardBody}>
                <h5 style={{ fontWeight: "bold" }}>
                  {restaurant.restaurant_name}
                </h5>

                <p>
                  <MapPin size={16} style={styles.icon} />
                  {restaurant.restaurant_address}
                </p>

                <p>
                  <Mail size={16} style={styles.icon} />
                  {restaurant.restaurant_email}
                </p>

                <p>
                  <Info size={16} style={styles.icon} />
                  {restaurant.restaurant_description}
                </p>

                <p>
                  <Calendar size={16} style={styles.icon} />
                  {restaurant.reg_date}
                </p>

                <p>
                  <strong>Status: </strong>
                  {restaurant.restaurant_status === 1 ? (
                    <span style={styles.badgeActive}>Active</span>
                  ) : (
                    <span style={styles.badgeInactive}>Inactive</span>
                  )}
                </p>
              </div>
            </div>
          ))
        ) : (
          <h5 style={styles.noData}>No Restaurants Found</h5>
        )}
      </div>
    </div>
  );
};

export default Restaurants;

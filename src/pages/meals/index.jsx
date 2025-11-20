import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import RestaurantApi from "../../Apis/Restaurant";
import { Link } from "react-router-dom";

const Meals = () => {
  const [meal, setMeal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch all meals by restaurant ID
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      setError("");

      try {
        const stored = JSON.parse(localStorage.getItem("restaurant"));
        const restaurantId = stored?.restaurant?.restaurant_id;
        if (!restaurantId) {
          throw new Error("Missing restaurant id");
        }

        const response = await RestaurantApi.getMenusByRestaurantId(restaurantId);

        // Handle 404 (no meals found)
        if (response?.status === 404 || response?.response?.status === 404) {
          setMeal([]);
          return;
        }

        // Normalize response shapes
        const items = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.menus)
          ? response.menus
          : [];

        const normalized = items.map((m, index) => ({
          key: m.menu_id || index,
          img: m.menu_photo || "",
          name: m.menu_name || "",
          desc: m.menu_description || "",
          price:
            typeof m.menu_price === "number"
              ? m.menu_price
              : Number(m.menu_price || 0),
          category: m.category || "Uncategorized",
        }));

        setMeal(normalized);
      } catch (e) {
        if (e?.response?.status === 404) {
          setMeal([]);
        } else {
          console.error(e);
          setError(e?.message || "Failed to load meals");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  // Compute unique categories
  const categories = useMemo(() => {
    const all = meal.map((m) => m.category).filter(Boolean);
    return [...new Set(all)];
  }, [meal]);

  // Apply filters
  const filteredMeals = useMemo(() => {
    const q = search.trim().toLowerCase();
    return meal.filter((m) => {
      const matchesName = q ? (m.name || "").toLowerCase().includes(q) : true;
      const matchesCategory = selectedCategory
        ? m.category === selectedCategory
        : true;
      const price = Number(m.price || 0);
      const meetsMin = minPrice !== "" ? price >= Number(minPrice) : true;
      const meetsMax = maxPrice !== "" ? price <= Number(maxPrice) : true;
      return matchesName && matchesCategory && meetsMin && meetsMax;
    });
  }, [meal, search, selectedCategory, minPrice, maxPrice]);

  // Styles
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#010409",
      padding: "2rem 1rem",
      color: "#f1f5f9"
    },
    innerContainer: {
      maxWidth: "1200px",
      margin: "0 auto"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2rem",
      flexWrap: "wrap",
      gap: "1rem"
    },
    title: {
      color: "#ffffff",
      fontSize: "1.875rem",
      fontWeight: "700",
      margin: "0"
    },
    addButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.75rem 1.5rem",
      backgroundColor: "#2563eb",
      color: "#ffffff",
      textDecoration: "none",
      borderRadius: "8px",
      fontWeight: "600",
      fontSize: "0.875rem",
      transition: "all 0.2s ease",
      border: "none",
      cursor: "pointer"
    },
    loading: {
      textAlign: "center",
      color: "#94a3b8",
      padding: "3rem 0",
      fontSize: "1.125rem"
    },
    errorAlert: {
      backgroundColor: "#fee2e2",
      border: "1px solid #f87171",
      color: "#991b1b",
      padding: "1rem",
      borderRadius: "8px",
      marginBottom: "1.5rem"
    },
    emptyState: {
      textAlign: "center",
      color: "#94a3b8",
      padding: "3rem 0",
      fontSize: "1.125rem"
    },
    filtersContainer: {
      backgroundColor: "#0f111a",
      border: "1px solid #334155",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "2rem"
    },
    filtersGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "1rem",
      alignItems: "end"
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem"
    },
    label: {
      color: "#f1f5f9",
      fontWeight: "500",
      fontSize: "0.875rem"
    },
    input: {
      padding: "0.75rem",
      borderRadius: "8px",
      border: "1px solid #334155",
      backgroundColor: "#1e293b",
      color: "#f1f5f9",
      fontSize: "0.875rem",
      transition: "all 0.2s ease",
      outline: "none"
    },
    select: {
      padding: "0.75rem",
      borderRadius: "8px",
      border: "1px solid #334155",
      backgroundColor: "#1e293b",
      color: "#f1f5f9",
      fontSize: "0.875rem",
      transition: "all 0.2s ease",
      outline: "none",
      cursor: "pointer"
    },
    searchInput: {
      padding: "0.75rem 0.75rem 0.75rem 2.5rem",
      borderRadius: "8px",
      border: "1px solid #334155",
      backgroundColor: "#1e293b",
      color: "#f1f5f9",
      fontSize: "0.875rem",
      transition: "all 0.2s ease",
      outline: "none",
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cpath d='m21 21-4.3-4.3'%3E%3C/path%3E%3C/svg%3E")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "0.75rem center",
      backgroundSize: "16px"
    },
    mealsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "1.5rem"
    },
    mealCard: {
      backgroundColor: "#0f111a",
      border: "1px solid #334155",
      borderRadius: "12px",
      overflow: "hidden",
      transition: "all 0.3s ease",
      cursor: "pointer"
    },
    mealImage: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      backgroundColor: "#1e293b"
    },
    mealBody: {
      padding: "1.5rem"
    },
    mealTitle: {
      color: "#ffffff",
      fontSize: "1.125rem",
      fontWeight: "600",
      margin: "0 0 0.5rem 0"
    },
    mealDescription: {
      color: "#94a3b8",
      fontSize: "0.875rem",
      margin: "0 0 0.75rem 0",
      lineHeight: "1.4"
    },
    mealCategory: {
      color: "#60a5fa",
      fontSize: "0.75rem",
      fontWeight: "500",
      margin: "0 0 1rem 0"
    },
    mealPrice: {
      color: "#22c55e",
      fontSize: "1.25rem",
      fontWeight: "700",
      margin: "0"
    },
    noResults: {
      gridColumn: "1 / -1",
      textAlign: "center",
      color: "#94a3b8",
      padding: "3rem 0",
      fontSize: "1.125rem"
    }
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = "#60a5fa";
    e.target.style.backgroundColor = "#1e40af";
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = "#334155";
    e.target.style.backgroundColor = "#1e293b";
  };

  const handleButtonHover = (e, isHover) => {
    e.target.style.backgroundColor = isHover ? "#22c55e" : "#069039ff";
  };

  const handleCardHover = (e, isHover) => {
    e.currentTarget.style.transform = isHover ? "translateY(-4px)" : "translateY(0)";
    e.currentTarget.style.boxShadow = isHover 
      ? "0 8px 30px rgba(0,0,0,0.5)" 
      : "0 2px 10px rgba(0,0,0,0.3)";
    e.currentTarget.style.borderColor = isHover ? "#475569" : "#334155";
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Meals</h1>
          <Link 
            to="/meals/new" 
            style={styles.addButton}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
          >
            <Plus size={18} />
            Add Meal
          </Link>
        </div>

        {/* Loading State */}
        {loading && <div style={styles.loading}>Loading meals...</div>}

        {/* Error State */}
        {!loading && error && (
          <div style={styles.errorAlert}>
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && meal.length === 0 && (
          <div style={styles.emptyState}>
            No meals found. Start by adding your first meal!
          </div>
        )}

        {/* Filters */}
        {!loading && !error && meal.length > 0 && (
          <div style={styles.filtersContainer}>
            <div style={styles.filtersGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Search by name</label>
                <input
                  type="text"
                  placeholder="e.g. Burger"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={styles.searchInput}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Min price</label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(e.target.value.replace(/[^0-9.]/g, ""))
                  }
                  style={styles.input}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Max price</label>
                <input
                  type="number"
                  min="0"
                  placeholder="1000"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(e.target.value.replace(/[^0-9.]/g, ""))
                  }
                  style={styles.input}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={styles.select}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                >
                  <option value="">All categories</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Meal Cards */}
        {!loading && !error && meal.length > 0 && (
          <div style={styles.mealsGrid}>
            {filteredMeals.map((meal, index) => (
              <div 
                key={meal.key ?? index} 
                style={styles.mealCard}
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                <img 
                  src={meal.img} 
                  alt={meal.name} 
                  style={styles.mealImage}
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200' fill='%231e293b'%3E%3Crect width='300' height='200' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%23475569'%3ENo Image%3C/text%3E%3C/svg%3E";
                  }}
                />
                
                <div style={styles.mealBody}>
                  <h3 style={styles.mealTitle}>{meal.name}</h3>
                  <p style={styles.mealDescription}>{meal.desc}</p>
                  <p style={styles.mealCategory}>
                    Category: <strong>{meal.category}</strong>
                  </p>
                  <p style={styles.mealPrice}>Kshs {meal.price}</p>
                </div>
              </div>
            ))}

            {filteredMeals.length === 0 && (
              <div style={styles.noResults}>
                No meals match your filters.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Meals;
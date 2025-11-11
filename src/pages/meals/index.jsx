import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
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

  return (
    <div className="container my-4">
      {/* Header and Add button - always visible */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0">Meals</h4>
        <Link to="/meals/new" className="btn btn-primary">
          <Plus size={16} className="me-1" /> Add Meal
        </Link>
      </div>

      {/* Loading / Error / Empty states */}
      {loading && <div className="text-center py-5">Loading meals...</div>}

      {!loading && error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && meal.length === 0 && (
        <div className="text-center py-5">No meals found.</div>
      )}

      {/* Filters */}
      {!loading && !error && meal.length > 0 && (
        <div className="row g-2 mb-3 align-items-end">
          <div className="col-12 col-md-4">
            <label className="form-label">Search by name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Burger"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-6 col-md-2">
            <label className="form-label">Min price</label>
            <input
              type="number"
              min="0"
              className="form-control"
              placeholder="0"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value.replace(/[^0-9.]/g, ""))
              }
            />
          </div>

          <div className="col-6 col-md-2">
            <label className="form-label">Max price</label>
            <input
              type="number"
              min="0"
              className="form-control"
              placeholder="1000"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value.replace(/[^0-9.]/g, ""))
              }
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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
      )}

      {/* Meal Cards */}
      <div className="row g-4">
        {filteredMeals.map((meal, index) => (
          <div key={meal.key ?? index} className="col-md-4 col-sm-6">
            <div className="card meal-card border-0 shadow-sm">
              <div className="position-relative">
                <img src={meal.img} alt={meal.name} className="card-img-top" />
              </div>

              <div className="card-body">
                <h5 className="card-title fw-bold mb-1">{meal.name}</h5>
                <p className="card-text text-muted mb-1">{meal.desc}</p>
                <p className="card-text text-secondary small">
                  Category: <strong>{meal.category}</strong>
                </p>

                <div className="d-flex justify-content-start">
                  <span className="text-danger fw-bold fs-5">
                    Kshs {meal.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {!loading && !error && meal.length > 0 && filteredMeals.length === 0 && (
          <div className="col-12">
            <div className="text-center py-5">
              No meals match your filters.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Meals;

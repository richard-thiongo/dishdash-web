import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Plus } from "lucide-react";
import RestaurantApi from "../../Apis/Restaurant";

const AddMeal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    menu_name: "",
    menu_description: "",
    menu_price: "",
    category: "", // ✅ Added category field
    menu_photo: null,
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        menu_photo: file,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const stored = JSON.parse(localStorage.getItem("restaurant"));
      const restaurantId = stored?.restaurant?.restaurant_id;

      if (!restaurantId) {
        throw new Error("Missing restaurant id");
      }

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("menu_name", formData.menu_name);
      submitData.append("menu_description", formData.menu_description);
      submitData.append("menu_price", formData.menu_price);
      submitData.append("category", formData.category); // ✅ include category
      submitData.append("menu_status", "active"); // Default to active
      submitData.append("restaurant_id", restaurantId);

      if (formData.menu_photo) {
        submitData.append("menu_photo", formData.menu_photo);
      }

      // Call the API
      const response = await RestaurantApi.createMenu(submitData);

      if (response) {
        navigate("/meals");
      }
    } catch (error) {
      console.error("Error adding meal:", error);
      setError(error?.message || "Failed to add meal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-link text-white p-0 me-3"
                  onClick={() => navigate("/meals")}
                >
                  <ArrowLeft size={20} />
                </button>
                <h4 className="mb-0">Add New Meal</h4>
              </div>
            </div>

            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Meal Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="menu_name"
                      value={formData.menu_name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter meal name"
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Description *</label>
                    <textarea
                      className="form-control"
                      name="menu_description"
                      value={formData.menu_description}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      placeholder="Enter meal description"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Price (Kshs) *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="menu_price"
                      value={formData.menu_price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                    />
                  </div>

                  {/* ✅ Added Category field */}
                  <div className="col-md-6">
                    <label className="form-label">Category *</label>
                    <select
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select category</option>
                      <option value="Beverage">Beverage</option>
                      <option value="Food">Food</option>
                      <option value="Drink">Drink</option>
                      <option value="Fast Food">Fast Food</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Meal Photo</label>
                    <div className="input-group">
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <span className="input-group-text">
                        <Upload size={16} />
                      </span>
                    </div>
                    <div className="form-text">
                      Supported formats: JPG, PNG Max size: 5MB
                    </div>
                    {formData.menu_photo && (
                      <div className="mt-2">
                        <small className="text-success">
                          Selected: {formData.menu_photo.name}
                        </small>
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-flex gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-secondary flex-fill"
                    onClick={() => navigate("/meals")}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary flex-fill"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Adding Meal...
                      </>
                    ) : (
                      <>
                        <Plus size={16} className="me-1" />
                        Add Meal
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMeal;

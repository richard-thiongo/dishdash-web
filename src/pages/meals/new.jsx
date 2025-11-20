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

  // Styles
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#010409",
      padding: "2rem 1rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start"
    },
    card: {
      maxWidth: "600px",
      width: "100%",
      backgroundColor: "#0f111a",
      borderRadius: "12px",
      border: "1px solid #334155",
      boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
    },
    header: {
      backgroundColor: "#1e293b",
      padding: "1.5rem",
      borderBottom: "1px solid #334155",
      borderTopLeftRadius: "12px",
      borderTopRightRadius: "12px"
    },
    headerContent: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem"
    },
    backButton: {
      background: "none",
      border: "none",
      color: "#60a5fa",
      cursor: "pointer",
      padding: "0.5rem",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease"
    },
    title: {
      color: "#ffffff",
      fontSize: "1.5rem",
      fontWeight: "600",
      margin: "0"
    },
    body: {
      padding: "2rem"
    },
    errorAlert: {
      backgroundColor: "#fee2e2",
      border: "1px solid #f87171",
      color: "#991b1b",
      padding: "0.75rem 1rem",
      borderRadius: "8px",
      marginBottom: "1.5rem"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem"
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
    textarea: {
      padding: "0.75rem",
      borderRadius: "8px",
      border: "1px solid #334155",
      backgroundColor: "#1e293b",
      color: "#f1f5f9",
      fontSize: "0.875rem",
      transition: "all 0.2s ease",
      outline: "none",
      resize: "vertical",
      minHeight: "100px",
      fontFamily: "inherit"
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
    fileInputGroup: {
      display: "flex",
      alignItems: "center"
    },
    fileInput: {
      flex: "1",
      padding: "0.75rem",
      borderRadius: "8px 0 0 8px",
      border: "1px solid #334155",
      borderRight: "none",
      backgroundColor: "#1e293b",
      color: "#f1f5f9",
      fontSize: "0.875rem",
      outline: "none"
    },
    fileIcon: {
      padding: "0.75rem",
      borderRadius: "0 8px 8px 0",
      border: "1px solid #334155",
      borderLeft: "none",
      backgroundColor: "#374151",
      color: "#94a3b8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    helperText: {
      color: "#94a3b8",
      fontSize: "0.75rem",
      marginTop: "0.25rem"
    },
    successText: {
      color: "#22c55e",
      fontSize: "0.75rem",
      marginTop: "0.5rem"
    },
    buttonGroup: {
      display: "flex",
      gap: "1rem",
      marginTop: "2rem"
    },
    button: {
      flex: "1",
      padding: "0.75rem 1.5rem",
      borderRadius: "8px",
      border: "none",
      fontWeight: "600",
      fontSize: "0.875rem",
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem"
    },
    cancelButton: {
      backgroundColor: "transparent",
      border: "1px solid #475569",
      color: "#94a3b8"
    },
    submitButton: {
      backgroundColor: "#2563eb",
      color: "#ffffff"
    },
    disabledButton: {
      backgroundColor: "#374151",
      color: "#9ca3af",
      cursor: "not-allowed"
    },
    spinner: {
      width: "16px",
      height: "16px",
      border: "2px solid transparent",
      borderTop: "2px solid currentColor",
      borderRadius: "50%",
      animation: "spin 1s linear infinite"
    }
  };

  // Add CSS animation for spinner
  const spinnerStyle = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;

  const handleInputFocus = (e) => {
    e.target.style.borderColor = "#60a5fa";
    e.target.style.backgroundColor = "#1e40af";
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = "#334155";
    e.target.style.backgroundColor = "#1e293b";
  };

  const handleButtonHover = (e, isHover, isCancel = false) => {
    if (loading) return;
    
    if (isCancel) {
      e.target.style.backgroundColor = isHover ? "#374151" : "transparent";
      e.target.style.color = isHover ? "#e2e8f0" : "#94a3b8";
    } else {
      e.target.style.backgroundColor = isHover ? "#22c55e" : "#055e25ff";
    }
  };

  return (
    <div style={styles.container}>
      <style>{spinnerStyle}</style>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <button
              style={styles.backButton}
              onClick={() => navigate("/meals")}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#1e293b";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              <ArrowLeft size={20} />
            </button>
            <h2 style={styles.title}>Add New Meal</h2>
          </div>
        </div>

        {/* Body */}
        <div style={styles.body}>
          {error && (
            <div style={styles.errorAlert}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Meal Name */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Meal Name *</label>
              <input
                type="text"
                name="menu_name"
                value={formData.menu_name}
                onChange={handleInputChange}
                required
                placeholder="Enter meal name"
                style={styles.input}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                disabled={loading}
              />
            </div>

            {/* Description */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Description *</label>
              <textarea
                name="menu_description"
                value={formData.menu_description}
                onChange={handleInputChange}
                required
                placeholder="Enter meal description"
                style={styles.textarea}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                disabled={loading}
              />
            </div>

            {/* Price and Category Row */}
            <div style={{ display: "flex", gap: "1rem" }}>
              {/* Price */}
              <div style={{ ...styles.formGroup, flex: 1 }}>
                <label style={styles.label}>Price (Kshs) *</label>
                <input
                  type="number"
                  name="menu_price"
                  value={formData.menu_price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  style={styles.input}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  disabled={loading}
                />
              </div>

              {/* Category */}
              <div style={{ ...styles.formGroup, flex: 1 }}>
                <label style={styles.label}>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  style={styles.select}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  disabled={loading}
                >
                  <option value="">Select category</option>
                  <option value="Beverage">Beverage</option>
                  <option value="Food">Food</option>
                  <option value="Drink">Drink</option>
                  <option value="Fast Food">Fast Food</option>
                </select>
              </div>
            </div>

            {/* File Upload */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Meal Photo</label>
              <div style={styles.fileInputGroup}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={styles.fileInput}
                  disabled={loading}
                />
                <div style={styles.fileIcon}>
                  <Upload size={16} />
                </div>
              </div>
              <div style={styles.helperText}>
                Supported formats: JPG, PNG Max size: 5MB
              </div>
              {formData.menu_photo && (
                <div style={styles.successText}>
                  Selected: {formData.menu_photo.name}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div style={styles.buttonGroup}>
              <button
                type="button"
                onClick={() => navigate("/meals")}
                disabled={loading}
                style={{
                  ...styles.button,
                  ...styles.cancelButton,
                  ...(loading ? styles.disabledButton : {})
                }}
                onMouseEnter={(e) => handleButtonHover(e, true, true)}
                onMouseLeave={(e) => handleButtonHover(e, false, true)}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.button,
                  ...styles.submitButton,
                  ...(loading ? styles.disabledButton : {})
                }}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
              >
                {loading ? (
                  <>
                    <div style={styles.spinner}></div>
                    Adding Meal...
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Add Meal
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMeal;
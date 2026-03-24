import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Step 3 – BMI Form Page (/bmi)
export default function BMIForm() {
  const navigate = useNavigate();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("cm"); // cm or m
  const [errors, setErrors] = useState({});

  // Step 4 – Input Validation
  const validate = () => {
    const errs = {};
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!height || isNaN(h) || h <= 0) {
      errs.height = "Enter a valid height (e.g. 170)";
    } else if (unit === "cm" && (h < 50 || h > 280)) {
      errs.height = "Height must be between 50 and 280 cm";
    } else if (unit === "m" && (h < 0.5 || h > 2.8)) {
      errs.height = "Height must be between 0.5 and 2.8 m";
    }

    if (!weight || isNaN(w) || w <= 0) {
      errs.weight = "Enter a valid weight (e.g. 65)";
    } else if (w < 10 || w > 500) {
      errs.weight = "Weight must be between 10 and 500 kg";
    }

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // Step 3 – Pass values via URL query params
    navigate(`/result?height=${height}&unit=${unit}&weight=${weight}`);
  };

  return (
    <div className="page form-page">
      <div className="form-card">
        <button className="back-link" onClick={() => navigate("/")}>
          ← Back
        </button>
        <h2 className="form-title">Your Measurements</h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* Height input */}
          <div className="field-group">
            <label className="field-label">Height</label>
            <div className="input-row">
              <input
                className={`field-input ${errors.height ? "input-error" : ""}`}
                type="number"
                placeholder={unit === "cm" ? "e.g. 170" : "e.g. 1.70"}
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                  setErrors((prev) => ({ ...prev, height: "" }));
                }}
              />
              <div className="unit-toggle">
                <button
                  type="button"
                  className={`unit-btn ${unit === "cm" ? "active" : ""}`}
                  onClick={() => { setUnit("cm"); setHeight(""); }}
                >cm</button>
                <button
                  type="button"
                  className={`unit-btn ${unit === "m" ? "active" : ""}`}
                  onClick={() => { setUnit("m"); setHeight(""); }}
                >m</button>
              </div>
            </div>
            {errors.height && <span className="error-msg">{errors.height}</span>}
          </div>

          {/* Weight input */}
          <div className="field-group">
            <label className="field-label">Weight <span className="unit-hint">(kg)</span></label>
            <input
              className={`field-input ${errors.weight ? "input-error" : ""}`}
              type="number"
              placeholder="e.g. 65"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
                setErrors((prev) => ({ ...prev, weight: "" }));
              }}
            />
            {errors.weight && <span className="error-msg">{errors.weight}</span>}
          </div>

          <button type="submit" className="btn-primary full-width">
            Calculate BMI →
          </button>
        </form>
      </div>
    </div>
  );
}
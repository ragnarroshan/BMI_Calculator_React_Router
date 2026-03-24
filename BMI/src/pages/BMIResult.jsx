import { useNavigate, useSearchParams } from "react-router-dom";

// BMI scale segments
const CATEGORIES = [
  { label: "Underweight",      min: 0,    max: 18.5, color: "#60a5fa" },
  { label: "Normal",           min: 18.5, max: 25,   color: "#34d399" },
  { label: "Overweight",       min: 25,   max: 30,   color: "#fbbf24" },
  { label: "Obese Class I",    min: 30,   max: 35,   color: "#f97316" },
  { label: "Obese Class II",   min: 35,   max: 40,   color: "#ef4444" },
  { label: "Obese Class III",  min: 40,   max: Infinity, color: "#b91c1c" },
];

function getCategory(bmi) {
  return CATEGORIES.find((c) => bmi >= c.min && bmi < c.max);
}

// Map BMI (10–45) to a 0–100% needle position
function bmiToPercent(bmi) {
  const clamped = Math.min(Math.max(bmi, 10), 45);
  return ((clamped - 10) / 35) * 100;
}

// Step 5 – BMI Calculation
function calcBMI(height, unit, weight) {
  const w = parseFloat(weight);
  let hm = parseFloat(height);
  if (unit === "cm") hm = hm / 100; // convert cm → m
  if (!hm || !w || hm <= 0 || w <= 0) return null;
  return w / (hm * hm);
}

// Step 6 – Result Page (/result)
export default function BMIResult() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const height = params.get("height");
  const unit   = params.get("unit") || "cm";
  const weight = params.get("weight");

  const bmi = calcBMI(height, unit, weight);

  // Guard: if invalid params, redirect back
  if (!bmi) {
    return (
      <div className="page">
        <div className="form-card" style={{ textAlign: "center" }}>
          <p style={{ color: "#ef4444", marginBottom: "1.5rem" }}>
            Invalid data. Please go back and try again.
          </p>
          <button className="btn-primary" onClick={() => navigate("/bmi")}>
            ← Recalculate
          </button>
        </div>
      </div>
    );
  }

  const bmiFixed   = bmi.toFixed(1);
  const category   = getCategory(bmi);
  const needlePct  = bmiToPercent(bmi);
  const displayH   = unit === "cm" ? `${height} cm` : `${height} m`;

  return (
    <div className="page result-page">
      <div className="result-card">
        <button className="back-link" onClick={() => navigate("/bmi")}>
          ← Recalculate
        </button>

        <h2 className="form-title">Your Result</h2>

        {/* Input summary */}
        <div className="summary-row">
          <div className="summary-pill">Height: {displayH}</div>
          <div className="summary-pill">Weight: {weight} kg</div>
        </div>

        {/* BMI score */}
        <div className="bmi-score-block" style={{ "--cat-color": category.color }}>
          <span className="bmi-number">{bmiFixed}</span>
          <span className="bmi-label" style={{ color: category.color }}>
            {category.label}
          </span>
        </div>

        {/* Gauge bar */}
        <div className="gauge-wrap">
          <div className="gauge-track">
            {CATEGORIES.map((c, i) => (
              <div
                key={i}
                className="gauge-seg"
                style={{ background: c.color, flex: c.max === Infinity ? 1.5 : c.max - c.min }}
              />
            ))}
            {/* Needle */}
            <div className="gauge-needle" style={{ left: `${needlePct}%` }} />
          </div>
          <div className="gauge-labels">
            <span>10</span>
            <span>18.5</span>
            <span>25</span>
            <span>30</span>
            <span>35</span>
            <span>40+</span>
          </div>
        </div>

        {/* Category table */}
        <div className="cat-table">
          {CATEGORIES.map((c) => (
            <div
              key={c.label}
              className={`cat-row ${c.label === category.label ? "cat-active" : ""}`}
            >
              <span className="cat-dot" style={{ background: c.color }} />
              <span className="cat-name">{c.label}</span>
              <span className="cat-range">
                {c.max === Infinity ? `≥ ${c.min}` : `${c.min} – ${c.max}`}
              </span>
            </div>
          ))}
        </div>

        {/* Step 7 – Navigation back */}
        <button className="btn-primary full-width" onClick={() => navigate("/bmi")}>
          Calculate Again
        </button>
      </div>
    </div>
  );
}
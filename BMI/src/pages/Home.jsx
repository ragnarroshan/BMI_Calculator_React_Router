import { useNavigate } from "react-router-dom";

// Step 2 – Home route (/)
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page home-page">
      <div className="home-content">
        <span className="home-eyebrow">Health Tool</span>
        <h1 className="home-title">BMI<br />Calculator</h1>
        <p className="home-desc">
          Enter your height and weight to instantly calculate your
          Body Mass Index and discover your health category.
        </p>
        <button className="btn-primary" onClick={() => navigate("/bmi")}>
          Get Started →
        </button>
      </div>

      {/* Decorative rings */}
      <div className="ring ring-1" />
      <div className="ring ring-2" />
      <div className="ring ring-3" />
    </div>
  );
}
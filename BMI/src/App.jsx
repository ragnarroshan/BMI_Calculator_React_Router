import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BMIForm from "./pages/BMIForm";
import BMIResult from "./pages/BMIResult";
import "./BMI.css";
 
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Step 2 – Routing structure */}
        <Route path="/" element={<Home />} />
        <Route path="/bmi" element={<BMIForm />} />
        <Route path="/result" element={<BMIResult />} />
      </Routes>
    </BrowserRouter>
  );
}
 
import "../App.css";
import { useState } from "react";

function DemandPrediction() {
  const [formData, setFormData] = useState({
    foodItem: "Biryani",
    day: "Wednesday",
    temperature: 29,
    rainfall: 5,
    holiday: "No",
    event: "Normal",
    previousSales: 140,
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    setError("");
  };

  const handlePredict = async () => {
    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            day_of_week: formData.day,
            food_item: formData.foodItem,
            temperature: Number(formData.temperature),
            rainfall: Number(formData.rainfall),
            is_holiday: formData.holiday === "Yes" ? 1 : 0,
            event: formData.event,
            previous_day_sales: Number(formData.previousSales),
            previous_week_avg_sales: Number(formData.previousSales),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Prediction request failed.");
      }

      const data = await response.json();

      setPrediction({
        predictedDemand: data.predicted_demand,
        recommendedQuantity: data.recommended_quantity,
        expectedWaste: data.expected_waste,
        confidence: data.confidence,
      });

    } catch (error) {
      console.error("Prediction error:", error);

      setError(
        "Unable to connect to the Python prediction server. " +
        "Make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className="topbar">
        <div>
          <p className="welcome-small">
            AI-powered planning
          </p>

          <h1>Demand Prediction</h1>
        </div>
      </header>

      <section className="prediction-layout">

        {/* INPUT FORM */}
        <div className="panel prediction-form">

          <div className="panel-header">
            <div>
              <h2>Food Demand Predictor</h2>

              <p>
                Enter today's conditions to estimate food demand.
              </p>
            </div>
          </div>

          <div className="form-grid">

            {/* Food Item */}
            <div className="form-group">
              <label>Food Item</label>

              <select
                name="foodItem"
                value={formData.foodItem}
                onChange={handleChange}
              >
                <option>Biryani</option>
                <option>Dosa</option>
                <option>Rice</option>
                <option>Sandwich</option>
                <option>Poha</option>
              </select>
            </div>

            {/* Day */}
            <div className="form-group">
              <label>Day</label>

              <select
                name="day"
                value={formData.day}
                onChange={handleChange}
              >
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </select>
            </div>

            {/* Temperature */}
            <div className="form-group">
              <label>Temperature (°C)</label>

              <input
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
              />
            </div>

            {/* Rainfall */}
            <div className="form-group">
              <label>Rainfall (mm)</label>

              <input
                type="number"
                name="rainfall"
                value={formData.rainfall}
                onChange={handleChange}
              />
            </div>

            {/* Holiday */}
            <div className="form-group">
              <label>Holiday</label>

              <select
                name="holiday"
                value={formData.holiday}
                onChange={handleChange}
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            {/* Event */}
            <div className="form-group">
              <label>College Event</label>

              <select
                name="event"
                value={formData.event}
                onChange={handleChange}
              >
                <option>Normal</option>
                <option>Exam</option>
                <option>Festival</option>
              </select>
            </div>

            {/* Previous Sales */}
            <div className="form-group">
              <label>Previous Day Sales</label>

              <input
                type="number"
                name="previousSales"
                value={formData.previousSales}
                onChange={handleChange}
              />
            </div>

          </div>

          <button
            className="predict-button"
            onClick={handlePredict}
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Demand"}
          </button>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

        </div>

        {/* PREDICTION RESULT */}
        <div className="panel prediction-result">

          <div className="panel-header">
            <div>
              <h2>AI Prediction</h2>

              <p>
                Result generated by the Python ML model
              </p>
            </div>
          </div>

          {!prediction ? (

            <div className="empty-result">

              <div className="empty-icon">
                🤖
              </div>

              <h3>
                Ready to Predict
              </h3>

              <p>
                Enter the food and demand information,
                then click "Predict Demand".
              </p>

            </div>

          ) : (

            <div>

              {/* Main Prediction */}
              <div className="prediction-main">

                <span>
                  Predicted Demand
                </span>

                <strong>
                  {prediction.predictedDemand}
                </strong>

                <small>
                  plates
                </small>

              </div>

              {/* Result Cards */}
              <div className="result-grid">

                <div className="result-card">
                  <span>
                    Recommended Preparation
                  </span>

                  <strong>
                    {prediction.recommendedQuantity}
                  </strong>

                  <small>
                    plates
                  </small>
                </div>

                <div className="result-card">
                  <span>
                    Expected Waste
                  </span>

                  <strong>
                    {prediction.expectedWaste}
                  </strong>

                  <small>
                    plates
                  </small>
                </div>

                <div className="result-card">
                  <span>
                    Model Confidence
                  </span>

                  <strong>
                    {prediction.confidence}%
                  </strong>

                  <small>
                    indicator
                  </small>
                </div>

              </div>

              {/* Recommendation */}
              <div className="recommendation-box">

                <strong>
                  💡 AI Recommendation
                </strong>

                <p>
                  Prepare approximately{" "}
                  <b>
                    {prediction.recommendedQuantity}
                  </b>{" "}
                  plates of{" "}
                  <b>
                    {formData.foodItem}
                  </b>{" "}
                  based on the current conditions.
                </p>

              </div>

            </div>
          )}

        </div>

      </section>
    </div>
  );
}

export default DemandPrediction;
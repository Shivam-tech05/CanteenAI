import "../App.css";
import { useEffect, useState } from "react";

function Dashboard() {
  const [dashboardPrediction, setDashboardPrediction] = useState(null);
  const [loadingPrediction, setLoadingPrediction] = useState(true);

  useEffect(() => {
    const loadPrediction = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/predict",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              day_of_week: "Wednesday",
              food_item: "Biryani",
              temperature: 29,
              rainfall: 5,
              is_holiday: 0,
              event: "Normal",
              previous_day_sales: 140,
              previous_week_avg_sales: 138,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Prediction request failed");
        }

        const data = await response.json();

        setDashboardPrediction(data);
      } catch (error) {
        console.error(
          "Dashboard prediction error:",
          error
        );
      } finally {
        setLoadingPrediction(false);
      }
    };

    loadPrediction();
  }, []);

  return (
    <>
      {/* Header */}
      <header className="topbar">
        <div>
          <p className="welcome-small">Good morning</p>
          <h1>Canteen Dashboard</h1>
        </div>

        <div className="profile">
          <div className="notification">🔔</div>

          <div className="avatar">A</div>

          <div>
            <strong>Admin</strong>
            <span>Canteen Manager</span>
          </div>
        </div>
      </header>

      {/* Overview Cards */}
      <section className="stats-grid">

        {/* Predicted Demand */}
        <div className="stat-card">
          <div>
            <p>Predicted Demand</p>

            <h2>
              {loadingPrediction
                ? "..."
                : dashboardPrediction
                ? dashboardPrediction.predicted_demand
                : "--"}
            </h2>

            <span className="positive">
              plates predicted by AI
            </span>
          </div>

          <div className="stat-icon">🍽️</div>
        </div>

        {/* Expected Waste */}
        <div className="stat-card">
          <div>
            <p>Expected Waste</p>

            <h2>
              {loadingPrediction
                ? "..."
                : dashboardPrediction
                ? dashboardPrediction.expected_waste
                : "--"}
            </h2>

            <span className="neutral">
              plates expected
            </span>
          </div>

          <div className="stat-icon">♻️</div>
        </div>

        {/* Waste Reduction */}
        <div className="stat-card">
          <div>
            <p>Waste Reduction</p>

            <h2>18.4%</h2>

            <span className="positive">
              Project target
            </span>
          </div>

          <div className="stat-icon">📉</div>
        </div>

        {/* Prediction Confidence */}
        <div className="stat-card">
          <div>
            <p>Prediction Confidence</p>

            <h2>
              {loadingPrediction
                ? "..."
                : dashboardPrediction
                ? `${dashboardPrediction.confidence}%`
                : "--"}
            </h2>

            <span className="neutral">
              Current prediction
            </span>
          </div>

          <div className="stat-icon">🤖</div>
        </div>

      </section>

      {/* Main Grid */}
      <section className="dashboard-grid">

        {/* Demand Forecast */}
        <div className="panel forecast-panel">

          <div className="panel-header">
            <div>
              <h2>Today's Demand Forecast</h2>

              <p>
                Recommended preparation based on AI prediction
              </p>
            </div>

            <button className="view-button">
              View Details
            </button>
          </div>

          <div className="table-wrapper">
            <table>

              <thead>
                <tr>
                  <th>Food Item</th>
                  <th>Predicted</th>
                  <th>Recommended</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {/* Real Python prediction */}
                <tr>
                  <td>Biryani</td>

                  <td>
                    {loadingPrediction
                      ? "..."
                      : dashboardPrediction
                      ? dashboardPrediction.predicted_demand
                      : "--"}
                  </td>

                  <td>
                    {loadingPrediction
                      ? "..."
                      : dashboardPrediction
                      ? dashboardPrediction.recommended_quantity
                      : "--"}
                  </td>

                  <td>
                    <span className="badge high">
                      AI Prediction
                    </span>
                  </td>
                </tr>

                {/* Demo rows */}
                <tr>
                  <td>Dosa</td>
                  <td>110</td>
                  <td>115</td>

                  <td>
                    <span className="badge normal">
                      Normal
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Rice</td>
                  <td>78</td>
                  <td>85</td>

                  <td>
                    <span className="badge normal">
                      Normal
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Sandwich</td>
                  <td>55</td>
                  <td>58</td>

                  <td>
                    <span className="badge low">
                      Low Demand
                    </span>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* Smart Alerts */}
        <div className="panel">

          <div className="panel-header">
            <div>
              <h2>Smart Alerts</h2>

              <p>
                Important system recommendations
              </p>
            </div>
          </div>

          <div className="alerts">

            <div className="alert high-alert">
              <div className="alert-icon">⚠️</div>

              <div>
                <strong>High Biryani Demand</strong>

                <p>
                  AI prediction indicates increased
                  demand for Biryani today.
                </p>
              </div>
            </div>

            <div className="alert waste-alert">
              <div className="alert-icon">♻️</div>

              <div>
                <strong>Waste Monitoring</strong>

                <p>
                  Monitor food preparation against
                  actual sales to reduce waste.
                </p>
              </div>
            </div>

            <div className="alert info-alert">
              <div className="alert-icon">💡</div>

              <div>
                <strong>AI Recommendation</strong>

                <p>
                  Use predicted demand before preparing
                  the next batch of food.
                </p>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Bottom Section */}
      <section className="bottom-grid">

        {/* Weekly Trend */}
        <div className="panel">

          <div className="panel-header">
            <div>
              <h2>Weekly Demand Trend</h2>

              <p>
                Average food demand for the current week
              </p>
            </div>
          </div>

          <div className="chart-placeholder">

            <div className="chart-bars">
              <div style={{ height: "48%" }}></div>
              <div style={{ height: "65%" }}></div>
              <div style={{ height: "58%" }}></div>
              <div style={{ height: "82%" }}></div>
              <div style={{ height: "72%" }}></div>
              <div style={{ height: "91%" }}></div>
              <div style={{ height: "76%" }}></div>
            </div>

            <div className="chart-labels">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

          </div>
        </div>

        {/* System Performance */}
        <div className="panel performance-panel">

          <div className="panel-header">
            <div>
              <h2>System Performance</h2>

              <p>
                Current prediction information
              </p>
            </div>
          </div>

          <div className="performance-item">

            <div>
              <span>Prediction Confidence</span>

              <strong>
                {loadingPrediction
                  ? "..."
                  : dashboardPrediction
                  ? `${dashboardPrediction.confidence}%`
                  : "--"}
              </strong>
            </div>

            <div className="progress">
              <div
                style={{
                  width: dashboardPrediction
                    ? `${dashboardPrediction.confidence}%`
                    : "0%",
                }}
              ></div>
            </div>

          </div>

          <div className="performance-item">

            <div>
              <span>Data Quality</span>

              <strong>96%</strong>
            </div>

            <div className="progress">
              <div
                style={{ width: "96%" }}
              ></div>
            </div>

          </div>

          <div className="performance-item">

            <div>
              <span>Waste Control</span>

              <strong>84%</strong>
            </div>

            <div className="progress">
              <div
                style={{ width: "84%" }}
              ></div>
            </div>

          </div>

        </div>

      </section>
    </>
  );
}

export default Dashboard;
import "../App.css";

function Dashboard() {
return (
        <>
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
          <div className="stat-card">
            <div>
              <p>Predicted Demand</p>
              <h2>428</h2>
              <span className="positive">↑ 8.4% vs yesterday</span>
            </div>
            <div className="stat-icon">🍽️</div>
          </div>

          <div className="stat-card">
            <div>
              <p>Expected Waste</p>
              <h2>32 kg</h2>
              <span className="positive">↓ 12.6% this week</span>
            </div>
            <div className="stat-icon">♻️</div>
          </div>

          <div className="stat-card">
            <div>
              <p>Waste Reduction</p>
              <h2>18.4%</h2>
              <span className="positive">↑ 4.2% improvement</span>
            </div>
            <div className="stat-icon">📉</div>
          </div>

          <div className="stat-card">
            <div>
              <p>Model Accuracy</p>
              <h2>91.2%</h2>
              <span className="neutral">Current model</span>
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
                <p>Recommended preparation based on AI prediction</p>
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
                  <tr>
                    <td>Biryani</td>
                    <td>152</td>
                    <td>160</td>
                    <td>
                      <span className="badge high">High Demand</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Dosa</td>
                    <td>110</td>
                    <td>115</td>
                    <td>
                      <span className="badge normal">Normal</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Rice</td>
                    <td>78</td>
                    <td>85</td>
                    <td>
                      <span className="badge normal">Normal</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Sandwich</td>
                    <td>55</td>
                    <td>58</td>
                    <td>
                      <span className="badge low">Low Demand</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Alerts */}
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Smart Alerts</h2>
                <p>Important system recommendations</p>
              </div>
            </div>

            <div className="alerts">
              <div className="alert high-alert">
                <div className="alert-icon">⚠️</div>
                <div>
                  <strong>High Biryani Demand</strong>
                  <p>
                    Expected demand is 24% higher than the usual Wednesday.
                  </p>
                </div>
              </div>

              <div className="alert waste-alert">
                <div className="alert-icon">♻️</div>
                <div>
                  <strong>Waste Warning</strong>
                  <p>
                    Rice waste has exceeded the normal level for 3 days.
                  </p>
                </div>
              </div>

              <div className="alert info-alert">
                <div className="alert-icon">💡</div>
                <div>
                  <strong>AI Recommendation</strong>
                  <p>
                    Reduce sandwich preparation by approximately 8%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Section */}
        <section className="bottom-grid">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Weekly Demand Trend</h2>
                <p>Average food demand for the current week</p>
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

          <div className="panel performance-panel">
            <div className="panel-header">
              <div>
                <h2>System Performance</h2>
                <p>Current AI model performance</p>
              </div>
            </div>

            <div className="performance-item">
              <div>
                <span>Prediction Accuracy</span>
                <strong>91%</strong>
              </div>
              <div className="progress">
                <div style={{ width: "91%" }}></div>
              </div>
            </div>

            <div className="performance-item">
              <div>
                <span>Data Quality</span>
                <strong>96%</strong>
              </div>
              <div className="progress">
                <div style={{ width: "96%" }}></div>
              </div>
            </div>

            <div className="performance-item">
              <div>
                <span>Waste Control</span>
                <strong>84%</strong>
              </div>
              <div className="progress">
                <div style={{ width: "84%" }}></div>
              </div>
            </div>
          </div>
        </section>
        </>
  );
  }

export default Dashboard;
import "../App.css";

function WasteAnalytics() {
  const wasteData = [
    { food: "Biryani", prepared: 160, sold: 148, waste: 12 },
    { food: "Dosa", prepared: 115, sold: 107, waste: 8 },
    { food: "Rice", prepared: 85, sold: 76, waste: 9 },
    { food: "Sandwich", prepared: 58, sold: 51, waste: 7 },
    { food: "Poha", prepared: 72, sold: 66, waste: 6 },
  ];

  const totalPrepared = wasteData.reduce(
    (sum, item) => sum + item.prepared,
    0
  );

  const totalSold = wasteData.reduce(
    (sum, item) => sum + item.sold,
    0
  );

  const totalWaste = wasteData.reduce(
    (sum, item) => sum + item.waste,
    0
  );

  const wasteRate = (
    (totalWaste / totalPrepared) *
    100
  ).toFixed(1);

  return (
    <div>
      <header className="topbar">
        <div>
          <p className="welcome-small">
            Monitor and reduce food wastage
          </p>

          <h1>Waste Analytics</h1>
        </div>
      </header>

      {/* Summary Cards */}
      <section className="stats-grid">

        <div className="stat-card">
          <div>
            <p>Total Prepared</p>
            <h2>{totalPrepared}</h2>
            <span className="neutral">
              Plates
            </span>
          </div>

          <div className="stat-icon">🍽️</div>
        </div>

        <div className="stat-card">
          <div>
            <p>Total Sold</p>
            <h2>{totalSold}</h2>
            <span className="positive">
              {((totalSold / totalPrepared) * 100).toFixed(1)}% utilized
            </span>
          </div>

          <div className="stat-icon">📊</div>
        </div>

        <div className="stat-card">
          <div>
            <p>Total Waste</p>
            <h2>{totalWaste}</h2>
            <span className="neutral">
              Plates
            </span>
          </div>

          <div className="stat-icon">♻️</div>
        </div>

        <div className="stat-card">
          <div>
            <p>Waste Rate</p>
            <h2>{wasteRate}%</h2>
            <span className="positive">
              Current period
            </span>
          </div>

          <div className="stat-icon">📉</div>
        </div>

      </section>

      {/* Main Analytics */}
      <section className="dashboard-grid">

        {/* Waste Table */}
        <div className="panel">

          <div className="panel-header">
            <div>
              <h2>Food-wise Waste Analysis</h2>

              <p>
                Compare preparation, sales, and waste.
              </p>
            </div>
          </div>

          <div className="table-wrapper">
            <table>

              <thead>
                <tr>
                  <th>Food Item</th>
                  <th>Prepared</th>
                  <th>Sold</th>
                  <th>Waste</th>
                  <th>Waste %</th>
                </tr>
              </thead>

              <tbody>

                {wasteData.map((item) => {
                  const percentage = (
                    (item.waste / item.prepared) *
                    100
                  ).toFixed(1);

                  return (
                    <tr key={item.food}>

                      <td>
                        <strong>{item.food}</strong>
                      </td>

                      <td>{item.prepared}</td>

                      <td>{item.sold}</td>

                      <td>{item.waste}</td>

                      <td>
                        <span
                          className={
                            Number(percentage) > 8
                              ? "waste-high"
                              : "waste-normal"
                          }
                        >
                          {percentage}%
                        </span>
                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>
          </div>

        </div>

        {/* AI Recommendations */}
        <div className="panel">

          <div className="panel-header">
            <div>
              <h2>AI Waste Recommendations</h2>

              <p>
                Suggested actions based on waste patterns.
              </p>
            </div>
          </div>

          <div className="recommendation-list">

            <div className="waste-recommendation">
              <span className="recommendation-icon">
                ⚠️
              </span>

              <div>
                <strong>
                  Reduce Biryani preparation
                </strong>

                <p>
                  Biryani has the highest waste volume.
                  Consider reducing preparation by 5%.
                </p>
              </div>
            </div>

            <div className="waste-recommendation">
              <span className="recommendation-icon">
                📉
              </span>

              <div>
                <strong>
                  Monitor Rice demand
                </strong>

                <p>
                  Rice waste has remained above the
                  target level.
                </p>
              </div>
            </div>

            <div className="waste-recommendation">
              <span className="recommendation-icon">
                ✅
              </span>

              <div>
                <strong>
                  Sandwich performance is improving
                </strong>

                <p>
                  Waste remains relatively low compared
                  with preparation quantity.
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* Weekly Trend */}
      <section className="panel">

        <div className="panel-header">
          <div>
            <h2>Weekly Waste Trend</h2>

            <p>
              Waste generated over the current week.
            </p>
          </div>
        </div>

        <div className="waste-chart">

          <div className="waste-bars">

            <div className="waste-bar-group">
              <div
                className="waste-bar"
                style={{ height: "80%" }}
              ></div>
              <span>Mon</span>
            </div>

            <div className="waste-bar-group">
              <div
                className="waste-bar"
                style={{ height: "65%" }}
              ></div>
              <span>Tue</span>
            </div>

            <div className="waste-bar-group">
              <div
                className="waste-bar"
                style={{ height: "72%" }}
              ></div>
              <span>Wed</span>
            </div>

            <div className="waste-bar-group">
              <div
                className="waste-bar"
                style={{ height: "52%" }}
              ></div>
              <span>Thu</span>
            </div>

            <div className="waste-bar-group">
              <div
                className="waste-bar"
                style={{ height: "60%" }}
              ></div>
              <span>Fri</span>
            </div>

            <div className="waste-bar-group">
              <div
                className="waste-bar"
                style={{ height: "44%" }}
              ></div>
              <span>Sat</span>
            </div>

            <div className="waste-bar-group">
              <div
                className="waste-bar"
                style={{ height: "38%" }}
              ></div>
              <span>Sun</span>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default WasteAnalytics;
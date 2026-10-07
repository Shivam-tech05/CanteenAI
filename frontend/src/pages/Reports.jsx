import "../App.css";
import { useState } from "react";

function Reports() {
  const [period, setPeriod] = useState("This Week");

  const reportData = [
    {
      food: "Biryani",
      predicted: 152,
      actual: 148,
      waste: 12,
    },
    {
      food: "Dosa",
      predicted: 110,
      actual: 107,
      waste: 8,
    },
    {
      food: "Rice",
      predicted: 78,
      actual: 76,
      waste: 9,
    },
    {
      food: "Sandwich",
      predicted: 55,
      actual: 51,
      waste: 7,
    },
    {
      food: "Poha",
      predicted: 70,
      actual: 66,
      waste: 6,
    },
  ];

  const totalPredicted = reportData.reduce(
    (sum, item) => sum + item.predicted,
    0
  );

  const totalActual = reportData.reduce(
    (sum, item) => sum + item.actual,
    0
  );

  const totalWaste = reportData.reduce(
    (sum, item) => sum + item.waste,
    0
  );

  const predictionDifference =
    totalPredicted - totalActual;

  const downloadReport = () => {
    const headers = [
      "Food Item",
      "Predicted Demand",
      "Actual Sales",
      "Waste",
    ];

    const rows = reportData.map((item) => [
      item.food,
      item.predicted,
      item.actual,
      item.waste,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "canteen_report.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <header className="topbar">
        <div>
          <p className="welcome-small">
            Performance and operational summary
          </p>

          <h1>Reports</h1>
        </div>

        <button
          className="download-button"
          onClick={downloadReport}
        >
          Download CSV
        </button>
      </header>

      {/* Filters */}
      <section className="panel report-filter-panel">

        <div>
          <h2>Report Period</h2>

          <p>
            Select the reporting period for analysis.
          </p>
        </div>

        <select
          value={period}
          onChange={(event) =>
            setPeriod(event.target.value)
          }
        >
          <option>This Week</option>
          <option>This Month</option>
          <option>Last 3 Months</option>
        </select>

      </section>

      {/* Summary */}
      <section className="stats-grid">

        <div className="stat-card">
          <div>
            <p>Total Predicted</p>
            <h2>{totalPredicted}</h2>
            <span className="neutral">
              Plates
            </span>
          </div>

          <div className="stat-icon">🤖</div>
        </div>

        <div className="stat-card">
          <div>
            <p>Actual Sales</p>
            <h2>{totalActual}</h2>
            <span className="positive">
              Recorded sales
            </span>
          </div>

          <div className="stat-icon">📊</div>
        </div>

        <div className="stat-card">
          <div>
            <p>Prediction Difference</p>
            <h2>{predictionDifference}</h2>
            <span className="neutral">
              Plates
            </span>
          </div>

          <div className="stat-icon">📈</div>
        </div>

        <div className="stat-card">
          <div>
            <p>Total Waste</p>
            <h2>{totalWaste}</h2>
            <span className="positive">
              Plates
            </span>
          </div>

          <div className="stat-icon">♻️</div>
        </div>

      </section>

      {/* Detailed report */}
      <section className="panel">

        <div className="panel-header">
          <div>
            <h2>Demand and Waste Report</h2>

            <p>
              Detailed comparison of predicted demand,
              actual sales, and waste.
            </p>
          </div>
        </div>

        <div className="table-wrapper">

          <table>

            <thead>
              <tr>
                <th>Food Item</th>
                <th>Predicted Demand</th>
                <th>Actual Sales</th>
                <th>Difference</th>
                <th>Waste</th>
                <th>Performance</th>
              </tr>
            </thead>

            <tbody>

              {reportData.map((item) => {
                const difference =
                  item.predicted - item.actual;

                return (
                  <tr key={item.food}>

                    <td>
                      <strong>{item.food}</strong>
                    </td>

                    <td>{item.predicted}</td>

                    <td>{item.actual}</td>

                    <td>{difference}</td>

                    <td>{item.waste}</td>

                    <td>
                      <span
                        className={
                          difference <= 5
                            ? "badge normal"
                            : "badge high"
                        }
                      >
                        {difference <= 5
                          ? "Good"
                          : "Review"}
                      </span>
                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </section>

      {/* Insights */}
      <section className="dashboard-grid report-insights">

        <div className="panel">

          <div className="panel-header">
            <div>
              <h2>Report Insights</h2>
              <p>
                Key observations from the current period.
              </p>
            </div>
          </div>

          <div className="insight-list">

            <div className="insight-item">
              <strong>Demand tracking</strong>
              <p>
                The system predicted{" "}
                {totalPredicted} plates compared with{" "}
                {totalActual} actual sales.
              </p>
            </div>

            <div className="insight-item">
              <strong>Waste monitoring</strong>
              <p>
                Total recorded waste is{" "}
                {totalWaste} plates for the selected
                period.
              </p>
            </div>

            <div className="insight-item">
              <strong>Operational recommendation</strong>
              <p>
                Continue using demand predictions to
                adjust preparation quantities.
              </p>
            </div>

          </div>

        </div>

        <div className="panel">

          <div className="panel-header">
            <div>
              <h2>Period</h2>
              <p>Current report selection</p>
            </div>
          </div>

          <div className="period-display">
            <div className="period-icon">📅</div>

            <strong>{period}</strong>

            <span>
              Canteen operational report
            </span>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Reports;
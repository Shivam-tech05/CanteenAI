import "../App.css";
import { useState } from "react";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [alerts, setAlerts] = useState(true);

  return (
    <div>
      <header className="topbar">
        <div>
          <p className="welcome-small">
            Configure your CanteenAI workspace
          </p>

          <h1>Settings</h1>
        </div>
      </header>

      <section className="settings-grid">

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>System Preferences</h2>
              <p>
                Configure dashboard behavior and alerts.
              </p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <strong>Notifications</strong>
              <p>
                Receive important canteen system updates.
              </p>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() =>
                  setNotifications(!notifications)
                }
              />
              <span></span>
            </label>
          </div>

          <div className="setting-row">
            <div>
              <strong>AI Alerts</strong>
              <p>
                Show demand and waste recommendations.
              </p>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={alerts}
                onChange={() =>
                  setAlerts(!alerts)
                }
              />
              <span></span>
            </label>
          </div>

        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>About CanteenAI</h2>
              <p>
                Project information
              </p>
            </div>
          </div>

          <div className="about-project">
            <div className="about-icon">
              C
            </div>

            <h2>CanteenAI</h2>

            <p>
              AI-Based Food Demand Prediction and Waste
              Reduction System for College Canteens.
            </p>

            <span>
              Version 1.0.0
            </span>
          </div>
        </div>

      </section>
    </div>
  );
}

export default Settings;
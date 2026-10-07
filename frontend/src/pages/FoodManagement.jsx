import "../App.css";
import { useState } from "react";

function FoodManagement() {
  const [foods, setFoods] = useState([
    {
      name: "Biryani",
      predicted: 152,
      recommended: 160,
      actual: 148,
      waste: 12,
      status: "High Demand",
    },
    {
      name: "Dosa",
      predicted: 110,
      recommended: 115,
      actual: 107,
      waste: 8,
      status: "Normal",
    },
    {
      name: "Rice",
      predicted: 78,
      recommended: 85,
      actual: 76,
      waste: 9,
      status: "Normal",
    },
    {
      name: "Sandwich",
      predicted: 55,
      recommended: 58,
      actual: 51,
      waste: 7,
      status: "Low Demand",
    },
  ]);

  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");

  const addFood = () => {
    if (!foodName || !quantity) {
      return;
    }

    const newFood = {
      name: foodName,
      predicted: Number(quantity),
      recommended: Number(quantity),
      actual: 0,
      waste: 0,
      status: "New",
    };

    setFoods([...foods, newFood]);
    setFoodName("");
    setQuantity("");
  };

  return (
    <div>
      <header className="topbar">
        <div>
          <p className="welcome-small">
            Daily inventory planning
          </p>

          <h1>Food Management</h1>
        </div>
      </header>

      {/* Summary */}
      <section className="stats-grid food-stats">

        <div className="stat-card">
          <div>
            <p>Food Items</p>
            <h2>{foods.length}</h2>
            <span className="neutral">
              Currently tracked
            </span>
          </div>

          <div className="stat-icon">🍽️</div>
        </div>

        <div className="stat-card">
          <div>
            <p>Total Predicted</p>
            <h2>
              {foods.reduce(
                (sum, food) => sum + food.predicted,
                0
              )}
            </h2>
            <span className="neutral">
              Plates
            </span>
          </div>

          <div className="stat-icon">🤖</div>
        </div>

        <div className="stat-card">
          <div>
            <p>Total Actual Sales</p>
            <h2>
              {foods.reduce(
                (sum, food) => sum + food.actual,
                0
              )}
            </h2>
            <span className="neutral">
              Plates recorded
            </span>
          </div>

          <div className="stat-icon">📊</div>
        </div>

        <div className="stat-card">
          <div>
            <p>Total Waste</p>
            <h2>
              {foods.reduce(
                (sum, food) => sum + food.waste,
                0
              )}
            </h2>
            <span className="positive">
              Plates
            </span>
          </div>

          <div className="stat-icon">♻️</div>
        </div>

      </section>

      {/* Add Food */}
      <section className="panel add-food-panel">

        <div className="panel-header">
          <div>
            <h2>Add Food Item</h2>

            <p>
              Add a food item to today's canteen inventory.
            </p>
          </div>
        </div>

        <div className="food-input-row">

          <input
            type="text"
            placeholder="Food item name"
            value={foodName}
            onChange={(event) =>
              setFoodName(event.target.value)
            }
          />

          <input
            type="number"
            placeholder="Expected quantity"
            value={quantity}
            onChange={(event) =>
              setQuantity(event.target.value)
            }
          />

          <button
            className="add-food-button"
            onClick={addFood}
          >
            Add Food
          </button>

        </div>

      </section>

      {/* Food Table */}
      <section className="panel">

        <div className="panel-header">
          <div>
            <h2>Today's Food Inventory</h2>

            <p>
              Compare predicted demand with actual sales
              and waste.
            </p>
          </div>
        </div>

        <div className="table-wrapper">

          <table>

            <thead>
              <tr>
                <th>Food Item</th>
                <th>Predicted</th>
                <th>Recommended</th>
                <th>Actual Sales</th>
                <th>Waste</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {foods.map((food, index) => (
                <tr key={index}>

                  <td>
                    <strong>{food.name}</strong>
                  </td>

                  <td>
                    {food.predicted}
                  </td>

                  <td>
                    {food.recommended}
                  </td>

                  <td>
                    {food.actual}
                  </td>

                  <td>
                    {food.waste}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        food.status === "High Demand"
                          ? "high"
                          : food.status === "Low Demand"
                          ? "low"
                          : "normal"
                      }`}
                    >
                      {food.status}
                    </span>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}

export default FoodManagement;
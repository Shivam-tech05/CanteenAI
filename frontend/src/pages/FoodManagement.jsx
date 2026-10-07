import "../App.css";
import { useEffect, useState } from "react";

const defaultFoods = [
  { name: "Biryani", predicted: 152, recommended: 160, actual: 148, waste: 12, status: "High Demand" },
  { name: "Dosa", predicted: 110, recommended: 115, actual: 107, waste: 8, status: "Normal" },
  { name: "Rice", predicted: 78, recommended: 85, actual: 76, waste: 9, status: "Normal" },
  { name: "Sandwich", predicted: 55, recommended: 58, actual: 51, waste: 7, status: "Low Demand" },
  { name: "Poha", predicted: 70, recommended: 74, actual: 66, waste: 6, status: "Normal" },

  // Add your actual canteen items here.
  { name: "Idli", predicted: 90, recommended: 95, actual: 0, waste: 0, status: "Normal" },
  { name: "Vada", predicted: 80, recommended: 84, actual: 0, waste: 0, status: "Normal" },
  { name: "Samosa", predicted: 75, recommended: 79, actual: 0, waste: 0, status: "Normal" },
  { name: "Pav Bhaji", predicted: 85, recommended: 90, actual: 0, waste: 0, status: "Normal" },
  { name: "Chole Bhature", predicted: 65, recommended: 69, actual: 0, waste: 0, status: "Normal" },
];

function FoodManagement() {
  const [foods, setFoods] = useState(() => {
    const savedFoods = localStorage.getItem("canteenFoods");

    return savedFoods
      ? JSON.parse(savedFoods)
      : defaultFoods;
  });

  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "canteenFoods",
      JSON.stringify(foods)
    );
  }, [foods]);

  const addFood = () => {
    const cleanedName = foodName.trim();

    if (!cleanedName || !quantity) {
      return;
    }

    const alreadyExists = foods.some(
      (food) =>
        food.name.toLowerCase() ===
        cleanedName.toLowerCase()
    );

    if (alreadyExists) {
      alert("This food item already exists.");
      return;
    }

    const newFood = {
      name: cleanedName,
      predicted: Number(quantity),
      recommended: Number(quantity),
      actual: 0,
      waste: 0,
      status: "New",
    };

    setFoods((currentFoods) => [
      ...currentFoods,
      newFood,
    ]);

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
            <p>Total Planned</p>
            <h2>
              {foods.reduce(
                (sum, food) =>
                  sum + food.recommended,
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
            <p>Actual Sales</p>
            <h2>
              {foods.reduce(
                (sum, food) =>
                  sum + food.actual,
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
                (sum, food) =>
                  sum + food.waste,
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

      <section className="panel add-food-panel">

        <div className="panel-header">
          <div>
            <h2>Add Food Item</h2>

            <p>
              New items are saved locally and remain
              available when you change pages.
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
            min="1"
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

      <section className="panel">

        <div className="panel-header">
          <div>
            <h2>Today's Food Inventory</h2>

            <p>
              Compare planned quantities with actual
              sales and waste.
            </p>
          </div>
        </div>

        <div className="table-wrapper">

          <table>
            <thead>
              <tr>
                <th>Food Item</th>
                <th>Planned</th>
                <th>Recommended</th>
                <th>Actual Sales</th>
                <th>Waste</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {foods.map((food, index) => (
                <tr key={`${food.name}-${index}`}>

                  <td>
                    <strong>{food.name}</strong>
                  </td>

                  <td>{food.predicted}</td>

                  <td>{food.recommended}</td>

                  <td>{food.actual}</td>

                  <td>{food.waste}</td>

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
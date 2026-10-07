import json
from pathlib import Path

import numpy as np
import pandas as pd


# Project root:
# CanteenAI/
# ├── backend/
# │   └── app/
# │       └── predictor.py
# └── ml/
BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_DIR = BASE_DIR / "ml" / "models"

COEFFICIENTS_PATH = MODEL_DIR / "coefficients.npy"
FEATURE_COLUMNS_PATH = MODEL_DIR / "feature_columns.json"


def load_model():
    """
    Load the trained NumPy model and
    the feature-column structure.
    """

    if not COEFFICIENTS_PATH.exists():
        raise FileNotFoundError(
            f"Model file not found: {COEFFICIENTS_PATH}"
        )

    if not FEATURE_COLUMNS_PATH.exists():
        raise FileNotFoundError(
            f"Feature file not found: {FEATURE_COLUMNS_PATH}"
        )

    coefficients = np.load(COEFFICIENTS_PATH)

    with open(FEATURE_COLUMNS_PATH, "r") as file:
        feature_columns = json.load(file)

    return coefficients, feature_columns


def predict_demand(
    day_of_week: str,
    food_item: str,
    temperature: float,
    rainfall: float,
    is_holiday: int,
    event: str,
    previous_day_sales: float,
    previous_week_avg_sales: float,
):
    """
    Generate a food-demand prediction.
    """

    coefficients, feature_columns = load_model()

    # Create one input record
    input_data = pd.DataFrame(
        [
            {
                "day_of_week": day_of_week,
                "food_item": food_item,
                "temperature": temperature,
                "rainfall": rainfall,
                "is_holiday": is_holiday,
                "event": event,
                "previous_day_sales": previous_day_sales,
                "previous_week_avg_sales": previous_week_avg_sales,
            }
        ]
    )

    # Match the same preprocessing used during training
    input_data = pd.get_dummies(
        input_data,
        columns=[
            "day_of_week",
            "food_item",
            "event",
        ],
        dtype=float,
    )

    # Make sure columns exactly match training columns
    input_data = input_data.reindex(
        columns=feature_columns,
        fill_value=0,
    )

    # Add intercept
    X = np.column_stack(
        [
            np.ones(len(input_data)),
            input_data.values,
        ]
    )

    # Linear regression prediction
    prediction = float((X @ coefficients).item())

    # Demand cannot be negative
    prediction = max(0, prediction)

    predicted_demand = round(prediction)

    # Add a small safety buffer
    recommended_quantity = int(
        np.ceil(predicted_demand * 1.05)
    )

    expected_waste = max(
        recommended_quantity - predicted_demand,
        0,
    )

    # Simple confidence indicator for UI.
    # We will later replace this with a proper
    # model-based uncertainty metric.
    confidence = 90

    return {
        "predicted_demand": predicted_demand,
        "recommended_quantity": recommended_quantity,
        "expected_waste": expected_waste,
        "confidence": confidence,
    }
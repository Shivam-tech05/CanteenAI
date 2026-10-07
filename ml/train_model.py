import os
import json
import numpy as np
import pandas as pd


# --------------------------------
# 1. Load dataset
# --------------------------------

data_path = "ml/data/canteen_sales.csv"

df = pd.read_csv(data_path)

print("Dataset loaded successfully.")
print(f"Dataset shape: {df.shape}")


# --------------------------------
# 2. Select features and target
# --------------------------------

features = [
    "day_of_week",
    "food_item",
    "temperature",
    "rainfall",
    "is_holiday",
    "event",
    "previous_day_sales",
    "previous_week_avg_sales"
]

target = "actual_sales"

data = df[features + [target]].copy()


# --------------------------------
# 3. Convert categorical data
# --------------------------------

categorical_columns = [
    "day_of_week",
    "food_item",
    "event"
]

data = pd.get_dummies(
    data,
    columns=categorical_columns,
    dtype=float
)


# --------------------------------
# 4. Separate X and y
# --------------------------------

X = data.drop(columns=[target]).values
y = data[target].values


# --------------------------------
# 5. Add intercept column
# --------------------------------

X = np.column_stack(
    [np.ones(len(X)), X]
)


# --------------------------------
# 6. Train/Test Split
# --------------------------------

np.random.seed(42)

indices = np.arange(len(X))
np.random.shuffle(indices)

split_index = int(len(X) * 0.80)

train_indices = indices[:split_index]
test_indices = indices[split_index:]

X_train = X[train_indices]
X_test = X[test_indices]

y_train = y[train_indices]
y_test = y[test_indices]


# --------------------------------
# 7. Train Linear Regression
# --------------------------------

print("\nTraining Linear Regression model...")

coefficients, _, _, _ = np.linalg.lstsq(
    X_train,
    y_train,
    rcond=None
)

print("Training completed.")


# --------------------------------
# 8. Predictions
# --------------------------------

predictions = X_test @ coefficients


# --------------------------------
# 9. Evaluation
# --------------------------------

errors = y_test - predictions

mae = np.mean(np.abs(errors))

rmse = np.sqrt(
    np.mean(errors ** 2)
)

ss_res = np.sum(
    errors ** 2
)

ss_tot = np.sum(
    (y_test - np.mean(y_test)) ** 2
)

r2 = 1 - (ss_res / ss_tot)


print("\n========== MODEL EVALUATION ==========")

print(f"MAE  : {mae:.2f}")
print(f"RMSE : {rmse:.2f}")
print(f"R²   : {r2:.4f}")

print("======================================")


# --------------------------------
# 10. Save model
# --------------------------------

model_directory = "ml/models"

os.makedirs(
    model_directory,
    exist_ok=True
)

# Column names used during training
feature_columns = list(
    data.drop(columns=[target]).columns
)

# Save coefficients
np.save(
    "ml/models/coefficients.npy",
    coefficients
)

# Save feature column names
with open(
    "ml/models/feature_columns.json",
    "w"
) as file:
    json.dump(
        feature_columns,
        file,
        indent=4
    )


print("\nModel saved successfully!")

print("Files created:")
print("ml/models/coefficients.npy")
print("ml/models/feature_columns.json")
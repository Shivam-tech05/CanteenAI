import os
import numpy as np
import pandas as pd

# Same results every time we run the program
np.random.seed(42)

# Base demand for each food item
food_items = {
    "Biryani": 150,
    "Dosa": 110,
    "Rice": 80,
    "Sandwich": 55,
    "Poha": 70,
}

# Generate 180 days of data
dates = pd.date_range(
    start="2025-01-01",
    periods=180,
    freq="D"
)

rows = []

# Store previous sales for each food item
previous_sales = {
    food: base
    for food, base in food_items.items()
}

for date in dates:

    day_name = date.day_name()

    for food, base_demand in food_items.items():

        # -----------------------------
        # Weather
        # -----------------------------
        temperature = np.random.randint(20, 36)

        rainfall = np.random.choice(
            [0, 2, 5, 10, 20, 30],
            p=[0.45, 0.15, 0.12, 0.10, 0.10, 0.08]
        )

        # -----------------------------
        # Holiday
        # -----------------------------
        is_holiday = np.random.choice(
            [0, 1],
            p=[0.90, 0.10]
        )

        # -----------------------------
        # College event
        # -----------------------------
        event = np.random.choice(
            ["Normal", "Exam", "Festival"],
            p=[0.75, 0.15, 0.10]
        )

        # -----------------------------
        # Day effect
        # -----------------------------
        day_factor = 1.0

        if day_name in ["Saturday", "Sunday"]:
            day_factor *= 0.55

        if day_name == "Monday":
            day_factor *= 1.08

        # Holiday reduces demand
        if is_holiday == 1:
            day_factor *= 0.35

        # -----------------------------
        # Weather effect
        # -----------------------------
        weather_factor = 1.0

        if rainfall > 15:
            weather_factor *= 0.90
        elif rainfall > 5:
            weather_factor *= 0.95

        # -----------------------------
        # Event effect
        # -----------------------------
        event_factor = 1.0

        if event == "Festival":
            event_factor = 1.20
        elif event == "Exam":
            event_factor = 0.92

        # -----------------------------
        # Generate sales
        # -----------------------------
        demand = (
            base_demand
            * day_factor
            * weather_factor
            * event_factor
            + np.random.normal(0, 8)
        )

        actual_sales = max(
            10,
            int(round(demand))
        )

        # Previous day's sales
        previous_day_sales = previous_sales[food]

        # Update previous sales
        previous_sales[food] = actual_sales

        rows.append({
            "date": date.strftime("%Y-%m-%d"),
            "day_of_week": day_name,
            "food_item": food,
            "temperature": temperature,
            "rainfall": rainfall,
            "is_holiday": is_holiday,
            "event": event,
            "previous_day_sales": previous_day_sales,
            "actual_sales": actual_sales,
        })


# Convert to DataFrame
df = pd.DataFrame(rows)


# Previous 7-day average sales
df["previous_week_avg_sales"] = (
    df.groupby("food_item")["actual_sales"]
    .transform(
        lambda x: x.shift(1).rolling(
            7,
            min_periods=1
        ).mean()
    )
)


# Fill missing values at the beginning
df["previous_week_avg_sales"] = (
    df["previous_week_avg_sales"]
    .fillna(df["previous_day_sales"])
)


# Create data folder if it doesn't exist
output_directory = "ml/data"

os.makedirs(
    output_directory,
    exist_ok=True
)


# Save CSV
output_file = os.path.join(
    output_directory,
    "canteen_sales.csv"
)

df.to_csv(
    output_file,
    index=False
)


print("===================================")
print("Canteen Dataset Created Successfully")
print("===================================")

print(f"Rows    : {len(df)}")
print(f"Columns : {len(df.columns)}")

print(f"\nSaved to:")
print(output_file)

print("\nFood Items:")
print(df["food_item"].unique())

print("\nFirst 5 Records:")
print(df.head())
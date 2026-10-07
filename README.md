# CanteenAI

## AI-Based Food Demand Prediction and Waste Reduction System for College Canteens

CanteenAI is an AI-powered college canteen management system designed to predict food demand, recommend preparation quantities, and help reduce food wastage.

The system combines a React dashboard with a Python FastAPI backend and a NumPy/Pandas-based machine learning pipeline.

---

## Problem Statement

College canteens often prepare food based on estimates or previous experience. This can result in:

- Over-preparation and food wastage
- Under-preparation and food shortages
- Difficulty in tracking demand patterns
- Lack of data-driven preparation decisions

CanteenAI aims to provide a data-driven solution for these problems.

---

## Objectives

- Predict food demand using historical canteen data
- Recommend suitable food preparation quantities
- Monitor food sales and wastage
- Analyze food-wise waste patterns
- Provide operational recommendations
- Present all information through a centralized dashboard

---

## Key Features

### Dashboard
Provides an overview of predicted demand, waste, system performance, and alerts.

### Demand Prediction
Uses Python-based machine learning to predict expected food demand based on:

- Food item
- Day of week
- Temperature
- Rainfall
- Holiday status
- College events
- Previous sales
- Recent average sales

### Food Management
Tracks predicted demand, recommended preparation, actual sales, and waste.

### Waste Analytics
Provides food-wise waste analysis, waste rate, trends, and recommendations.

### Reports
Displays demand and waste summaries and allows report data to be exported as CSV.

### Settings
Provides basic system preferences and project information.

---

## System Architecture

```text
                         CanteenAI
                             |
                +------------+------------+
                |                         |
             Frontend                  Backend
             React                    FastAPI
                |                         |
                |                    Python API
                |                         |
                +------------+------------+
                             |
                         ML Engine
                             |
                      Pandas + NumPy
                             |
                      Demand Prediction
                             |
                       Canteen Dataset
```

---

## Technology Stack

### Frontend

- React
- Vite
- React Router
- CSS

### Backend

- Python
- FastAPI
- Uvicorn
- Pydantic

### Data and Machine Learning

- Pandas
- NumPy
- Linear Regression
- Feature Engineering

### Development

- Git
- GitHub
- Visual Studio Code

---

## Project Structure

```text
CanteenAI/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   └── predictor.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DemandPrediction.jsx
│   │   │   ├── FoodManagement.jsx
│   │   │   ├── WasteAnalytics.jsx
│   │   │   ├── Reports.jsx
│   │   │   └── Settings.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
│
├── ml/
│   ├── data/
│   │   └── canteen_sales.csv
│   ├── models/
│   │   ├── coefficients.npy
│   │   └── feature_columns.json
│   ├── dataset.py
│   └── train_model.py
│
├── tests/
├── docs/
├── .gitignore
└── README.md
```

---

## Machine Learning Workflow

```text
Canteen Sales Data
        ↓
Data Generation / Collection
        ↓
Data Preprocessing
        ↓
Feature Engineering
        ↓
Train/Test Split
        ↓
Linear Regression
        ↓
Model Evaluation
        ↓
Demand Prediction
        ↓
Recommended Preparation Quantity
```

### Input Features

- Day of week
- Food item
- Temperature
- Rainfall
- Holiday status
- College event
- Previous day sales
- Previous week average sales

### Target

`actual_sales`

The model predicts the expected number of food plates that may be sold.

---

## Dataset

The current project uses a synthetic canteen sales dataset generated with Python because real college canteen transaction data is not available for the project.

The dataset contains information such as:

- Date
- Day of week
- Food item
- Temperature
- Rainfall
- Holiday status
- College event
- Previous day sales
- Previous week average sales
- Actual sales

The dataset is generated using `ml/dataset.py` and saved as:

```text
ml/data/canteen_sales.csv
```

---

## API

The Python backend exposes REST API endpoints for the application.

### Health Check

```text
GET /health
```

### Demand Prediction

```text
POST /predict
```

### Example Request

```json
{
  "day_of_week": "Wednesday",
  "food_item": "Biryani",
  "temperature": 29,
  "rainfall": 5,
  "is_holiday": 0,
  "event": "Normal",
  "previous_day_sales": 140,
  "previous_week_avg_sales": 138
}
```

### Example Response

```json
{
  "success": true,
  "food_item": "Biryani",
  "predicted_demand": 150,
  "recommended_quantity": 158,
  "expected_waste": 8,
  "confidence": 90
}
```

> The exact prediction values depend on the trained model and input data.

---

## How to Run

### 1. Clone the Repository

```powershell
git clone <your-github-repository-url>
cd CanteenAI
```

### 2. Create and Activate Python Virtual Environment

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 3. Install Backend Dependencies

```powershell
pip install -r backend\requirements.txt
```

### 4. Generate Dataset

From the project root:

```powershell
python ml\dataset.py
```

### 5. Train the Model

```powershell
python ml\train_model.py
```

### 6. Start the FastAPI Backend

```powershell
python -m uvicorn backend.app.main:app --reload
```

Backend documentation is available at:

```text
http://127.0.0.1:8000/docs
```

### 7. Start the Frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## Current Project Status

The current version includes:

- Responsive dashboard
- React navigation
- Demand prediction interface
- Python FastAPI prediction service
- NumPy/Pandas-based demand prediction model
- Food management module
- Waste analytics module
- Reports module with CSV export
- Settings module
- Git and GitHub version control

---

## Future Scope

- PostgreSQL database integration
- Real-time canteen sales collection
- Weather API integration
- Progressive Web App (PWA) or dedicated mobile application
- User authentication and role management
- Improved machine learning models
- Automatic model retraining
- Advanced analytics and forecasting
- Real-time notifications and alerts

---

## Team

Developed as a college AIML mini project.

Add your team members and roll numbers here before final submission.

Example:

```text
Name - Roll Number
Name - Roll Number
Name - Roll Number
```

---

## License

This project is developed for educational purposes.

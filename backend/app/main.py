from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .predictor import predict_demand


app = FastAPI(
    title="CanteenAI API",
    description=(
        "AI-Based Food Demand Prediction and "
        "Waste Reduction System"
    ),
    version="1.0.0",
)


# Allow React frontend to communicate with Python backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictionRequest(BaseModel):
    day_of_week: str
    food_item: str

    temperature: float = Field(
        ge=-10,
        le=60,
    )

    rainfall: float = Field(
        ge=0,
    )

    is_holiday: int = Field(
        ge=0,
        le=1,
    )

    event: str

    previous_day_sales: float = Field(
        ge=0,
    )

    previous_week_avg_sales: float = Field(
        ge=0,
    )


@app.get("/")
def home():
    return {
        "message": "Welcome to CanteenAI API",
        "status": "running",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
    }


@app.post("/predict")
def predict(request: PredictionRequest):
    result = predict_demand(
        day_of_week=request.day_of_week,
        food_item=request.food_item,
        temperature=request.temperature,
        rainfall=request.rainfall,
        is_holiday=request.is_holiday,
        event=request.event,
        previous_day_sales=request.previous_day_sales,
        previous_week_avg_sales=request.previous_week_avg_sales,
    )

    return {
        "success": True,
        "food_item": request.food_item,
        **result,
    }
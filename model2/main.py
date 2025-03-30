from fastapi import FastAPI
import pickle
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from pydantic import BaseModel

# Load the trained model and scalers
model = pickle.load(open('model.pkl', 'rb'))
minmax_scaler = pickle.load(open('minmaxscaler.pkl', 'rb'))
standard_scaler = pickle.load(open('standardscaler.pkl', 'rb'))

# Initialize FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "" with ["http://localhost:3000"] for stricter security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Define input data format
class CropInput(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

# Crop dictionary (mapping numbers to crop names)
df_dict = {
    'rice': 1, 'maize': 2, 'chickpea': 3, 'kidneybeans': 4, 'pigeonpeas': 5,
    'mothbeans': 6, 'mungbean': 7, 'blackgram': 8, 'lentil': 9, 'pomegranate': 10,
    'banana': 11, 'mango': 12, 'grapes': 13, 'watermelon': 14, 'muskmelon': 15,
    'apple': 16, 'orange': 17, 'papaya': 18, 'coconut': 19, 'cotton': 20,
    'jute': 21, 'coffee': 22
}

reverse_df_dict = {value: key for key, value in df_dict.items()}

# Prediction endpoint
@app.post("/predict")
def predict_crop(data: CropInput):
    # Convert input data to numpy array
    input_data = np.array([[data.N, data.P, data.K, data.temperature, data.humidity, data.ph, data.rainfall]])

    # Apply scaling
    input_data = minmax_scaler.transform(input_data)
    input_data = standard_scaler.transform(input_data)

    # Get probability scores for all crops
    probabilities = model.predict_proba(input_data)[0]  # Get probability for each crop

    # Sort crops by probability (descending order) and get the top 3-5 crops
    top_crops = np.argsort(probabilities)[::-1][:5]  # Get indices of top 5 crops

    # Convert crop indices back to crop names
    recommended_crops = [reverse_df_dict.get(int(idx + 1), "Unknown Crop") for idx in top_crops]  # Adjust index

    return {"recommended_crops": recommended_crops}

# Root endpoint
@app.get("/")
def home():
    return {"message": "Crop Recommendation API is running!"}
# Project README

## Overview
This project consists of four main components:
1. **Frontend (React)**
2. **Backend (Node.js/Express)**
3. **Model1 (FastAPI - Plant Leaf Prediction)**
4. **Model2 (FastAPI - Crop Recommendation System)**



---
## Frontend (React)
### Features:
- User login/sign-in functionality.
- Plant leaf disease prediction using a drag-and-drop feature integrated with Model1.
- Suggests suitable crops to grow based on environmental parameters (Model2).
- Payment section with Razorpay integration.
- Users can pay to get 50+ additional requests along with Model2.

### Commands to Run:
```sh
npm install
npm start
```



---
## Backend (Node.js/Express)
### Features:
- Acts as a bridge between the frontend and models.
- Handles user authentication via JWT.
- Manages API key verification for secured access.
- Includes payment and prediction endpoints for integration with the frontend.

### Commands to Run:
```sh
npm install
npm start
```



---
## Model1 (FastAPI - Plant Leaf Prediction)
### Features:
- Uses a CNN model to classify leaf images as healthy or unhealthy.
- Integrates the Gemini API, which provides solutions if a crop is found unhealthy.

### Commands to Run:
```sh
pip install fastapi uvicorn numpy pillow python-multipart
pip install scikit-learn
pip install -q -U google-genai
python -m uvicorn app:app --host 0.0.0.0 --port 8000
```



---
## Model2 (FastAPI - Crop Recommendation System)
### Features:
- Machine learning model (Random Forest Classifier) trained on soil and environmental data.
- Helps farmers choose the best crop based on nitrogen, phosphorus, potassium, temperature, humidity, pH, and rainfall.
- Built using Python, Pandas, NumPy, and Scikit-learn.

### Commands to Run:
```sh
python -m venv myenv
myenv\Scripts\activate  # On Windows
source myenv/bin/activate  # On macOS/Linux
pip install fastapi uvicorn numpy scikit-learn pydantic
python -m uvicorn main:app --host 0.0.0.0 --port 8001 --reload
```



---
## Environment Configuration (Backend - `conf.env`)
Inside `backend/`, create a `.env` file and add the following:
```
DATABASE_URI=
PORT=
JWT_SECRET=
API_KEY_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```


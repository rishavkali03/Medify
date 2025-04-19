# 🚑 Medify+ – Your AI-Powered Health Assistant

Medify+ is an AI-driven health assistant designed to provide **early disease detection**, **emergency support**, and **quick health checkups** using machine learning, voice input, and image analysis.

---

## 📌 Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [How to Use](#how-to-use)
- [Architecture](#architecture)
- [Demo Video](#demo-video)
- [Team](#team)
- [License](#license)

---

## 🔍 Introduction

Medify+ addresses the need for quick, accessible healthcare solutions, particularly in underserved regions. It provides a platform where users can:
- Perform health checkups using forms, voice, or images
- Receive AI predictions for diseases like diabetes, heart disease, and skin conditions
- Trigger emergency responses based on their location

Built for [Hackathon Name] under the theme **"Healthcare Accessibility through Technology."**

---

## ✨ Features

- 🧠 **AI-Powered Diagnosis** – Predicts diseases based on user input and images
- 🎤 **Voice-enabled Chatbot** – Converses and provides suggestions using natural speech
- 🖼️ **Image-based Skin Analysis** – Upload photos for skin condition analysis
- 📍 **Emergency SOS** – Sends alerts to local authorities with location information
- 🔐 **Authentication** – Secure login and protection of health data

---

## 🛠️ Tech Stack

### 🔹 Frontend
- **React** – Frontend framework
- **TailwindCSS** – Utility-first CSS framework
- **Axios** – For API calls
- **Web Speech API** – For voice input and output

### 🔹 Backend
- **FastAPI** – Python framework for building APIs
- **Python ML Models** – Using libraries like scikit-learn, TensorFlow for predictions
- **MongoDB** – Database for storing user data
- **JWT** – JSON Web Tokens for authentication and session management

### 🔹 Machine Learning Models
- **Disease Prediction Models** – Diabetes and Heart Disease prediction (sklearn models)
- **Skin Disease Detection** – Image-based prediction using Convolutional Neural Networks (CNN)

### 🔹 Deployment
- **Frontend**: Netlify / Vercel
- **Backend**: Render / Railway

---

## 🧰 Setup Instructions

### 🔗 Clone the Repo

```bash
git clone https://github.com/yourusername/medifyplus
cd medifyplus
```
⚙️ Backend Setup
1. Go to the backend folder:
```bash
cd backend
```
2. Install dependencies:
```bash
pip install -r requirements.txt
```
3. Set up environment variables.
```bash
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
```
4. Run the FastAPI server:
```bash
uvicorn main:app --reload
```
🖥️ Frontend Setup
Go to the frontend folder:

```bash
cd frontend
Install dependencies:
```
```bash
npm install
Start the React app:
```
```bash
npm start
```
Now, visit http://localhost:5173 to access the app.

### 🧪 How to Use
1. **Sign Up / Login** – Register a new account or log into an existing one.
2. **Quick Health Checkup** – Choose a disease (e.g., Diabetes, Heart Disease) and fill out the form or upload an image.

3. **Chatbot** – Interact with the voice-enabled chatbot for health advice or information.

4. **SOS Button** – Trigger an emergency alert, sending your location to authorities.

View the results and health recommendations.

### 🧱 Architecture
(image hobe akta)

### 🎥 Demo Video
Watch our demo video showcasing the features of Medify+ in action:

Watch on YouTube
# MentalHealthDetectionbyVoiceText
# 🧠 MindSense

**AI-powered mental health insight through voice and text analysis**

MindSense is a full-stack, production-ready AI application designed to detect early signs of depression, anxiety, or other emotional distress using **multimodal analysis** of both voice and text inputs. This tool empowers users with real-time feedback on their emotional state, promoting early awareness and well-being.

---

## 🌟 Features

### 🎙 Voice Analysis Module
- Accepts `.wav` files or real-time microphone input.
- Uses `librosa` for audio feature extraction: MFCC, chroma, spectral contrast.
- Integrates a pre-trained CNN/LSTM-based audio emotion classifier.
- Displays probabilities for emotional states: Happy, Sad, Angry, Neutral.

### 📝 Text Emotion & Sentiment Module
- Accepts typed or pasted text.
- Uses transformer-based NLP models (e.g., BERT fine-tuned on GoEmotions or DAIC-WOZ).
- Detects emotional tones and mental health risk indicators.
- Visualizes emotion output using radar or bar charts.

### 🔁 Multimodal Fusion Layer
- Combines voice and text predictions to form a unified emotional profile.
- Detects conflicting signals (e.g., anxious voice with calm text).
- Generates a mental health risk score and visual alerts if thresholds are exceeded.

### 📊 Interactive Dashboard
- Built using **Streamlit** (or Flask backend + React frontend).
- Features a calming pastel UI/UX design.
- Displays:
  - Real-time feedback
  - Historical emotional trends
  - Emotion Diary
  - Safe, empathetic encouragement messages

### 🔐 Privacy & Security
- Local-first data processing with optional opt-in data sharing.
- AES-encrypted storage for any saved data.
- Disclaimers included: *This is not a diagnostic tool.*

### 🧠 Optional Enhancements
- Empathetic AI chatbot for conversations.
- Panic mode with emergency helplines and calming exercises.
- Auth system for personalized emotion tracking.

---

## 🛠 Tech Stack

| Layer        | Tools Used |
|--------------|-------------|
| **Backend**  | Python, FastAPI / Flask |
| **Frontend** | Streamlit / React.js |
| **AI/ML**    | `transformers`, `librosa`, `scikit-learn`, Hugging Face models |
| **Visualization** | `matplotlib`, `plotly`, `seaborn` |
| **Storage**  | SQLite or Firebase |
| **Audio**    | `pyaudio`, `soundfile` |
| **Containerization** | Docker |
| **Security** | AES encryption |

---

# 🚀 Getting Started

## Create a Virtual Environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate


## Install Dependencies
pip install -r requirements.txt


## Run the App (Streamlit version)
streamlit run app.py


## 📸 Screenshots
![image](https://github.com/user-attachments/assets/d2bd4c68-6351-45d0-8802-d10453ce44da)
![image](https://github.com/user-attachments/assets/a03f0cf0-5d53-498a-97e1-ba80166e02f2)


## 📦 Docker Support
To build and run the app with Docker:
docker build -t mindsense-app .
docker run -p 8501:8501 mindsense-app


## 📘 Datasets Used
GoEmotions by Google

DAIC-WOZ

RAVDESS or similar emotional audio datasets

## ⚠️ Disclaimer
MindSense is not a medical diagnostic tool. It is meant for early emotional awareness and support. Always consult a professional for clinical advice.

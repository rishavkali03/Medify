import os
import uuid
import shutil
from datetime import datetime
from dotenv import load_dotenv
from groq import Groq
import pyttsx3
import speech_recognition as sr
from pydub import AudioSegment
from fastapi import UploadFile

# Load all environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

client = Groq(api_key=GROQ_API_KEY)
tts = pyttsx3.init()

UPLOAD_DIR = "uploads"
RESPONSE_DIR = "responses"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(RESPONSE_DIR, exist_ok=True)

chat_history = []

def analyze(query_text: str):
    global chat_history

    include_previous = query_text.lower().startswith("previous")

    if include_previous:
        query_text = query_text[len("previous"):].strip()
        previous_context = "\n\n".join([f"Q: {q}\nA: {a}" for q, a in chat_history[-3:]])
        system_prompt = (
            "You are a kind and empathetic medical assistant. Here's the previous conversation:\n"
            f"{previous_context}\n\nContinue helping the user based on their new input. "
            "Be supportive, use phrases like 'Don't worry', 'Take care', and 'It's good that you shared this'."
        )
    else:
        system_prompt = (
            "You are a kind, experienced medical assistant. Respond supportively and clearly, using phrases like "
            "'Don't worry', 'Take care', and 'Thank you for sharing that'. Focus on helping the user feel reassured and informed."
        )

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": query_text},
    ]

    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=messages,
        temperature=0.6,
        max_tokens=1024,
        top_p=1,
    )

    result = response.choices[0].message.content
    chat_history.append((query_text, result))
    return result

def speech_to_text(file_location: str):
    recognizer = sr.Recognizer()
    with sr.AudioFile(file_location) as source:
        audio_data = recognizer.record(source)
        try:
            return recognizer.recognize_google(audio_data)
        except sr.UnknownValueError:
            return None
        except sr.RequestError as e:
            return f"Speech recognition service error: {e}"

def text_to_speech(text: str):
    unique_id = uuid.uuid4().hex
    audio_filename = f"{unique_id}_response.mp3"
    full_path = os.path.join(RESPONSE_DIR, audio_filename)
    tts.save_to_file(text, full_path)
    tts.runAndWait()
    return full_path, f"/responses/{audio_filename}"

# ✅ New: Save and convert uploaded audio to WAV format
def save_and_convert_audio(upload: UploadFile) -> tuple[dict, str]:
    ext = upload.filename.split('.')[-1]
    raw_filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_input.{ext}"
    raw_path = os.path.join(UPLOAD_DIR, raw_filename)

    with open(raw_path, "wb") as buffer:
        shutil.copyfileobj(upload.file, buffer)

    # Convert to WAV using pydub
    audio = AudioSegment.from_file(raw_path)
    wav_filename = raw_filename.replace(f".{ext}", ".wav")
    wav_path = os.path.join(UPLOAD_DIR, wav_filename)
    audio.export(wav_path, format="wav")

    return {"url": f"/uploads/{wav_filename}"}, wav_path

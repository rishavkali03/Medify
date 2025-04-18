import logging
import speech_recognition as sr
from pydub import AudioSegment
from io import BytesIO
import os
from groq import Groq

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def record_audio(file_path, timeout=20, phrase_time_limit=None):
    recognizer = sr.Recognizer()
    
    try:
        with sr.Microphone() as source:
            logging.info("Adjusting for ambient noise...")
            recognizer.adjust_for_ambient_noise(source, duration=1)
            logging.info("Start speaking now...")
            
            audio_data = recognizer.listen(source, timeout=timeout, phrase_time_limit=phrase_time_limit)
            logging.info("Recording complete.")
            
            wav_data = audio_data.get_wav_data()
            audio_segment = AudioSegment.from_wav(BytesIO(wav_data))
            
            # Ensure the file is saved in the correct format (MP3)
            audio_segment.export(file_path, format="mp3", bitrate="128k")
            
            logging.info(f"Audio saved to {file_path}")
    except Exception as e:
        logging.error(f"An error occurred while recording: {e}")

def transcribe_with_groq(stt_model, audio_filepath, GROQ_API_KEY):
    try:
        # Ensure GROQ_API_KEY is set
        if not GROQ_API_KEY:
            raise ValueError("GROQ_API_KEY is not set. Please set it in your environment.")
        
        client = Groq(api_key=GROQ_API_KEY)

        # Open the file and perform transcription using Groq's STT API
        with open(audio_filepath, "rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                model=stt_model,
                file=audio_file,
                language="en"
            )

        return transcription.text

    except Exception as e:
        logging.error(f"Error during transcription: {e}")
        return None


# Configuration and function calls
audio_filepath = "patient_voice_test_for_patient.mp3"
stt_model = "whisper-large-v3"  # Assuming you are using this model for transcription
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")

# Ensure API key is available
if not GROQ_API_KEY:
    logging.error("GROQ_API_KEY not found. Make sure it's set in your environment.")
else:
    # Step-by-step execution
    record_audio(file_path=audio_filepath)
    
    transcription_text = transcribe_with_groq(stt_model, audio_filepath, GROQ_API_KEY)
    
    if transcription_text:
        logging.info(f"Patient said: {transcription_text}")
    else:
        logging.error("Failed to transcribe the patient's voice input.")



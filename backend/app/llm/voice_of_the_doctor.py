import speech_recognition as sr
import pyttsx3
from brain_of_the_doctor import analyze

# Initialize recognizer and text-to-speech engine
recognizer = sr.Recognizer()
tts = pyttsx3.init()

# Set voice properties (optional)
voices = tts.getProperty('voices')
tts.setProperty('voice', voices[1].id)  # Change index to try different voices
tts.setProperty('rate', 165)  # Adjust speaking speed

def speak(text):
    print("🩺 Doctor says:", text)
    tts.say(text)
    tts.runAndWait()

def listen():
    with sr.Microphone() as source:
        print("\n🎙️ Listening... Speak your symptoms or question.")
        recognizer.adjust_for_ambient_noise(source, duration=1)
        audio = recognizer.listen(source)

        try:
            print("🧠 Recognizing...")
            query = recognizer.recognize_google(audio)
            print("You said:", query)
            return query
        except sr.UnknownValueError:
            speak("Sorry, I didn’t catch that. Please try again.")
            return None
        except sr.RequestError:
            speak("Sorry, I’m having trouble accessing the recognition service.")
            return None

# Main loop
if __name__ == "__main__":
    print("🎧 Voice of the Doctor is active!")
    print("Say 'previous' before your sentence to include context from earlier.")
    print("Say 'exit' anytime to quit.\n")

    while True:
        user_input = listen()

        if user_input:
            if user_input.lower() in ["exit", "quit", "bye"]:
                speak("Take care! Wishing you good health.")
                break

            # Analyze user input using the brain
            response = analyze(user_input)

            # Speak the response
            speak(response)


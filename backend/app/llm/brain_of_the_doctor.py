from groq import Groq
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Initialize the Groq client
client = Groq(api_key=GROQ_API_KEY)

# Memory to store last query and answer
chat_history = []

# Analyze function
def analyze(query_text):
    global chat_history

    include_previous = query_text.lower().startswith("previous")
    
    if include_previous:
        query_text = query_text[len("previous"):].strip()
        previous_context = "\n\n".join(
            [f"Q: {q}\nA: {a}" for q, a in chat_history[-3:]])
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

    # Save to history
    chat_history.append((query_text, result))

    return result

# Command-line use
if __name__ == "__main__":
    print("🧠 Brain of the Doctor is ready. Type your query.")
    print("👉 To include previous context, start with: previous")
    print("Type 'exit' to quit.\n")

    while True:
        query = input("You: ")
        if query.lower() in ['exit', 'quit']:
            break

        reply = analyze(query)
        print("\n🩺 Doctor:\n", reply)
        print("-" * 50)



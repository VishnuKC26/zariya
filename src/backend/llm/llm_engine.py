import ollama

def stream_mistral_response(prompt: str):
    response = ollama.chat(
        model="mistral",
        messages=[{"role": "user", "content": prompt}],
        stream=True,
    )
    for chunk in response:
        yield chunk['message']['content']
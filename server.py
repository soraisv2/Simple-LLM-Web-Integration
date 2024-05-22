from flask import Flask, request, jsonify
from transformers import GPTNeoForCausalLM, AutoTokenizer

app = Flask(__name__)

# model and tokenizer Loading
model_name = "EleutherAI/gpt-neo-125M"
# model_name = "microsoft/MiniLM-L12-H384-uncased"
model = GPTNeoForCausalLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

@app.route('/generate', methods=['POST'])
def generate_text():
    # Get the input text from the request
    input_data = request.json
    input_text = input_data.get('input_text', '')
    
    if not input_text:
        return jsonify({'error': 'No input text provided'}), 400
    
    # Tokenize the input text
    inputs = tokenizer(input_text, return_tensors="pt")
    
    # Generate text
    outputs = model.generate(inputs.input_ids, max_length=50, do_sample=True, temperature=0.7)
    
    # Decode the generated text
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    # Return the generated text as a JSON response
    return jsonify({'generated_text': generated_text})

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

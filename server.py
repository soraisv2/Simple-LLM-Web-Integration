from flask import Flask, request, jsonify
from transformers import GPTNeoForCausalLM, AutoTokenizer, GPT2LMHeadModel, GPT2Tokenizer
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# NEO GPT
# model_name = "EleutherAI/gpt-neo-125M"
# model = GPTNeoForCausalLM.from_pretrained(model_name)
# tokenizer = AutoTokenizer.from_pretrained(model_name)

# GPT 2
model_name = "gpt2"
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

tokenizer.pad_token_id = tokenizer.eos_token_id

@app.route('/generate', methods=['POST'])
def generate_text():
    input_data = request.json
    input_text = input_data.get('input_text', '')

    if not input_text:
        return jsonify({'error': 'No input text provided'}), 400

    inputs = tokenizer(input_text, return_tensors="pt", padding=True, truncation=True)

    outputs = model.generate(
        inputs.input_ids,
        attention_mask=inputs.attention_mask,
        max_length=50,
        do_sample=True,
        temperature=0.7,
        pad_token_id=tokenizer.eos_token_id
    )

    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return jsonify({'generated_text': generated_text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
import os
from flask import Flask, request, jsonify
from transformers import GPTNeoForCausalLM, AutoTokenizer, GPT2LMHeadModel, GPT2Tokenizer
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

# Initialiser le client OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Charger les modèles et les tokenizers
model_gpt2 = GPT2LMHeadModel.from_pretrained("gpt2")
tokenizer_gpt2 = GPT2Tokenizer.from_pretrained("gpt2")
tokenizer_gpt2.pad_token_id = tokenizer_gpt2.eos_token_id

model_gpt_neo = GPTNeoForCausalLM.from_pretrained("EleutherAI/gpt-neo-125M")
tokenizer_gpt_neo = AutoTokenizer.from_pretrained("EleutherAI/gpt-neo-125M")
tokenizer_gpt_neo.pad_token_id = tokenizer_gpt_neo.eos_token_id

@app.route('/generate', methods=['POST'])
def generate_text():
    input_data = request.json
    input_text = input_data.get('input_text', '')
    selected_model = input_data.get('model', '')

    if not input_text:
        return jsonify({'error': 'No input text provided'}), 400

    if selected_model == 'gpt2':
        model = model_gpt2
        tokenizer = tokenizer_gpt2
    elif selected_model == 'gpt-neo':
        model = model_gpt_neo
        tokenizer = tokenizer_gpt_neo
    elif selected_model == 'gpt3':
        response = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": input_text,
                }
            ],
            model="gpt-3.5-turbo",
        )
        str_res = str(response)
        start_index = str_res.find("content=") + len("content=\"")

        if (str_res[start_index - 1] == '"'):
            end_index = str_res.find("\"", start_index)
            content = str_res[start_index:end_index]
        else:
            end_index = str_res.find("\'", start_index)
            content = str_res[start_index:end_index]
        # print(content)
        return jsonify({'generated_text': content})

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

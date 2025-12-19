from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import base64
import json
from test import request_API

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def image_to_base64(file_storage):
    """把上传的图片转为 base64"""
    image_bytes = file_storage.read()
    return base64.b64encode(image_bytes).decode("utf-8")


def stream_analysis_response(response):
    for chunk in response.iter_lines():
        if chunk:
            decoded_chunk = chunk.decode('utf-8')
            if decoded_chunk.startswith('data:'):
                # Remove the 'data: ' prefix and parse the JSON object
                try:
                    parsed_chunk = json.loads(decoded_chunk[5:])
                    print(parsed_chunk['choices'][0]['delta']['content'], end='')
                except:
                    pass


def match_code(content):
    import re

    match = re.search(r'\{(.*)\}', content, re.S)

    if not match:
        raise ValueError("未找到目标结构")

    block = '{' + match.group(1) + '}'
    # print(block)
    data = json.loads(block)

    # print(type(data))
    # print(data.keys())
    # print(data.values())
    return data


@app.route("/upload", methods=["POST"])
def upload():
    # 1. 接收文本参数
    model_name = request.form.get("model_name")
    language = request.form.get("language")

    # 2. 接收图片
    if "image" not in request.files:
        return jsonify({"msg": "no image"}), 400

    image = request.files["image"]

    response = request_API(model_name, language, image_to_base64(image))
    res_json = response.json()
    content = res_json["choices"][0]["message"]["content"]
    print(content)
    data = match_code(content)

    return jsonify({
        "msg": "success",
        "result": data
    })


if __name__ == "__main__":
    app.run(debug=True)

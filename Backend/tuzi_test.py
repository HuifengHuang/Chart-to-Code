import os
import requests
import json
import base64
OPENAI_API_KEY = ''
if not OPENAI_API_KEY:
    raise RuntimeError("Please set the OPENAI_API_KEY environment variable before running this script.")

url = "https://api.tu-zi.com/v1/chat/completions"
headers = {
   'Accept': 'application/json',
    'Authorization': f"Bearer {OPENAI_API_KEY}",
   'Content-Type': 'application/json'
}

def image_to_base64(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")


def request_API(model, language, image):
    prompt = "请根据这张图片，生成一份html代码，要求使用" + language +"绘图，代码按以下格式生成：{\"import_script\":,\"body\":,\"css\":,\"script\":}，注意所有的value使用字符串表示，回复仅给出代码即可"
    data = {
        'model': model,
        'messages': [
            {'role': 'user',
             'content': [
                 {"type": "text", "text": prompt},
                 {"type": "image_url",
                  "image_url": {
                            "url": f"data:image/png;base64,{image}"
                        }}
             ]}
        ],
        'stream': False
    }

    response = requests.post(
        url,
        headers=headers,
        data=json.dumps(data),
        stream=True,
        timeout=30
    )
    return response


if __name__ == "__main__":
    resp = request_API("deepseek-v3", "D3.js", image_to_base64('E:/kangziyao/CodingSapce/Chart-to-Code/Backend/barchartimage.png'))
    print(resp.text)
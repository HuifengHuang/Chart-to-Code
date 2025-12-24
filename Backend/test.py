import os
import requests
import json
import base64
# API_KEY should be provided via environment variable OPENAI_API_KEY
OPENAI_API_KEY = ''
if not OPENAI_API_KEY:
    raise RuntimeError("Please set the OPENAI_API_KEY environment variable before running this script.")
headers = {
    "Authorization": f"Bearer {OPENAI_API_KEY}",
    "Content-Type": "application/json"
}


def image_to_base64(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")


def request_API(model, language, image):
    prompt = '请根据这张图片，生成一份html代码，要求使用' + language+'绘图，代码按以下格式生成：\
        {"import_script":,"body":,"css":,"script_data":,"script_render":}，\
        要求将值直接导入下面的html文件可以直接运行。注意所有的value使用字符串表示，回复仅给出代码即可。\
        <!doctype html>\
        <html>\
        <head>\
        <meta charset=\'utf-8\'>\
        ${import_script}\
        <style>${css}</style>\
        </head>\
        <body>\
        ${body}\
        <script>\
        ${script_data}\
        ${script_render}\
        </script>\
        </body>\
        </html>'
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
        'stream': True
    }

    response = requests.post(
        'https://api.chsdw.top/v1/chat/completions',
        headers=headers,
        data=json.dumps(data),
        stream=True,
        timeout=300
    )
    return response


if __name__ == "__main__":
    resp = request_API("gemini-2.5-pro", "D3.js", image_to_base64('E:/kangziyao/CodingSapce/Chart-to-Code/Backend/barchartimage.png'))
    for chunk in resp.iter_lines():
        if chunk:
            decoded_chunk = chunk.decode('utf-8')
            if decoded_chunk.startswith('data:'):
                # Remove the 'data: ' prefix and parse the JSON object
                try:
                    parsed_chunk = json.loads(decoded_chunk[5:])
                    print(parsed_chunk['choices'][0]['delta']['content'], end='')
                except:
                    pass
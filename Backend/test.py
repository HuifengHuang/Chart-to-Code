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
        # 'stream': True
    }

    response = requests.post(
        'https://api.chsdw.top/v1/chat/completions',
        headers=headers,
        data=json.dumps(data),
        stream=True,
        timeout=300
    )
    return response
    # try:
    #     response = requests.post(
    #         'https://api.chsdw.top/v1/chat/completions',
    #         headers=headers,
    #         data=json.dumps(data),
    #         stream=True,
    #         timeout=30
    #     )
    #     # If server returns a non-200 status, show status and body so you can inspect the problem
    #     if response.status_code != 200:
    #         print(f"Request failed with status code {response.status_code}")
    #         try:
    #             print(response.text)
    #         except Exception:
    #             print("<could not decode response body>")
    #         response.close()
    #         response = None
    # except requests.RequestException as e:
    #     # Print detailed error, including HTTP response if available
    #     print(f"Request failed: {e}")
    #     resp = getattr(e, 'response', None)
    #     if resp is not None:
    #         print(f"Status code: {resp.status_code}")
    #         try:
    #             print(resp.text)
    #         except Exception:
    #             print("<could not decode error response body>")
    # else:
    #     try:
    #         for chunk in response.iter_lines():
    #             if chunk:
    #                 decoded_chunk = chunk.decode('utf-8')
    #                 if decoded_chunk.startswith('data:'):
    #                     # Remove the 'data: ' prefix and parse the JSON object
    #                     try:
    #                         parsed_chunk = json.loads(decoded_chunk[5:])
    #                         print(parsed_chunk['choices'][0]['delta']['content'], end='')
    #                         return parsed_chunk['choices'][0]['delta']['content']
    #                     except:
    #                         pass
    #     except KeyboardInterrupt:
    #         print("\nStreaming interrupted by user.")
    #     finally:
    #         if response is not None:
    #             try:
    #                 response.close()
    #             except Exception:
    #                 pass
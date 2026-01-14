import os
import requests
import json
import base64
# OPENAI_API_KEY = 'sk-NAux5UqLZ76R945JGZZdlmIIbNKx3gmygn6xnmITeR9ej6mA'    # 兔子 API KEY
OPENAI_API_KEY = 'sk-tKVGbJzqcaiyjVfp555d1b344f2d4fEb9bEc0224F5Ce16F2'    # 一展 API KEY
if not OPENAI_API_KEY:
    raise RuntimeError("Please set the OPENAI_API_KEY environment variable before running this script.")

# url = "https://api.tu-zi.com/v1/chat/completions"
url = "https://api.shunyu.tech/v1/chat/completions"
headers = {
   'Accept': 'application/json',
    'Authorization': f"Bearer {OPENAI_API_KEY}",
   'Content-Type': 'application/json'
}

def image_to_base64(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")


def request_API(model, image):
    prompt = '请根据这张图片，生成三份html代码，要求分别使用D3.js,ECharts,Vega绘图，代码按以下格式生成：\
        {\
            "D3js": {"import_script":,"body":,"css":,"data":,"script_render":}]，\
            "echarts": {"import_script":,"body":,"css":,"data":,"script_render":}]，\
            "vega": {"import_script":,"body":,"css":,"data":,"script_render":}]，\
        }\
        其中，data属性需要满足以下格式：\
        {\
        "id":,\
        "value":{\
            "x":,\
            "y":,\
            "pie_value":,\
            }\
        }\
        要求每份代码的值直接导入下面的html文件可以直接运行。\
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
        const dataset = ${data}\
        ${script_render}\
        </script>\
        </body>\
        </html>\
        注意:1、所有的value(包括data，即使是纯JSON格式)使用字符串表示!\
            2、回复仅给出代码即可!\
            3、请尽量换行(包括data)显示代码内容，方便阅读!\
            4、要求运行结果能自适应窗口大小，并且body属性中必须加入overflow:hidden;'
    
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
        timeout=180
    )
    return response


if __name__ == "__main__":
    resp = request_API("gpt-5-nano", image_to_base64('E:/kangziyao/CodingSapce/Chart-to-Code/Backend/bar_image.png'))
    print(resp.text)
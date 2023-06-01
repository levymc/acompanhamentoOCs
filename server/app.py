from flask import Flask, jsonify
from flask_cors import CORS

mode = "dev" #prod ou dev

app = Flask(__name__)
CORS(app)

@app.route('/api/paginas', methods=["POST",'GET'])
def obter_paginas():
    pages = [
        {
            'text': 'Adicionar OCs',
            'route': '/addOC',
            'onClick': ''
        },
        {
            'text': 'Histórico',
            'route': '/',
            'onClick': ''
        },
        {
            'text': 'Gráficos',
            'route': '/',
            'onClick': ''
        },
    ]
    return jsonify(pages)

if __name__ == '__main__':
    if mode == 'dev':
        app.run(debug=True, host='0.0.0.0', port=4000)
    # else:
    #     serve(app, host='0.0.0.0', port=5005, threads=1, url_scheme='https')
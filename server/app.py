from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/paginas', methods=["POST",'GET'])
def obter_paginas():
    pages = [
        {
            'text': 'Adicionar OCs',
            'route': '/',
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
    app.run()

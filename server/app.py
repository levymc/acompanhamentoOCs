from flask import Flask, jsonify, request
from flask_cors import CORS
from DBfuncs import OCs

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
            'route': '/historicPage',
            'onClick': ''
        },
        {
            'text': 'Gráficos',
            'route': '/',
            'onClick': ''
        },
    ]
    return jsonify(pages)

@app.route('/api/recebeOC', methods=["POST", "GET"])
def recebeOC():
    dados = request.json
    oc = dados['oc']
    data = dados['data']
    quantidadePecas = dados['quantidadePecas']
    response = OCs.insert(oc, quantidadePecas, data)  # Substitua 0 pelo valor adequado para a coluna "quantidadePecas"
    return {"value": response}

@app.route('/api/historico',methods=["POST", "GET"])
def historico():
    return OCs.consulta()

if __name__ == '__main__':
    if mode == 'dev':
        app.run(debug=True, host='0.0.0.0', port=4000)
    # else:
    #     serve(app, host='0.0.0.0', port=5005, threads=1, url_scheme='https')
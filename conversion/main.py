from flask import Flask, render_template, request
import requests
import json
from flask import jsonify


app = Flask(__name__)
API_KEY = 'CBBYZVB4IR3RN85E'

@app.route('/<string:from_c>/<string:to_c>/<int:amount>', methods=['GET', 'POST'])
def home(from_c,to_c,amount):
     if request.method == 'GET':
            try:
                amount = float(amount)
                url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency={}&to_currency={}&apikey={}'.format(
                    from_c, to_c, API_KEY)
                response = requests.get(url=url).json()
                rate = response['Realtime Currency Exchange Rate']['5. Exchange Rate']
                rate = float(rate)
                result = rate * amount
                response= jsonify({'result':str(result)})
                response.headers.add("Access-Control-Allow-Origin", "*")
                return response
          
            except Exception as e:
                return '<h1>Bad Request : {}</h1>'.format(e)
     else:
        print(request.get_json())  # parse as JSON
        return 'Sucesss', 200
if __name__ == "__main__":
    app.run(debug=True)
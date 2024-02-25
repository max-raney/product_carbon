from flask import Flask, request, jsonify
from flask_cors import CORS
from main import CompanyData
import ast

app = Flask(__name__)
CORS(app)

@app.route('/calculate_emissions', methods=['POST'])
def calculate_emissions():
    data = request.json  # Get data from POST request
    
    # Assuming the request includes 'company_name', 'price', and an optional 'add_amazon' flag
    company_name = data.get('company_name')
    price = data.get('price')
    add_amazon = data.get('add_amazon', True)  # Default to True if not specified
    
    company_data = CompanyData.fetch_company_data(company_name)
    if not company_data:
        return jsonify({'error': 'Company not found'}), 404
    
    emissions = company_data.calculate_product_emissions(price, add_amazon=add_amazon)
    
    return jsonify({'company_name': company_name, 'price': price, 'emissions': emissions})

if __name__ == '__main__':
    app.run(debug=True)  # start the Flask development server

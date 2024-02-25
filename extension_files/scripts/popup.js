document.getElementById('calculate').addEventListener('click', function() {
    const company = document.getElementById('company').value;
    const price = document.getElementById('price').value;
  
    fetch('http://localhost:8080/calculate_emissions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ company_name: company, price: parseFloat(price), add_amazon: true }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').textContent = `Emissions for this product are estimated at ${data.emissions} kg of CO2e.`;
    })    
    .catch(error => console.error('Error:', error));
});

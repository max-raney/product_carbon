let price = 0.0;
chrome.runtime.sendMessage({ action: 'popupOpened' });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.price) {
        // Remove the dollar sign and any commas from the price string
        const numericPrice = message.price.replace(/[^0-9.]/g, '');
        // Convert the cleaned price string to a float
        price = parseFloat(numericPrice);
        console.log('Price:', price);
    }
  });

document.getElementById('calculate').addEventListener('click', function() {
    console.log('using price ', price);
    const company = document.getElementById('company').value;
  
    fetch('http://localhost:8080/calculate_emissions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ company_name: company, price: parseFloat(price), add_amazon: true }),
    })
    .then(response => response.json())
    .then(data => {
        let emissionsRounded = parseFloat(data.emissions).toFixed(2); // Rounds the emissions to 2 decimal places
        document.getElementById('result').textContent = `Emissions for this product are estimated at ${emissionsRounded} kg of CO2e.`;
    })
    .catch(error => console.error('Error:', error));
});

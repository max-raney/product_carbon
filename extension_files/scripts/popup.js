document.addEventListener('DOMContentLoaded', function() {
    // Request the latest price and brand data from the background script
    chrome.runtime.sendMessage({ action: 'requestData' }, function(response) {
        if (response && response.price && response.brand) {
            // Process the received price and brand data
            const numericPrice = response.price.replace(/[^0-9.]/g, '');
            const price = parseFloat(numericPrice);
            const brand = response.brand;
            
            console.log('Price:', price);
            console.log('Brand:', brand);

            // Immediately calculate emissions with the received data
            calculateEmissions(price, brand);
        } else {
            console.log('No price or brand data received.');
        }
    });
});

function calculateEmissions(price, brand) {
    console.log('Using price', price);
    console.log('Using brand', brand);

    fetch('http://localhost:8080/calculate_emissions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ company_name: brand, price: price, add_amazon: true }),
    })
    .then(response => response.json())
    .then(data => {
        let emissionsRounded = parseFloat(data.emissions).toFixed(2); // Rounds the emissions to 2 decimal places
        document.getElementById('result').textContent = `Emissions for this product are estimated at ${emissionsRounded} kg of CO2e.`;
    })
    .catch(error => console.error('Error:', error));
}

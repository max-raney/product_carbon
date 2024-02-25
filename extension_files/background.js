self.addEventListener('message', (event) => {
    // Check for a specific message, e.g., to fetch emissions data
    if (event.data.action === 'calculateEmissions') {
      const { company, price, addAmazon } = event.data;
      fetch('http://localhost:8080/calculate_emissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ company_name: company, price, add_amazon: addAmazon }),
      })
      .then(response => response.json())
      .then(data => {
        // Respond back to the sender with the calculated emissions
        event.source.postMessage({ action: 'emissionsResult', data });
      })
      .catch(error => console.error('Error:', error));
    }
  });
  
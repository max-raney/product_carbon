const article = document.querySelector("article");

// `document.querySelector` may return null if the selector doesn't match anything.

  const priceRegex = /\$\d+(\.\d{2})?/; // Simple regex to find prices like $19.99
  const bodyText = document.body.innerText;
  const price = bodyText.match(priceRegex);  

  if (price) {
    console.log('Price found:', price[0]);
    } else {
    console.log('No price found');
  }

  chrome.runtime.sendMessage({price: price[0]});

  const manufacturer = null;
  const productEmissions = null;

  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `This product costs ${price} from ${manufacturer} and produces roughly ${productEmissions} kgs of carbon emissions.`;

  (date ?? heading).insertAdjacentElement("afterend", badge);
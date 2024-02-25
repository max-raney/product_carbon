const article = document.querySelector("article");

// `document.querySelector` may return null if the selector doesn't match anything.

  const priceRegex = /\$\d+(\.\d{2})?/; // Simple regex to find prices like $19.99
  const bodyText = document.body.innerText;
  const productPrice = bodyText.match(priceRegex);  

  if (productPrice) {
    console.log('Price found:', productPrice[0]);
    } else {
    console.log('No price found');
  }

  const manufacturer = null;
  const productEmissions = null;

  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `This product costs ${productPrice} from ${manufacturer} and produces roughly ${productEmissions} kgs of carbon emissions.`;

  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
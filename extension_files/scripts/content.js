// Function to run your main script logic
function main() {
  const priceElement = document.querySelector('span.a-offscreen');
  const price = priceElement ? priceElement.textContent.trim() : null;
  console.log("price is ", price);

  // Send data to background script
  chrome.runtime.sendMessage({ action: 'priceData', price: price });
}

// Check if the document has already been loaded
if (document.readyState === "loading") {
  // Document has not been fully loaded, wait for the DOMContentLoaded event
  document.addEventListener('DOMContentLoaded', main);
} else {
  // Document has already been loaded, run the main function immediately
  main();
}

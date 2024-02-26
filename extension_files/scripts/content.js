// Function to run your main script logic
function main() {
  const priceElement = document.querySelector('span.a-offscreen');
  const price = priceElement ? priceElement.textContent.trim() : null;
  console.log("price is ", price);
  
  const brandLabelSpan = document.querySelector('tr.po-brand td.a-span3 span.a-text-bold');
  const brandValueSpan = brandLabelSpan ? brandLabelSpan.closest('tr').querySelector('td.a-span9 span.a-size-base.po-break-word') : null;
  const brandName = brandValueSpan ? brandValueSpan.textContent.trim() : 'Brand not found';
  console.log("Brand is ", brandName);
  // Send data to background script
  chrome.runtime.sendMessage({ action: 'priceData', price: price, brand: brandName });
}

// Check if the document has already been loaded
if (document.readyState === "loading") {
  // Document has not been fully loaded, wait for the DOMContentLoaded event
  document.addEventListener('DOMContentLoaded', main);
} else {
  // Document has already been loaded, run the main function immediately
  main();
}

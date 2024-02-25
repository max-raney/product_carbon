chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    if (request.price) {
    document.getElementById('price').textContent = "Price found: ${request.price}";
    }
    }
    );
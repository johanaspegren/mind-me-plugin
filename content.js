

console.log('content.js loaded');

// Listen for a user action to initiate the text highlighting process
document.addEventListener('mouseup', function(event) {
    console.log('mouseup event');

    const selectedText = window.getSelection().toString();  
    // Send the selected text to the background script
    chrome.runtime.sendMessage({    text: selectedText, 
                                    source: 'mouseup',
                                    srcUri: window.location.href});
  });

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('CONTENYT Message received from background script');
    if (message.action === 'getSelectedText') {
      const selectedText = window.getSelection().toString();
      sendResponse({ text: selectedText });
    }
  });
  
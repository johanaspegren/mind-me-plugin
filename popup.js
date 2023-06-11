

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('myButton');

    button.addEventListener('click', function () {
        console.log('Button clicked!');
        chrome.runtime.sendMessage({ text: null, source: 'btnclick', srcUri: null });
    });
  });

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('popup.js message: ', message.text); // Log the received text
});

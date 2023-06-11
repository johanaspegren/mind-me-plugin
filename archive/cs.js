chrome.runtime.sendMessage({command: "add", collection: "users", data: {name: "user"}}, (msg) => {
  console.log("response", msg)
});

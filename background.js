
console.log('Background script loaded!');

try{

    self.importScripts('firebase/firebase-app-7.js');
    self.importScripts('firebase/firebase-db-7.js');

    const firebaseConfig = {
        apiKey: "AIzaSyCpkeVvdJ-qZs6QgWkRfVH4NWo5ZbXd5vw",
        authDomain: "mind-this.firebaseapp.com",
        databaseURL: "https://mind-this-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "mind-this",
        storageBucket: "mind-this.appspot.com",
        messagingSenderId: "103848871304",
        appId: "1:103848871304:web:30df4f61b66e39813fa63d"
    };

    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized!');
    // Get a reference to the database
    const database = firebase.database();
    console.log('Firebase database initialized!', database);

    let selText = '';
    let uri = '';

    

    // Listen for messages from the content script
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

        console.log('Background Message received script from sender:', sender);
        const selectedText = request.text;
        const srcUri = request.srcUri;

        if (typeof selectedText !== 'undefined' && selectedText !== '' && selectedText !== null) {
            console.log('Selected Text has value, update selText:', selectedText);
            selText = selectedText;
        }

        if (typeof srcUri !== 'undefined' && srcUri !== '' && srcUri !== null) {
            console.log('srcUri has value, update uri:', srcUri);
            uri = srcUri;
        }

        if(request.source === 'btnclick'){
            // save to firebase
            console.log('SEND 2 FB', selText);
            sendDataToFirebase(selText, uri);
        } else {
            console.log('NO SEND 2 FB - just salvage', request.source);
        }

    

    });

    // Function to send data to Firebase
    function sendDataToFirebase(selText, uri) {
        console.log('Sending data to Firebase...', selText);
        // Generate a unique key for the data entry
        const newKey = firebase.database().ref().child('test').push().key;

        // Define the data to be sent
        const data = {
            text: selText,
            srcUrl: uri,
            timeStamp: Date.now()

        };

        // Write data to the database
        const updates = {};
        updates['/test/' + newKey] = data;
        firebase.database().ref().update(updates)
            .then(() => {
                console.log('Data sent to Firebase successfully!');
            })
            .catch((error) => {
                console.error('Error sending data to Firebase:', error);
            });
    }

}
catch(e){   
    console.log('Firebase trouble!', e);
}


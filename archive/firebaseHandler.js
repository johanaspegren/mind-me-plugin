
console.log('Firebase handler loaded!');    
// Initialize Firebase
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
  
  // Get a reference to the database
  const database = firebase.database();
  
  // Handle button click event
  const sendDataButton = document.getElementById('sendData');
  sendDataButton.addEventListener('click', sendDataToFirebase);
  
  // Function to send data to Firebase
  function sendDataToFirebase() {
    console.log('Sending data to Firebase...');
    // Generate a unique key for the data entry
    const newKey = database.ref().child('test').push().key;
  
    // Define the data to be sent
    const data = {
      key1: 'Value 1',
      key2: 'Value 2',
      key3: 'Value 3'
    };
  
    // Write data to the database
    const updates = {};
    updates['/test/' + newKey] = data;
    database.ref().update(updates)
      .then(() => {
        console.log('Data sent to Firebase successfully!');
      })
      .catch((error) => {
        console.error('Error sending data to Firebase:', error);
      });
  }


  function test(){
    confirm("test");
    
  }
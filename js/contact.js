// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCjrFNgA9VWB4rcJ5jJGxkY4ZLWX352Uzw",
    authDomain: "test004-d8807.firebaseapp.com",
    databaseURL: "https://test004-d8807-default-rtdb.firebaseio.com",
    projectId: "test004-d8807",
    storageBucket: "test004-d8807.appspot.com",
    messagingSenderId: "770130140909",
    appId: "1:770130140909:web:e8ed98829617e2b0bcf6e4"
  };
  // Initialize Firebase (ADD YOUR OWN DATA)
  firebase.initializeApp(firebaseConfig);
  
  // Reference messages collection
  var messagesRef = firebase.database().ref('messages');
  
  // Listen for form submit
  document.getElementById('contactForm').addEventListener('submit', submitForm);
  
  // Submit form
  function submitForm(e){
    e.preventDefault();
  
    // Get values
    var name = getInputVal('name');
    // var company = getInputVal('company');
    var email = getInputVal('email');
    // var phone = getInputVal('phone');
    var message = getInputVal('message');
  
    // Save message
    saveMessage(name, email, message);
  
    // Show alert
    // document.querySelector('.alert').style.display = 'block';

  
    // Hide alert after 3 seconds
    // setTimeout(function(){
    //   document.querySelector('.alert').style.display = 'none';
    // },3000);

    
  
    // Clear form
    document.getElementById('contactForm').reset();
  }
  
  // Function to get get form values
  function getInputVal(id){
    return document.getElementById(id).value;
  }
  
  // Save message to firebase
  function saveMessage(name, email, message){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      name: name,
    //   company:company,
      email:email,
    //   phone:phone,
      message:message
    });
  }
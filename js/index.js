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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register() {
  // Get all our input fields
  email = document.getElementById('emailid').value
  password = document.getElementById('password').value
  full_name = document.getElementById('name').value
  mobile = document.getElementById('mobile').value
  // milk_before_cereal = document.getElementById('milk_before_cereal').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is not correct')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false || validate_field(mobile) == false) {
    alert('One or More Extra Fields is required.')
    return
  }

  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser

      // Add this user to Firebase Database
      var database_ref = database.ref()

      // Create User data
      var user_data = {
        email: email,
        full_name: full_name,
        mobile: mobile,
        last_login: Date.now()
      }

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)

      // DOne
      alert('User Created!!')
      window.location.assign("../index.html")
    })
  // .catch(function(error) {
  //   // Firebase will use this to alert of its errors
  //   var error_code = error.code
  //   var error_message = error.message

  //   alert(error_message)
  // })
}

// Set up our login function
function login() {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('pass').value
  console.log(email, password)
  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is not in correct format.')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser

      // Add this user to Firebase Database
      var database_ref = database.ref()

      // Create User data
      var user_data = {
        last_login: Date.now()
      }

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)

      // DOne
      alert('User Logged In!!')
      window.location.assign("./index.html")

    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message

      alert(error_message)
    })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}


// let a = document.getElementById("register")
// a.onclick = () => {
//     // let b = document.getElementsByClassName("container")[0]
//     register()
//     console.log("hellooooooo World")
// }
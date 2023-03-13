// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCjrFNgA9VWB4rcJ5jJGxkY4ZLWX352Uzw",
  authDomain: "test004-d8807.firebaseapp.com",
  databaseURL: "https://test004-d8807-default-rtdb.firebaseio.com",
  projectId: "test004-d8807",
  storageBucket: "test004-d8807.appspot.com",
  messagingSenderId: "770130140909",
  appId: "1:770130140909:web:e8ed98829617e2b0bcf6e4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Set up our register function
function register() {
  // Get all our input fields
  email = document.getElementById("emailid").value;
  password = document.getElementById("password").value;
  full_name = document.getElementById("name").value;
  mobile = document.getElementById("mobile").value;
  if (mobile["0"] != "+") {
    mobile = "+91 " + mobile;
  }
  address = document.getElementById("address").value;
  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is not correct");
    return;
  }
  if (validate_field(full_name) == false || validate_field(mobile) == false) {
    alert("One or More Extra Fields is required.");
    return;
  }

  // Move on with Auth
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        email: email,
        full_name: full_name,
        address: address,
        mobile: mobile,
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).set(user_data);

      alert("User Created!!");
      setTimeout(function () {
        window.location.assign("../home.html");
      }, 3000);
    })
    .catch(function (error) {
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

// Set up our login function
function login() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("pass").value;
  console.log(email, password);
  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is not in correct format.");
    return;
    // Don't continue running the code
  }
  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).update(user_data);

      // DOne
      alert("User Logged In!!");
      //window.location.assign("./index.html")
      setTimeout(function () {
        window.location.assign("./home.html");
      }, 3000);
      // })
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

phnAth = document.getElementsByClassName("phnAth")[0];
verify = document.getElementsByClassName("phnAth")[1];

phone = document.getElementById("phone");
mainSection = document.getElementById("mainSection");
phnAth.onclick = () => {
  mainSection.style.opacity = 0.3;
  phoneAuth();
  phone.classList.remove("d-none");
};

window.onload = function () {
  render();
};

function render() {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container"
  );
  recaptchaVerifier.render();
}

function phoneAuth() {
  //get the number
  var number = document.getElementById("mobile").value;
  if (number["0"] != "+") {
    number = "+91 " + number;
  }
  //phone number authentication function of firebase
  //it takes two parameter first one is number,,,second one is recaptcha
  console.log(number);
  firebase
    .auth()
    .signInWithPhoneNumber(number, window.recaptchaVerifier)
    .then(function (confirmationResult) {
      //s is in lowercase
      console.log("jhds");
      window.confirmationResult = confirmationResult;
      coderesult = confirmationResult;
      console.log(coderesult);
      alert("Message sent to Your Phone No");
    })
    .catch(function (error) {
      alert(error.message);
    });
}

function codeverify() {
  var code = document.getElementById("verificationCode").value;
  coderesult
    .confirm(code)
    .then(function (result) {
      alert("Successfully registered");
      var user = result.user;
      console.log(user);
      register();

      // return true;
    })
    .catch(function (error) {
      alert(error.message);
      // return false;
    });
}

verify.onclick = () => {
  mainSection.style.opacity = 0.3;
  codeverify();
  phone.classList.add("d-none");
};

// let a = document.getElementById("register")
// a.onclick = () => {
//     // let b = document.getElementsByClassName("container")[0]
//     register()
//     console.log("hellooooooo World")
// }

console.log("Script Loded")
var $loginMsg = $('.loginMsg'),
  $login = $('.login'),
  $signupMsg = $('.signupMsg'),
  $signup = $('.signup'),
  $frontbox = $('.frontbox');

// $('#switch1').on('click', function() {
$('#switch1').click(function() {
  $loginMsg.toggleClass("visibility");
  $frontbox.addClass("moving");
  $signupMsg.toggleClass("visibility");
  
  $signup.toggleClass('hide');
  $login.toggleClass('hide');
})

// $('#switch2').on('click', function() {
$('#switch2').click(function() {
  $loginMsg.toggleClass("visibility");
  $frontbox.removeClass("moving");
  $signupMsg.toggleClass("visibility");

  $signup.toggleClass('hide');
  $login.toggleClass('hide');
})
// var firebaseConfig = {
//   apiKey: "AIzaSyCjrFNgA9VWB4rcJ5jJGxkY4ZLWX352Uzw",
//   authDomain: "test004-d8807.firebaseapp.com",
//   projectId: "test004-d8807",
//   storageBucket: "test004-d8807.appspot.com",
//   messagingSenderId: "770130140909",
//   appId: "1:770130140909:web:e8ed98829617e2b0bcf6e4"
// };
// if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }

// // reference your database
// var contactFormDB = firebase.database().ref("contactForm");

// document.getElementById("contactForm").addEventListener("submit", submitForm);

// function submitForm(e) {
//   e.preventDefault();

//   var name = getElementVal("name");
//   var emailid = getElementVal("emailid");
//   var mobile = getElementVal("mobile");
//   var password = getElementVal("password");

//   saveMessages(name, emailid, mobile,password);

//   //   enable alert
//   document.querySelector(".alert").style.display = "block";

//   //   remove the alert
//   setTimeout(() => {
//     document.querySelector(".alert").style.display = "none";
//   }, 3000);

//   //   reset the form
//   document.getElementById("contactForm").reset();
// }

// const saveMessages = (name, emailid, mobile,password) => {
//   var newContactForm = contactFormDB.push();

//   newContactForm.set({
//     name: name,
//     emailid: emailid,
//     mobile: mobile,
//     password:password,
//   });
// };

// const getElementVal = (id) => {
//   return document.getElementById(id).value;
// };

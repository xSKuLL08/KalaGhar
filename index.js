// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC-FAnPIXkO6JwWbStQ3duzR9K2pp_juqo",
  authDomain: "whitespace-54790.firebaseapp.com",
  projectId: "whitespace-54790",
  storageBucket: "whitespace-54790.appspot.com",
  messagingSenderId: "899710627074",
  appId: "1:899710627074:web:9f284b5774733362e3e61b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register () {
  // Get all our input fields
  console.log('Registering')  
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  //contact = document.getElementById('contact').value

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Fill all the fields')
    return
  }
  if (validate_field(full_name) == false ) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }

  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {

    var user = auth.currentUser


    var database_ref = database.ref()

    var user_data = {
      email : email,
      full_name : full_name,
      
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).set(user_data)

    alert('User Created!!')
  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

function login () {
  console.log('Logging In')
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Invalid')
    return
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    var user = auth.currentUser

    var database_ref = database.ref()

    var user_data = {
      last_login : Date.now()
    }
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    var showName = user.email

    window.location.replace("profile.html");

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    return true
  } else {
    return false
  }
}

function validate_password(password) {
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
document.getElementById("ucard").innerHTML = `<span id="userMail" class="text-3xl">d</span>`;
const firebaseConfig = {
  apiKey: "AIzaSyD4wb39OGdKhkjI0Muuqu4ypgD23fuwmEM",
authDomain: "innovsense-2024.firebaseapp.com",
projectId: "innovsense-2024",
storageBucket: "innovsense-2024.appspot.com",
messagingSenderId: "241742405711",
appId: "1:241742405711:web:c6a97ed2760eeb358d0a3a",
measurementId: "G-42HRCRJMLZ"
};
firebase.initializeApp(firebaseConfig);

function authcte() {
  event.preventDefault();
  const email = document.getElementById('floatingInput').value;
  const password = document.getElementById('floatingPassword').value;
    if (!email || !password) {
      alert('Both email and password are required.');
      return;
  }
  firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                window.location.href = 'dashb.html';
                alert(`Welcome, ${user.email}! , Press OK to redirect to the dashBoard. `);

            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/user-not-found') {
                  alert('User not found. Please check your email or sign up.');
              } else if (errorCode === 'auth/wrong-password') {
                  alert('Incorrect password. Please try again.');
              } else {
                  alert(`Error: Invalid Credentials!`);
              }
            });
}
function clear(){
  document.getElementById('floatingInput').value = ""
  document.getElementById('floatingpassword').value=""
}
clear();

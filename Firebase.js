// setting up firebase with our website
const firebaseApp = firebase.initializeApp({ 
    apiKey: "AIzaSyCRDHxxkCXyNZ9BdJhDlZKpOkLu2FZHmh8",
    authDomain: "auth-form-2eb89.firebaseapp.com",
    projectId: "auth-form-2eb89",
    storageBucket: "auth-form-2eb89.appspot.com",
    messagingSenderId: "532774111499",
    appId: "1:532774111499:web:de3f1759a2fbf70c27ba0e"
   });

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

// Sign up function
const signUp = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password)
    // firebase code
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            // Signed in 
            document.write("You are Signed Up")
            console.log(result)
            // ...
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message)
            // ..
        });
}

// Sign In function
const signIn = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // firebase code
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            // Signed in 
            document.write("You are Signed In")
            console.log(result)
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message)
        });
}
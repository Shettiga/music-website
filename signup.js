
 const firebaseApp = firebase.initializeApp({ 
  apiKey: "AIzaSyCRDHxxkCXyNZ9BdJhDlZKpOkLu2FZHmh8",
            authDomain: "auth-form-2eb89.firebaseapp.com",
            databaseURL: "https://auth-form-2eb89-default-rtdb.firebaseio.com",
            projectId: "auth-form-2eb89",
            storageBucket: "auth-form-2eb89.appspot.com",
            messagingSenderId: "532774111499",
            appId: "1:532774111499:web:de3f1759a2fbf70c27ba0e"
 });
 const db = firebase.database();
 const auth = firebaseApp.auth();
 
 const signup = () => {
   const emailInput = document.getElementById("email");
   const passwordInput = document.getElementById("password");
 
   const email = emailInput.value;
   const password = passwordInput.value;
 
   console.log(email, password);
 
   auth.createUserWithEmailAndPassword(email, password)
     .then((userCredential) => {
       const user = userCredential.user;
       const uid = user.uid;
 
       const isAdmin = email.endsWith('@admin.com');

       // Add user data to Realtime Database
       db.ref('users/' + uid).set({
           email: email,
           isAdmin: isAdmin,
       })
           .then(() => {
               console.log("User data added to Realtime Database");
               location.href = "music.html";
           })
           .catch((error) => {
               console.error("Error adding user data to Realtime Database:", error);
           });
   })
   .catch((error) => {
       console.error("Error creating user:", error.code, error.message);
   });
}
   
   
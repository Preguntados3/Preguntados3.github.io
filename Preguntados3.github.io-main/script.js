 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyB7GiAZh89ohEYqYnZTt6UgTd3-TGSlSeI",
   authDomain: "preguntados3-d1e8d.firebaseapp.com",
   projectId: "preguntados3-d1e8d",
   storageBucket: "preguntados3-d1e8d.appspot.com",
   messagingSenderId: "792075991189",
   appId: "1:792075991189:web:7dbfc8c276c4e3c0dd439c",
   measurementId: "G-0N5SFBE786"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object



import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });





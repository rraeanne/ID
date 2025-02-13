import { auth, signInWithEmailAndPassword } from "./firebase.js";

document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login Successful!");
            window.location.href = "homepage.html"; // Redirect to homepage
        })
        .catch((error) => {
            alert(error.message);
        });
});

import { auth } from './firebase.js';
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";


// admin login

document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    


    try {
        await signInWithEmailAndPassword(auth, email, password);

        alert("✅ Login successful");

        window.location.href = "admin.html";
        
    } catch (error) {
        let message;
            switch (error.code) {
                case "auth/invalid-login-credentials":
                case "auth/wrong-password":
                case "auth/user-not-found":
                    message = " Invalid email or password";
                    break;
                case "auth/invalid-email":
                    message = "Please enter a valid email address";
                    break;
                default:
                    message =error.message;
            }
            alert( "❌ " + message)
            console.log(error.message)
    }
});



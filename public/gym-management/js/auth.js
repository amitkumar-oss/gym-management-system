import { auth } from './firebase.js';
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const db = getFirestore();

document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const adminRef = collection(db, "admin");
        const q = query(adminRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            alert("✅ Login successful");
            window.location.href = "admin.html";
        } else {
            await signOut(auth);
            alert("❌ Access Denied: you are not authorized to access the admin panel.");
        }

    } catch (error) {
        let message;
        switch (error.code) {
            case "auth/invalid-login-credentials":
            case "auth/wrong-password":
            case "auth/user-not-found":
                message = "Invalid email or password";
                break;
            case "auth/invalid-email":
                message = "Please enter a valid email address";
                break;
            default:
                message = error.message;
        }
        alert("❌ " + message);
        console.log(error.message);
    }
});



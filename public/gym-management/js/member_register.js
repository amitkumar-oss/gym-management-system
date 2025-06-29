import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";



document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;
    const phone = document.getElementById("phone").value.trim();
    const DOB = document.getElementById("dateOfBirth").value;
    const gender = document.getElementById("gender").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        // Save user details to Firestore
        
        await setDoc(doc(db, "members", uid), {
            name,
            email,
            phone,
            DOB,
            gender,
            createdAt: new Date().toISOString()
        });

        alert("Registration successfull")

        setTimeout(() => {
            window.location.href = "member_login.html";
        }, 1000);

    } catch (error) {
        let message;
        switch (error.code) {
            case "auth/email-already-in-use":
                message = "This email is already registered.";
                break;
            case "auth/invalid-email":
                message = "Please enter a valid email address.";
                break;
            case "auth/missing-email":
                message = "Please enter an email address.";
                break;
            case "auth/weak-password":
                message = "Password should be at least 6 characters.";
                break;
            default:
                message = error.message;
        }

        alert("❌ " + message);
    }
});

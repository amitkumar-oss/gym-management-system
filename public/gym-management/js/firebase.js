import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDxQko4in0Q-pV7wp2ouFMZ9ypzwTv-_yM",
    authDomain: "gymmanagementsystem-6df1c.firebaseapp.com",
    projectId: "gymmanagementsystem-6df1c",
    storageBucket: "gymmanagementsystem-6df1c.appspot.com",
    messagingSenderId: "351148508578",
    appId: "1:351148508578:web:d922ac79e7e34a65bf9efb",
    measurementId: "G-HKEGRMNV6B"
 
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

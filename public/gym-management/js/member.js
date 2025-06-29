import { db, auth } from './firebase.js';
import { collection, getDocs, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";



onAuthStateChanged(auth, (user) => {
    if (user) {
        const email = user.email;

        //  Show user email in header
        const emailSpan = document.querySelector(".user-email");
        if (emailSpan) {
            emailSpan.textContent = email;
        }

        showSupplements(); // supplements sabhi ke liye same hote hain
        showDiet(email);   // sirf user-specific diet
        showBills(email);
        showNotifications(email);


        logoutBtn.addEventListener("click", async () => {
            try {
                await signOut(auth);
                window.location.href = "index.html";
            } catch (error) {
                alert("Error during logout: " + error.message);
                console.error("Logout Error:", error);
            }
        });

    } else {
        window.location.href = "member_login.html";
    }
});




//  suppliment-----------

function showSupplements() {
    const list = document.getElementById("supplementList");
    list.innerHTML = "";

    onSnapshot(collection(db, "supplements"), snapshot => {
        list.innerHTML = ""; 
        snapshot.forEach(docSnap => {
            const d = docSnap.data();
            const div = document.createElement("div");
            div.classList.add("supplement-card");
            div.innerHTML = `
                <div class="supplement-icon"><i class="fas fa-flask"></i></div>
                <h3 class="supplement-name">${d.name}</h3>
                <div class="supplement-details">
                    <div class="price">₹${d.price}</div>
                    <div class="stock">Stock: ${d.stock}</div>
                </div>
                <div class="supplement-category">${d.category || "General"}</div>
            `;
            list.appendChild(div);
        });
    });
}


// asssign diet -----------

function showDiet(email) {
    const q = query(collection(db, "diets"), where("email", "==", email));
    const dietDate = document.getElementById("dietDate");
    const dietContent = document.getElementById("dietContent");

    onSnapshot(q, snapshot => {
        if (snapshot.empty) {
            dietDate.textContent = "Not assigned";
            dietContent.textContent = "No diet plan assigned yet.";
        } else {
            snapshot.forEach(docSnap => {
                const data = docSnap.data();
                dietDate.textContent = "Assigned on: " + new Date(data.date).toLocaleDateString();
                dietContent.innerHTML = `<pre>${data.plan}</pre>`;
            });
        }
    });
}


//  show bills------------

function showBills(email) {
    const q = query(collection(db, "bills"), where("email", "==", email));
    const billsDiv = document.getElementById("billsView");
    const placeholderCard = document.getElementById("placeholderBillCard");

    onSnapshot(q, snapshot => {
        billsDiv.innerHTML = "";

        if (snapshot.empty) {
            billsDiv.appendChild(placeholderCard);
        } else {
            if (placeholderCard) placeholderCard.remove();

            snapshot.forEach(doc => {
                const d = doc.data();
                const div = document.createElement("div");
                div.classList.add("bill-card");
                div.innerHTML = `
                    <div class="bill-header">
                        <div class="month">${d.month}</div>
                        <div class="amount">₹${d.amount}</div>
                    </div>
                    <div class="bill-details">
                        <div class="bill-date">Paid on: ${new Date(d.date).toLocaleDateString()}</div>
                    </div>
                `;
                billsDiv.appendChild(div);
            });
        }
    });
}



//  show Notification--------

function showNotifications(email) {
    const notifyDiv = document.getElementById("notifyView");
    const placeholder = document.getElementById("placeholderNotifyCard");

    try {
        const q = query(
            collection(db, "notifications"),
            where("email", "in", [email, "all"]),
            orderBy("date", "desc")
        );

        onSnapshot(q, snapshot => {
            notifyDiv.innerHTML = ""; 

            if (snapshot.empty) {
                if (placeholder) notifyDiv.appendChild(placeholder);
            } else {
                if (placeholder) placeholder.remove();

                snapshot.forEach(doc => {
                    const d = doc.data();
                    const div = document.createElement("div");
                    div.classList.add("notification-card");
                    div.innerHTML = `
                        <div class="notification-content">
                        
                            <p>${d.message}</p>
                            <span class="notification-date">Sent on: ${d.date.toDate().toLocaleDateString()}</span>
                        </div>
                    `;
                    notifyDiv.appendChild(div);
                });
            }
        });

    } catch (err) {
        console.error("Notification fetch error:", err);
        notifyDiv.innerHTML = `
            <div class="notification-card error">
                <div class="notification-content">
                    <h4>Error</h4>
                    <p>Could not load notifications. Please try again later.</p>
                </div>
            </div>
        `;
    }
}










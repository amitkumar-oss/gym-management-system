import { db,auth } from './firebase.js';
import { onSnapshot} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { collection,doc,addDoc, getDocs ,deleteDoc,updateDoc,setDoc} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";


// Logout button handling

document.getElementById("logoutBtn").addEventListener("click", async function() {
    try {
        await signOut(auth);
        window.location.href = "index.html";

    } catch (error) {
        alert("Error during logout: " + error.message);
   
    }
});





// Add a member

document.getElementById("addMemberForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const name = document.getElementById("memberName").value;
    const email = document.getElementById("memberEmail").value;
    const phone = document.getElementById("memberPhone").value;
    const gender = document.getElementById("memberGender").value;
    const DOB = document.getElementById("memberDOB").value;
    const memPackage = document.getElementById("memberPackage").value;


    try {
        await addDoc(collection(db, "members"), {
            name,
            email,
            phone,
            gender,
            DOB,
            memPackage,
            joined: new Date().toISOString()
        });

        alert(" Member Added Successfully!");

        document.getElementById("addStatus").textContent = "";
        document.getElementById("addMemberForm").reset();
        displayMembers();
    } catch (error) {
        document.getElementById("addStatus").textContent = " Error: " + error.message;
    }
});


//display all memebers

async function displayMembers() {
    const listDiv = document.getElementById("membersList");
    listDiv.innerHTML = "";

    const snapshot = await getDocs(collection(db, "members"));

    if (snapshot.empty) {
        // Show message if no members
        listDiv.innerHTML = `
            <div class="empty-message">
                <i class="fa-solid fa-user-slash"></i><br>
                No members added yet.
            </div>
        `;
        return;
    }

    // If members exist, display them

    snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const div = document.createElement("div");
        div.innerHTML = `<div class="member-card">
            <p><strong>Name:</strong>  ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Gender:</strong> ${data.gender}</p>
            <p><strong>Date of Birth:</strong> ${data.DOB}</p>
            <p><strong>Current Package:</strong> ${data.memPackage || "Not assigned"}</p>
            <button class="delete-btn" onclick="deleteMember('${docSnap.id}')">Delete</button>       
        `;
        listDiv.appendChild(div);
    });
}

window.assignPackage = async function (id, selectedPackage) {    
    const memberRef = doc(db, "members", id);
    try {
        await updateDoc(memberRef, {
        package: selectedPackage
        });
        alert(`Package "${selectedPackage}" assigned!`);
        displayMembers(); 
    } catch (err) {
        alert(" Failed to assign package: " + err.message);
    }
};

window.deleteMember = async function (id) {
    if (confirm("Are you sure you want to delete this member?")) {
        await deleteDoc(doc(db, "members", id));
        alert("Deleted successfully!");
        displayMembers(); 
    }
};

// Call on page load
displayMembers();



// create bills

document.getElementById("createBillForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("billMemberEmail").value;
    const amount = document.getElementById("amount").value;
    const month = document.getElementById("month").value;

    try {
        await addDoc(collection(db, "bills"), {
            email,
            amount,
            month,
            date: new Date().toISOString()
        });
        
        alert(" Bill Created Successfully!")

        document.getElementById("billStatus").textContent = "";
        document.getElementById("createBillForm").reset();
    } catch(error){
        document.getElementById("billStatus").textContent = " " + error.message;
    }
});


// sent notifications

document.getElementById("notifyForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const email=document.getElementById("targetEmail").value.trim().toLowerCase();;
    const message = document.getElementById("message").value;
    
    try {
        await addDoc(collection(db, "notifications"), {
            email,
            message,
            date: new Date()
        });
        alert(" succesfully sent ");
        console.log("Sending to Firestore:", { email, month, message });

        document.getElementById("notifyStatus").textContent = " Notification sent!";
        document.getElementById("notifyForm").reset();
    } catch (err) {
        document.getElementById("notifyStatus").textContent = " Error: " + err.message;
    }
});



// export report

window.exportMembers = async function() { 
    const snapshot = await getDocs(collection(db, "members"));
    const csvRows = [["Name", "Email", "Phone", "Package", "Joined"]];

    snapshot.forEach(docSnap => {
        const d = docSnap.data();
        csvRows.push([
            d.name || "",
            d.email || "",
            d.phone || "",
            d.package || "",
            d.joined || ""
        ]);
    });

    const csvString = csvRows.map(row =>
        row.map(field => `"${field}"`).join(",")
    ).join("\n");


    downloadCSV(csvString, "members_report.csv");
    // alert("Members report exported!");
}

window.exportBills = async function() {
    const snapshot = await getDocs(collection(db, "bills"));
    const csvRows = [["Email", "Amount", "Month", "Date"]];


    snapshot.forEach(docSnap => {
        const d = docSnap.data();
        csvRows.push([
            d.email || "",
            d.amount || "",
            d.month || "",
            d.date || ""
        ]);
    });

    const csvString = csvRows.map(row =>
        row.map(field => `"${field}"`).join(",")
    ).join("\n");

    downloadCSV(csvString, "bills_report.csv");
    //  alert("Bills report exported!");
}

function downloadCSV(data, filename) {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


// supplimient store

document.getElementById("supplementForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("supplementName").value;
    const price = document.getElementById("supplementPrice").value;
    const stock = document.getElementById("supplementStock").value;


    try {
        await addDoc(collection(db, "supplements"), {    
            name,
            price,
            stock,
            addedAt: new Date().toISOString()
        });
        alert("Suppliment added successfuly")

        // document.getElementById("supplementStatus").textContent = "Supplement added!";
        document.getElementById("supplementForm").reset();

        document.addEventListener("DOMContentLoaded", () => {
            displaySupplements();
        });            
                             // refresh list
    } catch (error) {
        document.getElementById("supplementStatus").textContent = "❌ " + error.message;
    }
});

// Show all supplements
async function displaySupplements() {
    const list = document.getElementById("supplementList");

    if (!list) {
        console.error("❌ supplementList element not found in DOM");
        return;
    }
    list.innerHTML = "";

    try{

        const snapshot = await getDocs(collection(db, "supplements"));

        if (snapshot.empty) {
            list.innerHTML = `
                <div class="empty-message">
                    <i class="fa-solid fa-box-open"></i><br>
                    No supplements added yet.
                </div>
            `;
            return;
        }

        snapshot.forEach(docSnap => {
            const d = docSnap.data();
            const div = document.createElement("div");
            div.classList.add("supplement-card");
            div.innerHTML = `
                <h3>${d.name}</h3>
                <p><strong>Price:</strong> ₹${d.price}</p>
                <p><strong>Stock:</strong> ${d.stock}</p>
            `;
            list.appendChild(div);
        });
        
    }catch (error) {
        console.error("Error fetching supplements:", error);
        list.innerHTML = `<p style="color: red;">Failed to load supplements: ${error.message}</p>`;
    }
        
}

// Auto load supplements on page load

displaySupplements();




// diet plan

document.getElementById("dietForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const email = document.getElementById("dietMemberEmail").value;
    const plan = document.getElementById("dietPlan").value;

    try {
        // await addDoc(collection(db, "diets"), {
        //     email,
        //     plan,
        //     date: new Date().toISOString()
        // });

        // Create a unique ID based on email
        const dietRef = doc(db, "diets", email);  // email will be used as document ID

        await setDoc(dietRef, {
            email,
            plan,
            date: new Date().toISOString()
        });

        alert(" Diet Plan Assigned!")

        // document.getElementById("dietStatus").textContent = "✅ Diet Plan Assigned!";
        document.getElementById("dietForm").reset();

    } catch (error) {
        // document.getElementById("dietStatus").textContent = "❌ Error: " + error.message;
        alert("Error:" + error.message)
    }
});








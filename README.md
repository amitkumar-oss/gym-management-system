# Gym Management System

## Table of Contents

*   [Introduction](#introduction)
*   [Features](#features)
*   [Technologies Used](#technologies-used)
*   [Project Structure](#project-structure)
*   [Setup and Installation](#setup-and-installation)
*   [Usage](#usage)
*   [Admin Panel](#admin-panel)
*   [Member Panel](#member-panel)
*   [Contact](#contact)

## Introduction

The Gym Management System is a web-based application designed to streamline the operations of a gym, providing functionalities for both administrators and members. It allows administrators to manage members, billing, supplements, and diet plans, while members can view their assigned diet plans, bills, and notifications, as well as browse available supplements. The system aims to enhance efficiency and communication within the gym environment.

## Features

**Admin Panel:**
*   **Member Management:**
    *   Add new members with details like name, email, phone, gender, date of birth, and package.
    *   View a list of all registered members.
    *   Delete existing members.
    *   Export member data to a CSV file.
*   **Billing Management:**
    *   Create new bills for members, specifying email, amount, and month.
*   **Notifications:**
    *   Send custom notifications to specific members via email.
*   **Supplement Store Management:**
    *   Add new supplements with name, price, and stock quantity.
    *   View the current inventory of supplements.
*   **Diet Plan Management:**
    *   Assign personalized diet plans to members based on their email.
*   **Reporting:**
    *   Export billing data to a CSV file.

**Member Panel:**
*   **Personalized Dashboard:**
    *   View assigned diet plans.
    *   Access and track their bills.
    *   Receive notifications from the gym administration.
    *   Browse available supplements.
*   **User Authentication:**
    *   Secure login and registration for members.

**General:**
*   Responsive design for various devices (desktop, tablet, mobile).
*   Intuitive and user-friendly interface.

## Technologies Used

*   **Frontend:**
    *   HTML5
    *   CSS3 (with responsive design using media queries)
    *   JavaScript (ES6+)
*   **Backend/Database:**
    *   Firebase (Authentication for user management, Firestore for database)

## Project Structure

The project is organized into the following directories and files:


Gym-Management-System/
├── assets/
│ ├── css/ 
│ │ ├── admin.css 
│ │ ├── index.css 
│ │ ├── login-register.css  
│ │ ├── member.css 
│ │ └── member_login.css 
│ └── img/ 
│ ├── about.jpg 
│ ├── gallery1.png 
│ ├── gallery2.png 
│ ├── gallery3.png 
│ ├── gallery4.png 
│ ├── gallery5.png 
│ ├── gallery6.png 
│ ├── home-img.png 
│ ├── section_bg01.png 
│ ├── team-2.jpg 
│ ├── team-3.jpg 
│ ├── team-4.jpg 
│ └── team-5.jpg 
├── js/ 
│ ├── admin.js 
│ ├── auth.js 
│ ├── firebase.js 
│ ├── member.js 
│ ├── member_login.js 
│ └── member_register.js 
├── admin.html 
├── index.html 
├── login.html 
├── member.html 
├── member_login.html 
├── member_register.html 
└── settings.json 
└── README.md


*   `assets/css/`: Contains all CSS stylesheets for different sections of the application.
*   `assets/img/`: Stores all images used in the project.
*   `js/`: Contains all JavaScript files responsible for frontend logic, Firebase interactions, and             authentication.
*   `.html` files: Represent the different pages of the web application (home, admin dashboard, member dashboard, login, registration).
*   `settings.json`: Configuration file for Live Server.
*   `README.md`: This file.

## Setup and Installation

To set up the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd Gym-Management-System
    ```

2.  **Firebase Project Setup:**
    *   Go to the [Firebase Console](https://console.firebase.google.com/).
    *   Create a new Firebase project.
    *   Add a web app to your project.
    *   Copy your Firebase configuration object.
    *   Open `js/firebase.js` and replace the placeholder `firebaseConfig` with your actual Firebase configuration.

    ```javascript
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID",
        measurementId: "YOUR_MEASUREMENT_ID"
    };
    ```

3.  **Enable Firebase Services:**
    *   In your Firebase project, enable **Authentication** (Email/Password provider).
    *   Enable **Firestore Database** and start it in production mode (or test mode for development).

4.  **Run the application:**
    *   You can open `index.html` directly in your browser, but for full functionality (especially with Firebase), it's recommended to use a local server.
    *   If you have VS Code, you can use the "Live Server" extension. Right-click `index.html` and select "Open with Live Server".
    *   Alternatively, you can use `http-server` or any other local server:
        ```bash
        npm install -g http-server
        http-server .
        ```
        Then, navigate to `http://localhost:8080` (or the port specified by your server) in your browser.

## Usage

### Admin Panel

1.  **Admin Login:**
    *   Navigate to `login.html`.
    *   Use the admin credentials to log in. (You'll need to create an admin user directly in Firebase Authentication for the first time, or implement an admin registration process if desired).
    *   **Example Admin Credentials (for initial setup in Firebase):**
        *   Email: `admin@example.com`
        *   Password: `admin123`

2.  **Dashboard Overview:**
    *   After logging in, you'll be redirected to `admin.html`, which is the main dashboard for managing gym operations.

3.  **Member Management:**
    *   Use the "Add New Member" form to register new gym members.
    *   The "All Members" section displays a dynamic list of members. You can delete members from here.
    *   Click "Export Members" to download a CSV file of all member data.

4.  **Billing Management:**
    *   Use the "Create New Bill" form to generate bills for members.

5.  **Send Notifications:**
    *   Use the "Send Notifications" form to send messages to specific members by their email.

6.  **Supplement Store:**
    *   Add new supplements to your inventory using the "Add Supplements" form.
    *   The "Store Inventory" section shows all available supplements.

7.  **Diet Plan Management:**
    *   Assign diet plans to members by entering their email and the diet plan details.

8.  **Logout:**
    *   Click the "Log out" button in the header to securely log out of the admin panel.

### Member Panel

1.  **Member Registration:**
    *   Navigate to `member_register.html`.
    *   Fill in the required details (Full Name, Email, Password, Phone, Date of Birth, Gender) to create a new member account.

2.  **Member Login:**
    *   Navigate to `member_login.html`.
    *   Enter your registered email and password to log in.

3.  **Member Dashboard:**
    *   After logging in, you'll be redirected to `member.html`.
    *   **Available Supplements:** View a list of all supplements offered by the gym.
    *   **Your Diet Plan:** See the personalized diet plan assigned by the admin.
    *   **Your Bills:** Track your payment history and outstanding bills.
    *   **Notifications:** Receive important announcements and updates from the gym.

4.  **Logout:**
    *   Click the "Log out" button in the header to securely log out of your member account.

## Contact

If you have any questions or suggestions, feel free to contact me:

*   **Your Name:** [Amit Kumar | amitkumar-oss]
*   **Email:** [kumarmit82640@gmail.com]
*   **GitHub:** [https://github.com/amitkumar-oss]
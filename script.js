const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// script.js

function registerUser() {
    // Handle user registration logic, store data in a database, etc.
    // For demonstration, use localStorage (not secure for production)
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;

    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify({ firstName, lastName, email }));

    redirectToWelcomePage();
}

function loginUser() {
    // Handle user login logic (validate credentials), retrieve user data from a database, etc.
    // For demonstration, use localStorage (not secure for production)
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Check if user data exists in localStorage
    const storedUserData = JSON.parse(localStorage.getItem('user'));

    if (storedUserData && storedUserData.email === email) {
        // User found, show welcome page
        redirectToWelcomePage();
    } else {
        // User not found or credentials incorrect, handle accordingly
        alert('Invalid credentials. Please try again.');
    }

}


function redirectToWelcomePage() {
    console.log('Attempting to redirect to the welcome page...');

    // Get the user's name from localStorage or your backend
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    const userName = storedUserData ? storedUserData.firstName : '';

    console.log('User Name:', userName);

    // Redirect to the welcome page using the full path
    window.location.assign = 'http://192.168.1.7:8080/onboarding.html';
}


function downloadMaterials() {
    // Handle downloading learning materials
    alert('Downloading learning materials...');
}

function sendToMail() {
    // Handle sending learning materials to email
    alert('Sending learning materials to your email...');
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    const userEmail = storedUserData ? storedUserData.email : '';

    if (!userEmail) {
        console.error('User email not found. Unable to send materials.');
        return;
    }

    // Make a request to the server to handle the email sending
    fetch('/send-materials', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userEmail,
                // Add any additional data or parameters needed for your server-side logic
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to send materials. Please try again later.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Materials sent successfully:', data);
            alert('Materials sent successfully! Check your email.');
        })
        .catch(error => {
            console.error('Error sending materials:', error.message);
            alert('Failed to send materials. Please try again later.');
        });

}
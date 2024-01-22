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

async function registerUser() {
    try {
        console.log('Attempting to register user...');
        const response = await fetch('http://localhost:4040/api/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: firstName.value + ' ' + lastName.value,
                email: email.value,
                password: password.value,
            }),
        });
        console.log('Response:', response);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('User successfully registered:', data);

        redirectToWelcomePage();
    } catch (error) {
        console.error('Error registering user:', error);
        // Log the specific error message from the server if available
        if (error.message) {
            console.error('Server error message:', error.message);
        }
    }
}

function redirectToWelcomePage() {
    // Redirect logic here
    window.location.href = 'frontend/onboarding.html';
}


async function loginUser() {
    try {
        const email = document.getElementById('loginEmail').value; // 
        const password = document.getElementById('loginPassword').value;

        const response = await fetch('http://localhost:4040/api/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Assuming the backend sends a JSON response
        console.log('Login successful:', data);

        // Optionally, store the token in local storage or perform other actions
        // For security, consider using secure storage mechanisms for tokens

        // Redirect to the dashboard or perform other actions
        redirectToDashboard();
    } catch (error) {
        console.error('Login unsuccessful:', error);
        // Log the specific error message from the server if available
        if (error.message) {
            console.error('Server error message:', error.message);
        }
    }
}


function redirectToWelcomePage() {
    console.log('Attempting to redirect to the welcome page...');

    // Get the user's name from localStorage or your backend
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    const userName = storedUserData ? storedUserData.firstName : '';

    console.log('User Name:', userName);

    // Redirect to the welcome page using the full path
    window.location.href = 'frontend/onboarding.html';
}


function downloadMaterials() {
    // Handle downloading learning materials
    fetch('http://localhost:4040/api/download-materials', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle the response or additional actions
            console.log('File download initiated.');
        })
        .catch(error => {
            console.error('Error initiating file download:', error);
        });
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
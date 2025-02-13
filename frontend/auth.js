const BASE_URL = "http://localhost:50001"; // Change this to your deployed backend URL later

// Signup function
async function signup(event) {
    event.preventDefault();
    
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    alert(data.message);
}

// Login function
async function login(event) {
    event.preventDefault();
    
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("token", data.token); // Store token
        window.location.href = "index.html"; // Redirect after login
    } else {
        alert(data.message);
    }
}

// Attach event listeners to forms
document.getElementById("signup-form").addEventListener("submit", signup);
document.getElementById("login-form").addEventListener("submit", login);

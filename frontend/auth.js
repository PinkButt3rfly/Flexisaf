const BASE_URL = "https://flexibackend-r3os76bcz-pinkbutterflys-projects.vercel.app"; 

// Signup function
async function signup(event) {
    event.preventDefault();
    
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    try {
        const response = await fetch(`${BASE_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        alert(data.message);

        if (response.ok) {
            window.location.href = "login.html"; // Redirect to login after successful signup
        }
    } catch (error) {
        console.error("Signup Error:", error);
        alert("An error occurred. Please try again.");
    }
}

// Login function
async function login(event) {
    event.preventDefault();
    
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
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
            alert(data.message); // Show error message if login fails
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("An error occurred. Please try again.");
    }
}


// Attach event listeners to forms
document.getElementById("signup-form").addEventListener("submit", signup);
document.getElementById("login-form").addEventListener("submit", login);

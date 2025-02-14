document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from actually submitting

        // Get input values
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Simulate authentication (replace this with real authentication logic)
        if (email && password) {
            alert("Login successful! Redirecting...");
            window.location.href = "fragrance.html"; // Redirect after login
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });
});

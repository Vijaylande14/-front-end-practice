document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    document.getElementById("usernameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("passwordError").innerText = "";
    document.getElementById("successMessage").innerText = "";
  
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    let valid = true;
  
    if (username === "" || username.length < 3) {
      document.getElementById("usernameError").innerText = "Username must be at least 3 characters.";
      valid = false;
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(email)) {
      document.getElementById("emailError").innerText = "Enter a valid email.";
      valid = false;
    }
  
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordPattern.test(password)) {
      document.getElementById("passwordError").innerText = "Password must be 6+ characters, with uppercase, lowercase, number, and symbol.";
      valid = false;
    }
  
    if (valid) {
      document.getElementById("successMessage").innerText = "Registration Successful!";
      document.getElementById("registrationForm").reset();
    }
  });
  
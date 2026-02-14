// Function to replace the name with user input
function replaceName() {
    let name = prompt("Please enter your name", "User");
    if (name != null && name !== "") {
        document.getElementById("name-display").innerText = name;
    }
}

// Function to update the current time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString(); // Format: HH:MM:SS AM/PM
    const dateString = now.toLocaleDateString(); // Format: MM/DD/YYYY
    
    document.getElementById("current-time").innerText = `${dateString} ${timeString}`;
}

// Function to validate form and display results
function validateForm(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get form values
    const name = document.getElementById("name").value;
    const dob = document.getElementById("dob").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const message = document.getElementById("message").value;
    const errorMessage = document.getElementById("error-message");

    // Reset error message
    errorMessage.innerText = "";

    // Simple validation
    if (name === "" || dob === "" || !gender || message === "") {
        errorMessage.innerText = "Please fill out all fields.";
        return false;
    }

    // Update result box
    document.getElementById("out-name").innerText = name;
    document.getElementById("out-dob").innerText = dob;
    document.getElementById("out-gender").innerText = gender.value;
    document.getElementById("out-message").innerText = message;
    
    // Update time on submit as well
    updateTime();

    // Optional: clear form
    // document.getElementById("contact-form").reset();
    
    alert("Form submitted successfully!");
    return true;
}

// Initialize script on load
window.onload = function() {
    replaceName();
    updateTime();
    
    // Update time every second
    setInterval(updateTime, 1000);
    
    // Attach event listener to form
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", validateForm);
};

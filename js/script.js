// Function to show the modal
function showModal() {
    const modal = document.getElementById('name-modal');
    const body = document.body;

    modal.classList.add('active');
    body.classList.add('blur-active');
}

// Function to handle modal submit
function handleModalSubmit() {
    const nameInput = document.getElementById('modal-name-input');
    let name = nameInput.value.trim();

    if (name === "") {
        name = "User";
    }

    document.getElementById("name-display").innerText = name;

    // Close modal
    const modal = document.getElementById('name-modal');
    const body = document.body;

    modal.classList.remove('active');
    body.classList.remove('blur-active');
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

// Navigation Logic
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');

    // Click handler for smooth scrolling
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                // Calculate offset including header height
                const headerHeight = header.offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll handler for active state
    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = header.offsetHeight;
        // Add a small buffer (e.g., 5px) to ensure activation happens exactly when or slightly after touching
        const scrollPosition = window.scrollY + headerHeight + 5;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Check if current scroll position is within this section
            // Determining if the section's top has reached the header bottom
            if (scrollPosition >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        // Update active class
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-target') === current) {
                btn.classList.add('active');
            }
        });
    });
}

// Initialize script on load
document.addEventListener('DOMContentLoaded', function () {
    // Show modal on load
    showModal();

    // Setup Navigation
    setupNavigation();

    // Update time every second
    setInterval(updateTime, 1000);
    updateTime();

    // Attach listener to modal button
    document.getElementById('modal-submit-btn').addEventListener('click', handleModalSubmit);

    // Optional: Allow enter key to submit modal
    document.getElementById('modal-name-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handleModalSubmit();
        }
    });

    // Attach event listener to form
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", validateForm);
    }

}, false);

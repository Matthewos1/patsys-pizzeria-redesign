// JS/main.js

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Bootstrap tooltips
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Handle Contact Form Submission
  const contactForm = document.getElementById("contactForm");
  const thankYouMessage = document.getElementById("thankYouMessage");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(contactForm);
    const formProps = Object.fromEntries(formData);

    fetch(contactForm.action, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(formProps),
    })
      .then((response) => {
        if (response.ok) {
          contactForm.reset();
          thankYouMessage.style.display = "block";
          setTimeout(() => {
            thankYouMessage.style.display = "none";
          }, 5000); // Hide message after 5 seconds
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              alert(data["errors"].map((error) => error["message"]).join(", "));
            } else {
              alert("Oops! There was a problem submitting your form");
            }
          });
        }
      })
      .catch((error) => {
        alert("Oops! There was a problem submitting your form");
      });
  });
});

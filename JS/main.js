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

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the Bootstrap Carousel
  var galleryCarouselElement = document.getElementById("galleryCarousel");
  var galleryCarousel = new bootstrap.Carousel(galleryCarouselElement, {
    interval: 3000, // Slide every 5 seconds
    ride: "carousel",
    pause: "hover",
    wrap: true,
  });

  // Get references to the custom control buttons
  var prevButton = document.getElementById("carouselPrev");
  var nextButton = document.getElementById("carouselNext");

  // Add event listeners to the custom control buttons
  prevButton.addEventListener("click", function () {
    galleryCarousel.prev();
  });

  nextButton.addEventListener("click", function () {
    galleryCarousel.next();
  });

  // Initialize Lightbox for Gallery
  var lightboxLinks = document.querySelectorAll('[data-bs-toggle="lightbox"]');
  lightboxLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var href = this.getAttribute("href");
      $(href).ekkoLightbox();
    });
  });
});
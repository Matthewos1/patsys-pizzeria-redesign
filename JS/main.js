// JS/main.js

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Bootstrap tooltips
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Handle Contact Form Submission (if exists)
  const contactForm = document.getElementById("contactForm");
  const thankYouMessageContact = document.getElementById(
    "thankYouMessageContact"
  );

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      const formData = new FormData(contactForm);
      const formProps = Object.fromEntries(formData);

      fetch(contactForm.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new URLSearchParams(formProps),
      })
        .then((response) => {
          if (response.ok) {
            contactForm.reset();
            if (thankYouMessageContact) {
              thankYouMessageContact.classList.remove("d-none");
              thankYouMessageContact.classList.add("d-block");
              setTimeout(() => {
                thankYouMessageContact.classList.remove("d-block");
                thankYouMessageContact.classList.add("d-none");
              }, 5000); // Hide message after 5 seconds
            }
          } else {
            response.json().then((data) => {
              if (Object.hasOwn(data, "errors")) {
                alert(
                  data["errors"].map((error) => error["message"]).join(", ")
                );
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
  }

  // Handle Reservation Form Submission
  const reservationForm = document.getElementById("reservationForm");
  const thankYouMessageReservation = document.getElementById("thankYouMessage");
  const formErrorMessage = document.getElementById("formErrorMessage");

  if (reservationForm) {
    reservationForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      const formData = new FormData(reservationForm);
      const formProps = Object.fromEntries(formData);

      // Optional: Check Honeypot Field
      if (formProps["bot-field"]) {
        // Detected as spam
        alert("Spam detected. Submission ignored.");
        return;
      }

      fetch(reservationForm.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new URLSearchParams(formProps),
      })
        .then((response) => {
          if (response.ok) {
            reservationForm.reset();
            if (thankYouMessageReservation) {
              thankYouMessageReservation.classList.remove("d-none");
              thankYouMessageReservation.classList.add("d-block");
              setTimeout(() => {
                thankYouMessageReservation.classList.remove("d-block");
                thankYouMessageReservation.classList.add("d-none");
              }, 5000); // Hide message after 5 seconds
            }
            if (formErrorMessage) {
              formErrorMessage.classList.add("d-none");
            }
          } else {
            response.json().then((data) => {
              if (Object.hasOwn(data, "errors")) {
                formErrorMessage.textContent = data["errors"]
                  .map((error) => error["message"])
                  .join(", ");
                formErrorMessage.classList.remove("d-none");
              } else {
                formErrorMessage.textContent =
                  "Oops! There was a problem submitting your form";
                formErrorMessage.classList.remove("d-none");
              }
            });
          }
        })
        .catch((error) => {
          if (formErrorMessage) {
            formErrorMessage.textContent =
              "Oops! There was a problem submitting your form";
            formErrorMessage.classList.remove("d-none");
          }
        });
    });
  }

  // Initialize Lightbox for Gallery
  var lightboxLinks = document.querySelectorAll('[data-bs-toggle="lightbox"]');
  lightboxLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var href = this.getAttribute("href");
      $(href).ekkoLightbox();
    });
  });

  // Initialize Bootstrap Carousel if present
  var galleryCarouselElement = document.getElementById("galleryCarousel");
  if (galleryCarouselElement) {
    var galleryCarousel = new bootstrap.Carousel(galleryCarouselElement, {
      interval: 3000, // Slide every 3 seconds
      ride: "carousel",
      pause: "hover",
      wrap: true,
    });

    // Get references to the custom control buttons
    var prevButton = document.getElementById("carouselPrev");
    var nextButton = document.getElementById("carouselNext");

    // Add event listeners to the custom control buttons
    if (prevButton) {
      prevButton.addEventListener("click", function () {
        galleryCarousel.prev();
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", function () {
        galleryCarousel.next();
      });
    }
  }
});

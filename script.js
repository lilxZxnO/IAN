document.addEventListener("DOMContentLoaded", () => {
  // Gestion du menu mobile
  const menuButton = document.querySelector(".menu-button");
  const mainNav = document.querySelector(".main-nav");

  if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", !isExpanded);
      mainNav.style.display = isExpanded ? "none" : "block";
    });
  }

  // Validation du formulaire
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Réinitialiser les messages d'erreur
      const errorMessages = form.querySelectorAll(".error-message");
      errorMessages.forEach((msg) => {
        msg.textContent = "";
        msg.classList.remove("visible");
      });

      let isValid = true;

      // Validation du prénom
      const firstName = form.firstName.value.trim();
      if (!firstName) {
        showError("firstName", "Le prénom est requis");
        isValid = false;
      }

      // Validation du nom
      const lastName = form.lastName.value.trim();
      if (!lastName) {
        showError("lastName", "Le nom est requis");
        isValid = false;
      }

      // Validation de l'email
      const email = form.email.value.trim();
      if (!email) {
        showError("email", "L'email est requis");
        isValid = false;
      } else if (!isValidEmail(email)) {
        showError("email", "Veuillez entrer une adresse email valide");
        isValid = false;
      }

      // Validation du service
      const service = form.service.value;
      if (!service) {
        showError("service", "Veuillez sélectionner un service");
        isValid = false;
      }

      // Validation du message
      const message = form.message.value.trim();
      if (!message) {
        showError("message", "Le message est requis");
        isValid = false;
      }

      // Validation des conditions
      const acceptTerms = form.acceptTerms.checked;
      if (!acceptTerms) {
        showError("acceptTerms", "Vous devez accepter les conditions");
        isValid = false;
      }

      if (isValid) {
        // Simulation d'envoi du formulaire
        console.log("Formulaire envoyé", {
          firstName,
          lastName,
          email,
          phone: form.phone.value.trim(),
          service,
          message,
          acceptTerms,
        });

        // Réinitialiser le formulaire
        form.reset();
        alert("Votre message a été envoyé avec succès !");
      }
    });

    // Validation en temps réel
    form.querySelectorAll("input, select, textarea").forEach((field) => {
      field.addEventListener("blur", () => {
        validateField(field);
      });
    });
  }

  // Gestion du formulaire newsletter
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = newsletterForm
        .querySelector('input[type="email"]')
        .value.trim();

      if (isValidEmail(email)) {
        console.log("Inscription newsletter:", email);
        newsletterForm.reset();
        alert("Merci pour votre inscription à la newsletter !");
      } else {
        alert("Veuillez entrer une adresse email valide");
      }
    });
  }
});

// Fonctions utilitaires
function showError(fieldId, message) {
  const errorElement = document.getElementById(`${fieldId}Error`);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add("visible");
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateField(field) {
  const fieldId = field.id;
  const value = field.value.trim();

  switch (fieldId) {
    case "firstName":
    case "lastName":
      if (!value) {
        showError(
          fieldId,
          `Le ${fieldId === "firstName" ? "prénom" : "nom"} est requis`
        );
      }
      break;
    case "email":
      if (!value) {
        showError(fieldId, "L'email est requis");
      } else if (!isValidEmail(value)) {
        showError(fieldId, "Veuillez entrer une adresse email valide");
      }
      break;
    case "service":
      if (!value) {
        showError(fieldId, "Veuillez sélectionner un service");
      }
      break;
    case "message":
      if (!value) {
        showError(fieldId, "Le message est requis");
      }
      break;
  }
}

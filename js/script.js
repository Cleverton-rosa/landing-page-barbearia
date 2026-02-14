// MENU HAMBURGER
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// THEME TOGGLE
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "dark";
body.setAttribute("data-theme", savedTheme);

// Set initial icon
if (savedTheme === "dark") {
  themeIcon.innerHTML =
    '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
} else {
  themeIcon.innerHTML =
    '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
}

// Toggle theme on click
themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Update icon
  if (newTheme === "dark") {
    themeIcon.innerHTML =
      '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
  } else {
    themeIcon.innerHTML =
      '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
  }
});

// FORM SUBMISSION
const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");

// Set minimum date to today
const dataInput = document.getElementById("data");
const today = new Date().toISOString().split("T")[0];
dataInput.setAttribute("min", today);

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(bookingForm);
  const nome = formData.get("nome");
  const whatsapp = formData.get("whatsapp");
  const servico = formData.get("servico");
  const data = formData.get("data");
  const horario = formData.get("horario");

  // Format date
  const dateObj = new Date(data + "T00:00:00");
  const dataFormatada = dateObj.toLocaleDateString("pt-BR");

  // WhatsApp message
  const message = `Olá! Gostaria de agendar um horário:
            
*Nome:* ${nome}
*Serviço:* ${servico}
*Data:* ${dataFormatada}
*Horário:* ${horario}
*WhatsApp:* ${whatsapp}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/5548999999999?text=${encodedMessage}`;

  // Show success message
  formMessage.textContent =
    "Agendamento enviado! Redirecionando para o WhatsApp...";
  formMessage.className = "form-message success";
  formMessage.style.display = "block";

  // Redirect to WhatsApp
  setTimeout(() => {
    window.open(whatsappUrl, "_blank");
    bookingForm.reset();
    formMessage.style.display = "none";
  }, 1500);
});

// SCROLL ANIMATIONS
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document
  .querySelectorAll(
    ".service-card, .testimonial-card, .team-member, .gallery-item",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// NAVBAR SCROLL EFFECT
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

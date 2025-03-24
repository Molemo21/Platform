// DOM Elements
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
const chatToggle = document.querySelector('.chat-toggle');
const chatContainer = document.getElementById('chat-container');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const chatClose = document.querySelector('.chat-close');
const termsLink = document.getElementById('terms-link');
const termsModal = document.getElementById('terms-modal');
const modalClose = document.querySelector('.modal-close');
const scrollTopBtn = document.getElementById('scroll-top');
const waitlistForm = document.getElementById('waitlist-form');

// Services Data
const services = [
  {
    name: "Plumber",
    icon: "fas fa-wrench",
    description: "Expert solutions for leak repairs, pipe installations, clogged drains, and general maintenance to keep your water systems running smoothly.",
    slug: "plumber",
    minPrice: 600
  },
  {
    name: "Electrician",
    icon: "fas fa-bolt",
    description: "Professional wiring, lighting installation, appliance repairs, and fault detection for homes and businesses.",
    slug: "electrician",
    minPrice: 600
  },
  {
    name: "Gardener",
    icon: "fas fa-leaf",
    description: "Lawn mowing, tree trimming, landscaping, and plant care to keep your outdoor space looking its best.",
    slug: "gardener",
    minPrice: 600
  },
  {
    name: "Hairdresser",
    icon: "fas fa-cut",
    description: "Professional hair cutting, styling, coloring, and treatment services for all hair types and preferences.",
    slug: "hairdresser",
    minPrice: 50
  },
  {
    name: "Painter",
    icon: "fas fa-paint-brush",
    description: "Expert interior and exterior painting services for homes and businesses, including color consultation and surface preparation.",
    slug: "painter",
    minPrice: 600
  },
  {
    name: "Spa Treatments",
    icon: "fas fa-spa",
    description: "Relaxing and rejuvenating spa services including massages, facials, body treatments, and aromatherapy.",
    slug: "spa-treatment",
    minPrice: 600
  }
];

// Hero Slideshow Images
const slideshowImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_20250302_021303.jpg-JBVHDkCNIy3G0rVGYnCRwZYCvUjXVE.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_20250302_021428.jpg-aPMEqNcvlRCxQiqJ9zP48IRVCS7YmL.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_20250302_021103_com.opera.browser_edit_160267523388564.jpg-aMce1WYH6wHgPmmQQHx2adbzO7Wo9x.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_20250302_021216_com.opera.browser_edit_160279350633874.jpg-RBmwBIoPAITPwHNc06CdcED7wW6TYo.jpeg"
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeSwitch.checked = true;
  }

  // Initialize hero slideshow
  initSlideshow();
  
  // Populate services
  populateServices();
  
  // Event listeners
  setupEventListeners();
});

// Initialize hero slideshow
function initSlideshow() {
  const slideshowContainer = document.querySelector('.hero-slideshow');
  
  // Create image elements
  slideshowImages.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = "Service provider at work";
    img.className = index === 0 ? 'active' : '';
    slideshowContainer.appendChild(img);
  });
  
  // Start slideshow
  let currentSlide = 0;
  setInterval(() => {
    const slides = slideshowContainer.querySelectorAll('img');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);
}

// Populate services section
function populateServices() {
  const servicesGrid = document.querySelector('.services-grid');
  
  services.forEach(service => {
    const serviceCard = document.createElement('div');
    serviceCard.className = 'service-card';
    serviceCard.innerHTML = `
      <h3 class="service-title"><i class="${service.icon}"></i> ${service.name}</h3>
      <p class="service-description">${service.description}</p>
      <p class="service-price">Starting from R${service.minPrice}</p>
      <a href="services/${service.slug}.html" class="btn btn-light btn-block">View Details</a>
    `;
    servicesGrid.appendChild(serviceCard);
  });
}

// Setup event listeners
function setupEventListeners() {
  // Theme toggle
  themeSwitch.addEventListener('change', function() {
    if (this.checked) {
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  });
  
  // Mobile menu toggle
  mobileMenuToggle.addEventListener('click', function() {
    mainNav.classList.toggle('active');
    this.classList.toggle('active');
  });
  
  // Chat widget
  chatToggle.addEventListener('click', function() {
    chatContainer.classList.toggle('active');
  });
  
  chatClose.addEventListener('click', function() {
    chatContainer.classList.remove('active');
  });
  
  chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (message) {
      // Add user message
      addChatMessage(message, 'user');
      chatInput.value = '';
      
      // Simulate bot response
      setTimeout(() => {
        addChatMessage("Thank you for your message. A customer service representative will get back to you shortly.", 'bot');
      }, 1000);
    }
  });
  
  // Terms modal
  termsLink.addEventListener('click', function(e) {
    e.preventDefault();
    termsModal.classList.add('active');
  });
  
  modalClose.addEventListener('click', function() {
    termsModal.classList.remove('active');
  });
  
  // Close modal when clicking outside
  termsModal.addEventListener('click', function(e) {
    if (e.target === termsModal) {
      termsModal.classList.remove('active');
    }
  });
  
  // Scroll to top button
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('active');
    } else {
      scrollTopBtn.classList.remove('active');
    }
  });
  
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Waitlist form
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      
      // Simulate form submission
      alert(`Thank you, ${name}! You've been added to our waitlist. We'll notify you at ${email} when we launch.`);
      waitlistForm.reset();
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// Add message to chat
function addChatMessage(message, role) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${role}`;
  messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
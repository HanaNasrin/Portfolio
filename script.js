const themeButton = document.querySelector('.theme');
const body = document.body;
const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'light') {
  body.classList.add('light');
  themeButton?.querySelector('i')?.classList.replace('fa-moon', 'fa-sun');
}

themeButton?.addEventListener('click', () => {
  body.classList.toggle('light');
  const isLight = body.classList.contains('light');
  localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
  const icon = themeButton.querySelector('i');
  icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
  });
});

const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const updateActiveLink = () => {
  let current = 'home';
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.id;
    }
  });

  navItems.forEach((item) => {
    const isActive = item.getAttribute('href') === `#${current}`;
    item.classList.toggle('active', isActive);
  });
};

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.show-on-scroll').forEach((element) => observer.observe(element));

const typingTarget = document.querySelector('.typing');
const words = ['Full Stack Developer', 'React & Django Developer', 'Python Enthusiast'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!typingTarget) return;
  const currentWord = words[wordIndex];
  typingTarget.textContent = currentWord.slice(0, charIndex);

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex += 1;
    setTimeout(typeLoop, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeLoop, 60);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(typeLoop, 900);
  }
}

typeLoop();

const form = document.getElementById('contact-form');
const formMessage = document.querySelector('.form-message');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (!name || !email || !message) {
    formMessage.textContent = 'Please fill in all fields before sending.';
    return;
  }

  const mailtoLink = `mailto:hanakm288@gmail.com?subject=${encodeURIComponent(`Portfolio enquiry from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  window.location.href = mailtoLink;
  formMessage.textContent = 'Thanks! Your email app should open with your message ready.';
  form.reset();
});
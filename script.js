// Мобильное меню
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}

if (mobileMenuClose && mobileMenu) {
  mobileMenuClose.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
}

// Закрытие мобильного меню при клике на ссылку
if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Закрытие мобильного меню при клике вне его
document.addEventListener('click', (e) => {
  if (mobileMenu && mobileMenu.classList.contains('open')) {
    if (!mobileMenu.contains(e.target) && !burger.contains(e.target)) {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});

// FAQ аккордеон
const faqItems = document.querySelectorAll('.faq-item');
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question, idx) => {
  question.addEventListener('click', () => {
    faqItems.forEach((item, i) => {
      if (i === idx) {
        item.classList.toggle('open');
      } else {
        item.classList.remove('open');
      }
    });
  });
});

// Аккордеон для Services
const accordionItems = document.querySelectorAll('.accordion-item');
const accordionTitles = document.querySelectorAll('.accordion-title');

accordionTitles.forEach((title, idx) => {
  title.addEventListener('click', () => {
    accordionItems.forEach((item, i) => {
      if (i === idx) {
        item.classList.toggle('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
});

// Preloader
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hide');
    setTimeout(() => preloader.remove(), 600);
  }
});

// Анимация появления секций и карточек при скролле
function revealOnScroll() {
  const revealEls = document.querySelectorAll('.section, .card');
  const windowHeight = window.innerHeight;
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Анимация прогресс-баров навыков
function animateSkillBars() {
  document.querySelectorAll('.skill-icon').forEach((icon, idx) => {
    const bar = icon.querySelector('.skill-bar-inner');
    if (icon.classList.contains('visible')) {
      // Значения ширины заданы в стилях через nth-child, но можно добавить data-width для гибкости
      // bar.style.width = bar.dataset.width || bar.style.width;
      // (уже реализовано через CSS)
    } else {
      bar.style.width = '0';
    }
  });
}
window.addEventListener('scroll', animateSkillBars);
window.addEventListener('DOMContentLoaded', animateSkillBars);

// WOW-анимация для кнопок и иконок
function animateButtonsAndIcons() {
  document.querySelectorAll('.section-dark.visible, .hero-dark.visible').forEach(section => {
    section.querySelectorAll('.btn-dark, .hero-socials a').forEach(el => {
      el.classList.add('visible');
    });
  });
  document.querySelectorAll('.skill-icon.visible img').forEach(img => {
    img.classList.add('visible');
  });
}
window.addEventListener('scroll', animateButtonsAndIcons);
window.addEventListener('DOMContentLoaded', animateButtonsAndIcons);

// Подсветка активной секции в меню
const navLinks = document.querySelectorAll('.navbar a');
const sectionIds = [
  'greeting', 'about', 'skills', 'projects', 'experience', 'education', 'certificates', 'contacts'
];
function setActiveNav() {
  let current = '';
  const scrollY = window.scrollY + 80;
  sectionIds.forEach(id => {
    const section = document.getElementById(id);
    if (section && section.offsetTop <= scrollY) {
      current = id;
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', setActiveNav);
window.addEventListener('DOMContentLoaded', setActiveNav);

// Кнопка "Наверх"
const toTopBtn = document.getElementById('toTop');
window.addEventListener('scroll', function() {
  if (window.scrollY > 300) {
    toTopBtn.classList.add('show');
  } else {
    toTopBtn.classList.remove('show');
  }
});
toTopBtn.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Liquid glass lens effect for menu
const menuList = document.getElementById('menuList');
const lens = document.getElementById('menuLens');

function moveLensToElement(el) {
  if (!el || !lens) return;
  const rect = el.getBoundingClientRect();
  const parentRect = menuList.getBoundingClientRect();
  const styles = window.getComputedStyle(menuList);
  const paddingLeft = parseFloat(styles.paddingLeft) || 0;
  const left = rect.left - parentRect.left - paddingLeft + rect.width * 0.075;
  lens.classList.add('lens-visible');
  lens.style.width = `${rect.width * 0.85}px`;
  lens.style.height = `${rect.height * 0.7}px`;
  lens.style.top = '50%';
  lens.style.left = `${left}px`;
  lens.style.transform = `translateY(-50%) scale(1.2, 1.36)`;
}

if (menuList && lens) {
  let hovered = false;
  const menuTabs = menuList.querySelectorAll('.menu__tab');

  function updateActiveLens() {
    if (!hovered) {
      const active = menuList.querySelector('.menu__tab.active');
      moveLensToElement(active);
    }
  }

  menuList.addEventListener('mouseleave', () => {
    hovered = false;
    lens.classList.remove('lens-visible');
    setTimeout(updateActiveLens, 10); // плавное исчезновение, затем возврат к активному
  });
  menuList.querySelectorAll('li').forEach((li) => {
    li.addEventListener('mouseenter', () => {
      hovered = true;
      moveLensToElement(li.querySelector('.menu__tab'));
    });
    li.addEventListener('mouseleave', (e) => {
      if (!li.parentElement.contains(e.relatedTarget)) {
        hovered = false;
        updateActiveLens();
      }
    });
  });

  // При клике по пункту меню — обновить линзу
  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      setTimeout(updateActiveLens, 100);
    });
  });

  // При загрузке и скролле — линза под активным
  window.addEventListener('DOMContentLoaded', updateActiveLens);
  window.addEventListener('scroll', updateActiveLens);
} 

// Typing effect for Hero section
const typingJob = ["Веб-дизайнер и фуллстек разработчик.", "Создаю современные сайты и интерфейсы."];

function typeEffect(element, words, speed = 90, pause = 1200, loop = true) {
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const word = words[wordIndex];
    if (!isDeleting) {
      element.textContent = word.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === word.length) {
        isDeleting = true;
        setTimeout(type, pause);
      } else {
        setTimeout(type, speed);
      }
    } else {
      element.textContent = word.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 400);
      } else {
        setTimeout(type, speed / 2);
      }
    }
  }
  type();
}

document.addEventListener('DOMContentLoaded', function() {
  const jobEl = document.getElementById('typingJob');
  if (jobEl) typeEffect(jobEl, typingJob, 60, 1600, true);

  // Add glow behind hero image
  const heroImgWrap = document.querySelector('.hero-img-wrap');
  if (heroImgWrap && !heroImgWrap.querySelector('.hero-img-glow')) {
    const glow = document.createElement('div');
    glow.className = 'hero-img-glow';
    heroImgWrap.insertBefore(glow, heroImgWrap.firstChild);
  }
});

document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', function() {
    const item = this.closest('.faq-item');
    item.classList.toggle('open');
    // Закрыть другие
    document.querySelectorAll('.faq-item').forEach(other => {
      if (other !== item) other.classList.remove('open');
    });
  });
});

document.querySelector('.footer-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  this.querySelector('.footer-form-success').style.display = 'block';
  this.reset();
  setTimeout(() => {
    this.querySelector('.footer-form-success').style.display = 'none';
  }, 3000);
});

document.querySelectorAll('.contact-card-copy').forEach(btn => {
  btn.addEventListener('click', function() {
    const value = this.getAttribute('data-copy');
    navigator.clipboard.writeText(value);
    this.textContent = '✔';
    setTimeout(() => { this.textContent = '📋'; }, 1200);
  });
});

// Project detail page enhancements
function initProjectDetailEnhancements() {
  // Add hover effects to project images
  const projectImages = document.querySelectorAll('.project-detail-img');
  projectImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.02)';
    });
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });
}

// Initialize enhancements on project detail pages
if (document.querySelector('.project-detail-card')) {
  initProjectDetailEnhancements();
} 

// Мобильная FAQ аккордеон
document.querySelectorAll('.faq-mobile-question').forEach(btn => {
  btn.addEventListener('click', function() {
    const item = this.closest('.faq-mobile-item');
    item.classList.toggle('open');
    // Закрыть другие
    document.querySelectorAll('.faq-mobile-item').forEach(other => {
      if (other !== item) other.classList.remove('open');
    });
  });
}); 
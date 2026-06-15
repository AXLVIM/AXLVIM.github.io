// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================
    // 1. Dynamic Typing Effect
    // ========================
    const words = ['Networks', 'Infrastructures', 'Environments', 'Systems'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const dynamicWordElement = document.getElementById('dynamic-word');
    
    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            dynamicWordElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            dynamicWordElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }
    
    if (dynamicWordElement) {
        typeEffect();
    }
    
    // ========================
    // 2. Navbar Scroll Effect
    // ========================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ========================
    // 3. Mobile Menu Toggle
    // ========================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // ========================
    // 4. Back to Top Button
    // ========================
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========================
    // 5. Clean Fade Parallax Effect for Hero
    // ========================
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', function() {
        let scrollValue = window.scrollY;
        if (scrollValue < window.innerHeight && heroContent) {
            heroContent.style.transform = `translateY(${scrollValue * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrollValue / (window.innerHeight * 0.7));
        }
    });
    
    // ========================
    // 6. Intersection Observer for Animations
    // ========================
    const animatedElements = document.querySelectorAll('.service-card, .about-content, .contact-form');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    if (!window.IntersectionObserver) {
        animatedElements.forEach(el => {
            el.classList.add('animate');
        });
    }

    // ========================
    // 7. Theme Switcher (Dark/Light Mode)
    // ========================
    const themeToggleBtn = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme');

    // Check for saved theme preference, default to dark mode if empty
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light' && themeToggleBtn) {
            themeToggleBtn.textContent = '☀️';
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            let theme = document.documentElement.getAttribute('data-theme');
            
            if (theme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.textContent = '🌙';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.textContent = '☀️';
            }
        });
    }

    // ========================
    // 8. Form Submission Handler
    // ========================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            formStatus.innerHTML = '<span style="color: var(--accent-color);">Sending message...</span>';
            
            setTimeout(() => {
                formStatus.innerHTML = '<span style="color: var(--accent-color);">✓ Message sent successfully! We\'ll get back to you soon.</span>';
                contactForm.reset();
                
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            }, 1500);
        });
    }
});
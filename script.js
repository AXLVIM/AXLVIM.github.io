// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================
    // 1. Dynamic Typing Effect
    // ========================
    const words = ['Websites', 'Interfaces', 'Experiences', 'Dreams'];
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
    
    typeEffect();
    
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
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ========================
    // 4. Back to Top Button
    // ========================
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========================
    // 5. Smooth Parallax Effect
    // ========================
    const aboutSection = document.querySelector('.about');
    const servicesSection = document.querySelector('.services');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        if (aboutSection) {
            const aboutTop = aboutSection.getBoundingClientRect().top + window.scrollY;
            if (window.scrollY + window.innerHeight > aboutTop) {
                const offset = scrolled * 0.1;
                aboutSection.style.transform = `translateY(${offset}px)`;
            }
        }
        
        if (servicesSection) {
            const servicesTop = servicesSection.getBoundingClientRect().top + window.scrollY;
            if (window.scrollY + window.innerHeight > servicesTop) {
                const offset = scrolled * 0.05;
                servicesSection.style.transform = `translateY(${offset}px)`;
            }
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
            // Optional: keep observing? No, we can unobserve after animation
            animationObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 }); // Trigger when 20% of element is visible

animatedElements.forEach(el => {
    animationObserver.observe(el);
});

// Fallback: if observer fails or browser doesn't support it, show all elements anyway
if (!window.IntersectionObserver) {
    animatedElements.forEach(el => {
        el.classList.add('animate');
    });
}
    // ========================
    // 7. Form Submission Handler
    // ========================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        formStatus.innerHTML = '<span style="color: #00ff88;">Sending message...</span>';
        
        // Simulate form submission with a delay
        setTimeout(() => {
            formStatus.innerHTML = '<span style="color: #00ff88;">✓ Message sent successfully! We\'ll get back to you soon.</span>';
            contactForm.reset();
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        }, 1500);
    });
});

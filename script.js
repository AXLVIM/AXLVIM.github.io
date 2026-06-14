// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================
    // 1. Dynamic Typing Effect (UPDATED FOR CYBERSECURITY)
    // ========================
    const words = ['Networks', 'Infrastructures', 'Environments', 'Protocols'];
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
    // 3. Mobile Hamburger Menu
    // ========================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ========================
    // 4. Back To Top Button
    // ========================
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
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
    // 5. Smooth Parallax Effect for Hero
    // ========================
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', function() {
        let scrollValue = window.scrollY;
        if (scrollValue < window.innerHeight && heroContent) {
            heroContent.style.transform = `translateY(${scrollValue * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrollValue / (window.innerHeight * 0.8));
        }
    });
    
    // ========================
    // 6. Intersection Observer for Animations (UPDATED TO CAPTURE ALL CARDS)
    // ========================
    const animatedElements = document.querySelectorAll('.service-card, .about-content, .contact-form');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Reduced slightly to ensure cards trigger animations cleanly
    
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
    
    if (contactForm) {
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
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.service-card, .stat-item, .contact-item');
    const form = document.querySelector('.form');
    const emailSignup = document.querySelector('.signup-btn');

    let isScrolling = false;

    function scrollToContact() {
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    window.scrollToContact = scrollToContact;

    function handleScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const scrollY = window.pageYOffset;
                
                if (scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                updateActiveNavLink();
                animateElementsOnScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }

    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    function animateElementsOnScroll() {
        const elements = document.querySelectorAll('.service-card, .stat-item, .contact-item, .product-teaser');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    function initializeAnimatedElements() {
        const elements = document.querySelectorAll('.service-card, .stat-item, .contact-item, .product-teaser');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        });
    }

    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    function smoothScrollToSection(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                closeMobileMenu();
            }
        }
    }

    function addHoverEffects() {
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.transition = 'all 0.2s ease-out';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.transition = 'all 0.2s ease-out';
            });
        });
    }

    function addButtonAnimations() {
        const buttons = document.querySelectorAll('.cta-button, .signup-btn, .form-submit');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
            
            button.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(0) scale(0.98)';
            });
            
            button.addEventListener('mouseup', function() {
                this.style.transform = 'translateY(-2px) scale(1)';
            });
        });
    }

    function handleFormSubmission() {
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = this.querySelector('.form-submit');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitBtn.style.background = 'var(--secondary-color)';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        this.reset();
                    }, 2000);
                }, 1500);
            });
        }
    }

    function handleEmailSignup() {
        if (emailSignup) {
            emailSignup.addEventListener('click', function(e) {
                e.preventDefault();
                
                const emailInput = document.querySelector('.email-input');
                const email = emailInput.value.trim();
                
                if (!email) {
                    emailInput.style.borderColor = '#ef4444';
                    emailInput.setAttribute('placeholder', 'Please enter your email');
                    
                    setTimeout(() => {
                        emailInput.style.borderColor = '';
                        emailInput.setAttribute('placeholder', 'Enter your email for updates');
                    }, 3000);
                    
                    return;
                }
                
                if (!isValidEmail(email)) {
                    emailInput.style.borderColor = '#ef4444';
                    emailInput.value = '';
                    emailInput.setAttribute('placeholder', 'Please enter a valid email');
                    
                    setTimeout(() => {
                        emailInput.style.borderColor = '';
                        emailInput.setAttribute('placeholder', 'Enter your email for updates');
                    }, 3000);
                    
                    return;
                }
                
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                    emailInput.value = '';
                    emailInput.setAttribute('placeholder', 'Thank you for subscribing!');
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.disabled = false;
                        emailInput.setAttribute('placeholder', 'Enter your email for updates');
                    }, 3000);
                }, 1500);
            });
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function addParallaxEffect() {
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.5;
                
                heroBackground.style.transform = `translateY(${parallax}px)`;
            });
        }
    }


    function addCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');
        let hasCounted = false;
        
        const countUp = (element, target) => {
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    element.textContent = target === 100 ? '100%' : target === '∞' ? '∞' : '🇮🇳';
                    clearInterval(timer);
                } else {
                    if (target === 100) {
                        element.textContent = Math.floor(current) + '%';
                    }
                }
            }, 20);
        };
        
        const aboutSection = document.getElementById('about');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasCounted) {
                    hasCounted = true;
                    
                    counters.forEach((counter, index) => {
                        setTimeout(() => {
                            if (index === 0) {
                                countUp(counter, 100);
                            }
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        if (aboutSection) {
            observer.observe(aboutSection);
        }
    }

    function addCardStaggerAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.service-card');
                    
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.2 });
        
        const servicesSection = document.getElementById('what-we-do');
        if (servicesSection) {
            observer.observe(servicesSection);
        }
    }

    function initializeGradientOrbs() {
        const orbs = document.querySelectorAll('.gradient-orb');
        
        orbs.forEach((orb, index) => {
            orb.style.animationDelay = `${index * 2}s`;
            orb.style.animationDuration = `${8 + index * 2}s`;
        });
    }

    function addMouseTracker() {
        const floatingCards = document.querySelector('.floating-cards');
        
        if (floatingCards) {
            document.addEventListener('mousemove', (e) => {
                const cards = floatingCards.querySelectorAll('.card');
                const { clientX, clientY } = e;
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                
                cards.forEach((card) => {
                    const moveX = (clientX - centerX) * 0.01;
                    const moveY = (clientY - centerY) * 0.01;
                    
                    card.style.transform += ` translate(${moveX}px, ${moveY}px)`;
                });
            });
        }
    }

    hamburger.addEventListener('click', toggleMobileMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', smoothScrollToSection);
    });

    window.addEventListener('scroll', handleScroll);

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });

    initializeAnimatedElements();
    addHoverEffects();
    addButtonAnimations();
    handleFormSubmission();
    handleEmailSignup();
    addParallaxEffect();
    addCounterAnimation();
    addCardStaggerAnimation();
    initializeGradientOrbs();
    addMouseTracker();
    
    animateElementsOnScroll();
    updateActiveNavLink();

    setTimeout(() => {
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
        });
    }, 100);
});
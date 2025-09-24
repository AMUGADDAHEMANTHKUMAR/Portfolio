// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initScrollAnimations();
    initSmoothScrolling();
    initHeroAnimations();
    initExpertiseCards();
    initCaseStudyFilters();
    initContactForm();
    initMobileMenu();
    initProgressBars();
    initParallaxEffects();
    initPerformanceOptimizations();
    initAccessibilityFeatures();
    initAnalytics();
    
    // Add loading complete class
    document.body.classList.add('loaded');
});

// Navbar Functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScrollTop = 0;
    
    // Scroll behavior
    function handleNavbarScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class after 50px
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (mobile)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
    
    // Throttled scroll handler
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleNavbarScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Active section highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

// Mobile Menu
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;
    
    if (!navToggle || !navLinks) return;
    
    navToggle.addEventListener('click', function() {
        menuOpen = !menuOpen;
        
        // Toggle mobile menu
        if (menuOpen) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(15, 23, 42, 0.98)';
            navLinks.style.padding = '20px';
            navLinks.style.backdropFilter = 'blur(10px)';
            navLinks.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)';
            
            // Animate hamburger
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            navLinks.style.display = '';
            navLinks.style.flexDirection = '';
            navLinks.style.position = '';
            navLinks.style.top = '';
            navLinks.style.left = '';
            navLinks.style.right = '';
            navLinks.style.background = '';
            navLinks.style.padding = '';
            navLinks.style.backdropFilter = '';
            navLinks.style.borderTop = '';
            
            // Reset hamburger
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && menuOpen) {
                navToggle.click();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (menuOpen && !navToggle.contains(event.target) && !navLinks.contains(event.target)) {
            navToggle.click();
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations
                if (entry.target.classList.contains('expertise-card')) {
                    animateExpertiseCard(entry.target);
                }
                
                if (entry.target.classList.contains('case-study-card')) {
                    animateCaseStudyCard(entry.target);
                }
                
                if (entry.target.classList.contains('testimonial-card')) {
                    animateTestimonialCard(entry.target);
                }
                
                // Animate progress bars in expertise section
                if (entry.target.classList.contains('proficiency')) {
                    animateProgressBar(entry.target);
                }
                
                // Counter animations
                if (entry.target.classList.contains('metric-value')) {
                    animateCounter(entry.target);
                }
                
                if (entry.target.classList.contains('badge-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    const animatedElements = document.querySelectorAll(`
        .section-title, .section-subtitle, .hero-content > *,
        .story-text, .achievement-card, .expertise-card,
        .case-study-card, .testimonial-card, .experience-content,
        .blog-card, .cert-card, .speaking-card, .contact-info,
        .contact-form-container, .proficiency, .metric-value, .badge-number
    `);
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Hero Animations
function initHeroAnimations() {
    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Add subtle floating animation to badges
        const badges = document.querySelectorAll('.badge');
        badges.forEach((badge, index) => {
            badge.style.animationDelay = `${index * 0.5}s`;
        });
        
        // Parallax effect for hero background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroBackground.style.transform = `translateY(${rate}px)`;
            });
        }
    }
}

// Expertise Cards
function initExpertiseCards() {
    const expertiseCards = document.querySelectorAll('.expertise-card');
    
    expertiseCards.forEach(card => {
        // Hover effect with mouse tracking
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
        
        // Click to expand functionality
        card.addEventListener('click', function() {
            const services = card.querySelector('.expertise-services');
            const tech = card.querySelector('.expertise-tech');
            
            if (services && tech) {
                const isExpanded = card.classList.contains('expanded');
                
                // Close all other cards
                expertiseCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('expanded');
                    }
                });
                
                // Toggle current card
                card.classList.toggle('expanded');
                
                // Animate height
                if (!isExpanded) {
                    services.style.maxHeight = services.scrollHeight + 'px';
                    tech.style.maxHeight = tech.scrollHeight + 'px';
                } else {
                    services.style.maxHeight = '0';
                    tech.style.maxHeight = '0';
                }
            }
        });
    });
}

// Case Study Filters
function initCaseStudyFilters() {
    // Create filter buttons
    const caseStudiesSection = document.querySelector('.case-studies-section');
    if (!caseStudiesSection) return;
    
    const filterContainer = document.createElement('div');
    filterContainer.className = 'case-study-filters';
    filterContainer.innerHTML = `
        <button class="filter-btn active" data-filter="all">All Projects</button>
        <button class="filter-btn" data-filter="analytics">Data Analytics</button>
        <button class="filter-btn" data-filter="sql">SQL Optimization</button>
        <button class="filter-btn" data-filter="powerbi">Power BI</button>
        <button class="filter-btn" data-filter="pega">PEGA Development</button>
        <button class="filter-btn" data-filter="python">Python AI/ML</button>
        <button class="filter-btn" data-filter="integrated">Integrated Solutions</button>
    `;
    
    // Insert before case studies grid
    const caseStudiesGrid = document.querySelector('.case-studies-grid');
    caseStudiesGrid.parentNode.insertBefore(filterContainer, caseStudiesGrid);
    
    // Add filter styles
    const filterStyles = `
        .case-study-filters {
            display: flex;
            justify-content: center;
            gap: 12px;
            margin-bottom: 32px;
            flex-wrap: wrap;
        }
        .filter-btn {
            padding: 8px 16px;
            border: 2px solid var(--color-border);
            background: var(--color-surface);
            color: var(--color-text);
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .filter-btn:hover {
            border-color: var(--color-primary);
            color: var(--color-primary);
        }
        .filter-btn.active {
            background: var(--color-primary);
            border-color: var(--color-primary);
            color: var(--color-btn-primary-text);
        }
        @media (max-width: 640px) {
            .case-study-filters {
                gap: 8px;
            }
            .filter-btn {
                padding: 6px 12px;
                font-size: 12px;
            }
        }
    `;
    
    // Add styles to head
    const style = document.createElement('style');
    style.textContent = filterStyles;
    document.head.appendChild(style);
    
    // Filter functionality
    const filterButtons = filterContainer.querySelectorAll('.filter-btn');
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards
            caseStudyCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Form validation
    const validateField = (field) => {
        const value = field.value.trim();
        const fieldName = field.name || field.id;
        let isValid = true;
        let message = '';
        
        // Remove existing error
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        field.classList.remove('error');
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }
        }
        
        // Show error if invalid
        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.style.color = 'var(--color-error)';
            errorDiv.style.fontSize = 'var(--font-size-sm)';
            errorDiv.style.marginTop = 'var(--space-4)';
            field.parentNode.appendChild(errorDiv);
        }
        
        return isValid;
    };
    
    // Real-time validation
    const formFields = contactForm.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            // Remove error styling on input
            field.classList.remove('error');
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isFormValid = true;
        formFields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            // Scroll to first error
            const firstError = contactForm.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Disable submit button and show loading
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        submitButton.style.opacity = '0.7';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showFormSuccess();
            contactForm.reset();
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            submitButton.style.opacity = '';
            
            // Track conversion
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'Contact',
                    event_label: 'Portfolio Contact Form'
                });
            }
        }, 2000);
    });
    
    function showFormSuccess() {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <div style="background: rgba(var(--color-success-rgb), 0.1); border: 1px solid rgba(var(--color-success-rgb), 0.3); padding: 16px; border-radius: 8px; color: var(--color-success); text-align: center; margin-top: 16px;">
                <strong>Thank you for your message!</strong><br>
                I'll get back to you within 4 hours.
            </div>
        `;
        
        contactForm.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
}

// Progress Bars Animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.proficiency[data-proficiency]');
    
    progressBars.forEach(bar => {
        const targetValue = parseInt(bar.getAttribute('data-proficiency'));
        let currentValue = 0;
        const increment = targetValue / 50;
        
        const animateProgress = () => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
            }
            
            // Create visual progress bar
            if (!bar.querySelector('.progress-bar')) {
                const progressContainer = document.createElement('div');
                progressContainer.className = 'progress-container';
                progressContainer.innerHTML = `
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                `;
                
                // Add styles
                const progressStyles = `
                    .progress-container {
                        width: 60px;
                        height: 6px;
                        background: rgba(var(--color-primary-rgb), 0.2);
                        border-radius: 3px;
                        overflow: hidden;
                        margin-left: 8px;
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .progress-fill {
                        height: 100%;
                        background: var(--color-primary);
                        border-radius: 3px;
                        transition: width 0.3s ease;
                        width: 0%;
                    }
                `;
                
                if (!document.getElementById('progress-styles')) {
                    const style = document.createElement('style');
                    style.id = 'progress-styles';
                    style.textContent = progressStyles;
                    document.head.appendChild(style);
                }
                
                bar.appendChild(progressContainer);
            }
            
            const progressFill = bar.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = `${currentValue}%`;
            }
            
            if (currentValue < targetValue) {
                requestAnimationFrame(animateProgress);
            }
        };
        
        // Start animation when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgress();
                    observer.unobserve(bar);
                }
            });
        });
        
        observer.observe(bar);
    });
}

// Animation Functions
function animateExpertiseCard(card) {
    const icon = card.querySelector('.expertise-icon');
    if (icon) {
        icon.style.animation = 'bounce 1s ease-out';
    }
}

function animateCaseStudyCard(card) {
    const metrics = card.querySelectorAll('.metric-value');
    metrics.forEach((metric, index) => {
        setTimeout(() => {
            metric.style.transform = 'scale(1.1)';
            setTimeout(() => {
                metric.style.transform = '';
            }, 200);
        }, index * 100);
    });
}

function animateTestimonialCard(card) {
    const stars = card.querySelector('.stars');
    if (stars) {
        stars.style.animation = 'pulse 1s ease-out';
    }
}

function animateProgressBar(element) {
    // This is handled in initProgressBars
}

function animateCounter(element) {
    const text = element.textContent;
    const hasSymbol = /[^\d]/.test(text);
    const number = parseInt(text.replace(/\D/g, ''));
    
    if (isNaN(number)) return;
    
    let current = 0;
    const increment = number / 30;
    const duration = 1000;
    const stepTime = duration / 30;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current).toString();
        if (hasSymbol) {
            // Preserve original symbols
            displayValue = text.replace(/\d+/, displayValue);
        }
        element.textContent = displayValue;
    }, stepTime);
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Enhanced smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, this.getAttribute('href'));
                }
                
                // Track navigation
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'navigation', {
                        event_category: 'User Interaction',
                        event_label: this.getAttribute('href')
                    });
                }
            }
        });
    });
    
    // CTA button actions
    document.querySelectorAll('.btn--primary').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.id === 'primaryCTA' || this.textContent.includes('Consultation')) {
                e.preventDefault();
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    document.querySelectorAll('.btn--outline').forEach(button => {
        if (button.id === 'secondaryCTA' || button.textContent.includes('Explore')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('case-studies').scrollIntoView({ behavior: 'smooth' });
            });
        }
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    window.addEventListener('scroll', throttle(updateParallax, 16));
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy load images if any exist
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
    
    // Service Worker registration for caching
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Accessibility Features
function initAccessibilityFeatures() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#hero';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link sr-only';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
        
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            const navToggle = document.querySelector('.nav-toggle');
            if (navToggle && document.querySelector('.nav-links').style.display === 'flex') {
                navToggle.click();
            }
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add keyboard navigation styles
    const keyboardStyles = `
        .keyboard-navigation *:focus {
            outline: 3px solid var(--color-primary) !important;
            outline-offset: 2px !important;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = keyboardStyles;
    document.head.appendChild(style);
    
    // ARIA live region for dynamic content updates
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
    
    // Announce dynamic content changes
    window.announceToScreenReader = function(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    };
}

// Analytics Integration
function initAnalytics() {
    // Google Analytics 4 setup
    if (typeof gtag !== 'undefined') {
        // Track page view
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href
        });
        
        // Track scroll depth
        let maxScroll = 0;
        const trackScrollDepth = () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
                maxScroll = scrollPercent;
                gtag('event', 'scroll_depth', {
                    event_category: 'User Engagement',
                    event_label: `${scrollPercent}%`,
                    value: scrollPercent
                });
            }
        };
        
        window.addEventListener('scroll', throttle(trackScrollDepth, 1000));
        
        // Track time on page
        let startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000);
            gtag('event', 'time_on_page', {
                event_category: 'User Engagement',
                event_label: 'Portfolio',
                value: timeOnPage
            });
        });
        
        // Track CTA clicks
        document.querySelectorAll('.btn--primary').forEach(button => {
            button.addEventListener('click', function() {
                gtag('event', 'cta_click', {
                    event_category: 'Conversion',
                    event_label: this.textContent.trim()
                });
            });
        });
        
        // Track case study views
        document.querySelectorAll('.case-study-card').forEach(card => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const title = entry.target.querySelector('h3').textContent;
                        gtag('event', 'case_study_view', {
                            event_category: 'Portfolio Engagement',
                            event_label: title
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(card);
        });
    }
    
    // Performance tracking
    if (typeof performance !== 'undefined' && performance.getEntriesByType) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData && typeof gtag !== 'undefined') {
                    gtag('event', 'page_load_time', {
                        event_category: 'Performance',
                        event_label: 'Portfolio',
                        value: Math.round(perfData.loadEventEnd - perfData.fetchStart)
                    });
                }
            }, 1000);
        });
    }
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Enhanced Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            // Add ripple keyframe if not exists
            if (!document.getElementById('ripple-animation')) {
                const style = document.createElement('style');
                style.id = 'ripple-animation';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(2);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Copy email functionality
    const emailElements = document.querySelectorAll('[href^="mailto:"]');
    emailElements.forEach(element => {
        element.addEventListener('click', function(e) {
            if (navigator.clipboard) {
                e.preventDefault();
                const email = this.href.replace('mailto:', '');
                navigator.clipboard.writeText(email).then(() => {
                    if (window.announceToScreenReader) {
                        window.announceToScreenReader('Email address copied to clipboard');
                    }
                    
                    // Show tooltip
                    const tooltip = document.createElement('div');
                    tooltip.textContent = 'Email copied!';
                    tooltip.style.cssText = `
                        position: fixed;
                        background: var(--color-success);
                        color: white;
                        padding: 8px 12px;
                        border-radius: 4px;
                        font-size: 14px;
                        z-index: 10000;
                        pointer-events: none;
                        animation: fadeInOut 2s ease-in-out;
                    `;
                    
                    const rect = this.getBoundingClientRect();
                    tooltip.style.left = rect.left + 'px';
                    tooltip.style.top = (rect.top - 40) + 'px';
                    
                    document.body.appendChild(tooltip);
                    
                    setTimeout(() => tooltip.remove(), 2000);
                });
            }
        });
    });
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
    
    // Track errors if analytics available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: e.error?.message || 'Unknown error',
            fatal: false
        });
    }
});

// Performance monitoring
if (typeof PerformanceObserver !== 'undefined') {
    try {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.entryType === 'largest-contentful-paint') {
                    console.log('LCP:', entry.startTime);
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'web_vitals', {
                            event_category: 'Performance',
                            event_label: 'LCP',
                            value: Math.round(entry.startTime)
                        });
                    }
                }
            });
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
        console.log('Performance Observer not fully supported');
    }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        throttle,
        debounce,
        initNavbar,
        initScrollAnimations,
        initContactForm
    };
}
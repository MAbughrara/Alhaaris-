document.addEventListener('DOMContentLoaded', function() {
    // Language switching functionality
    const langSwitchButtons = document.querySelectorAll('.lang-switch');
    const htmlRoot = document.getElementById('htmlRoot');
    const bootstrapCSS = document.getElementById('bootstrap-css');

    // Set initial active state based on current language
    const currentLang = htmlRoot.getAttribute('lang') || 'ar';
    langSwitchButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        }
    });

    // Handle language switching
    langSwitchButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Update HTML lang attribute and direction
            htmlRoot.setAttribute('lang', lang);
            
            // Switch Bootstrap CSS (RTL for Arabic, LTR for English)
            if (lang === 'ar') {
                bootstrapCSS.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css');
            } else {
                bootstrapCSS.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
            }
            
            // Update active state of language buttons
            langSwitchButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Initialize logo variables for transportation effect
    const heroLogoContainer = document.getElementById('hero-logo-container');
    const navbarLogo = document.querySelector('.navbar-brand .logo-img');
    let logoTransported = false;
    let isTransitioning = false; // Prevent multiple transitions at once

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 75,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Navbar scroll effect with fancy logo transportation
    const navbar = document.querySelector('.navbar');
    
    // Debounce function to prevent excessive scroll event handling
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
    
    // Handle the logo transportation effect
    const handleLogoTransportation = debounce(() => {
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition > 150) {
            // Scrolling down - transport logo to navbar
            navbar.classList.add('shadow');
            
            if (heroLogoContainer && !logoTransported && !isTransitioning) {
                isTransitioning = true;
                
                // Step 1: Move logo to fixed position
                heroLogoContainer.classList.add('fixed');
                
                // Step 2: Wait for transition, then swap logos
                setTimeout(() => {
                    // Show navbar logo
                    if (navbarLogo) {
                        navbarLogo.classList.add('visible');
                    }
                    
                    // Step 3: Hide hero logo after navbar logo is visible
                    setTimeout(() => {
                        if (heroLogoContainer) {
                            heroLogoContainer.style.opacity = '0';
                            logoTransported = true;
                            isTransitioning = false;
                        }
                    }, 300);
                }, 600);
            }
        } else {
            // Scrolling up - return logo to hero section
            navbar.classList.remove('shadow');
            
            if (heroLogoContainer && logoTransported && !isTransitioning) {
                isTransitioning = true;
                
                // Step 1: Immediately make hero logo visible again
                heroLogoContainer.style.opacity = '1';
                
                // Step 2: Hide the navbar logo
                if (navbarLogo) {
                    navbarLogo.classList.remove('visible');
                }
                
                // Step 3: After a delay, return logo to its original position
                setTimeout(() => {
                    if (heroLogoContainer) {
                        heroLogoContainer.classList.remove('fixed');
                        logoTransported = false;
                        isTransitioning = false;
                    }
                }, 300);
            }
        }
    }, 50);
    
    // Attach the scroll handler
    window.addEventListener('scroll', handleLogoTransportation);
    
    // Initialize logo state based on scroll position when page loads
    handleLogoTransportation();
    
    // Form submission (prevent default for demo)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.');
            contactForm.reset();
        });
    }
});

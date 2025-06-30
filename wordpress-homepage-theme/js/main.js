/**
 * Sports Heroes Homepage Theme JavaScript
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        
        // Initialize all interactive features
        initSmoothScrolling();
        initAnimations();
        initMobileMenu();
        initCTATracking();
        
    });

    /**
     * Smooth scrolling for anchor links
     */
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Initialize scroll-based animations
     */
    function initAnimations() {
        // Create intersection observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate in
        const animateElements = document.querySelectorAll('.card, .step, .benefit-item');
        animateElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });

        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .animate-on-scroll.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Stagger animation delays */
            .grid .animate-on-scroll:nth-child(1) { transition-delay: 0.1s; }
            .grid .animate-on-scroll:nth-child(2) { transition-delay: 0.2s; }
            .grid .animate-on-scroll:nth-child(3) { transition-delay: 0.3s; }
            .grid .animate-on-scroll:nth-child(4) { transition-delay: 0.4s; }
            .grid .animate-on-scroll:nth-child(5) { transition-delay: 0.5s; }
            .grid .animate-on-scroll:nth-child(6) { transition-delay: 0.6s; }
        `;
        document.head.appendChild(style);
    }

    /**
     * Mobile menu functionality
     */
    function initMobileMenu() {
        const header = document.querySelector('.site-header');
        const nav = document.querySelector('.main-nav');
        
        if (!nav) return;

        // Create mobile menu toggle button
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        menuToggle.setAttribute('aria-label', 'Toggle mobile menu');
        
        // Insert toggle button
        const headerContent = document.querySelector('.header-content');
        if (headerContent) {
            headerContent.appendChild(menuToggle);
        }

        // Toggle menu on button click
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-menu-open');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('mobile-menu-active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('mobile-menu-open');
                menuToggle.classList.remove('active');
                document.body.classList.remove('mobile-menu-active');
            }
        });

        // Add mobile menu styles
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            .mobile-menu-toggle {
                display: none;
                flex-direction: column;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.5rem;
                gap: 0.25rem;
            }
            
            .mobile-menu-toggle span {
                width: 25px;
                height: 3px;
                background: var(--foreground);
                transition: all 0.3s ease;
                transform-origin: center;
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(6px, 6px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(6px, -6px);
            }
            
            @media (max-width: 768px) {
                .mobile-menu-toggle {
                    display: flex;
                }
                
                .main-nav {
                    position: fixed;
                    top: 0;
                    right: -100%;
                    width: 80%;
                    max-width: 300px;
                    height: 100vh;
                    background: var(--card-background);
                    border-left: 1px solid var(--border);
                    transition: right 0.3s ease;
                    z-index: 1000;
                    padding: 2rem 1rem;
                }
                
                .main-nav.mobile-menu-open {
                    right: 0;
                }
                
                .main-nav ul {
                    flex-direction: column;
                    gap: 1rem;
                    margin-top: 2rem;
                }
                
                .main-nav ul li a {
                    display: block;
                    padding: 0.75rem 1rem;
                    border-radius: 0.5rem;
                    transition: background-color 0.3s ease;
                }
                
                .main-nav ul li a:hover {
                    background: var(--smokey-gray);
                }
                
                .mobile-menu-active {
                    overflow: hidden;
                }
                
                .mobile-menu-active::before {
                    content: '';
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 999;
                }
            }
        `;
        document.head.appendChild(mobileStyle);
    }

    /**
     * Track CTA button clicks for analytics
     */
    function initCTATracking() {
        const ctaButtons = document.querySelectorAll('.btn-primary');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', function() {
                const buttonText = this.textContent.trim();
                const section = this.closest('section')?.className || 'unknown';
                
                // Track with Google Analytics if available
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'cta_click', {
                        'button_text': buttonText,
                        'section': section,
                        'page_title': document.title
                    });
                }
                
                // Track with custom analytics if available
                if (typeof analytics !== 'undefined') {
                    analytics.track('CTA Clicked', {
                        buttonText: buttonText,
                        section: section,
                        pageTitle: document.title
                    });
                }
                
                console.log('CTA clicked:', buttonText, 'in section:', section);
            });
        });
    }

    /**
     * Add loading states to external links
     */
    function initExternalLinks() {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        
        externalLinks.forEach(link => {
            link.addEventListener('click', function() {
                const originalText = this.innerHTML;
                this.innerHTML = originalText.replace('🚀', '⏳');
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    }

    // Initialize external links when DOM is ready
    document.addEventListener('DOMContentLoaded', initExternalLinks);

})();

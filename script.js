document.addEventListener('DOMContentLoaded', () => {
    const navLinksContainer = document.getElementById('nav-links');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('main section[id]');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const taglineElement = document.getElementById('tagline');
    const animatedSections = document.querySelectorAll('.animated-section');

    // --- 3D Hero Elements ---
    const heroSection = document.getElementById('hero');
    const hero3DWrap = document.querySelector('.hero-3d-wrap');
    const heroContentWrapper = document.querySelector('.hero-content-wrapper');
    const particles = document.querySelectorAll('.hero-bg-particle');

    // --- Smooth Scroll for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate offset for fixed header
                const headerOffset = document.querySelector('header').offsetHeight || 90;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                if (navLinksContainer.classList.contains('open')) {
                    navLinksContainer.classList.remove('open');
                    hamburgerMenu.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // --- Hamburger Menu Toggle ---
    if (hamburgerMenu && navLinksContainer) {
        hamburgerMenu.addEventListener('click', () => {
            navLinksContainer.classList.toggle('open');
            if (navLinksContainer.classList.contains('open')) {
                hamburgerMenu.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                hamburgerMenu.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // --- Active Navigation Link Highlighting on Scroll ---
    function updateActiveNavLink() {
        let currentSectionId = '';
        const headerHeight = document.querySelector('header').offsetHeight || 90;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50; // Adjust offset for accuracy
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
         // If scrolled to the very top, 'hero' should be active
        if (pageYOffset < (sections[0].offsetTop - headerHeight - 50) || currentSectionId === '') {
            currentSectionId = 'hero';
        }


        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    }

    // --- Scroll-to-Top Button Visibility ---
    function toggleScrollToTopButton() {
        if (scrollToTopBtn) {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                scrollToTopBtn.style.display = "flex";
                scrollToTopBtn.style.opacity = "1";
            } else {
                scrollToTopBtn.style.opacity = "0";
                setTimeout(() => {
                    if (scrollToTopBtn.style.opacity === "0") {
                         scrollToTopBtn.style.display = "none";
                    }
                }, 300);
            }
        }
    }

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Typing Effect for Hero Tagline ---
    if (taglineElement) {
        const text = taglineElement.dataset.text;
        let index = 0;
        taglineElement.textContent = '';
        function type() {
            if (index < text.length) {
                taglineElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            }
        }
        setTimeout(type, 500);
    }

    // --- Fade-in Elements on Scroll (Intersection Observer) ---
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);
    animatedSections.forEach(section => { observer.observe(section); });

    // --- 3D Hero Parallax Effect ---
    if (heroSection && hero3DWrap && window.matchMedia('(min-width: 769px)').matches) { // Only apply on larger screens
        const TILT_STRENGTH = 8;
        const CONTENT_PARALLAX_STRENGTH = 0.02;
        const PARTICLE_PARALLAX_STRENGTH_MULTIPLIER = 0.04;

        heroSection.addEventListener('mousemove', (e) => {
            if (!hero3DWrap || !heroContentWrapper) return; // Safety check

            const rect = heroSection.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const rotateY = TILT_STRENGTH * ((mouseX / rect.width) - 0.5);
            const rotateX = -TILT_STRENGTH * ((mouseY / rect.height) - 0.5);
            hero3DWrap.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            const contentOffsetX = (mouseX - rect.width / 2) * CONTENT_PARALLAX_STRENGTH;
            const contentOffsetY = (mouseY - rect.height / 2) * CONTENT_PARALLAX_STRENGTH;
            heroContentWrapper.style.transform = `translateZ(60px) translateX(${contentOffsetX}px) translateY(${contentOffsetY}px)`;

            particles.forEach(particle => {
                const currentTransform = getComputedStyle(particle).transform;
                let zValue = '0px';
                if (currentTransform && currentTransform !== 'none') {
                    try { // DOMMatrix might not be available or fail on some transforms
                        const matrix = new DOMMatrix(currentTransform);
                        zValue = `${matrix.m43}px`;
                    } catch (err) {
                        // Fallback or default zValue if DOMMatrix fails
                        // For simplicity, could use a data-depth attribute on particles if DOMMatrix is problematic
                        console.warn("Could not parse particle Z transform, using default. Particle:", particle, err);
                    }
                }
                
                // Use a depth factor from a data-attribute or a simple heuristic
                let depthFactor = parseFloat(particle.dataset.depthFactor) || 1; 
                // Example: add data-depth-factor="0.5" or data-depth-factor="1.5" to particle HTML

                const particleOffsetX = (mouseX - rect.width / 2) * PARTICLE_PARALLAX_STRENGTH_MULTIPLIER * depthFactor;
                const particleOffsetY = (mouseY - rect.height / 2) * PARTICLE_PARALLAX_STRENGTH_MULTIPLIER * depthFactor;
                particle.style.transform = `translate3d(${particleOffsetX}px, ${particleOffsetY}px, ${zValue})`;
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            if (!hero3DWrap || !heroContentWrapper) return;
            hero3DWrap.style.transform = 'rotateX(0deg) rotateY(0deg)';
            heroContentWrapper.style.transform = 'translateZ(60px) translateX(0px) translateY(0px)';
            particles.forEach(particle => {
                const currentTransform = getComputedStyle(particle).transform;
                let zValue = '0px';
                if (currentTransform && currentTransform !== 'none') {
                     try {
                        const matrix = new DOMMatrix(currentTransform);
                        zValue = `${matrix.m43}px`;
                     } catch(err){}
                }
                particle.style.transform = `translate3d(0px, 0px, ${zValue})`;
            });
        });
    }


    // --- Event Listeners for Scroll-based Actions ---
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
        toggleScrollToTopButton();
    });

    // --- Set Current Year in Footer ---
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // --- Basic Form Submission Handling ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! (This is a demo, form data not sent)');
            contactForm.reset();
        });
    }

    // Initial calls
    updateActiveNavLink();
    toggleScrollToTopButton();
});

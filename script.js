document.addEventListener('DOMContentLoaded', () => {
    const navLinksContainer = document.getElementById('nav-links');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('main section[id]');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const taglineElement = document.getElementById('tagline');
    const animatedSections = document.querySelectorAll('.animated-section');

    // --- Smooth Scroll for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open after click
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
                hamburgerMenu.innerHTML = '<i class="fas fa-times"></i>'; // Change to X icon
            } else {
                hamburgerMenu.innerHTML = '<i class="fas fa-bars"></i>'; // Change back to bars
            }
        });
    }

    // --- Active Navigation Link Highlighting on Scroll ---
    function updateActiveNavLink() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust offset if header is fixed, 70-100px is a common header height
            if (pageYOffset >= sectionTop - sectionHeight / 3 - 100) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
        // Default to home if no section is "active" (e.g., at the very top or bottom)
        if (!currentSectionId && pageYOffset < window.innerHeight / 2) {
             const homeLink = document.querySelector('a[href="#hero"]');
             if (homeLink) homeLink.classList.add('active');
        }
    }

    // --- Scroll-to-Top Button Visibility ---
    function toggleScrollToTopButton() {
        if (scrollToTopBtn) {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                scrollToTopBtn.style.display = "flex"; // Use flex for icon centering
                scrollToTopBtn.style.opacity = "1";
            } else {
                scrollToTopBtn.style.opacity = "0";
                // Wait for transition to finish before setting display to none
                setTimeout(() => {
                    if (scrollToTopBtn.style.opacity === "0") { // Check again in case user scrolled back up quickly
                         scrollToTopBtn.style.display = "none";
                    }
                }, 300); // Match CSS transition duration
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
        taglineElement.textContent = ''; // Clear initial text

        function type() {
            if (index < text.length) {
                taglineElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100); // Adjust typing speed here (milliseconds)
            }
        }
        // Start typing after a short delay
        setTimeout(type, 500);
    }

    // --- Fade-in Elements on Scroll ---
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animatedSections.forEach(section => {
        observer.observe(section);
    });


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

    // --- Basic Form Submission Handling (Client-side only) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simple alert for demo. Replace with actual submission logic.
            alert('Thank you for your message! (This is a demo, form data not sent)');
            contactForm.reset();
        });
    }

    // Initial calls
    updateActiveNavLink(); // Set active link on page load
    toggleScrollToTopButton(); // Check button state on load
});
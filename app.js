document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Mobile Menu Toggle
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const mobileCloseBtn = document.getElementById('mobile-close');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    if (mobileToggleBtn && mobileDrawer) {
        mobileToggleBtn.addEventListener('click', () => {
            mobileDrawer.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    }

    const closeDrawer = () => {
        if (mobileDrawer) {
            mobileDrawer.classList.remove('open');
            document.body.style.overflow = ''; // Restore scroll
        }
    };

    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', closeDrawer);
    }

    // Close drawer when clicking any link
    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // 3. Scroll Reveal Animations using Intersection Observer
    const revealElements = () => {
        // Automatically add reveal class to section headings and major cards for smooth loading
        const targets = [
            ...document.querySelectorAll('.section-title'),
            ...document.querySelectorAll('.section-tagline'),
            ...document.querySelectorAll('.glass-card'),
            ...document.querySelectorAll('.timeline-item'),
            ...document.querySelectorAll('.hero-text-content > *'),
            ...document.querySelectorAll('.profile-image-container')
        ];

        targets.forEach(el => {
            el.classList.add('reveal');
        });

        const observerOptions = {
            root: null,
            threshold: 0.05,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        const activeObserverTargets = document.querySelectorAll('.reveal');
        activeObserverTargets.forEach(target => {
            observer.observe(target);
        });
    };

    revealElements();

    // 4. Scroll Spy (Highlight active navigation item)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.drawer-link');

    const scrollSpy = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Desktop nav link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                
                // Mobile drawer nav link
                mobileLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);

    // 5. Interactive Radial Glow Effect for Glass Cards
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Set custom properties on the card element
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 6. Contact Form Submission Simulation
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const submitBtn = document.getElementById('submit-btn');
    const resetFormBtn = document.getElementById('reset-form-btn');

    if (contactForm && successMessage && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate basic inputs
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();

            if (!name || !email || !subject || !message) {
                return;
            }

            // Simulate form submission status change
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending Message...</span>';
            
            setTimeout(() => {
                // Hide form, show success message with smooth transition
                contactForm.style.display = 'none';
                successMessage.style.display = 'flex';
                
                // Reset form values
                contactForm.reset();
                
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }, 1200);
        });
    }

    if (resetFormBtn && contactForm && successMessage) {
        resetFormBtn.addEventListener('click', () => {
            successMessage.style.display = 'none';
            contactForm.style.display = 'flex';
        });
    }

    // 7. Header Styling on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
        } else {
            header.style.padding = '';
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.85)';
            header.style.boxShadow = '';
        }
    });
});

/* ============================================
   PERSONAL PORTFOLIO - JAVASCRIPT
   Mobile menu, smooth scroll, project filters, contact form
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ----- 1. MOBILE MENU TOGGLE ----- */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.mobile-link').forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    /* ----- 2. SMOOTH SCROLL FOR NAV LINKS ----- */
    // (CSS scroll-behavior: smooth already handles this,
    //  but this ensures offset for the fixed navbar on older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 70; // navbar height
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    /* ----- 3. PROJECT FILTER BUTTONS ----- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Update active button
            filterButtons.forEach(function (btn) {
                btn.classList.remove('active');
            });
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(function (card) {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    // small fade-in animation
                    card.style.animation = 'fadeIn 0.4s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ----- 4. CONTACT FORM HANDLING ----- */
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Simple validation
        if (!name || !email || !message) {
            formMessage.textContent = 'Please fill in all fields.';
            formMessage.className = 'form-message error';
            return;
        }

        // Basic email check
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.className = 'form-message error';
            return;
        }

        // NOTE: This is a static site. To actually receive emails,
        // connect this form to a service like Formspree, EmailJS, or a backend.
        // For now we just show a success message.
        formMessage.textContent = 'Thanks, ' + name + '! Your message has been sent.';
        formMessage.className = 'form-message success';
        contactForm.reset();

        // Clear message after 5 seconds
        setTimeout(function () {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    });

    /* ----- 5. NAVBAR SHADOW ON SCROLL ----- */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 10) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
});

/* ----- KEYFRAME ANIMATION (added via JS to keep CSS clean) ----- */
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

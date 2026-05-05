document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Navbar ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) header.classList.add('sticky');
        else header.classList.remove('sticky');
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => revealOnScroll.observe(reveal));

    // --- Back to Top Button ---
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 300) backToTop.classList.add('show');
        else backToTop.classList.remove('show');
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Image Lightbox (Popup with Original Aspect Ratio) ---
    const portfolioImgs = document.querySelectorAll('.portfolio-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.querySelector('.close-lightbox');

    portfolioImgs.forEach(img => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            lightboxImg.src = this.src;
            lightbox.classList.add('active');
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => { lightboxImg.src = ''; }, 300);
    };

    closeLightboxBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });

    // --- WhatsApp Form Integration ---
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        const waText = `Hello Jui,\n\nI am ${name}.\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
        const encodedText = encodeURIComponent(waText);
        window.open(`https://wa.me/919907438505?text=${encodedText}`, '_blank');
        contactForm.reset();
    });
});

// --- Legal Modals ---
const legalData = {
    terms: {
        title: "Terms & Conditions",
        content: "<p>By using this website, you agree to our terms. All designs displayed are the intellectual property of Jui Ghosh. Commercial usage without consent is prohibited.</p>"
    },
    privacy: {
        title: "Privacy Policy",
        content: "<p>Your privacy is important to us. Any information provided via the contact form will only be used to communicate regarding your project and will not be shared.</p>"
    },
    refund: {
        title: "Refund Policy",
        content: "<p>Due to the nature of digital design services, refunds are generally not provided once final files are delivered. Revisions are discussed before the project begins.</p>"
    }
};

const legalModal = document.getElementById('legal-modal');
const legalTitle = document.getElementById('legal-title');
const legalBody = document.getElementById('legal-body');

function openModal(type) {
    legalTitle.innerHTML = legalData[type].title;
    legalBody.innerHTML = legalData[type].content;
    legalModal.classList.add('active');
}

document.querySelector('.close-legal').addEventListener('click', () => {
    legalModal.classList.remove('active');
});

legalModal.addEventListener('click', (e) => {
    if (e.target === legalModal) legalModal.classList.remove('active');
});
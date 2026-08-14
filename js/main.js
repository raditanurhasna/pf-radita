/* ===========================
   Navbar Shadow on Scroll
=========================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.background = "rgba(255,255,255,.95)";
        navbar.style.boxShadow = "0 12px 30px rgba(0,0,0,.08)";

    } else {

        navbar.style.background = "rgba(255,255,255,.75)";
        navbar.style.boxShadow = "0 10px 35px rgba(0,0,0,.06)";

    }

});


/* ===========================
   Scroll Reveal
=========================== */

const revealElements = document.querySelectorAll(
    ".hero-content-card, .hero-image-card, .project-card, .cta, .about-content-card, .about-image-card, .section-heading, .card, .background-card, .cert-card, .skill-category-card, .skills-container, .connect-hero"
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach((el) => {
    observer.observe(el);
});
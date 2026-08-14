// Basic client-side handler for the contact form.
// No backend is connected yet, so this only validates + shows a
// confirmation message. Hook this up to a real email service
// (e.g. Formspree, EmailJS, or your own API) when ready.

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("contactFormStatus");
    const submitBtn = document.getElementById("contactSubmit");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const subject = form.subject.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !subject || !message) {
            status.textContent = "Please fill in every field before sending.";
            status.classList.add("is-error");
            return;
        }

        // Placeholder "send" — replace with a real API/email service call.
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        setTimeout(() => {
            status.classList.remove("is-error");
            status.textContent = `Thanks, ${name}! Your message has been noted — I'll get back to you soon.`;
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message ↗";
            form.reset();
        }, 600);
    });
});
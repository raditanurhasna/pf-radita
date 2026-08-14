/* ===========================
   Certificate Lightbox
   Supports image files (.jpg/.jpeg/.png/.webp) and .pdf
=========================== */

(() => {
    const modal = document.getElementById("certModal");
    if (!modal) return;

    const modalImg = document.getElementById("certModalImg");
    const modalPdf = document.getElementById("certModalPdf");
    const modalEmpty = document.getElementById("certModalEmpty");
    const modalTitle = document.getElementById("certModalTitle");
    const modalSubtitle = document.getElementById("certModalSubtitle");
    const modalOpenLink = document.getElementById("certModalOpenLink");
    const modalPdfHint = document.getElementById("certModalPdfHint");
    const certCards = document.querySelectorAll(".cert-card");

    let lastFocused = null;

    function isPdf(src) {
        return /\.pdf($|\?)/i.test(src);
    }

    function resetModalState() {
        modalImg.style.display = "none";
        modalImg.removeAttribute("src");
        modalPdf.style.display = "none";
        modalPdf.removeAttribute("src");
        modalEmpty.style.display = "none";
        modalOpenLink.style.display = "none";
        modalPdfHint.style.display = "none";
    }

    function openModal(card) {
        const src = card.getAttribute("data-cert-src");
        const title = card.getAttribute("data-cert-title") || "";
        const subtitle = card.getAttribute("data-cert-subtitle") || "";

        modalTitle.textContent = title;
        modalSubtitle.textContent = subtitle;
        resetModalState();

        if (isPdf(src)) {
            // Check the PDF actually exists before embedding it
            fetch(src, { method: "HEAD" })
                .then((res) => {
                    if (!res.ok) throw new Error("not found");
                    modalPdf.src = src;
                    modalPdf.style.display = "block";
                    modalOpenLink.href = src;
                    modalOpenLink.style.display = "inline-flex";
                    modalPdfHint.style.display = "flex";
                })
                .catch(() => {
                    modalEmpty.style.display = "flex";
                });
        } else {
            // Image certificate: preload to confirm it exists
            const tester = new Image();
            tester.onload = () => {
                modalImg.src = src;
                modalImg.alt = title;
                modalImg.style.display = "block";
                modalOpenLink.href = src;
                modalOpenLink.style.display = "inline-flex";
            };
            tester.onerror = () => {
                modalEmpty.style.display = "flex";
            };
            tester.src = src;
        }

        lastFocused = document.activeElement;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        modal.querySelector(".cert-modal-close").focus();
    }

    function closeModal() {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        if (lastFocused) lastFocused.focus();
    }

    // Adjust card thumbnail placeholder wording when only a PDF is available
    // (i.e. no dedicated screenshot/thumbnail was provided for the card)
    certCards.forEach((card) => {
        const thumb = card.getAttribute("data-cert-thumb");
        const src = card.getAttribute("data-cert-src");
        const placeholder = card.querySelector(".cert-placeholder-slot");
        const img = card.querySelector(".cert-img-wrapper > img");

        if (!thumb && isPdf(src) && placeholder) {
            // A raw <img> tag can never render a PDF, so skip the load attempt
            // and show a PDF-specific placeholder immediately.
            if (img) img.style.display = "none";
            placeholder.style.display = "flex";
            const icon = placeholder.querySelector("i");
            const label = placeholder.querySelector("span");
            if (icon) icon.className = "ri-file-pdf-2-line";
            if (label) label.textContent = "Lihat Sertifikat (PDF)";
        }
        // If a thumbnail image path IS provided, the <img> tag's own
        // src + onerror attributes (set in the HTML) already handle
        // showing it or falling back to the placeholder on failure.

        card.addEventListener("click", () => openModal(card));
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModal(card);
            }
        });
    });

    modal.querySelectorAll("[data-cert-close]").forEach((el) => {
        el.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }
    });
})();
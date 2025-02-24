document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        observer.observe(section);
    });



    // type text

    const text = `Hi! My name is Ciprian.
    I am a passionate software developer with experience in
    Java, Spring Boot, and web development.`; // Folosim newlines (\n) pentru a menține formatarea

    const typingElement = document.getElementById("typing-text");
    let index = 0;
    let isDeleting = false;

    function typeEffect() {
        let displayText = text.substring(0, index);
        typingElement.textContent = displayText; // Folosim textContent pentru a păstra formatarea

        if (!isDeleting) {
            index++;
            if (index > text.length) {
                isDeleting = true;
                setTimeout(typeEffect, 3000);
                return;
            }
        } else {
            index--;
            if (index < 0) {
                isDeleting = false;
                setTimeout(typeEffect, 2000);
                return;
            }
        }

        setTimeout(typeEffect, isDeleting ? 30 : 50);
    }

    typeEffect();


    // SHAPES

    const shape1 = document.querySelector(".shape-1");
    const shape2 = document.querySelector(".shape-2");
    const chatbotSection = document.querySelector("#chatbot");

    if (!shape1 || !shape2 || !chatbotSection) {
        console.error("Nu s-au găsit elementele necesare!");
        return;
    }

    function updateShapesOnScroll() {
        const rect = chatbotSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const isMobile = window.innerWidth <= 768; // Verificăm dacă ecranul este mai mic sau egal cu 768px

        if (rect.top < viewportHeight && rect.bottom > 0) {
            let progress = 1 - rect.top / viewportHeight; // Progresul apariției în viewport
            let rotation = progress * 360; // Rotație mai mare, până la 360°

            let maxOffset = isMobile ? 50 : 70; // Pe mobil, mutăm formele mai mult lateral
            let scale = isMobile ? 1.5 : 2;
            let offset = Math.min(progress * maxOffset, maxOffset);

            setTimeout(() => {
                shape1.style.left = `${offset}%`;
                shape1.style.transform = `translateY(-50%) scale(${scale}) rotate(${rotation}deg)`;
                shape1.style.opacity = "1";
            }, 0);

            setTimeout(() => {
                shape2.style.right = `${offset}%`;
                shape2.style.transform = `translateY(-50%) scale(${scale}) rotate(${-rotation}deg)`;
                shape2.style.opacity = "1";
            }, 0);
        }
    }

    window.addEventListener("scroll", updateShapesOnScroll);
    updateShapesOnScroll();

});

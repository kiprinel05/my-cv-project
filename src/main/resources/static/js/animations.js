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

    const text = "Hi! My name is Ciprian. I am a passionate software developer with experience in Java, Spring Boot, and web development.";
    const typingElement = document.getElementById("typing-text");
    let index = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!isDeleting) {
            typingElement.innerHTML = text.substring(0, index);
            index++;

            if (index > text.length) {
                isDeleting = true;
                setTimeout(typeEffect, 3000); // Așteaptă 3 secunde înainte de ștergere
                return;
            }
        } else {
            typingElement.innerHTML = text.substring(0, index);
            index--;

            if (index < 0) {
                isDeleting = false;
                setTimeout(typeEffect, 2000); // Așteaptă 2 secunde înainte de reîncepere
                return;
            }
        }

        setTimeout(typeEffect, isDeleting ? 30 : 50); // Viteza scrierii/ștergerii
    }

    typingElement.innerHTML = ""; // Curăță textul inițial
    typeEffect();

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

        if (rect.top < viewportHeight && rect.bottom > 0) {
            let progress = 1 - rect.top / viewportHeight;
            let rotation = progress * 180; // Rotire continuă

            let maxOffset = 15; // Formele vin mai aproape de centru

            // Dacă progresul este sub limită, apropiem formele
            let offset = Math.min(progress * maxOffset, maxOffset);

            setTimeout(() => {
                shape1.style.left = `${offset}%`;
                shape1.style.transform = `translateY(-50%) scale(2) rotate(${rotation}deg)`;
                shape1.style.opacity = "1";
            }, 0); // Delay de 0.5s

            setTimeout(() => {
                shape2.style.right = `${offset}%`;
                shape2.style.transform = `translateY(-50%) scale(2) rotate(${-rotation}deg)`;
                shape2.style.opacity = "1";
            }, 0); // Delay puțin mai mare pentru efect mai cool
        }
    }

    window.addEventListener("scroll", updateShapesOnScroll);
    updateShapesOnScroll();
});

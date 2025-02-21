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
});

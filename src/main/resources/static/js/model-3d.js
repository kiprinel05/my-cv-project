document.addEventListener("DOMContentLoaded", function () {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);

    const container = document.getElementById("model-container");

    function resizeRenderer() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    resizeRenderer();
    window.addEventListener("resize", resizeRenderer);

    container.appendChild(renderer.domElement);

    // Lumini
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 3);
    pointLight.position.set(0, 2, 3);
    scene.add(pointLight);

    let model;
    let isDragging = false;
    let previousMouseX, previousMouseY;
    let isAnimating = false;
    let targetRotation = { x: 0, y: .3 };
    let initialRotation = { x: 0, y: Math.PI / 2 };
    let lerpSpeed = 0.02;

    scene.background = null;

    const loader = new THREE.GLTFLoader();
    loader.load("assets/robot2.glb", function (gltf) {
        model = gltf.scene;
        scene.add(model);

        // Scalare automată a modelului
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3()).length();
        const scaleFactor = (3 / size) * 2.7; // Ajustează factorul dacă modelul e prea mare/mic
        model.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // Poziționează modelul corect
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center); // Așează modelul astfel încât centrul să fie la (0,0,0)

        // Poziționarea inițială a modelului
        model.rotation.set(initialRotation.x, initialRotation.y, 0);

        // Ajustează poziția camerei în funcție de model
        camera.position.set(center.x, center.y + 1, center.z + 5);
        camera.lookAt(center);

        animate();
    });

    function animate() {
        requestAnimationFrame(animate);

        if (model) {
            if (isAnimating) {
                model.rotation.x += (targetRotation.x - model.rotation.x) * lerpSpeed;
                model.rotation.y += (targetRotation.y - model.rotation.y) * lerpSpeed;

                if (Math.abs(targetRotation.x - model.rotation.x) < 0.005 &&
                    Math.abs(targetRotation.y - model.rotation.y) < 0.005) {
                    isAnimating = false;
                }
            }
        }

        renderer.render(scene, camera);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isAnimating = true;
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.getElementById("model-3d-section"));

    container.addEventListener("mousedown", (event) => {
        isDragging = true;
        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        targetRotation.x = 0;
        targetRotation.y = .3;
    });

    document.addEventListener("mousemove", (event) => {
        if (isDragging && model) {
            const deltaX = event.clientX - previousMouseX;
            const deltaY = event.clientY - previousMouseY;

            model.rotation.y += deltaX * 0.01;
            model.rotation.x += deltaY * 0.01;

            model.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, model.rotation.x));

            previousMouseX = event.clientX;
            previousMouseY = event.clientY;
        }
    });
});

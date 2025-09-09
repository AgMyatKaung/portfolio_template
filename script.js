document.addEventListener('DOMContentLoaded', () => {

    // === Custom Cursor Effect ===
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    if (cursor && cursorDot) {
        document.addEventListener('mousemove', e => {
            cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
            cursorDot.setAttribute("style", "top: "+(e.pageY)+"px; left: "+(e.pageX)+"px;")
        });
    }

    // === Scroll Reveal Animation ===
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    scrollElements.forEach(element => {
        elementObserver.observe(element);
    });

    // === AI Terminal in The Lab ===
    const terminal = document.getElementById('terminal');
    if (terminal) {
        const terminalInput = terminal.querySelector('.terminal-input');
        const terminalOutput = terminal.querySelector('.terminal-output');

        const skillsDB = {
            'javascript': "Extensive experience with modern JavaScript (ES6+), including frameworks like React.js and Vue.js. Focus on building performant, scalable, and interactive front-end applications.",
            'react': "Specializing in React, building complex component-based UIs, managing state with tools like Redux, and leveraging hooks for functional components. Used to build everything from dashboards to VR interfaces.",
            'python': "Backend development with Django and Flask, creating RESTful APIs and managing server-side logic. Also integrated Python for machine learning model deployment.",
            'ai': "Proficient in integrating AI/ML models into web applications, particularly using TensorFlow.js for in-browser inference and creating data visualizations for model outputs.",
            'hello': "Hello! I am SYNAPSE, a simulated AI assistant. How can I provide data on this developer's proficiencies?",
            'default': "Query not recognized. Please ask about a specific skill (e.g., JavaScript, Python, AI, React)."
        };

        const typeResponse = (element, text) => {
            let i = 0;
            element.innerHTML = "";
            const typing = setInterval(() => {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                } else {
                    clearInterval(typing);
                }
            }, 20);
        }

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = terminalInput.value.toLowerCase().trim();
                if (query === "") return;

                const userCommand = document.createElement('p');
                userCommand.innerHTML = `<span class="prompt">></span> ${query}`;
                terminalOutput.appendChild(userCommand);

                let response = skillsDB.default;
                for (const key in skillsDB) {
                    if (query.includes(key)) {
                        response = skillsDB[key];
                        break;
                    }
                }
                
                const responsePara = document.createElement('p');
                terminalOutput.appendChild(responsePara);
                typeResponse(responsePara, response);

                terminalInput.value = '';
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        });
        
        const welcomePara = document.createElement('p');
        terminalOutput.appendChild(welcomePara);
        typeResponse(welcomePara, "SYNAPSE AI Assistant v4.0 online. Awaiting query...");
    }


    // === 3D Hologram in The Lab ===
    const hologramContainer = document.getElementById('hologram-container');
    if (hologramContainer && typeof THREE !== 'undefined') {
        let scene, camera, renderer, shape;
        let isDragging = false, previousMousePosition = { x: 0, y: 0 };

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, hologramContainer.clientWidth / hologramContainer.clientHeight, 0.1, 1000);
        camera.position.z = 4;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(hologramContainer.clientWidth, hologramContainer.clientHeight);
        hologramContainer.appendChild(renderer.domElement);

        const geometry = new THREE.IcosahedronGeometry(2, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
        shape = new THREE.Mesh(geometry, material);
        scene.add(shape);
        
        // Add subtle lighting
        const lights = [];
        lights[0] = new THREE.PointLight(0xffffff, 1, 0);
        lights[1] = new THREE.PointLight(0xff00ff, 1, 0);
        lights[2] = new THREE.PointLight(0x00ffff, 1, 0);
        lights[0].position.set(0, 200, 0);
        lights[1].position.set(100, 200, 100);
        lights[2].position.set(-100, -200, -100);
        scene.add(lights[0]);
        scene.add(lights[1]);
        scene.add(lights[2]);

        const animate = () => {
            requestAnimationFrame(animate);
            if (!isDragging) {
                shape.rotation.x += 0.002;
                shape.rotation.y += 0.002;
            }
            renderer.render(scene, camera);
        };
        animate();
        
        hologramContainer.addEventListener('mousedown', e => { isDragging = true; });
        hologramContainer.addEventListener('mouseup', e => { isDragging = false; });
        hologramContainer.addEventListener('mousemove', e => {
            if (isDragging) {
                const deltaMove = {
                    x: e.offsetX - previousMousePosition.x,
                    y: e.offsetY - previousMousePosition.y
                };

                shape.rotation.y += deltaMove.x * 0.005;
                shape.rotation.x += deltaMove.y * 0.005;
            }
            previousMousePosition = { x: e.offsetX, y: e.offsetY };
        });

        window.addEventListener('resize', () => {
            camera.aspect = hologramContainer.clientWidth / hologramContainer.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(hologramContainer.clientWidth, hologramContainer.clientHeight);
        });
    }

    // === Project Modal Functionality ===
    const projectModal = document.getElementById('project-modal');
    if (projectModal) {
        const closeModalButton = projectModal.querySelector('.close-button');
        const projectButtons = document.querySelectorAll('.project-button');
        const modalProjectTitle = document.getElementById('modal-project-title');
        const modalProjectImage = document.getElementById('modal-project-image');
        const modalProjectDescription = document.getElementById('modal-project-description');
        const modalProjectLink = document.getElementById('modal-project-link');

        const projectDetails = {
            1: {
                title: 'NEON CITY INTERFACE',
                image: 'https://via.placeholder.com/600x400/ff00ff/0a0a1a?text=PROJECT+ALPHA+DETAILS',
                description: 'A sleek, interactive dashboard concept with real-time data visualization, blending cyberpunk aesthetics with modern UX principles. Features dynamic data charts and holographic projections.',
                link: '#'
            },
            2: {
                title: 'QUANTUM REALITY VR',
                image: 'https://via.placeholder.com/600x400/00ffff/0a0a1a?text=PROJECT+BETA+DETAILS',
                description: 'An immersive virtual reality experience exploring the fabric of space-time. Users navigate through abstract landscapes and interact with quantum phenomena in a breathtaking environment.',
                link: '#'
            },
            3: {
                title: 'AI SENTINEL NETWORK',
                image: 'https://via.placeholder.com/600x400/39ff14/0a0a1a?text=PROJECT+GAMMA+DETAILS',
                description: 'A secure, intelligent network monitoring system with predictive analytics, designed for high-security environments. Real-time threat detection and anomaly reporting are key features.',
                link: '#'
            },
            4: {
                title: 'CYBERNETIC CHRONICLES',
                image: 'https://via.placeholder.com/600x400/f0e68c/0a0a1a?text=PROJECT+DELTA+DETAILS',
                description: 'An interactive narrative experience set in a dystopian future, where choices influence the unfolding story. A blend of visual novel and point-and-click adventure with a dark, futuristic theme.',
                link: '#'
            }
        };

        projectButtons.forEach(button => {
            button.addEventListener('click', () => {
                const projectId = button.dataset.projectId;
                const details = projectDetails[projectId];

                if (details) {
                    modalProjectTitle.textContent = details.title;
                    modalProjectImage.src = details.image;
                    modalProjectDescription.textContent = details.description;
                    modalProjectLink.href = details.link;
                    projectModal.style.display = 'block';
                }
            });
        });

        const closeModal = () => {
            projectModal.style.display = 'none';
        }

        closeModalButton.addEventListener('click', closeModal);

        window.addEventListener('click', (event) => {
            if (event.target == projectModal) {
                closeModal();
            }
        });
    }

    // === Scroll to Top Button ===
    const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            if (targetId === "#") {
                 window.scrollTo({top: 0, behavior: 'smooth'});
            } else {
                let targetElement = document.querySelector(targetId);
                if (targetElement) {
                     targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

});

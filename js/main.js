import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js';

class Portfolio3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.models = {};
        this.particles = null;
        this.currentSection = 'home';
        this.isLoading = true;

        this.init();
        this.bindEvents();
        this.createParticleSystem();
        this.createInteractiveObjects();
        this.animate();
        
        // Hide loading screen after setup
        setTimeout(() => this.hideLoading(), 2000);
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x0f172a, 10, 100);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 10);

        // Renderer setup
        const canvas = document.getElementById('three-canvas');
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;

        // Controls setup
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enableZoom = false;
        this.controls.enablePan = false;
        this.controls.maxPolarAngle = Math.PI / 2;

        // Lighting setup
        this.setupLighting();
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x6366f1, 0.3);
        this.scene.add(ambientLight);

        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0x8b5cf6, 1);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        this.scene.add(directionalLight);

        // Point lights for accent
        const pointLight1 = new THREE.PointLight(0x06b6d4, 0.8, 20);
        pointLight1.position.set(-10, 5, 0);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x8b5cf6, 0.6, 15);
        pointLight2.position.set(10, -5, 5);
        this.scene.add(pointLight2);

        // Rim light
        const rimLight = new THREE.DirectionalLight(0x06b6d4, 0.3);
        rimLight.position.set(-5, 0, -10);
        this.scene.add(rimLight);
    }

    createParticleSystem() {
        const particleCount = 1000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            // Position
            positions[i] = (Math.random() - 0.5) * 100;
            positions[i + 1] = (Math.random() - 0.5) * 100;
            positions[i + 2] = (Math.random() - 0.5) * 100;

            // Colors (gradient between primary colors)
            const color = new THREE.Color();
            color.setHSL(0.7 + Math.random() * 0.2, 0.8, 0.6);
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createInteractiveObjects() {
        // Hero section - Floating geometric shapes
        this.createHeroObjects();
        
        // About section - Interactive skill visualization
        this.createAboutObjects();
        
        // Projects section - 3D project previews
        this.createProjectObjects();
        
        // Contact section - Animated contact form elements
        this.createContactObjects();
    }

    createHeroObjects() {
        const heroGroup = new THREE.Group();
        heroGroup.name = 'heroObjects';

        // Central floating torus
        const torusGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
        const torusMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x6366f1,
            metalness: 0.7,
            roughness: 0.2,
            clearcoat: 1.0,
            transmission: 0.1
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.position.set(0, 0, 0);
        torus.castShadow = true;
        heroGroup.add(torus);

        // Orbiting cubes
        for (let i = 0; i < 8; i++) {
            const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
            const cubeMaterial = new THREE.MeshPhysicalMaterial({
                color: new THREE.Color().setHSL(0.7 + i * 0.1, 0.8, 0.6),
                metalness: 0.5,
                roughness: 0.3
            });
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            
            const angle = (i / 8) * Math.PI * 2;
            cube.position.set(
                Math.cos(angle) * 5,
                Math.sin(angle * 0.5) * 2,
                Math.sin(angle) * 5
            );
            cube.castShadow = true;
            heroGroup.add(cube);
        }

        this.models.heroObjects = heroGroup;
        this.scene.add(heroGroup);
    }

    createAboutObjects() {
        const aboutGroup = new THREE.Group();
        aboutGroup.name = 'aboutObjects';
        aboutGroup.visible = false;

        // Skill visualization spheres
        const skills = ['Three.js', 'JavaScript', 'React', 'Blender'];
        const skillColors = [0x6366f1, 0x8b5cf6, 0x06b6d4, 0xf59e0b];

        skills.forEach((skill, index) => {
            const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
            const sphereMaterial = new THREE.MeshPhysicalMaterial({
                color: skillColors[index],
                metalness: 0.8,
                roughness: 0.1,
                clearcoat: 1.0,
                transmission: 0.2
            });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            
            sphere.position.set(
                (index - 1.5) * 3,
                Math.sin(index) * 2,
                0
            );
            sphere.castShadow = true;
            sphere.userData = { skill: skill };
            aboutGroup.add(sphere);
        });

        this.models.aboutObjects = aboutGroup;
        this.scene.add(aboutGroup);
    }

    createProjectObjects() {
        const projectGroup = new THREE.Group();
        projectGroup.name = 'projectObjects';
        projectGroup.visible = false;

        // Project showcase models
        const projectShapes = [
            { geometry: new THREE.ConeGeometry(1, 2, 8), color: 0x6366f1 },
            { geometry: new THREE.OctahedronGeometry(1.5), color: 0x8b5cf6 },
            { geometry: new THREE.DodecahedronGeometry(1.2), color: 0x06b6d4 }
        ];

        projectShapes.forEach((project, index) => {
            const material = new THREE.MeshPhysicalMaterial({
                color: project.color,
                metalness: 0.6,
                roughness: 0.4,
                clearcoat: 0.8,
                transmission: 0.15
            });
            const mesh = new THREE.Mesh(project.geometry, material);
            
            mesh.position.set(
                (index - 1) * 4,
                0,
                0
            );
            mesh.castShadow = true;
            mesh.userData = { projectIndex: index };
            projectGroup.add(mesh);
        });

        this.models.projectObjects = projectGroup;
        this.scene.add(projectGroup);
    }

    createContactObjects() {
        const contactGroup = new THREE.Group();
        contactGroup.name = 'contactObjects';
        contactGroup.visible = false;

        // Communication symbols
        const ringGeometry = new THREE.RingGeometry(1, 1.5, 32);
        const ringMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x06b6d4,
            metalness: 0.7,
            roughness: 0.3,
            side: THREE.DoubleSide,
            transmission: 0.3
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.set(0, 0, 0);
        contactGroup.add(ring);

        this.models.contactObjects = contactGroup;
        this.scene.add(contactGroup);
    }

    bindEvents() {
        // Resize handler
        window.addEventListener('resize', () => this.handleResize());
        
        // Mouse movement for interactions
        window.addEventListener('mousemove', (event) => this.handleMouseMove(event));
        window.addEventListener('click', (event) => this.handleClick(event));
        
        // Scroll handler for section changes
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Navigation click handlers
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Button click handlers
        document.getElementById('explore-btn')?.addEventListener('click', () => {
            this.scrollToSection('projects');
        });

        document.getElementById('contact-btn')?.addEventListener('click', () => {
            this.scrollToSection('contact');
        });

        // Form submission
        document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(e);
        });
    }

    handleResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    handleMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update raycaster
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Get current scene objects
        const currentObjects = this.getCurrentSectionObjects();
        if (currentObjects.length > 0) {
            const intersects = this.raycaster.intersectObjects(currentObjects);
            
            // Reset all objects
            currentObjects.forEach(obj => {
                obj.scale.setScalar(1);
                obj.rotation.y = obj.userData.originalRotation || 0;
            });

            // Highlight intersected object
            if (intersects.length > 0) {
                const intersected = intersects[0].object;
                intersected.scale.setScalar(1.1);
                intersected.rotation.y += 0.1;
            }
        }

        // Parallax effect for camera
        if (this.controls) {
            const targetX = this.mouse.x * 0.5;
            const targetY = this.mouse.y * 0.5;
            this.camera.position.x += (targetX - this.camera.position.x) * 0.02;
            this.camera.position.y += (targetY - this.camera.position.y) * 0.02;
        }
    }

    handleClick(event) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const currentObjects = this.getCurrentSectionObjects();
        
        if (currentObjects.length > 0) {
            const intersects = this.raycaster.intersectObjects(currentObjects);
            
            if (intersects.length > 0) {
                const clicked = intersects[0].object;
                this.animateObjectClick(clicked);
                
                // Handle specific object interactions
                if (clicked.userData.skill) {
                    this.showSkillTooltip(clicked.userData.skill, event);
                } else if (clicked.userData.projectIndex !== undefined) {
                    this.showProjectDetails(clicked.userData.projectIndex);
                }
            }
        }
    }

    handleScroll() {
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        
        // Animate particles based on scroll
        if (this.particles) {
            this.particles.rotation.y = scrollPercent * Math.PI * 2;
            this.particles.rotation.x = scrollPercent * Math.PI;
        }

        // Update section visibility
        this.updateSectionVisibility();
        
        // Update skill bars in about section
        this.updateSkillBars();

        // Add navbar scroll effect
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    updateSectionVisibility() {
        const sections = ['home', 'about', 'projects', 'contact'];
        let currentSection = 'home';

        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    currentSection = section;
                }
            }
        });

        if (currentSection !== this.currentSection) {
            this.currentSection = currentSection;
            this.switchSection(currentSection);
            this.updateActiveNavLink(currentSection);
        }
    }

    switchSection(section) {
        // Hide all object groups
        Object.values(this.models).forEach(group => {
            if (group && group.visible) {
                group.visible = false;
            }
        });

        // Show current section objects
        const sectionKey = section + 'Objects';
        if (this.models[sectionKey]) {
            this.models[sectionKey].visible = true;
        }

        // Update camera position based on section
        this.animateCameraToSection(section);
    }

    animateCameraToSection(section) {
        const positions = {
            home: { x: 0, y: 0, z: 10 },
            about: { x: 5, y: 2, z: 8 },
            projects: { x: -3, y: 1, z: 12 },
            contact: { x: 0, y: -2, z: 9 }
        };

        const targetPos = positions[section] || positions.home;
        
        // Smooth camera transition
        const duration = 1000;
        const startPos = {
            x: this.camera.position.x,
            y: this.camera.position.y,
            z: this.camera.position.z
        };

        const startTime = Date.now();
        
        const animateCamera = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = this.easeInOutCubic(progress);

            this.camera.position.x = startPos.x + (targetPos.x - startPos.x) * eased;
            this.camera.position.y = startPos.y + (targetPos.y - startPos.y) * eased;
            this.camera.position.z = startPos.z + (targetPos.z - startPos.z) * eased;

            if (progress < 1) {
                requestAnimationFrame(animateCamera);
            }
        };

        animateCamera();
    }

    getCurrentSectionObjects() {
        const sectionKey = this.currentSection + 'Objects';
        if (this.models[sectionKey] && this.models[sectionKey].visible) {
            return this.models[sectionKey].children;
        }
        return [];
    }

    animateObjectClick(object) {
        // Bounce animation
        const originalScale = object.scale.clone();
        const duration = 300;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;

            if (progress < 0.5) {
                const scale = 1 + Math.sin(progress * Math.PI * 2) * 0.3;
                object.scale.setScalar(scale);
            } else {
                object.scale.copy(originalScale);
                return;
            }

            requestAnimationFrame(animate);
        };

        animate();
    }

    updateSkillBars() {
        const aboutSection = document.getElementById('about');
        if (!aboutSection) return;

        const rect = aboutSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            document.querySelectorAll('.skill-progress').forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
        }
    }

    updateActiveNavLink(section) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === section) {
                link.classList.add('active');
            }
        });
    }

    handleNavClick(e) {
        e.preventDefault();
        const section = e.target.getAttribute('data-section');
        if (section) {
            this.scrollToSection(section);
        }
    }

    scrollToSection(section) {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    showSkillTooltip(skill, event) {
        // Create and show tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.textContent = `Click to learn more about ${skill}`;
        tooltip.style.position = 'fixed';
        tooltip.style.left = event.clientX + 'px';
        tooltip.style.top = event.clientY + 'px';
        tooltip.style.background = 'rgba(0,0,0,0.8)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '10px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.zIndex = '10000';

        document.body.appendChild(tooltip);

        setTimeout(() => {
            tooltip.remove();
        }, 2000);
    }

    showProjectDetails(projectIndex) {
        const projects = [
            'Interactive 3D Web Experience',
            'Real-time Data Visualization',
            'Virtual Reality Gallery'
        ];
        
        alert(`Clicked on: ${projects[projectIndex]}\nThis would open project details in a real implementation.`);
    }

    handleFormSubmit(e) {
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        // Animate contact objects on form submission
        if (this.models.contactObjects) {
            this.models.contactObjects.children.forEach(obj => {
                obj.rotation.z += Math.PI * 2;
            });
        }

        alert('Thank you for your message! (This is a demo - form submission would be implemented with a backend service)');
    }

    hideLoading() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }
        this.isLoading = false;
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.isLoading) return;

        const time = Date.now() * 0.001;

        // Rotate particles
        if (this.particles) {
            this.particles.rotation.y += 0.001;
            this.particles.rotation.x += 0.0005;
        }

        // Animate current section objects
        this.animateCurrentSectionObjects(time);

        // Update controls
        if (this.controls) {
            this.controls.update();
        }

        // Render scene
        this.renderer.render(this.scene, this.camera);
    }

    animateCurrentSectionObjects(time) {
        const currentObjects = this.getCurrentSectionObjects();
        
        currentObjects.forEach((obj, index) => {
            // Floating animation
            obj.position.y += Math.sin(time + index) * 0.01;
            
            // Rotation animation
            obj.rotation.x += 0.005;
            obj.rotation.y += 0.003;
            
            // Breathing scale animation
            const scale = 1 + Math.sin(time * 2 + index) * 0.05;
            obj.scale.setScalar(scale);
        });
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio3D();
});

// Add scroll animations for content
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animatable elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });
});
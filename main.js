// Initialize Three.js Scene
let scene, camera, renderer;
let particles, geometry, materials;
let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorTrail = document.querySelector('.cursor-trail');

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    cursorTrail.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
    
    mouseX = (e.clientX - windowHalfX);
    mouseY = (e.clientY - windowHalfY);
});

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const progress = document.querySelector('.progress');
    let width = 0;
    
    const progressInterval = setInterval(() => {
        if (width >= 100) {
            clearInterval(progressInterval);
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    loadingScreen.style.display = 'none';
                }
            });
        } else {
            width++;
            progress.style.width = width + '%';
        }
    }, 20);
});

// Initialize Three.js Scene
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('hero-canvas'),
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Create Particles
    geometry = new THREE.BufferGeometry();
    const vertices = [];
    
    for (let i = 0; i < 10000; i++) {
        vertices.push(
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000
        );
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    
    materials = new THREE.PointsMaterial({
        size: 2,
        color: 0x00F3FF,
        transparent: true,
        opacity: 0.8
    });
    
    particles = new THREE.Points(geometry, materials);
    scene.add(particles);
    
    camera.position.z = 500;
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    
    particles.rotation.x += 0.0001;
    particles.rotation.y += 0.0001;
    
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

// Handle Window Resize
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

// Initialize Portfolio Carousel
function initPortfolio() {
    const projects = [
        { title: 'Project 1', image: 'path/to/image1.jpg' },
        { title: 'Project 2', image: 'path/to/image2.jpg' },
        { title: 'Project 3', image: 'path/to/image3.jpg' }
    ];
    
    const carousel = document.querySelector('.portfolio-carousel');
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        card.innerHTML = `
            <h3>${project.title}</h3>
            <div class="portfolio-image" style="background-image: url(${project.image})"></div>
        `;
        carousel.appendChild(card);
    });
}

// Initialize Services Icons
function initServices() {
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach(icon => {
        // Add 3D model loading logic here
        const modelType = icon.dataset.model;
        // Load corresponding 3D model using Three.js
    });
}

// Initialize About Section Avatar
function initAvatar() {
    const avatarContainer = document.getElementById('avatar-container');
    // Add 3D avatar loading and animation logic here
}

// About Section Animations
function initAboutAnimations() {
    // Team members hover effect
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach((member, index) => {
        // Add staggered fade-in animation
        member.style.opacity = '0';
        member.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            member.style.transition = 'all 0.5s ease';
            member.style.opacity = '1';
            member.style.transform = 'translateY(0)';
        }, 100 * index);
        
        // Add tilt effect on hover
        member.addEventListener('mousemove', (e) => {
            const rect = member.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            member.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        // Reset transform on mouse leave
        member.addEventListener('mouseleave', () => {
            member.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // Text reveal animation
    const aboutText = document.querySelector('.about-text');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (aboutText) {
        aboutText.style.opacity = '0';
        aboutText.style.transform = 'translateY(30px)';
        aboutText.style.transition = 'all 0.8s ease';
        observer.observe(aboutText);
    }
    
    // Glowing text animation enhancement
    const glowingText = document.querySelector('.glowing-text');
    if (glowingText) {
        glowingText.style.animation = 'glow 2s ease-in-out infinite';
    }
    
    // CTA button hover effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mousemove', (e) => {
            const rect = ctaButton.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ctaButton.style.setProperty('--x', `${x}px`);
            ctaButton.style.setProperty('--y', `${y}px`);
        });
    }
}

// Initialize about section animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAboutAnimations();
});

// Reinitialize animations when the about section comes into view
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initAboutAnimations();
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(aboutSection);
}

// Pisa Tower 3D Scene
let pisaScene, pisaCamera, pisaRenderer, pisaModel;
let pisaRotationSpeed = 0.01;
let pisaAutoRotate = true;

function initPisa() {
    // Initialize Pisa scene
    pisaScene = new THREE.Scene();
    pisaCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    pisaRenderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('pisa-canvas'),
        antialias: true
    });
    pisaRenderer.setSize(document.getElementById('pisa-canvas').offsetWidth, document.getElementById('pisa-canvas').offsetHeight);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    pisaScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    pisaScene.add(directionalLight);
    
    // Create basic tower geometry (placeholder for actual model)
    const geometry = new THREE.CylinderGeometry(2, 2, 10, 32);
    geometry.translate(0, 5, 0);
    geometry.rotateZ(Math.PI * 0.04); // Add lean angle
    
    const material = new THREE.MeshPhongMaterial({
        color: 0xcccccc,
        specular: 0x111111,
        shininess: 30
    });
    
    pisaModel = new THREE.Mesh(geometry, material);
    pisaScene.add(pisaModel);
    
    pisaCamera.position.z = 20;
    
    // Add controls
    document.getElementById('rotate-left').addEventListener('click', () => {
        gsap.to(pisaModel.rotation, {
            y: pisaModel.rotation.y + Math.PI / 2,
            duration: 1,
            ease: "power2.inOut"
        });
    });
    
    document.getElementById('rotate-right').addEventListener('click', () => {
        gsap.to(pisaModel.rotation, {
            y: pisaModel.rotation.y - Math.PI / 2,
            duration: 1,
            ease: "power2.inOut"
        });
    });
    
    document.getElementById('zoom-in').addEventListener('click', () => {
        gsap.to(pisaCamera.position, {
            z: Math.max(pisaCamera.position.z - 5, 10),
            duration: 1,
            ease: "power2.inOut"
        });
    });
    
    document.getElementById('zoom-out').addEventListener('click', () => {
        gsap.to(pisaCamera.position, {
            z: Math.min(pisaCamera.position.z + 5, 30),
            duration: 1,
            ease: "power2.inOut"
        });
    });
}

function animatePisa() {
    requestAnimationFrame(animatePisa);
    
    if (pisaAutoRotate) {
        pisaModel.rotation.y += pisaRotationSpeed;
    }
    
    pisaRenderer.render(pisaScene, pisaCamera);
}

// Handle Pisa canvas resize
function onPisaResize() {
    const canvas = document.getElementById('pisa-canvas');
    pisaCamera.aspect = canvas.offsetWidth / canvas.offsetHeight;
    pisaCamera.updateProjectionMatrix();
    pisaRenderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
}

// Testimonials Slider
class TestimonialsSlider {
    constructor() {
        this.track = document.querySelector('.testimonials-track');
        this.slides = document.querySelectorAll('.testimonial-card');
        this.dotsContainer = document.querySelector('.slider-dots');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        
        this.slideWidth = this.slides[0].offsetWidth;
        this.currentIndex = 0;
        this.slidesPerView = this.getSlidesPerView();
        this.maxIndex = Math.max(0, this.slides.length - this.slidesPerView);
        
        this.init();
    }
    
    init() {
        // Create dots
        this.slides.forEach((_, index) => {
            if (index <= this.maxIndex) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(index));
                this.dotsContainer.appendChild(dot);
            }
        });
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add resize listener
        window.addEventListener('resize', () => {
            this.slidesPerView = this.getSlidesPerView();
            this.maxIndex = Math.max(0, this.slides.length - this.slidesPerView);
            this.goToSlide(Math.min(this.currentIndex, this.maxIndex));
            this.updateDots();
        });
        
        // Initial position
        this.updateSliderPosition();
    }
    
    getSlidesPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }
    
    updateSliderPosition() {
        const offset = this.currentIndex * -this.slideWidth - (this.currentIndex * 32); // 32px is the gap
        this.track.style.transform = `translateX(${offset}px)`;
    }
    
    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    goToSlide(index) {
        this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
        this.updateSliderPosition();
        this.updateDots();
    }
    
    prevSlide() {
        this.goToSlide(this.currentIndex - 1);
    }
    
    nextSlide() {
        this.goToSlide(this.currentIndex + 1);
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsSlider();
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    animate();
    initPortfolio();
    initServices();
    initAvatar();
    initPisa();
    animatePisa();
    
    window.addEventListener('resize', onPisaResize);
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Contact Form Handling
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate reCAPTCHA
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        alert('Please complete the reCAPTCHA verification');
        return false;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        form.reset();
        grecaptcha.reset();
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
    
    return false;
}

// Add floating animation to contact illustration
document.addEventListener('DOMContentLoaded', () => {
    const illustration = document.querySelector('.contact-illustration img');
    if (illustration) {
        illustration.style.animation = 'float 6s ease-in-out infinite';
    }
});

// Contact Form Animation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', handleSubmit);
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add particle explosion animation here
    gsap.to(contactForm, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1
    });
    
    // Add form submission logic here
});

// Services Section Interactions
function initServicesInteractions() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Mouse move effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Apply the transform
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(10px)
            `;
            
            // Update glow position
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${percentX}%`);
            card.style.setProperty('--mouse-y', `${percentY}%`);
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = `
                perspective(1000px)
                rotateX(0)
                rotateY(0)
                translateZ(0)
            `;
        });
        
        // Add intersection observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(card);
    });
}

// Initialize services interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initServicesInteractions();
});

// Initialize 3D tilt effect for footer elements
function initFooter3D() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((centerX - x) / centerX) * 10;
            
            element.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(20px)
            `;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                translateZ(0)
            `;
        });
    });
    
    // Add wave animation parallax effect
    const waves = document.querySelectorAll('.wave');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        waves.forEach((wave, index) => {
            const speed = 0.1 + (index * 0.1);
            wave.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize footer animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initFooter3D();
});

// Header Interactions
function initHeader() {
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Handle scroll effects
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove background on scroll
        if (currentScroll > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
        }
        
        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Close mobile menu if open
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            // Smooth scroll to section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add hover effect to logo
    const logo = document.querySelector('.logo');
    logo.addEventListener('mouseover', () => {
        logo.style.transform = 'scale(1.1)';
        logo.style.filter = 'drop-shadow(0 0 15px rgba(0, 255, 157, 0.5))';
    });
    
    logo.addEventListener('mouseout', () => {
        logo.style.transform = 'scale(1)';
        logo.style.filter = 'drop-shadow(0 0 10px rgba(0, 255, 157, 0.3))';
    });
}

// Initialize header when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initHeader();
});

// Animation Handlers
function initAnimations() {
    // Scroll reveal animation
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('active');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('active');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 70)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // 3D tilt effect
    const tiltElements = document.querySelectorAll('.tilt-element');
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = ((y - centerY) / centerY) * 10;
            const tiltY = ((centerX - x) / centerX) * 10;
            
            element.style.setProperty('--tilt-x', `${tiltX}deg`);
            element.style.setProperty('--tilt-y', `${tiltY}deg`);
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.setProperty('--tilt-x', '0deg');
            element.style.setProperty('--tilt-y', '0deg');
        });
    });

    // Mobile menu animation
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuToggle.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.add('closing');
            setTimeout(() => {
                mobileMenu.classList.remove('active', 'closing');
            }, 300);
        } else {
            mobileMenu.classList.add('active');
        }
    });

    // Gradient text animation
    const gradientTexts = document.querySelectorAll('.gradient-text');
    gradientTexts.forEach(text => {
        text.addEventListener('mouseover', () => {
            text.style.animationPlayState = 'running';
        });
        
        text.addEventListener('mouseout', () => {
            text.style.animationPlayState = 'paused';
        });
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
});

// Hero Section Animations
function initHeroAnimations() {
    // 3D Elements Mouse Movement
    const heroSection = document.querySelector('.hero-section');
    const heroVisual = document.querySelector('.hero-visual');
    const elements3D = document.querySelector('.hero-3d-elements');
    
    heroSection.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = heroVisual.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        elements3D.style.transform = `
            perspective(1000px)
            rotateY(${x * 20}deg)
            rotateX(${-y * 20}deg)
            translateZ(50px)
        `;
    });
    
    heroSection.addEventListener('mouseleave', () => {
        elements3D.style.transform = `
            perspective(1000px)
            rotateY(0)
            rotateX(0)
            translateZ(0)
        `;
    });
    
    // Tech Stack Hover Effects
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const tech = item.getAttribute('data-tech');
            item.innerHTML = `<span>${tech}</span>`;
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i').className;
            item.innerHTML = `<i class="${icon}"></i>`;
        });
    });
    
    // Parallax Scrolling
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
    });
    
    // Animate Stats Numbers
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const updateCount = () => {
            if(current < target) {
                current += increment;
                stat.textContent = Math.ceil(current) + '+';
                setTimeout(updateCount, 40);
            } else {
                stat.textContent = target + '+';
            }
        };
        updateCount();
    });
    
    // Particle System
    const particles = document.querySelector('.hero-particles');
    const particleCount = 50;
    
    for(let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration and delay
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        particle.style.animation = `particleFloat ${duration}s linear ${delay}s infinite`;
        
        particles.appendChild(particle);
    }
}

// Initialize hero animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
});

// Hero Section Particles
function createParticles() {
    const particles = document.querySelector('.particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration and delay
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        particle.style.animation = `particleFloat ${duration}s linear ${delay}s infinite`;
        
        particles.appendChild(particle);
    }
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
});

// 3D Floating Elements Effect
function init3DEffect() {
    const heroSection = document.querySelector('.hero-section');
    const floatingElements = document.querySelector('.floating-elements');
    const floatItems = document.querySelectorAll('.float-item');
    
    heroSection.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = heroSection.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        const rotateX = (y - 0.5) * 20;
        const rotateY = (x - 0.5) * 20;
        
        floatingElements.style.transform = `
            perspective(1000px)
            rotateX(${-rotateX}deg)
            rotateY(${rotateY}deg)
        `;
        
        floatItems.forEach((item, index) => {
            const depth = (index + 1) * 50;
            item.style.transform = `
                translateZ(${depth}px)
                rotateX(${-rotateX * 0.5}deg)
                rotateY(${rotateY * 0.5}deg)
            `;
        });
    });
    
    heroSection.addEventListener('mouseleave', () => {
        floatingElements.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        floatItems.forEach(item => {
            item.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
        });
    });
}

// Initialize 3D effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init3DEffect();
});

// Enhanced Hero Section Animations
function initEnhancedHero() {
    // Create animated lines
    const heroLines = document.querySelector('.hero-lines');
    const lineCount = 10;
    
    for(let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className = 'line';
        line.style.left = `${Math.random() * 100}%`;
        line.style.animationDelay = `${Math.random() * 5}s`;
        heroLines.appendChild(line);
    }
    
    // Create glowing orbs
    const heroOrbs = document.querySelector('.hero-orbs');
    const orbCount = 2;
    
    for(let i = 0; i < orbCount; i++) {
        const orb = document.createElement('div');
        orb.className = 'orb';
        heroOrbs.appendChild(orb);
    }
    
    // Parallax effect on mouse move
    const hero = document.querySelector('.hero-section');
    const title = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');
    const grid = document.querySelector('.hero-grid');
    
    hero.addEventListener('mousemove', (e) => {
        const { width, height } = hero.getBoundingClientRect();
        const offsetX = e.clientX / width - 0.5;
        const offsetY = e.clientY / height - 0.5;
        
        title.style.transform = `translate(${offsetX * 20}px, ${offsetY * 20}px)`;
        subtitle.style.transform = `translate(${offsetX * 15}px, ${offsetY * 15}px)`;
        grid.style.transform = `translate(${offsetX * 10}px, ${offsetY * 10}px)`;
    });
    
    hero.addEventListener('mouseleave', () => {
        title.style.transform = 'translate(0, 0)';
        subtitle.style.transform = 'translate(0, 0)';
        grid.style.transform = 'translate(0, 0)';
    });
    
    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-item');
    const animateStats = () => {
        stats.forEach(stat => {
            const statPosition = stat.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if(statPosition < screenPosition) {
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateStats);
    
    // Button hover effects
    const buttons = document.querySelectorAll('.hero-btn');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = button.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            button.style.setProperty('--x', x);
            button.style.setProperty('--y', y);
        });
    });
    
    // Smooth scroll for navigation
    const scrollButtons = document.querySelectorAll('a[href^="#"]');
    scrollButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(button.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// Initialize enhanced hero animations
document.addEventListener('DOMContentLoaded', () => {
    initEnhancedHero();
});

// Contact Section Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Phone 3D Effect
    const phoneWrapper = document.querySelector('.contact-phone-wrapper');
    const phone = document.querySelector('.contact-phone');

    if (phoneWrapper && phone) {
        phoneWrapper.addEventListener('mousemove', (e) => {
            const rect = phoneWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            phone.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.02, 1.02, 1.02)
            `;
        });

        phoneWrapper.addEventListener('mouseleave', () => {
            phone.style.transform = `
                perspective(1000px)
                rotateX(0)
                rotateY(0)
                scale3d(1, 1, 1)
            `;
        });
    }

    // Contact Items Hover Effect
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            const icon = item.querySelector('.contact-icon');
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            item.style.setProperty('--x', `${x}px`);
            item.style.setProperty('--y', `${y}px`);
            
            icon.style.transform = 'rotateY(180deg)';
        });

        item.addEventListener('mouseleave', (e) => {
            const icon = item.querySelector('.contact-icon');
            icon.style.transform = 'rotateY(0)';
        });
    });

    // Typing Animation for Messages
    const messages = document.querySelectorAll('.phone-message');
    let delay = 0;

    messages.forEach((message, index) => {
        delay += 800;
        setTimeout(() => {
            message.classList.add('show');
            playTypingSound();
        }, delay);
    });

    // Status Dot Animation
    const statusDot = document.querySelector('.status-dot');
    if (statusDot) {
        setInterval(() => {
            statusDot.classList.add('pulse');
            setTimeout(() => {
                statusDot.classList.remove('pulse');
            }, 1000);
        }, 2000);
    }

    // Parallax Effect for Background
    document.addEventListener('mousemove', (e) => {
        const contact = document.querySelector('.contact');
        if (!contact) return;

        const moveX = (e.clientX - window.innerWidth / 2) / 100;
        const moveY = (e.clientY - window.innerHeight / 2) / 100;

        contact.style.backgroundPosition = `${moveX}px ${moveY}px`;
    });

    // Copy Contact Info on Click
    contactItems.forEach(item => {
        item.addEventListener('click', () => {
            const value = item.querySelector('.contact-value').textContent;
            navigator.clipboard.writeText(value).then(() => {
                showCopyNotification(item);
            });
        });
    });

    function showCopyNotification(item) {
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = 'Copied!';
        
        item.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    // Smooth Scroll for Contact Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add touch support for mobile devices
    if ('ontouchstart' in window) {
        const phone = document.querySelector('.contact-phone');
        if (phone) {
            phone.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const rect = phone.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 30;
                const rotateY = (centerX - x) / 30;
                
                phone.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale3d(1.02, 1.02, 1.02)
                `;
            });
        }
    }
});

// Add these CSS variables to enable the hover effect
document.documentElement.style.setProperty('--cursor-x', '0px');
document.documentElement.style.setProperty('--cursor-y', '0px');

// 3D Mouse Movement Effect
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card, .project-card, .service-card, .testimonial-card');
    const sections = document.querySelectorAll('section');

    // Add data-text attribute to headings for 3D effect
    document.querySelectorAll('h1, h2, h3').forEach(heading => {
        heading.setAttribute('data-text', heading.textContent);
    });

    // 3D Card Tilt Effect
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Parallax Scrolling Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        sections.forEach(section => {
            const rate = section.dataset.parallaxRate || 0.3;
            const yPos = -(scrolled * rate);
            section.style.transform = `translateZ(${yPos}px)`;
        });
    });

    // Dynamic Glow Effect
    document.addEventListener('mousemove', (e) => {
        const glowElements = document.querySelectorAll('.glow-3d');
        
        glowElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            element.style.setProperty('--x', `${x}px`);
            element.style.setProperty('--y', `${y}px`);
        });
    });

    // Smooth Section Transitions
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'sectionEntrance 0.8s ease-out forwards';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Add depth to parallax elements
document.querySelectorAll('.parallax-3d').forEach(element => {
    const children = element.children;
    Array.from(children).forEach((child, index) => {
        child.style.setProperty('--depth', `${(index + 1) * 10}px`);
    });
});

// Popup Form Functionality
document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popupForm');
    const closeBtn = document.querySelector('.close-btn');
    const form = document.getElementById('discountForm');

    // Show popup after 5 seconds
    setTimeout(() => {
        popup.style.display = 'block';
    }, 5000);

    // Close popup when clicking close button
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Close popup when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your submission! We will contact you soon.');
        popup.style.display = 'none';
    });

    // Show popup when user tries to leave the page
    let showExitPopup = true;
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 0 && showExitPopup) {
            popup.style.display = 'block';
            showExitPopup = false; // Only show exit popup once
        }
    });
});
// Show popup after 3 seconds of page load
setTimeout(function() {
    document.getElementById('popupOverlay').style.display = 'block';
}, 3000);

function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
}

function submitPopupForm(event) {
    event.preventDefault();
    // Add your form submission logic here
    alert('Form submitted successfully!');
    closePopup();
}

// Close popup when clicking outside
document.getElementById('popupOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closePopup();
    }
});
// 3D Profile Image Animation
document.addEventListener('DOMContentLoaded', function() {
    const profileImages = document.querySelectorAll('.profile-image');
    
    profileImages.forEach(container => {
        container.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = container.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            gsap.to(container.querySelector('.profile-image-inner'), {
                rotationY: x * 30,
                rotationX: -y * 30,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        container.addEventListener('mouseleave', () => {
            gsap.to(container.querySelector('.profile-image-inner'), {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        // Add click event for card flip
        container.addEventListener('click', () => {
            const inner = container.querySelector('.profile-image-inner');
            inner.style.transform = inner.style.transform.includes('rotateY(180deg)') 
                ? 'rotateY(0)' 
                : 'rotateY(180deg)';
        });
    });
    
    // Add parallax effect
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        profileImages.forEach(image => {
            gsap.to(image, {
                x: moveX,
                y: moveY,
                duration: 1,
                ease: 'power2.out'
            });
        });
    });
});

// Add smooth scroll animation
gsap.registerPlugin(ScrollTrigger);

gsap.from('.profile-image', {
    scrollTrigger: {
        trigger: '.profile-image',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2
});
// Add this to your existing main.js
d
// Email Form Submission
async function sendEmail(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.loading-spinner');
    
    // Show loading state
    btnText.style.opacity = '0';
    spinner.style.display = 'block';
    submitBtn.disabled = true;

    const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        subject: form.subject.value,
        message: form.message.value
    };

    try {
        const response = await fetch('https://formspree.io/f/xdkazyoz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Show success message
            showNotification('Message sent successfully!', 'success');
            form.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        // Show error message
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        // Reset button state
        btnText.style.opacity = '1';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
    }
}
// Navigation functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Active link highlighting
const navLinksAll = document.querySelectorAll('.nav-link');
navLinksAll.forEach(link => {
    link.addEventListener('click', () => {
        navLinksAll.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Close mobile menu after clicking
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll-based navigation highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});
// Add at the beginning of your main.js
document.addEventListener('DOMContentLoaded', function() {
    const heroContent = document.querySelector('.hero-content');
    const buttons = document.querySelectorAll('.hero-btn');

    // 3D tilt effect for hero content
    heroContent.addEventListener('mousemove', (e) => {
        const rect = heroContent.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        heroContent.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroContent.addEventListener('mouseleave', () => {
        heroContent.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });

    // Button glow effect
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            btn.querySelector('.btn-glow').style.setProperty('--x', `${x}%`);
            btn.querySelector('.btn-glow').style.setProperty('--y', `${y}%`);
        });
    });
});
// Intersection Observer for section animations
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    threshold: 0.2,
    rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'none';
            entry.target.offsetHeight; // Trigger reflow
            entry.target.style.animation = null;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});
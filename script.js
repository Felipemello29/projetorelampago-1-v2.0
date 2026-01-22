// Data defining the "code" to be typed and the actual HTML to rendered
const sections = {
    home: {
        filename: 'index.html',
        code: `<!-- Hero Section -->
<section class="hero">
  <div class="hero-content">
    <h1>...</h1>
    <p>...</p>
    <div class="hero-btns">
      <a href="..." class="btn-primary">...</a>
      <a href="..." class="btn-secondary">...</a>
    </div>
  </div>
</section>`,
        html: `
            <section class="hero-content">
                <h1>Welcome to my <span>portfolio</span></h1>
                <p>My name is Felipe Mello and I am a aspiring fullstack developer.</p>
                <div class="hero-btns">
                    <button data-nav-target="projects" class="btn-primary">View Projects</button>
                    <button data-nav-target="about" class="btn-secondary">Resume</button>
                </div>
            </section>
        `
    },
    projects: {
        filename: 'projects.jsx',
        code: `const Projects = () => {
  // Data Source
  const works = [...];

  return (
    <div class="grid-projects">
      {works.map(work => (
        <Card data={work} />
      ))}
    </div>
  );
}`,
        html: `
            <section class="projects-container">
                <h2>Featured Projects</h2>
                <div class="grid-projects">
                    <a href="https://felipemello29.github.io/projetorelampagoalpha1/projects/project3/1.html" class="card" target="_blank">
                        <div class="card-img">
                            <img src="./images/project1.png" alt="Accounting Platform Preview" loading="lazy">
                        </div>
                        <h3>Accounting webplataform mockup</h3>
                        <p>Landing page for a accounting webplataform</p>
                    </a>
                    <a href="https://felipemello29.github.io/projetorelampagoalpha1/projects/project2/atvdd4.html" class="card" target="_blank">
                        <div class="card-img">
                            <img src="./images/project2.png" alt="Travel Site Preview" loading="lazy">
                        </div>
                        <h3>Travel Site mockup</h3>
                        <p>Landing page for a travel company about travelling the word and documenting it</p>
                    </a>
                     <a href="https://felipemello29.github.io/projetorelampagoalpha1/" class="card" target="_blank">
                        <div class="card-img">
                            <img src="./images/project3.png" alt="Legacy Portfolio Preview" loading="lazy">
                        </div>
                        <h3>Portfolio V1</h3>
                        <p>Legacy Portfolio Site</p>
                    </a>
                </div>
            </section>
        `
    },
    services: {
        filename: 'services.ts',
        code: `interface Service {
  icon: string;
  title: string;
  desc: string;
}

const services: Service[] = [
  { title: "Frontend", ... },
  { title: "Backend", ... },
  { title: "UI/UX", ... }
];`,
        html: `
            <section class="services-content">
                <h2>Services</h2>
                <div class="services-container">
                    <div class="card">
                        <h3>Frontend Development</h3>
                        <p>Typescript, HTML, CSS, JavaScript</p>
                    </div>
                    <div class="card">
                        <h3>Backend Solutions</h3>
                        <p>Node.js, Python, Java</p>
                    </div>
                    <div class="card">
                        <h3>UI/UX Design</h3>
                        <p>Figma, Prototyping, Accessibility</p>
                    </div>
                </div>
            </section>
        `
    },
    about: {
        filename: 'about_me.md',
        code: `# About System
        
[User]: "Who am I?"

> I am a aspiring developer bridging 
> the gap between code and design.

## Profile_Pic.png
[LOADING...]

## System_Capabilities
- Frontend Architecture
- Backend Solutions
- UI/UX Engineering
- Performance Optimization

/* End of File */`,
        html: `
            <section class="about-content">
                <h2>About Me</h2>
                
                <div class="about-profile">
                    <div class="about-text">
                        <p>I am a creative aspiring developer. My mission is to build digital experiences that are not only functional but visually immersive.</p>
                        <p>Before that, I am also a pixel art hobbist, worked on procurement and supplychain management, have a very long relationship with excel and am a part time Dungeon Master.</p>
                    </div>
                    <div class="about-img">
                        <img src="./images/avatar.png" alt="Profile Avatar" onerror="this.style.display='none'">
                    </div>
                </div>

                <div class="services-container">
                    <h3>// Fields of interest</h3>
                    <div class="skills-grid">
                        <div class="skill-card">
                            <h4>Frontend Dev</h4>
                            <p>Building responsive, interactive UIs with modern frameworks.</p>
                        </div>
                        <div class="skill-card">
                            <h4>Backend Systems</h4>
                            <p>Robust API design, database management, and server logic.</p>
                        </div>
                        <div class="skill-card">
                            <h4>UI/UX Design</h4>
                            <p>Crafting intuitive and accessible user journeys.</p>
                        </div>
                        <div class="skill-card">
                            <h4>A.I</h4>
                            <p>Learning and understanding the capabilities of AI</p>
                        </div>
                        <div class="skill-card">
                            <h4>Pixel Art</h4>
                            <p>Creating visually immersive and engaging digital experiences.</p>
                        </div>
                    </div>
                </div>
            </section>
        `
    },
    contact: {
        filename: 'contact.json',
        code: `{
  "email": "email@domain.com",
  "linkedin": "linkedin.com/in/user",
  "status": "Open for work",
  "sendMessage": "function() { ... }"
}`,
        html: `
            <section class="contact-content">
                <h2>Get In Touch</h2>
                <p>Have a project in mind? Let's build something awesome together.</p>
                <div class="contact-btns">
                    <a href="mailto:felipemello29@gmail.com" class="btn-primary">Send Email</a>
                    <a href="https://www.linkedin.com/in/felipe-mello-53541421a/" target="_blank" class="btn-secondary">LinkedIn</a>
                </div>
            </section>
        `
    }
};

// DOM Elements
const appContainer = document.getElementById('app-container');
const modalOverlay = document.getElementById('modal-overlay');
const typeWriterText = document.getElementById('typewriter-text');
const modalFilename = document.getElementById('modal-filename');
const windowBody = document.querySelector('.window-body'); // Select the scrollable container
const navLinks = document.querySelectorAll('.nav-links a');

// Shared State for Circuit Background
let circuitState = {
    overload: false,
    surge: false
};

// Helper for navigation
function triggerNav(sectionName) {
    const link = document.querySelector(`.nav-links a[data-section="${sectionName}"]`);
    if (link) link.click();
}

// Reboot Logic
const rebootBtn = document.getElementById('reboot-btn');
let isRebooting = false;

if (rebootBtn) {
    rebootBtn.addEventListener('click', (e) => {
        e.preventDefault();
        initiateReboot();
    });
}

function initiateReboot() {
    if (isAnimating) return;
    isAnimating = true;
    isRebooting = true;

    modalOverlay.classList.remove('hidden');
    modalFilename.textContent = 'system_root.sh';
    typeWriterText.textContent = '';

    // Auto-scroll logic update for reboot
    const autoScroll = () => windowBody.scrollTop = windowBody.scrollHeight;

    const promptSequence = [
        "> WARNING: CRITICAL PROCESS INITIATED",
        "> DETECTED USER REQUEST: HARD RESET",
        "> THIS WILL NUKE CURRENT SESSION DATA.",
        "> ",
        "> ARE YOU SURE? [Y/N]_ "
    ];

    let lineIndex = 0;

    async function typeLines() {
        for (let line of promptSequence) {
            typeWriterText.textContent += (lineIndex > 0 ? '\n' : '') + line;
            autoScroll();
            lineIndex++;
            await wait(300); // Pause between lines
        }

        // Listen for input
        document.addEventListener('keydown', handleRebootInput);

        // Show clickable options for mobile/mouse users
        showRebootOptions();
    }

    typeLines();
}

function showRebootOptions() {
    // Check if options already exist
    if (document.querySelector('.reboot-options')) return;

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'reboot-options';

    const btnYes = document.createElement('button');
    btnYes.className = 'reboot-btn-option danger';
    btnYes.textContent = 'YES [Y]';
    btnYes.onclick = () => {
        document.removeEventListener('keydown', handleRebootInput);
        removeRebootOptions();
        typeWriterText.textContent += "Y";
        executeReset();
    };

    const btnNo = document.createElement('button');
    btnNo.className = 'reboot-btn-option';
    btnNo.textContent = 'NO [N]';
    btnNo.onclick = () => {
        document.removeEventListener('keydown', handleRebootInput);
        removeRebootOptions();
        typeWriterText.textContent += "N";
        abortReset();
    };

    optionsContainer.appendChild(btnYes);
    optionsContainer.appendChild(btnNo);

    // Append to the window body so it scrolls with content
    windowBody.appendChild(optionsContainer);
    windowBody.scrollTop = windowBody.scrollHeight;
}

function removeRebootOptions() {
    const opts = document.querySelector('.reboot-options');
    if (opts) opts.remove();
}

function handleRebootInput(e) {
    if (!isRebooting) return;

    const key = e.key.toUpperCase();

    if (key === 'Y' || key === 'N') {
        removeRebootOptions();
    }

    if (key === 'Y') {
        document.removeEventListener('keydown', handleRebootInput);
        typeWriterText.textContent += "Y";
        executeReset();
    } else if (key === 'N') {
        document.removeEventListener('keydown', handleRebootInput);
        typeWriterText.textContent += "N";
        abortReset();
    }
}

async function executeReset() {
    typeWriterText.textContent += "\n> PERMISSION GRANTED.";
    typeWriterText.textContent += "\n> WIPING MEMORY...";

    // Glitch the button
    const rBtn = document.getElementById('reboot-btn');
    if (rBtn) rBtn.classList.add('glitch-active');

    // Apply global error flicker
    document.body.classList.add('error-mode');

    windowBody.scrollTop = windowBody.scrollHeight;
    await wait(800);

    typeWriterText.textContent += "\n> CRITICAL FAILURE DETECTED...";
    typeWriterText.textContent += "\n> SYSTEM COLLAPSE IMMINENT.";
    windowBody.scrollTop = windowBody.scrollHeight;

    // Trigger Effects
    circuitState.overload = true;
    document.body.classList.add('page-shatter');

    await wait(2400); // Wait for shatter animation (2s) + buffer
    location.reload();
}

async function abortReset() {
    typeWriterText.textContent += "\n> COMMAND CANCELLED.";
    windowBody.scrollTop = windowBody.scrollHeight;
    await wait(1000);
    modalOverlay.classList.add('hidden');
    isAnimating = false;
    isRebooting = false;
}

function typeCode(text) {
    return new Promise(resolve => {
        let i = 0;
        function type() {
            if (i < text.length) {
                typeWriterText.textContent += text.charAt(i);
                i++;

                // Auto Scroll to bottom
                windowBody.scrollTop = windowBody.scrollHeight;

                const speed = TYPE_SPEED + (Math.random() * 15);
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

// Settings
const TYPE_SPEED = 10; // ms per character (faster for better UX)

// State
let isAnimating = false;
let loadedSections = new Set();

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Start with Home
    handleSectionReveal('home');

    // Initialize Motherboard
    initMotherboard();

    // Add Event Delegation for Navigation Buttons
    appContainer.addEventListener('click', (e) => {
        const target = e.target.closest('[data-nav-target]');
        if (target) {
            const section = target.getAttribute('data-nav-target');
            triggerNav(section);
        }
    });
});

// Event Listeners
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionName = link.getAttribute('data-section');
        if (isAnimating) return;

        // Update Active Link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        handleSectionReveal(sectionName);
    });
});

async function handleSectionReveal(sectionName) {
    // Case 1: Section already exists -> Just Scroll
    if (loadedSections.has(sectionName)) {
        const element = document.getElementById(sectionName);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
    }

    // Case 2: New Section -> Build & Type Simultaneously
    if (!sections[sectionName]) return;
    isAnimating = true;

    const sectionData = sections[sectionName];

    // 1. Setup Modal
    modalFilename.textContent = sectionData.filename;
    typeWriterText.textContent = '';
    modalOverlay.classList.remove('hidden');

    // 2. Append Content Immediately (Hidden)
    const wrapper = document.createElement('div');
    wrapper.id = sectionName;
    wrapper.className = 'section-wrapper fade-in';
    wrapper.innerHTML = sectionData.html;

    // Actually, simpler: Target direct children of containers
    const buildTargets = Array.from(wrapper.querySelectorAll('.hero-content > *, .about-profile > *, .services-container > h3, .skills-grid > .skill-card, .projects-container > h2, .card'));

    // Add base classes
    buildTargets.forEach(el => {
        el.classList.add('construct-element');
        el.classList.add('uncompiled'); // Start as raw text
    });

    appContainer.appendChild(wrapper);
    loadedSections.add(sectionName);

    // Scroll to it
    wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // 3. Run Typing code
    const codePromise = typeCode(sectionData.code);

    // 4. Run Building Animation (Sync with typing)
    // We want the building to finish roughly when typing finishes.
    const totalTime = sectionData.code.length * TYPE_SPEED;
    const interval = totalTime / buildTargets.length;

    buildTargets.forEach((el, index) => {
        // Step 1: Reveal as Raw Text
        setTimeout(() => {
            el.classList.add('built'); // Fades opacity to 1

            // Step 2: Morph into Component
            setTimeout(() => {
                el.classList.remove('uncompiled'); // Removes raw styles, transitions to final
            }, 400); // 400ms after appearing as text

        }, index * interval + 500);
    });

    // Wait for typing to finish to close modal
    await codePromise;

    // Close Modal
    await wait(300);
    modalOverlay.classList.add('hidden');

    isAnimating = false;
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Mobile Menu Toggle Logic
const mobileMenuButton = document.getElementById('mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');

if (mobileMenuButton && navLinksContainer) {
    mobileMenuButton.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        mobileMenuButton.classList.toggle('active'); // Animate Icon
    });

    // Close menu when clicking any link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            mobileMenuButton.classList.remove('active'); // Reset Icon
        });
    });
}

/* =========================================
   MOTHERBOARD CIRCUIT BACKGROUND
   ========================================= */

// Trigger orange surge
function triggerSurge() {
    circuitState.surge = true;
    setTimeout(() => { circuitState.surge = false; }, 500); // 500ms surge
};

function initMotherboard() {
    const canvas = document.getElementById('starfield'); // Reusing the canvas ID
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let circuits = [];
    const IDLE_CIRCUITS = 4; // Low density as requested

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    class Circuit {
        constructor(isBurst = false) {
            this.isBurst = isBurst;
            this.init();
        }

        init() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.prevX = this.x;
            this.prevY = this.y;

            // Directions: 0: Up, 1: Right, 2: Down, 3: Left
            this.dir = Math.floor(Math.random() * 4);
            this.speed = (2 + Math.random() * 2) * (this.isBurst ? 1.5 : 1);

            this.color = `rgba(0, 243, 255, ${0.5 + Math.random() * 0.5})`; // Base Cyan (High opacity for trails)

            this.life = 0;
            this.maxLife = 100 + Math.random() * 200;
            this.dead = false;
        }

        update() {
            if (this.dead) {
                if (!this.isBurst && circuits.filter(c => !c.dead && !c.isBurst).length < IDLE_CIRCUITS) {
                    this.init();
                }
                return;
            }

            this.life++;
            if (this.life > this.maxLife) {
                this.dead = true;
                return;
            }

            // Random turns
            if (Math.random() < 0.05) {
                if (this.dir % 2 === 0) { // Vertical -> Horizontal
                    this.dir = Math.random() < 0.5 ? 1 : 3;
                } else { // Horizontal -> Vertical
                    this.dir = Math.random() < 0.5 ? 0 : 2;
                }
            }

            // Store previous position before moving
            this.prevX = this.x;
            this.prevY = this.y;

            // Move
            let moveSpeed = this.speed;
            if (circuitState.overload) moveSpeed = this.speed * 5;
            else if (circuitState.surge) moveSpeed = this.speed * 3; // Modest speed boost on surge

            if (this.dir === 0) this.y -= moveSpeed;
            else if (this.dir === 1) this.x += moveSpeed;
            else if (this.dir === 2) this.y += moveSpeed;
            else if (this.dir === 3) this.x -= moveSpeed;

            // Bounds check
            if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                this.dead = true;
            }
        }

        draw() {
            if (this.dead) return;

            ctx.beginPath();

            // Color Logic
            if (circuitState.overload) ctx.strokeStyle = '#ff3333';
            else if (circuitState.surge) ctx.strokeStyle = '#bc13fe'; // Purple
            else ctx.strokeStyle = this.color;

            ctx.lineWidth = (circuitState.overload || circuitState.surge) ? 2 : 1.5;

            // Draw segment from previous to current
            ctx.moveTo(this.prevX, this.prevY);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();

            // Draw head (Lead Node) - Small spark at front
            ctx.fillStyle = ctx.strokeStyle;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Spawn Burst Function
    function spawnBurst(count) {
        for (let i = 0; i < count; i++) {
            circuits.push(new Circuit(true));
        }
    }

    // Global Click Listener for Jolt
    document.addEventListener('click', (e) => {
        // 1. Spwan Particles
        spawnBurst(8 + Math.floor(Math.random() * 8));

        // 2. Trigger Color Surge (Only on interactive elements)
        const isInteractive = e.target.closest('button, a');
        if (isInteractive) {
            triggerSurge();
        }
    });

    // Fill pool initially
    for (let i = 0; i < IDLE_CIRCUITS; i++) circuits.push(new Circuit());

    function loop() {
        // Fade effect: Draw semi-transparent rectangle over canvas
        // This is key for trails. Adjust opacity for longer/shorter trails.
        // Updated to match CSS bg-color (5, 5, 16) and higher opacity for faster fade.
        ctx.fillStyle = "rgba(5, 5, 16, 0.3)";
        if (circuitState.overload) ctx.fillStyle = "rgba(40, 0, 0, 0.2)";

        ctx.fillRect(0, 0, width, height);

        // Filter circuits
        circuits = circuits.filter(c => !c.dead || !c.isBurst);

        // Re-populate idle pool
        const currentIdle = circuits.filter(c => !c.isBurst && !c.dead).length;
        if (currentIdle < IDLE_CIRCUITS) {
            circuits.push(new Circuit());
        }

        circuits.forEach(c => {
            c.update();
            c.draw();
        });

        requestAnimationFrame(loop);
    }
    loop();
}


// Start
initMotherboard();

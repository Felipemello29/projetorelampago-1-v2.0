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
</section>`
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
}`
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
];`
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

/* End of File */`
    },
    contact: {
        filename: 'contact.json',
        code: `{
  "email": "email@domain.com",
  "linkedin": "linkedin.com/in/user",
  "status": "Open for work",
  "sendMessage": "function() { ... }"
}`
    }
};

// Helper to get CSS variable values
function getCssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

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
// Initial Setup moved to end of file to support Boot Sequence
// document.addEventListener('DOMContentLoaded', () => { ... });

// Event Listeners
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionName = link.getAttribute('data-section');
        if (isAnimating) return;

        // NEW: Mark this specific link as visited
        link.classList.add('visited');

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
    updateStatus(`> INITIATING COMPILATION FOR [${sectionName.toUpperCase()}]...`, 'busy');

    const sectionData = sections[sectionName];

    // 1. Setup Modal
    modalFilename.textContent = sectionData.filename;
    typeWriterText.textContent = '';
    modalOverlay.classList.remove('hidden');

    // 2. Append Content Immediately (Hidden)
    const wrapper = document.createElement('div');
    wrapper.id = sectionName;
    wrapper.className = 'section-wrapper fade-in';

    // NEW: Clone content from Template
    const template = document.getElementById('template-' + sectionName);
    if (template) {
        const clone = template.content.cloneNode(true);
        wrapper.appendChild(clone);
    }

    // Actually, simpler: Target direct children of containers
    const buildTargets = Array.from(wrapper.querySelectorAll('.hero-content > *, .about-profile > *, .services-container > h3, .skills-grid > .skill-card, .projects-container > h2, .card, .contact-content > *'));

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

    // Global Progress Logic
    const totalPossibleSections = Object.keys(sections).length;
    const previouslyLoadedCount = loadedSections.size - 1; // Subtract current one which was just added
    const startProgressPercent = (previouslyLoadedCount / totalPossibleSections) * 100;
    const targetProgressPercent = (loadedSections.size / totalPossibleSections) * 100;
    const itemsToBuild = buildTargets.length;

    // Initial paint for this section
    updateProgressBar(Math.round(startProgressPercent));

    let completedElements = 0;

    buildTargets.forEach((el, index) => {
        // Step 1: Reveal as Raw Text
        setTimeout(() => {
            el.classList.add('built'); // Fades opacity to 1

            // Update Progress (Interpolate from Start to Target)
            completedElements++;

            // Percentage of *this specific section* complete (0 to 1)
            const sectionCompletionRatio = completedElements / itemsToBuild;

            // Global percent = Start + (Difference * Ratio)
            const currentGlobalPercent = startProgressPercent + ((targetProgressPercent - startProgressPercent) * sectionCompletionRatio);

            updateProgressBar(Math.round(currentGlobalPercent));

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
    updateStatus("COMPILATION COMPLETE. SYSTEM ONLINE.");
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Status Bar Logic
const statusBarText = document.getElementById('status-text');
const statusIndicator = document.querySelector('.status-indicator');
const progressBar = document.getElementById('progress-bar');

function updateProgressBar(percent) {
    if (!progressBar) return;

    // Create a 20-char bar
    const totalChars = 20;
    const filledChars = Math.floor((percent / 100) * totalChars);
    const emptyChars = totalChars - filledChars;

    // Using simple chars for retro feel: | for full, . for empty
    const bar = '[' + '|'.repeat(filledChars) + '.'.repeat(emptyChars) + ']';
    progressBar.textContent = bar;
}

function updateStatus(message, type = 'normal') {
    if (!statusBarText) return;
    statusBarText.textContent = message;

    if (type === 'busy') {
        const color = getCssVar('--color-warning');
        statusBarText.style.color = color;
        statusIndicator.style.backgroundColor = color;
        statusIndicator.style.boxShadow = `0 0 5px ${color}`;
    } else if (type === 'error') {
        const color = getCssVar('--color-error');
        statusBarText.style.color = color;
        statusIndicator.style.backgroundColor = color;
        statusIndicator.style.boxShadow = `0 0 5px ${color}`;
    } else {
        statusBarText.style.color = 'var(--accent-color)'; // Cyan
        statusIndicator.style.backgroundColor = 'var(--accent-color)';
        statusIndicator.style.boxShadow = '0 0 5px var(--accent-color)';
    }
}

// Hover Effects for Nav
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        // Stop showing hints if this specific link is visited
        if (link.classList.contains('visited')) return;

        const target = link.getAttribute('data-section');
        updateStatus(`TARGET: [${target.toUpperCase()}_MODULE] // READY TO COMPILE`);
    });

    link.addEventListener('mouseleave', () => {
        if (!isAnimating) {
            updateStatus("SYSTEM ONLINE");
        }
    });
});

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

    // Fetch colors dynamically
    const colorSecondary = getCssVar('--accent-secondary');
    const colorError = getCssVar('--color-error');
    const accentRgb = getCssVar('--accent-rgb');

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

            this.color = `rgba(${accentRgb}, ${0.5 + Math.random() * 0.5})`;

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
            if (circuitState.overload) ctx.strokeStyle = colorError;
            else if (circuitState.surge) ctx.strokeStyle = colorSecondary;
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
// initMotherboard(); // Already initialized in DOMContentLoaded
/* =========================================
   AUDIO SYSTEM (SoundManager)
   ========================================= */

class SoundManager {
    constructor() {
        this.ctx = null;
        this.isMuted = localStorage.getItem('portfolio_muted') === 'true';
        this.masterGain = null;
        this.initialized = false;
        this.lastOut = 0; // For brown noise generation

        // Update UI immediately
        this.updateUI();
    }

    init() {
        if (this.initialized) return;

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
            this.masterGain = this.ctx.createGain();
            this.masterGain.connect(this.ctx.destination);

            // Set initial volume based on mute state
            this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.3, this.ctx.currentTime);

            // Resume immediately if created by user gesture, otherwise verify state
            if (this.ctx.state === 'suspended') {
                this.ctx.resume();
            }

            this.initialized = true;
            console.log("Audio System Initialized");
        } catch (e) {
            console.error("Web Audio API not supported", e);
        }
    }

    toggleMute() {
        if (!this.initialized) this.init();

        // Always try to resume context on interaction
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        this.isMuted = !this.isMuted;
        localStorage.setItem('portfolio_muted', this.isMuted);

        if (this.masterGain) {
            const time = this.ctx.currentTime;
            this.masterGain.gain.cancelScheduledValues(time);
            this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, time); // Anchoring
            this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.3, time + 0.1);
        }

        this.updateUI();

        if (!this.isMuted) {
            this.playClick();
            this.startAmbientHum();
        } else {
            this.stopAmbientHum();
        }
    }

    updateUI() {
        const btn = document.getElementById('sound-toggle');
        if (!btn) return;

        const icon = btn.querySelector('.sound-icon');
        const text = btn.querySelector('.sound-text');

        if (this.isMuted) {
            btn.classList.add('muted');
            icon.textContent = '🔇';
            text.textContent = 'AUDIO: OFF';
        } else {
            btn.classList.remove('muted');
            icon.textContent = '🔊';
            text.textContent = 'AUDIO: ON';
        }
    }

    // --- Synthesizers ---

    playTone(freq, type, duration, vol = 1) {
        if (this.isMuted || !this.initialized) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + duration + 0.1);
    }

    playBoot() {
        if (this.isMuted || !this.initialized) return;

        // Startup Chime (Synth Pad Swell)
        // Root
        this.playTone(220, 'triangle', 2.5, 0.2);
        // Fifth
        this.playTone(330, 'sine', 2.5, 0.2);
        // Octave
        this.playTone(440, 'triangle', 2.5, 0.1);

        // Final "OK" Beep
        setTimeout(() => this.playTone(880, 'square', 0.1, 0.1), 2000);
    }

    playHover() {
        // High pitch sine blip
        this.playTone(800, 'sine', 0.05, 0.1);
    }

    playClick() {
        // Two-tone confirmation
        this.playTone(1200, 'square', 0.05, 0.1);
        setTimeout(() => this.playTone(1600, 'square', 0.05, 0.1), 50);
    }

    playTyping() {
        if (this.isMuted || !this.initialized) return;

        // Key Switch Sound (Mechanical "Clack")
        // We use a short burst of noise with a bandpass filter
        const t = this.ctx.currentTime;

        // 1. Noise Generator (Click)
        const bufferSize = this.ctx.sampleRate * 0.035; // 35ms (longer body)
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            // Brown-ish noise approximation for more "thock"
            const white = Math.random() * 2 - 1;
            this.lastOut = (this.lastOut + (0.02 * white)) / 1.02;
            data[i] = this.lastOut * 3.5; // Gain compensation
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        // Randomized Filter for "Organic" feel
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        // Vary center freq between 800Hz and 1500Hz
        filter.frequency.value = 800 + (Math.random() * 700);
        filter.Q.value = 1;

        const gain = this.ctx.createGain();
        // Randomize volume slightly
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.25 + (Math.random() * 0.1), t + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start(t);
        noise.stop(t + 0.1);
    }

    playError() {
        if (this.isMuted || !this.initialized) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(50, this.ctx.currentTime + 0.5);

        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.5);
    }

    // --- Ambient Hum ---
    startAmbientHum() {
        if (this.isMuted || !this.initialized || this.ambientNodes) return;

        const t = this.ctx.currentTime;
        this.ambientNodes = {};

        // 1. Low Frequency Drone (60Hz Hum)
        const drone = this.ctx.createOscillator();
        const droneGain = this.ctx.createGain();

        drone.type = 'sine';
        drone.frequency.value = 60;
        droneGain.gain.setValueAtTime(0, t);
        droneGain.gain.linearRampToValueAtTime(0.02, t + 2); // Very subtle

        drone.connect(droneGain);
        droneGain.connect(this.masterGain);
        drone.start();

        // 2. Air/Fan Noise (Brown Noise + LPF)
        const bufferSize = this.ctx.sampleRate * 2; // 2 seconds
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            lastOut = (lastOut + (0.02 * white)) / 1.02;
            data[i] = lastOut * 3.5;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const noiseFilter = this.ctx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.value = 400; // Muffled fan sound

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0, t);
        noiseGain.gain.linearRampToValueAtTime(0.03, t + 2); // Subtle

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.masterGain);
        noise.start();

        this.ambientNodes = { drone, droneGain, noise, noiseGain };
    }

    stopAmbientHum() {
        if (!this.ambientNodes) return;

        const t = this.ctx.currentTime;
        const { droneGain, noiseGain, drone, noise } = this.ambientNodes;

        // Fade out
        droneGain.gain.linearRampToValueAtTime(0, t + 0.5);
        noiseGain.gain.linearRampToValueAtTime(0, t + 0.5);

        setTimeout(() => {
            drone.stop();
            noise.stop();
            this.ambientNodes = null;
        }, 500);
    }
}

const soundManager = new SoundManager();

// --- BOOT SEQUENCE LOGIC ---
async function runBootSequence() {
    // Check if already booted in this session
    if (sessionStorage.getItem('portfolio_booted')) {
        return;
    }

    const bootScreen = document.getElementById('boot-screen');
    const memoryEl = document.getElementById('memory-check');
    const logEl = document.getElementById('boot-log');

    if (!bootScreen) return;

    // Show Screen
    bootScreen.classList.remove('hidden');

    // Play sound if possible (might be blocked by browser policy without interaction)
    // We try anyway; user might have interacted previously
    soundManager.playBoot();

    // 1. Memory Test
    let mem = 0;
    const maxMem = 64000; // 64MB retro style
    while (mem < maxMem) {
        mem += 800 + Math.floor(Math.random() * 800);
        if (mem > maxMem) mem = maxMem;
        memoryEl.textContent = `MEMORY TEST: ${mem}KB OK`;
        await wait(20);
    }

    await wait(500);

    // 2. Log Messages
    const logs = [
        "Loading Kernel modules...",
        "Mounting File System...",
        "Initializing Neural Interface...",
        "Loading Portfolio V2.0...",
        "Access Granted."
    ];

    for (const log of logs) {
        const p = document.createElement('p');
        p.textContent = log;
        logEl.appendChild(p);
        soundManager.playTyping(); // Use typing sound for data crunch
        await wait(300 + Math.random() * 400);
    }

    await wait(800);

    // 3. Fade Out
    bootScreen.style.transition = 'opacity 0.8s ease';
    bootScreen.style.opacity = '0';

    await wait(800);
    bootScreen.classList.add('hidden');

    // Mark as done
    sessionStorage.setItem('portfolio_booted', 'true');

    // Start Ambience
    soundManager.startAmbientHum();
}

// Setup Sound Toggle & Main Init
document.addEventListener('DOMContentLoaded', async () => {
    // RUN BOOT SEQUENCE FIRST
    await runBootSequence();

    const toggleBtn = document.getElementById('sound-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            soundManager.toggleMute();
        });
    }

    // Init audio Context on first user interaction (browser policy)
    const initAudio = () => {
        soundManager.init();
        document.removeEventListener('click', initAudio);
        document.removeEventListener('keydown', initAudio);
    };
    document.addEventListener('click', initAudio);
    document.addEventListener('keydown', initAudio);

    // Start with Home (After boot)
    handleSectionReveal('home');

    // Mark Home as visited
    const homeLink = document.querySelector('a[data-section="home"]');
    if (homeLink) homeLink.classList.add('visited');

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

// --- Integrations ---

// Typewriter Sound
const originalTypeCode = typeCode;
typeCode = function (text) {
    return new Promise(resolve => {
        let i = 0;
        function type() {
            if (i < text.length) {
                typeWriterText.textContent += text.charAt(i);

                // Sound Integration
                if (text.charAt(i) !== ' ') soundManager.playTyping();

                i++;
                windowBody.scrollTop = windowBody.scrollHeight;
                const speed = TYPE_SPEED + (Math.random() * 15);
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
};

// Nav Sounds
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => soundManager.playHover());
    link.addEventListener('click', () => soundManager.playClick());
});

// Error Sound Integration
const originalExecuteReset = executeReset;
executeReset = async function () {
    soundManager.playError();

    // Original Logic duplicates here because we can't easily wrap async function mid-execution without full replace
    // So we just call the original logic BUT we wanted the sound at the start.
    // Actually, let's just copy the logic since we are replacing the function pointer.

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

    // Detailed error noise
    soundManager.playError();

    // Trigger Effects
    circuitState.overload = true;
    document.body.classList.add('page-shatter');

    await wait(2400);
    location.reload();
};

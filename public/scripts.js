// ULTRA-MODERN CYBERPUNK PORTFOLIO SCRIPT - MOBILE OPTIMIZED
// CONSOLIDATED VERSION WITH ALL FUNCTIONALITY

class CyberPortfolio {
    constructor() {
        // Device detection
        this.isMobile = window.innerWidth <= 768;
        this.isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this.isLowEndDevice = false;
        
        // State management
        this.audioEnabled = false;
        this.currentTheme = 0;
        this.currentFace = 0;
        this.cubeRotation = { x: 0, y: 0 };
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        
        // Animation references
        this.matrixAnimationId = null;
        this.animationFrame = null;
        this.typingTimeout = null;
        this.resizeTimeout = null;
        
        // Performance tracking
        this.lastFrameTime = performance.now();
        this.frameCount = 0;
        
        this.init();
    }

    init() {
        console.log('🚀 Initializing CyberPortfolio v3.0...');
        
        try {
            // Performance & device detection
            this.initPerformanceMonitoring();
            
            // Core functionality
            this.initMatrixRain();
            this.initConsoleTerminal();
            this.init3DCube();
            this.initStatsCounters();
            
            // Navigation & UI
            this.initMobileNavigation();
            this.initNavigation();
            this.initInteractiveElements();
            this.initSmoothScrolling();
            
            // Effects & feedback
            this.initAudioFeedback();
            this.initMouseEffects();
            this.initGlitchEffects();
            this.initAnimations();
            
            // Forms & user interaction
            this.initThemeToggle();
            this.initForm();
            
            // Device optimizations
            this.initTouchOptimizations();
            this.initParallax();
            this.initCursorEffects();
            
            // System management
            this.initEventListeners();
            this.initResponsiveHandlers();
            
            console.log('✅ CyberPortfolio initialized successfully');
            
        } catch (error) {
            console.error('❌ Initialization error:', error);
            this.showError('Failed to initialize portfolio. Please refresh.');
        }
    }

    // =========== PERFORMANCE MONITORING ===========
    initPerformanceMonitoring() {
        // Detect low-end devices
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 4;
        this.isLowEndDevice = memory < 4 || cores < 4;
        
        if (this.isLowEndDevice) {
            console.log('📱 Low-end device detected - optimizing performance');
        }
    }

    // =========== MATRIX RAIN - OPTIMIZED ===========
    initMatrixRain() {
        const canvas = document.getElementById('matrixCanvas');
        if (!canvas) {
            console.warn('Matrix canvas not found');
            return;
        }

        const ctx = canvas.getContext('2d');
        
        // Adaptive settings based on device
        const charSize = this.isMobile ? 10 : 12;
        const density = this.isMobile ? 0.7 : 1;
        
        // Character sets for cyberpunk feel
        const chars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ0123456789";
        const columns = Math.floor(window.innerWidth / (charSize * density));
        const drops = new Array(columns).fill(1);
        const charColors = ['#00ccff', '#66ffff', '#99ffff', '#ccffff'];
        
        // Canvas setup
        const resizeCanvas = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const dpr = Math.min(window.devicePixelRatio || 1, this.isLowEndDevice ? 1 : 2);
            
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            
            if (ctx) {
                ctx.scale(dpr, dpr);
                ctx.font = `${charSize}px 'MS Gothic', 'Courier New', monospace`;
            }
        };
        
        const drawMatrix = () => {
            // Fade effect with performance optimization
            ctx.fillStyle = this.isLowEndDevice ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), 
                        canvas.height / (window.devicePixelRatio || 1));
            
            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const x = i * charSize * density;
                const y = drops[i] * charSize;
                
                // Color variations for glitch effect
                if (Math.random() > 0.98) {
                    ctx.fillStyle = '#ff00cc';
                } else if (Math.random() > 0.95) {
                    ctx.fillStyle = charColors[Math.floor(Math.random() * charColors.length)];
                } else {
                    ctx.fillStyle = '#00ccff';
                }
                
                ctx.fillText(char, x, y);
                
                // Trail effect (disabled on low-end devices)
                if (!this.isLowEndDevice && drops[i] > 0) {
                    ctx.fillStyle = 'rgba(0, 204, 255, 0.3)';
                    ctx.fillText(char, x, y - charSize * 0.5);
                    ctx.fillStyle = 'rgba(0, 204, 255, 0.1)';
                    ctx.fillText(char, x, y - charSize);
                }
                
                // Reset drop
                if (y > canvas.height / (window.devicePixelRatio || 1) && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        const animate = () => {
            drawMatrix();
            this.matrixAnimationId = requestAnimationFrame(animate);
        };
        
        // Initialize
        resizeCanvas();
        animate();
        
        // Handle resize with debouncing
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                if (this.matrixAnimationId) {
                    cancelAnimationFrame(this.matrixAnimationId);
                }
                resizeCanvas();
                drops.length = Math.floor(window.innerWidth / (charSize * density));
                drops.fill(1);
                animate();
            }, 100);
        });
    }

    // =========== CONSOLE TERMINAL ===========
    initConsoleTerminal() {
        const terminal = document.querySelector('.terminal-output');
        if (!terminal) return;
        
        const lines = [
            "> System boot sequence initialized...",
            "> Loading cybernetic modules...",
            "> Neural interface: ONLINE",
            "> Visual cortex: ENHANCED",
            "> Memory banks: 98% LOADED",
            "> Threat detection: ACTIVE",
            "> Encryption protocols: ENGAGED",
            "> Welcome to the grid, operator.",
            ">",
            "> Type 'help' for commands"
        ];
        
        let lineIndex = 0;
        
        const typeLine = () => {
            if (lineIndex >= lines.length) return;
            
            const line = document.createElement('div');
            line.className = 'output-line';
            line.innerHTML = `<span class="line-prefix">$></span><span class="line-content">${lines[lineIndex]}</span>`;
            
            terminal.appendChild(line);
            line.style.opacity = '0';
            line.style.transform = 'translateY(10px)';
            
            // Animate in
            setTimeout(() => {
                line.style.transition = 'opacity 0.5s, transform 0.5s';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, 10);
            
            // Scroll to bottom
            terminal.scrollTop = terminal.scrollHeight;
            
            lineIndex++;
            
            // Schedule next line
            if (lineIndex < lines.length) {
                setTimeout(typeLine, Math.random() * 300 + 200);
            } else {
                this.startCursorBlink();
            }
        };
        
        // Start typing animation after a delay
        setTimeout(typeLine, 1000);
        
        // Double-click to clear terminal
        terminal.addEventListener('dblclick', () => {
            terminal.innerHTML = '';
            lineIndex = 0;
            setTimeout(typeLine, 500);
        });
    }

    startCursorBlink() {
        const terminal = document.querySelector('.terminal-output');
        if (!terminal) return;
        
        const cursor = document.createElement('div');
        cursor.className = 'output-line';
        cursor.innerHTML = '<span class="line-prefix">$></span><span class="line-content"><span class="cursor-blink">█</span></span>';
        terminal.appendChild(cursor);
        
        const blinkElement = cursor.querySelector('.cursor-blink');
        let isVisible = true;
        
        setInterval(() => {
            isVisible = !isVisible;
            blinkElement.style.opacity = isVisible ? '1' : '0';
        }, 500);
    }

    // =========== 3D CUBE INTERACTION ===========
    init3DCube() {
        const cube = document.querySelector('.hologram-cube');
        const container = document.querySelector('.hologram-container');
        const dots = document.querySelectorAll('.nav-dot');
        
        if (!cube || !container) {
            console.warn('3D Cube elements not found');
            return;
        }
        
        let autoRotate = true;
        let rotationSpeed = 0.2;
        
        // Auto-rotation function
        const autoRotateCube = () => {
            if (autoRotate && !this.isDragging) {
                this.cubeRotation.y += rotationSpeed;
                cube.style.transform = `rotateX(${this.cubeRotation.x}deg) rotateY(${this.cubeRotation.y}deg)`;
            }
        };
        
        // Mouse drag handlers
        container.addEventListener('mousedown', (e) => {
            if (this.isTouchDevice) return;
            
            this.isDragging = true;
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
            autoRotate = false;
            cube.style.transition = 'none';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging || this.isTouchDevice) return;
            
            const deltaX = e.clientX - this.lastMouseX;
            const deltaY = e.clientY - this.lastMouseY;
            
            this.cubeRotation.y += deltaX * 0.5;
            this.cubeRotation.x -= deltaY * 0.5;
            
            cube.style.transform = `rotateX(${this.cubeRotation.x}deg) rotateY(${this.cubeRotation.y}deg)`;
            
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
        });
        
        document.addEventListener('mouseup', () => {
            if (this.isTouchDevice) return;
            
            this.isDragging = false;
            cube.style.transition = 'transform 0.3s ease';
            
            // Resume auto rotation after 3 seconds
            setTimeout(() => {
                autoRotate = true;
            }, 3000);
        });
        
        // Touch support
        container.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            this.lastMouseX = e.touches[0].clientX;
            this.lastMouseY = e.touches[0].clientY;
            autoRotate = false;
            cube.style.transition = 'none';
            e.preventDefault();
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            
            const deltaX = e.touches[0].clientX - this.lastMouseX;
            const deltaY = e.touches[0].clientY - this.lastMouseY;
            
            this.cubeRotation.y += deltaX * 0.5;
            this.cubeRotation.x -= deltaY * 0.5;
            
            cube.style.transform = `rotateX(${this.cubeRotation.x}deg) rotateY(${this.cubeRotation.y}deg)`;
            
            this.lastMouseX = e.touches[0].clientX;
            this.lastMouseY = e.touches[0].clientY;
            e.preventDefault();
        });
        
        document.addEventListener('touchend', () => {
            this.isDragging = false;
            cube.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                autoRotate = true;
            }, 3000);
        });
        
        // Navigation dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                
                const rotations = [
                    { x: 0, y: 0 },      // Front
                    { x: 0, y: 90 },     // Right
                    { x: 0, y: 180 },    // Back
                    { x: 0, y: -90 }     // Left
                ];
                
                if (rotations[index]) {
                    autoRotate = false;
                    this.cubeRotation = rotations[index];
                    cube.style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
                    cube.style.transform = `rotateX(${this.cubeRotation.x}deg) rotateY(${this.cubeRotation.y}deg)`;
                    
                    setTimeout(() => {
                        cube.style.transition = '';
                        autoRotate = true;
                    }, 5000);
                }
            });
        });
        
        // Cube face interactions
        const faces = document.querySelectorAll('.cube-face');
        faces.forEach(face => {
            face.addEventListener('mouseenter', () => {
                if (this.isTouchDevice) return;
                face.style.borderColor = '#ff00cc';
                face.style.boxShadow = '0 0 30px rgba(255, 0, 204, 0.5)';
            });
            
            face.addEventListener('mouseleave', () => {
                face.style.borderColor = 'rgba(0, 255, 255, 0.3)';
                face.style.boxShadow = 'none';
            });
            
            face.addEventListener('click', () => {
                const title = face.querySelector('.face-title')?.textContent || 'System';
                const desc = face.querySelector('.face-description')?.textContent || 'Cyber module';
                this.showModal(title, desc);
            });
        });
        
        // Animation loop
        const animateCube = () => {
            autoRotateCube();
            this.animationFrame = requestAnimationFrame(animateCube);
        };
        
        animateCube();
    }

    // =========== STATS COUNTERS ===========
    initStatsCounters() {
        const statValues = document.querySelectorAll('.stat-value[data-count]');
        
        if (statValues.length === 0) {
            console.warn('No stat counters found');
            return;
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.getAttribute('data-count')) || 0;
                    const duration = this.isMobile ? 1500 : 2000;
                    const startTime = performance.now();
                    
                    const updateCounter = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Easing function
                        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                        const currentValue = Math.floor(easeOutQuart * target);
                        
                        element.textContent = currentValue.toLocaleString();
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            element.textContent = target.toLocaleString();
                        }
                    };
                    
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(element);
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        statValues.forEach(stat => observer.observe(stat));
    }

    // =========== MOBILE NAVIGATION ===========
    initMobileNavigation() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const hologramNav = document.getElementById('hologramNav');
        const body = document.body;
        
        if (!mobileMenuBtn || !hologramNav) {
            console.warn('Mobile navigation elements not found');
            return;
        }
        
        // Set initial state
        mobileMenuBtn.style.display = window.innerWidth <= 1024 ? 'flex' : 'none';
        
        // Toggle menu
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = mobileMenuBtn.classList.toggle('active');
            hologramNav.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            body.style.overflow = isActive ? 'hidden' : '';
        });
        
        // Close menu on nav item click
        const navItems = hologramNav.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    const targetId = item.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        // Close menu
                        mobileMenuBtn.classList.remove('active');
                        hologramNav.classList.remove('active');
                        body.classList.remove('menu-open');
                        body.style.overflow = '';
                        
                        // Smooth scroll
                        setTimeout(() => {
                            const headerHeight = this.isMobile ? 70 : 100;
                            const targetPosition = targetElement.offsetTop - headerHeight;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }, 300);
                    }
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (hologramNav.classList.contains('active') && 
                !hologramNav.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                hologramNav.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
            }
        });
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && hologramNav.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                hologramNav.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
            }
        });
    }

    // =========== NAVIGATION & SMOOTH SCROLLING ===========
    initNavigation() {
        this.updateActiveNav();
        
        // Update active nav on scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => this.updateActiveNav(), 50);
        });
    }

    updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-item');
        
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#' || targetId === '#!') {
                    e.preventDefault();
                    return;
                }
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = this.isMobile ? 70 : 100;
                    const targetPosition = targetElement.getBoundingClientRect().top + 
                                        window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL
                    history.pushState(null, null, targetId);
                }
            });
        });
        
        // Scroll progress indicator for mobile
        if (this.isMobile) {
            this.initScrollProgress();
        }
    }

    initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'cyber-scroll-progress';
        progressBar.setAttribute('role', 'progressbar');
        progressBar.setAttribute('aria-valuemin', '0');
        progressBar.setAttribute('aria-valuemax', '100');
        
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #00f3ff, #00ff41);
            z-index: 9998;
            transition: width 0.1s ease-out;
        `;
        
        document.body.appendChild(progressBar);
        
        const updateScrollProgress = () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - 
                         document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
            progressBar.setAttribute('aria-valuenow', Math.round(scrolled));
        };
        
        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress();
    }

    // =========== INTERACTIVE ELEMENTS ===========
    initInteractiveElements() {
        // Action buttons with ripple effect
        const actions = document.querySelectorAll('.cyber-action');
        actions.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Ripple effect
                const ripple = document.createElement('span');
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.7);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    top: ${y}px;
                    left: ${x}px;
                    pointer-events: none;
                `;
                
                btn.style.position = 'relative';
                btn.style.overflow = 'hidden';
                btn.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => ripple.remove(), 600);
                
                // Handle specific actions
                if (btn.classList.contains('primary')) {
                    this.initiateSystems();
                } else if (btn.classList.contains('secondary')) {
                    this.downloadProfile();
                }
            });
        });
        
        // Add ripple animation CSS
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // =========== AUDIO FEEDBACK ===========
    initAudioFeedback() {
        // Check Web Audio API support
        if (!window.AudioContext && !window.webkitAudioContext) {
            console.log('Web Audio API not supported');
            return;
        }
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        let audioEnabled = false;
        
        // Enable audio on first interaction
        const enableAudio = () => {
            if (!audioEnabled) {
                audioContext.resume().then(() => {
                    audioEnabled = true;
                    console.log('Audio system enabled');
                }).catch(console.error);
            }
        };
        
        // Add audio to interactive elements
        document.querySelectorAll('.cyber-action, .cube-face, .nav-dot').forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (audioEnabled && !this.isTouchDevice) {
                    this.playHoverSound(audioContext);
                }
            });
            
            el.addEventListener('click', () => {
                if (audioEnabled) {
                    this.playClickSound(audioContext, el);
                }
                enableAudio();
            });
        });
        
        // Enable on any user interaction
        document.addEventListener('click', enableAudio);
        document.addEventListener('keydown', enableAudio);
    }

    playHoverSound(audioContext) {
        try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
            console.log('Audio play failed:', error);
        }
    }

    playClickSound(audioContext, element) {
        try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Different sounds for different elements
            let startFreq = 200;
            let endFreq = 400;
            
            if (element.classList.contains('cube-face')) {
                startFreq = 300;
                endFreq = 600;
            } else if (element.classList.contains('nav-dot')) {
                startFreq = 100;
                endFreq = 200;
            }
            
            oscillator.frequency.setValueAtTime(startFreq, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(endFreq, audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('Audio play failed:', error);
        }
    }

    // =========== MOUSE EFFECTS ===========
    initMouseEffects() {
        if (this.isTouchDevice) return;
        
        const cursor = document.createElement('div');
        cursor.className = 'cyber-cursor';
        document.body.appendChild(cursor);
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Animation loop
        const updateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(updateCursor);
        };
        
        // Add cursor styles
        const style = document.createElement('style');
        style.textContent = `
            .cyber-cursor {
                position: fixed;
                width: 20px;
                height: 20px;
                border: 2px solid #00ccff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: difference;
                transition: width 0.3s, height 0.3s;
                transform: translate(-50%, -50%);
            }
            
            .cyber-cursor::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 4px;
                height: 4px;
                background: #ff00cc;
                border-radius: 50%;
            }
            
            .interactive:hover ~ .cyber-cursor,
            .cyber-action:hover ~ .cyber-cursor,
            .cube-face:hover ~ .cyber-cursor {
                width: 40px;
                height: 40px;
                border-color: #ff00cc;
            }
            
            body.cyber-cursor-active * {
                cursor: none !important;
            }
            
            @media (hover: none) and (pointer: coarse) {
                .cyber-cursor {
                    display: none !important;
                }
                
                body.cyber-cursor-active * {
                    cursor: auto !important;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Mark interactive elements
        document.querySelectorAll('.cyber-action, .cube-face, .nav-dot').forEach(el => {
            el.classList.add('interactive');
        });
        
        document.body.classList.add('cyber-cursor-active');
        updateCursor();
    }

    // =========== GLITCH EFFECTS ===========
    initGlitchEffects() {
        if (this.isLowEndDevice) return;
        
        const glitchElements = document.querySelectorAll('.title-highlight, .logo-text');
        
        glitchElements.forEach(element => {
            const originalText = element.textContent;
            
            setInterval(() => {
                if (Math.random() > 0.9) {
                    const glitchText = originalText.split('').map(char => 
                        Math.random() > 0.8 ? this.getRandomChar() : char
                    ).join('');
                    
                    element.textContent = glitchText;
                    
                    setTimeout(() => {
                        element.textContent = originalText;
                    }, this.isMobile ? 30 : 50);
                }
            }, this.isMobile ? 3000 : 1500);
        });
    }

    getRandomChar() {
        const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?~";
        return chars[Math.floor(Math.random() * chars.length)];
    }

    // =========== ANIMATIONS ===========
    initAnimations() {
        if (this.isLowEndDevice || this.isMobile) {
            // Reduce animations on low-end devices
            document.querySelectorAll('.matrix-cell, .tech-item, .hologram-frame').forEach(element => {
                element.style.animation = 'none';
            });
            return;
        }

        // Glitch effect on hover
        document.querySelectorAll('.matrix-cell, .tech-item, .hologram-frame').forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.animation = 'none';
                requestAnimationFrame(() => {
                    element.style.animation = 'cyberGlitch 0.3s';
                });
            });
        });
    }

    // =========== THEME TOGGLE ===========
    initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;
        
        const themes = ['cyber-theme', 'matrix-theme', 'neon-theme'];
        const themeNames = ['CYBER', 'MATRIX', 'NEON'];
        
        // Load saved theme
        try {
            const savedTheme = localStorage.getItem('portfolioTheme');
            if (savedTheme && themes.includes(savedTheme)) {
                this.currentTheme = themes.indexOf(savedTheme);
                document.body.classList.add(savedTheme);
                
                const btnText = themeToggle.querySelector('.btn-text');
                if (btnText) btnText.textContent = themeNames[this.currentTheme];
                themeToggle.classList.add('active');
            }
        } catch (error) {
            console.warn('Failed to load theme:', error);
        }
        
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Remove all themes
            themes.forEach(theme => document.body.classList.remove(theme));
            
            // Cycle to next theme
            this.currentTheme = (this.currentTheme + 1) % themes.length;
            
            // Apply new theme
            document.body.classList.add(themes[this.currentTheme]);
            
            // Update button
            const btnText = themeToggle.querySelector('.btn-text');
            if (btnText) btnText.textContent = themeNames[this.currentTheme];
            
            // Save preference
            try {
                localStorage.setItem('portfolioTheme', themes[this.currentTheme]);
            } catch (error) {
                console.warn('Failed to save theme:', error);
            }
        });
    }

    // =========== FORM HANDLING ===========
    initForm() {
        const form = document.getElementById('cyberForm');
        if (!form) return;
        
        // Email validation
        const validateEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        };
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim() === '') {
                    input.classList.add('error');
                    input.classList.remove('valid');
                } else {
                    input.classList.remove('error');
                    input.classList.add('valid');
                }
            });
            
            input.addEventListener('blur', () => {
                if (input.type === 'email' && input.value.trim() !== '' && !validateEmail(input.value)) {
                    input.classList.add('error');
                    this.showNotification('Please enter a valid email address', 'error');
                }
            });
        });
        
        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            if (!submitBtn) return;
            
            const originalText = submitBtn.querySelector('.btn-text')?.textContent || 'SEND MESSAGE';
            
            // Validate
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();
            
            let isValid = true;
            
            if (!name) {
                document.getElementById('name')?.classList.add('error');
                isValid = false;
            }
            
            if (!email || !validateEmail(email)) {
                document.getElementById('email')?.classList.add('error');
                isValid = false;
            }
            
            if (!message) {
                document.getElementById('message')?.classList.add('error');
                isValid = false;
            }
            
            if (!isValid) {
                this.showNotification('Please fill in all required fields correctly', 'error');
                return;
            }
            
            // Show loading
            submitBtn.querySelector('.btn-text').textContent = 'TRANSMITTING...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            // Simulate API call
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Success
                submitBtn.querySelector('.btn-text').textContent = 'TRANSMISSION SUCCESSFUL!';
                submitBtn.classList.add('success');
                
                this.showNotification('Message transmitted successfully!', 'success');
                
                // Reset form
                form.reset();
                inputs.forEach(input => {
                    input.classList.remove('valid', 'error');
                });
                
                // Reset button
                setTimeout(() => {
                    submitBtn.querySelector('.btn-text').textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading', 'success');
                }, 3000);
                
            } catch (error) {
                console.error('Form error:', error);
                submitBtn.querySelector('.btn-text').textContent = 'TRANSMISSION FAILED';
                submitBtn.classList.add('error');
                this.showNotification('Transmission failed. Please try again.', 'error');
                
                setTimeout(() => {
                    submitBtn.querySelector('.btn-text').textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading', 'error');
                }, 3000);
            }
        });
    }

    // =========== TOUCH OPTIMIZATIONS ===========
    initTouchOptimizations() {
        if (!this.isTouchDevice) return;
        
        document.body.classList.add('touch-device');
        
        // Improve touch scrolling
        document.documentElement.style.touchAction = 'pan-y';
        
        // Add touch feedback
        document.querySelectorAll('.cyber-btn, .nav-item, .matrix-cell').forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', () => {
                element.classList.remove('touch-active');
            });
            
            element.addEventListener('touchcancel', () => {
                element.classList.remove('touch-active');
            });
        });
        
        // Prevent zoom on double-tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
    }

    // =========== PARALLAX EFFECT ===========
    initParallax() {
        if (this.isTouchDevice || this.isMobile || this.isLowEndDevice) return;
        
        let mouseX = 0;
        let mouseY = 0;
        let lastTime = 0;
        
        document.addEventListener('mousemove', (e) => {
            const currentTime = performance.now();
            if (currentTime - lastTime < 16) return;
            lastTime = currentTime;
            
            mouseX = (e.clientX / window.innerWidth - 0.5) * 15;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 15;
        });
        
        const updateParallax = () => {
            document.querySelectorAll('.hologram-frame, .matrix-cell').forEach(element => {
                element.style.transform = `translateX(${mouseX}px) translateY(${mouseY}px)`;
            });
            requestAnimationFrame(updateParallax);
        };
        
        updateParallax();
    }

    // =========== CURSOR EFFECTS ===========
    initCursorEffects() {
        // This is now handled by initMouseEffects
        // Keeping this method for compatibility
    }

    // =========== EVENT LISTENERS ===========
    initEventListeners() {
        // Handle page visibility
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause animations
                if (this.matrixAnimationId) {
                    cancelAnimationFrame(this.matrixAnimationId);
                    this.matrixAnimationId = null;
                }
                if (this.animationFrame) {
                    cancelAnimationFrame(this.animationFrame);
                    this.animationFrame = null;
                }
            } else {
                // Resume animations
                if (!this.matrixAnimationId) {
                    this.initMatrixRain();
                }
                if (!this.animationFrame) {
                    this.init3DCube();
                }
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                location.reload();
            }
            
            if (e.key === 'Escape') {
                const modal = document.querySelector('.cyber-modal');
                if (modal) modal.remove();
            }
        });
    }

    // =========== RESPONSIVE HANDLERS ===========
    initResponsiveHandlers() {
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Handle orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                window.location.reload();
            }, 500);
        });
    }

    handleResize() {
        this.isMobile = window.innerWidth <= 768;
        this.isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        
        // Update mobile menu
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenuBtn) {
            mobileMenuBtn.style.display = window.innerWidth <= 1024 ? 'flex' : 'none';
        }
        
        // Update cube size
        const container = document.querySelector('.hologram-container');
        if (container) {
            if (window.innerWidth <= 768) {
                container.style.maxWidth = '300px';
                container.style.height = '300px';
            } else if (window.innerWidth <= 1200) {
                container.style.maxWidth = '400px';
                container.style.height = '400px';
            } else {
                container.style.maxWidth = '500px';
                container.style.height = '500px';
            }
        }
    }

    // =========== UTILITY FUNCTIONS ===========
    showModal(title, content) {
        // Remove existing modal
        document.querySelectorAll('.cyber-modal').forEach(modal => modal.remove());
        
        const modal = document.createElement('div');
        modal.className = 'cyber-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${content}</p>
                </div>
                <div class="modal-footer">
                    <button class="cyber-action">EXPLORE</button>
                    <button class="cyber-action secondary">CLOSE</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add styles if not already present
        if (!document.querySelector('#modal-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-styles';
            style.textContent = `
                .cyber-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: modalFadeIn 0.3s ease;
                }
                
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(5px);
                }
                
                .modal-content {
                    position: relative;
                    background: rgba(5, 5, 15, 0.95);
                    border: 2px solid #00ccff;
                    border-radius: 15px;
                    padding: 2rem;
                    max-width: 500px;
                    width: 90%;
                    z-index: 10001;
                    animation: modalSlideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid rgba(0, 255, 255, 0.3);
                }
                
                .modal-header h3 {
                    color: #00ccff;
                    font-family: 'Orbitron', sans-serif;
                    font-size: 1.5rem;
                }
                
                .modal-close {
                    background: transparent;
                    border: none;
                    color: #ff00cc;
                    font-size: 2rem;
                    cursor: pointer;
                    line-height: 1;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal-body {
                    margin-bottom: 2rem;
                    color: #ffffff;
                    line-height: 1.6;
                }
                
                .modal-footer {
                    display: flex;
                    gap: 1rem;
                    justify-content: flex-end;
                }
                
                @keyframes modalFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes modalSlideUp {
                    from {
                        opacity: 0;
                        transform: translateY(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.style.animation = 'modalFadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        });
        
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            modal.style.animation = 'modalFadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        });
        
        modal.querySelector('.cyber-action.secondary').addEventListener('click', () => {
            modal.style.animation = 'modalFadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        });
    }

    initiateSystems() {
        console.log('🚀 Initiating systems...');
        
        // Animate stats
        document.querySelectorAll('.stat-value').forEach(stat => {
            stat.style.transform = 'scale(1.2)';
            stat.style.color = '#ff00cc';
            
            setTimeout(() => {
                stat.style.transform = '';
                stat.style.color = '';
            }, 500);
        });
        
        this.showNotification('Systems initiated', 'success');
    }

    downloadProfile() {
        console.log('📥 Downloading profile...');
        
        // Create profile data
        const profile = {
            name: 'Cyber Developer',
            version: '3.0',
            timestamp: new Date().toISOString(),
            skills: ['JavaScript', 'React', 'Three.js', 'WebGL', 'AI/ML'],
            contact: 'cyber@developer.io'
        };
        
        // Create download link
        const blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'cyber-developer-profile.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        this.showNotification('Profile downloaded', 'success');
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.cyber-notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `cyber-notification ${type}`;
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        
        notification.style.cssText = `
            position: fixed;
            top: ${this.isMobile ? '20px' : '30px'};
            right: ${this.isMobile ? '20px' : '30px'};
            left: ${this.isMobile ? '20px' : 'auto'};
            background: ${type === 'error' ? 'rgba(255,0,51,0.95)' : 'rgba(0,255,65,0.95)'};
            color: #000;
            border: 2px solid ${type === 'error' ? '#ff0066' : '#00ff41'};
            border-radius: 8px;
            padding: ${this.isMobile ? '16px 24px' : '20px 30px'};
            z-index: 10000;
            font-family: 'Courier New', monospace;
            font-size: ${this.isMobile ? '14px' : '16px'};
            font-weight: bold;
            text-align: center;
            animation: notificationSlideIn 0.3s ease-out;
            backdrop-filter: blur(10px);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            max-width: ${this.isMobile ? 'calc(100% - 40px)' : '400px'};
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove
        setTimeout(() => {
            notification.style.animation = 'notificationSlideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Manual dismissal
        notification.addEventListener('click', () => {
            notification.style.animation = 'notificationSlideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });
    }

    showError(message) {
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #ff0033;
            color: white;
            padding: 1rem;
            text-align: center;
            z-index: 99999;
            font-family: sans-serif;
            font-weight: bold;
        `;
        errorMsg.textContent = `ERROR: ${message}`;
        document.body.appendChild(errorMsg);
        
        // Add reload button
        const reloadBtn = document.createElement('button');
        reloadBtn.textContent = 'RELOAD';
        reloadBtn.style.cssText = `
            margin-left: 1rem;
            padding: 0.5rem 1rem;
            background: white;
            color: #ff0033;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
        `;
        reloadBtn.onclick = () => location.reload();
        errorMsg.appendChild(reloadBtn);
    }

    // =========== CLEANUP ===========
    cleanup() {
        // Cancel animations
        if (this.matrixAnimationId) {
            cancelAnimationFrame(this.matrixAnimationId);
        }
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        
        // Remove custom styles
        document.querySelectorAll('[id$="-styles"], [id$="-animation"], [id$="-animations"]').forEach(el => {
            el.remove();
        });
        
        // Remove cursor
        const cursor = document.querySelector('.cyber-cursor');
        if (cursor) cursor.remove();
        
        // Remove body classes
        document.body.classList.remove('cyber-cursor-active', 'touch-device', 'menu-open');
        
        console.log('🧹 CyberPortfolio cleaned up');
    }
}

// =========== INITIALIZATION ===========
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
        console.log('🎬 Reduced motion preference detected');
    }
    
    // Show loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">
                <span style="color: #00ccff; font-family: Orbitron; font-size: 3rem;">SYSTEMS</span>
                <span style="color: #ff00cc; font-family: Rajdhani; font-size: 1rem;">BOOTING UP...</span>
            </div>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
        </div>
    `;
    
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000000;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Initialize after delay
    setTimeout(() => {
        try {
            const portfolio = new CyberPortfolio();
            window.cyberPortfolio = portfolio; // For debugging
            
            // Hide loading screen
            loadingScreen.style.opacity = '0';
            setTimeout(() => loadingScreen.remove(), 500);
            
        } catch (error) {
            console.error('❌ Critical initialization error:', error);
            loadingScreen.innerHTML = `
                <div style="text-align: center; color: #ff0000;">
                    <h3>SYSTEM ERROR</h3>
                    <p>Failed to initialize interface</p>
                    <button onclick="location.reload()" style="margin-top: 2rem; padding: 1rem 2rem; background: #00ccff; border: none; border-radius: 5px; cursor: pointer; color: #000; font-weight: bold;">
                        RELOAD SYSTEM
                    </button>
                </div>
            `;
        }
    }, 1500);
    
    // Update time in footer
    function updateTime() {
        const timeElement = document.getElementById('currentTime');
        if (timeElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            const dateString = now.toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            timeElement.textContent = `${dateString} | ${timeString}`;
        }
    }
    
    setInterval(updateTime, 1000);
    updateTime();
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.cyberPortfolio && typeof window.cyberPortfolio.cleanup === 'function') {
        window.cyberPortfolio.cleanup();
    }
});

// Service Worker for PWA
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered');
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}
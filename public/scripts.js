// ULTRA-MODERN CYBERPUNK PORTFOLIO SCRIPT - MOBILE OPTIMIZED
// ENHANCED VERSION WITH BUG FIXES AND PERFORMANCE IMPROVEMENTS

class CyberPortfolio {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this.audioEnabled = false;
        this.currentTheme = 0;
        this.matrixInterval = null;
        this.animationFrame = null;
        this.init();
    }

    init() {
        // Initialize with error handling
        try {
            this.initPerformanceMonitoring();
            this.initMobileNavigation();
            this.initMatrixRain();
            this.initNeuralNetwork();
            this.initAudio();
            this.initTyping();
            this.initCounters();
            this.initThemeToggle();
            this.initForm();
            this.initAnimations();
            this.initParallax();
            this.initCursorEffects();
            this.initGlitchEffects();
            this.initTouchOptimizations();
            this.initSmoothScrolling();
            this.initEventListeners();
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    // Performance monitoring
    initPerformanceMonitoring() {
        // Detect low-end devices
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 4;
        this.isLowEndDevice = memory < 4 || cores < 4;
        
        // Frame rate monitoring
        this.lastFrameTime = performance.now();
        this.frameCount = 0;
    }

    // Mobile Navigation Functionality - IMPROVED VERSION
    initMobileNavigation() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const hologramNav = document.getElementById('hologramNav');
        const body = document.body;
        
        if (!mobileMenuBtn || !hologramNav) {
            console.warn('Mobile navigation elements not found');
            return;
        }
        
        // Set initial state based on viewport
        mobileMenuBtn.style.display = window.innerWidth <= 1024 ? 'flex' : 'none';
        
        // Toggle mobile menu with animation
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = mobileMenuBtn.classList.toggle('active');
            hologramNav.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Prevent body scroll when menu is open
            if (isActive) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a nav item
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
                        
                        // Smooth scroll to section
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
        
        // Close menu when clicking outside - with improved detection
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
        
        // Handle window resize with debouncing
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (window.innerWidth > 1024) {
                    mobileMenuBtn.classList.remove('active');
                    hologramNav.classList.remove('active');
                    body.classList.remove('menu-open');
                    body.style.overflow = '';
                    mobileMenuBtn.style.display = 'none';
                } else {
                    mobileMenuBtn.style.display = 'flex';
                }
            }, 250);
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

    // Matrix Rain Effect - OPTIMIZED VERSION
    initMatrixRain() {
        const canvas = document.getElementById('matrixCanvas');
        if (!canvas) {
            console.warn('Matrix canvas not found');
            return;
        }

        const ctx = canvas.getContext('2d');
        let animationId = null;
        
        // Optimize for device
        const charSize = this.isMobile ? 12 : this.isTablet ? 16 : 20;
        const columns = Math.floor(window.innerWidth / charSize);
        const drops = new Array(columns).fill(1);
        
        // Character set
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        
        function resizeCanvas() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // Handle high DPI screens
            const dpr = Math.min(window.devicePixelRatio || 1, this.isLowEndDevice ? 1 : 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            
            if (ctx) {
                ctx.scale(dpr, dpr);
            }
        }
        
        resizeCanvas.call(this);
        
        function drawMatrix() {
            // Semi-transparent black overlay (slower fade on low-end devices)
            ctx.fillStyle = this.isLowEndDevice ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), 
                        canvas.height / (window.devicePixelRatio || 1));

            ctx.fillStyle = '#00ff41';
            ctx.font = `${charSize}px 'Courier New', 'MS Gothic', monospace`;
            
            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const y = drops[i] * charSize;
                
                // Draw character with slight randomness for glitch effect
                if (Math.random() > 0.95) {
                    ctx.fillStyle = '#00f3ff';
                } else if (Math.random() > 0.99) {
                    ctx.fillStyle = '#ff00ff';
                } else {
                    ctx.fillStyle = '#00ff41';
                }
                
                ctx.fillText(char, i * charSize, y);
                
                // Reset drop when it reaches bottom
                if (y > canvas.height / (window.devicePixelRatio || 1) && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            
            // Reset color
            ctx.fillStyle = '#00ff41';
        }
        
        // Animation loop with performance optimization
        function animate() {
            drawMatrix.call(this);
            animationId = requestAnimationFrame(animate.bind(this));
        }
        
        // Start animation
        animate.call(this);
        
        // Handle resize with proper cleanup
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                }
                resizeCanvas.call(this);
                drops.length = Math.floor(window.innerWidth / charSize);
                drops.fill(1);
                animate.call(this);
            }, 100);
        });
        
        // Clean up on destroy
        this.matrixInterval = animationId;
    }

    // 3D Neural Network Background - OPTIMIZED VERSION
    initNeuralNetwork() {
        const canvas = document.getElementById('neuralNetwork');
        
        // Disable on mobile or low-end devices for better performance
        if (!canvas || this.isMobile || this.isLowEndDevice) {
            if (canvas) canvas.style.display = 'none';
            return;
        }

        // Check if THREE is available
        if (typeof THREE === 'undefined') {
            console.warn('THREE.js is not loaded - neural network disabled');
            if (canvas) canvas.style.display = 'none';
            return;
        }

        try {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ 
                canvas, 
                alpha: true, 
                antialias: !this.isLowEndDevice,
                powerPreference: "high-performance"
            });

            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0x000000, 0);

            // Create nodes - optimized count
            const nodes = [];
            const nodeCount = this.isTablet ? 15 : 25;
            const geometry = new THREE.SphereGeometry(0.08, 8, 8);
            const material = new THREE.MeshBasicMaterial({ 
                color: 0x00f3ff,
                transparent: true,
                opacity: 0.8
            });

            for (let i = 0; i < nodeCount; i++) {
                const node = new THREE.Mesh(geometry, material);
                node.position.set(
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10
                );
                node.velocity = new THREE.Vector3(
                    (Math.random() - 0.5) * 0.008,
                    (Math.random() - 0.5) * 0.008,
                    (Math.random() - 0.5) * 0.008
                );
                scene.add(node);
                nodes.push(node);
            }

            // Create connections
            const connectionMaterial = new THREE.LineBasicMaterial({ 
                color: 0x00f3ff, 
                transparent: true, 
                opacity: 0.15 
            });
            let connections = [];

            function updateConnections() {
                // Remove old connections
                connections.forEach(conn => {
                    scene.remove(conn);
                    if (conn.geometry) conn.geometry.dispose();
                });
                connections = [];

                // Create new connections
                const maxConnections = this.isTablet ? 20 : 40;
                let connectionCount = 0;

                for (let i = 0; i < nodes.length && connectionCount < maxConnections; i++) {
                    for (let j = i + 1; j < nodes.length && connectionCount < maxConnections; j++) {
                        const distance = nodes[i].position.distanceTo(nodes[j].position);
                        if (distance < 6) {
                            const geometry = new THREE.BufferGeometry().setFromPoints([
                                nodes[i].position,
                                nodes[j].position
                            ]);
                            const line = new THREE.Line(geometry, connectionMaterial);
                            scene.add(line);
                            connections.push(line);
                            connectionCount++;
                        }
                    }
                }
            }

            // Animation with frame skipping for slower devices
            let lastUpdate = 0;
            const updateInterval = this.isLowEndDevice ? 1000 / 30 : 1000 / 60; // 30fps or 60fps
            
            function animate(time) {
                this.animationFrame = requestAnimationFrame(animate.bind(this));

                // Frame rate control
                if (time - lastUpdate < updateInterval) return;
                lastUpdate = time;

                // Update nodes
                nodes.forEach(node => {
                    node.position.add(node.velocity);
                    
                    // Bounce with damping
                    if (Math.abs(node.position.x) > 5) {
                        node.velocity.x *= -0.95;
                        node.position.x = Math.sign(node.position.x) * 5;
                    }
                    if (Math.abs(node.position.y) > 5) {
                        node.velocity.y *= -0.95;
                        node.position.y = Math.sign(node.position.y) * 5;
                    }
                    if (Math.abs(node.position.z) > 5) {
                        node.velocity.z *= -0.95;
                        node.position.z = Math.sign(node.position.z) * 5;
                    }
                });

                // Update connections less frequently
                if (Math.random() > 0.9) {
                    updateConnections.call(this);
                }

                renderer.render(scene, camera);
            }

            camera.position.z = 8;
            updateConnections.call(this);
            animate.call(this, 0);

            // Handle resize with cleanup
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    if (window.innerWidth <= 768) {
                        // Dispose resources
                        renderer.dispose();
                        geometry.dispose();
                        material.dispose();
                        connectionMaterial.dispose();
                        canvas.style.display = 'none';
                        if (this.animationFrame) {
                            cancelAnimationFrame(this.animationFrame);
                        }
                    } else {
                        camera.aspect = window.innerWidth / window.innerHeight;
                        camera.updateProjectionMatrix();
                        renderer.setSize(window.innerWidth, window.innerHeight);
                    }
                }, 250);
            });

        } catch (error) {
            console.error('Neural network initialization error:', error);
            if (canvas) canvas.style.display = 'none';
        }
    }

    // Audio System - IMPROVED VERSION
    initAudio() {
        const audioToggle = document.getElementById('audioToggle');
        const hoverSound = document.getElementById('hoverSound');
        const clickSound = document.getElementById('clickSound');

        if (!audioToggle) {
            console.warn('Audio toggle not found');
            return;
        }

        // Check if audio is supported
        const audioContext = window.AudioContext || window.webkitAudioContext;
        this.canPlayAudio = !!audioContext && !this.isLowEndDevice;
        
        if (!this.canPlayAudio) {
            audioToggle.style.display = 'none';
            return;
        }

        // Initialize audio context on user interaction
        let audioInitialized = false;
        
        const initializeAudio = () => {
            if (audioInitialized) return;
            
            try {
                // Preload audio files
                if (hoverSound) hoverSound.load();
                if (clickSound) clickSound.load();
                
                audioInitialized = true;
                console.log('Audio system initialized');
            } catch (error) {
                console.error('Audio initialization failed:', error);
            }
        };

        // Toggle audio with visual feedback
        audioToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            initializeAudio();
            
            this.audioEnabled = !this.audioEnabled;
            const btnText = audioToggle.querySelector('.btn-text');
            
            if (btnText) {
                btnText.textContent = this.audioEnabled ? 'AUDIO ON' : 'AUDIO OFF';
            }
            
            // Add visual feedback
            audioToggle.classList.toggle('active', this.audioEnabled);
            
            // Play feedback sound
            if (this.audioEnabled && clickSound) {
                try {
                    clickSound.currentTime = 0;
                    clickSound.play().catch(() => {
                        console.warn('Audio play failed - user interaction required');
                    });
                } catch (error) {
                    console.error('Audio play error:', error);
                }
            }
        });

        // Add audio feedback to interactive elements (desktop only)
        if (!this.isTouchDevice) {
            const interactiveElements = document.querySelectorAll('.cyber-btn, .nav-item, .matrix-cell, .tech-item');
            
            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    if (this.audioEnabled && hoverSound) {
                        hoverSound.currentTime = 0;
                        hoverSound.volume = 0.15;
                        hoverSound.play().catch(() => {});
                    }
                });

                element.addEventListener('click', (e) => {
                    if (this.audioEnabled && clickSound && e.target !== audioToggle) {
                        clickSound.currentTime = 0;
                        clickSound.volume = 0.2;
                        clickSound.play().catch(() => {});
                    }
                });
            });
        }

        // Enable audio on first interaction
        const enableOnInteraction = () => {
            initializeAudio();
            document.removeEventListener('click', enableOnInteraction);
            document.removeEventListener('keydown', enableOnInteraction);
        };

        document.addEventListener('click', enableOnInteraction);
        document.addEventListener('keydown', enableOnInteraction);
    }

    // Typing Animation - IMPROVED VERSION
    initTyping() {
        const typingElement = document.getElementById('typingCommand');
        if (!typingElement) {
            console.warn('Typing element not found');
            return;
        }

        const commands = [
            'npm start',
            'git push origin main',
            'python ai_model.py',
            'node server.js',
            'react-three-fiber',
            'tensorflow train',
            'webgl render',
            'deploy --production'
        ];

        let commandIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;
        let typingTimeout = null;

        function type() {
            const currentCommand = commands[commandIndex];

            if (isPaused) {
                typingTimeout = setTimeout(type, 1000);
                isPaused = false;
                return;
            }

            if (!isDeleting && charIndex <= currentCommand.length) {
                typingElement.textContent = currentCommand.substring(0, charIndex);
                charIndex++;
                typingTimeout = setTimeout(type, this.isMobile ? 100 : 80);
            } else if (isDeleting && charIndex >= 0) {
                typingElement.textContent = currentCommand.substring(0, charIndex);
                charIndex--;
                typingTimeout = setTimeout(type, this.isMobile ? 60 : 40);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    commandIndex = (commandIndex + 1) % commands.length;
                }
                isPaused = true;
                typingTimeout = setTimeout(type, 500);
            }
        }

        // Start typing animation
        typingTimeout = setTimeout(() => type.call(this), 1000);

        // Clean up on page hide
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && typingTimeout) {
                clearTimeout(typingTimeout);
            }
        });
    }

    // Animated Counters - IMPROVED VERSION
    initCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        if (counters.length === 0) {
            console.warn('No counters found');
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count')) || 0;
                    const duration = this.isMobile ? 1500 : 2000;
                    const startTime = performance.now();
                    
                    // Format number with commas
                    const formatNumber = (num) => {
                        return num.toLocaleString('en-US');
                    };

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Easing function for smooth animation
                        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                        const currentValue = Math.floor(easeOutQuart * target);
                        
                        counter.textContent = formatNumber(currentValue);
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = formatNumber(target);
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    observer.unobserve(counter);
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });

        counters.forEach(counter => observer.observe(counter));
    }

    // Theme Toggle - IMPROVED VERSION
    initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) {
            console.warn('Theme toggle not found');
            return;
        }

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
            console.warn('Failed to load theme from localStorage:', error);
        }

        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Remove all themes
            themes.forEach(theme => document.body.classList.remove(theme));
            
            // Cycle to next theme
            this.currentTheme = (this.currentTheme + 1) % themes.length;
            
            // Apply new theme with transition
            document.body.style.opacity = '0.9';
            setTimeout(() => {
                document.body.classList.add(themes[this.currentTheme]);
                document.body.style.opacity = '';
            }, 150);
            
            // Update button text
            const btnText = themeToggle.querySelector('.btn-text');
            if (btnText) btnText.textContent = themeNames[this.currentTheme];
            
            // Add visual feedback
            themeToggle.classList.add('pulse');
            setTimeout(() => {
                themeToggle.classList.remove('pulse');
            }, 300);
            
            // Save to localStorage
            try {
                localStorage.setItem('portfolioTheme', themes[this.currentTheme]);
            } catch (error) {
                console.warn('Failed to save theme to localStorage:', error);
            }
        });
    }

    // Form Submission - IMPROVED VERSION
    initForm() {
        const form = document.getElementById('cyberForm');
        if (!form) {
            console.warn('Form not found');
            return;
        }

        // Helper function for notifications
        const showNotification = (message, type = 'success') => {
            // Remove existing notifications
            document.querySelectorAll('.cyber-notification').forEach(n => n.remove());
            
            const notification = document.createElement('div');
            notification.className = `cyber-notification ${type}`;
            notification.textContent = message;
            notification.setAttribute('role', 'alert');
            notification.setAttribute('aria-live', 'polite');
            
            // Position based on device
            const topPosition = this.isMobile ? '20px' : '30px';
            const sidePosition = this.isMobile ? '20px' : '30px';
            
            notification.style.cssText = `
                position: fixed;
                top: ${topPosition};
                right: ${sidePosition};
                left: ${this.isMobile ? '20px' : 'auto'};
                padding: ${this.isMobile ? '16px 24px' : '20px 30px'};
                background: ${type === 'error' ? 'rgba(255,0,51,0.95)' : 'rgba(0,255,65,0.95)'};
                color: #000;
                border: 2px solid ${type === 'error' ? '#ff0066' : '#00ff41'};
                border-radius: 8px;
                z-index: 99999;
                font-family: 'Courier New', monospace;
                font-size: ${this.isMobile ? '14px' : '16px'};
                animation: cyberNotificationSlideIn 0.3s ease-out;
                backdrop-filter: blur(10px);
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
                max-width: ${this.isMobile ? 'calc(100% - 40px)' : '400px'};
                text-align: center;
                font-weight: bold;
            `;
            
            document.body.appendChild(notification);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                notification.style.animation = 'cyberNotificationSlideOut 0.3s ease-out';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }, 5000);
            
            // Allow manual dismissal
            notification.addEventListener('click', () => {
                notification.style.animation = 'cyberNotificationSlideOut 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            });
        };

        // Add notification animations
        if (!document.querySelector('#notification-animations')) {
            const style = document.createElement('style');
            style.id = 'notification-animations';
            style.textContent = `
                @keyframes cyberNotificationSlideIn {
                    from {
                        transform: ${this.isMobile ? 'translateY(-100px)' : 'translateX(100px)'};
                        opacity: 0;
                    }
                    to {
                        transform: ${this.isMobile ? 'translateY(0)' : 'translateX(0)'};
                        opacity: 1;
                    }
                }
                
                @keyframes cyberNotificationSlideOut {
                    from {
                        transform: ${this.isMobile ? 'translateY(0)' : 'translateX(0)'};
                        opacity: 1;
                    }
                    to {
                        transform: ${this.isMobile ? 'translateY(-100px)' : 'translateX(100px)'};
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

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
                } else {
                    input.classList.remove('error');
                    input.classList.add('valid');
                }
            });
            
            input.addEventListener('blur', () => {
                if (input.type === 'email' && input.value.trim() !== '' && !validateEmail(input.value)) {
                    input.classList.add('error');
                    showNotification('Please enter a valid email address', 'error');
                }
            });
        });

        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            if (!submitBtn) return;

            const originalText = submitBtn.querySelector('.btn-text')?.textContent || 'SEND MESSAGE';
            
            // Validate form
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            if (!name) {
                document.getElementById('name').classList.add('error');
                isValid = false;
            }
            
            if (!email || !validateEmail(email)) {
                document.getElementById('email').classList.add('error');
                isValid = false;
            }
            
            if (!message) {
                document.getElementById('message').classList.add('error');
                isValid = false;
            }
            
            if (!isValid) {
                showNotification('Please fill in all required fields correctly', 'error');
                return;
            }

            // Show loading state
            submitBtn.querySelector('.btn-text').textContent = 'TRANSMITTING...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');

            // Simulate API call (replace with real API in production)
            try {
                // In production, replace this with actual fetch/axios call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Success
                submitBtn.querySelector('.btn-text').textContent = 'TRANSMISSION SUCCESSFUL!';
                submitBtn.classList.add('success');
                
                showNotification('Message transmitted successfully! I\'ll respond within 24 hours.', 'success');
                
                // Reset form
                form.reset();
                inputs.forEach(input => {
                    input.classList.remove('valid', 'error');
                });
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.querySelector('.btn-text').textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading', 'success');
                }, 3000);
                
            } catch (error) {
                console.error('Form submission error:', error);
                submitBtn.querySelector('.btn-text').textContent = 'TRANSMISSION FAILED';
                submitBtn.classList.add('error');
                showNotification('Transmission failed. Please try again.', 'error');
                
                setTimeout(() => {
                    submitBtn.querySelector('.btn-text').textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading', 'error');
                }, 3000);
            }
        });
    }

    // Advanced Animations - OPTIMIZED
    initAnimations() {
        // Skip on low-end devices or mobile
        if (this.isMobile || this.isLowEndDevice) {
            document.querySelectorAll('.matrix-cell, .tech-item, .hologram-frame').forEach(element => {
                element.style.animation = 'none';
            });
            return;
        }

        // Glitch effect on hover
        const glitchableElements = document.querySelectorAll('.matrix-cell, .tech-item, .hologram-frame');
        
        glitchableElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.animation = 'none';
                requestAnimationFrame(() => {
                    element.style.animation = 'cyberGlitch 0.3s';
                });
            });
        });

        // Random glitch effect
        setInterval(() => {
            if (Math.random() > 0.7) {
                const glitchElements = document.querySelectorAll('.title-highlight, .neon-text');
                glitchElements.forEach(element => {
                    element.style.textShadow = `0 0 20px ${getRandomNeonColor()}`;
                    setTimeout(() => {
                        element.style.textShadow = '';
                    }, 50);
                });
            }
        }, 3000);
    }

    // Parallax Effect - OPTIMIZED
    initParallax() {
        // Disable on touch devices for better performance
        if (this.isTouchDevice || this.isMobile) return;

        let mouseX = 0;
        let mouseY = 0;
        let lastTime = 0;

        document.addEventListener('mousemove', (e) => {
            const currentTime = performance.now();
            if (currentTime - lastTime < 16) return; // Limit to ~60fps
            lastTime = currentTime;

            mouseX = (e.clientX / window.innerWidth - 0.5) * 15;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 15;
        });

        function updateParallax() {
            document.querySelectorAll('.hologram-frame, .matrix-cell').forEach(element => {
                element.style.transform = `translateX(${mouseX}px) translateY(${mouseY}px)`;
            });
            requestAnimationFrame(updateParallax);
        }

        updateParallax();
    }

    // Custom Cursor Effects - OPTIMIZED
    initCursorEffects() {
        // Disable on touch devices
        if (this.isTouchDevice) return;

        const cursor = document.createElement('div');
        cursor.className = 'cyber-cursor';
        cursor.setAttribute('aria-hidden', 'true');
        
        const cursor2 = document.createElement('div');
        cursor2.className = 'cyber-cursor-2';
        cursor2.setAttribute('aria-hidden', 'true');
        
        document.body.appendChild(cursor);
        document.body.appendChild(cursor2);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let cursor2X = 0;
        let cursor2Y = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Cursor styles
        const style = document.createElement('style');
        style.textContent = `
            .cyber-cursor {
                position: fixed;
                width: 20px;
                height: 20px;
                border: 2px solid #00f3ff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: difference;
                transition: width 0.3s, height 0.3s;
                transform: translate(-50%, -50%);
            }
            
            .cyber-cursor-2 {
                position: fixed;
                width: 8px;
                height: 8px;
                background: #00f3ff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: difference;
                transition: transform 0.2s;
                transform: translate(-50%, -50%);
            }
            
            /* Hide default cursor when custom cursor is active */
            .cyber-cursor-active * {
                cursor: none !important;
            }
            
            @media (hover: none) and (pointer: coarse) {
                .cyber-cursor,
                .cyber-cursor-2 {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.classList.add('cyber-cursor-active');

        // Animation loop
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            
            cursor2X += (mouseX - cursor2X) * 0.05;
            cursor2Y += (mouseY - cursor2Y) * 0.05;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursor2.style.left = cursor2X + 'px';
            cursor2.style.top = cursor2Y + 'px';
            
            requestAnimationFrame(animateCursor);
        }

        animateCursor();
    }

    // Glitch Text Effects - OPTIMIZED
    initGlitchEffects() {
        const glitchElements = document.querySelectorAll('.title-highlight, .logo-text');
        
        if (glitchElements.length === 0) return;

        glitchElements.forEach(element => {
            const originalText = element.textContent;
            let glitchInterval;
            
            // Store original text in data attribute
            element.dataset.originalText = originalText;
            
            // Less frequent glitches on mobile
            const interval = this.isMobile ? 3000 : 1500;
            
            glitchInterval = setInterval(() => {
                if (Math.random() > 0.9) {
                    const glitchText = originalText.split('').map(char => 
                        Math.random() > 0.8 ? getRandomChar() : char
                    ).join('');
                    
                    element.textContent = glitchText;
                    
                    setTimeout(() => {
                        element.textContent = originalText;
                    }, this.isMobile ? 30 : 50);
                }
            }, interval);
            
            // Store interval for cleanup
            element.dataset.glitchInterval = glitchInterval;
        });
    }

    // Touch device optimizations
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
        
        // Add touch-specific styles
        const style = document.createElement('style');
        style.textContent = `
            .touch-device .cyber-btn,
            .touch-device .nav-item {
                min-height: 44px;
                min-width: 44px;
                cursor: pointer;
            }
            
            .touch-device .form-input,
            .touch-device .form-textarea {
                font-size: 16px !important;
            }
            
            .touch-active {
                transform: scale(0.95);
                transition: transform 0.1s ease-out;
            }
            
            /* Remove hover effects on touch */
            .touch-device *:hover {
                transform: none !important;
            }
            
            /* Better scrolling on iOS */
            .touch-device {
                -webkit-overflow-scrolling: touch;
            }
        `;
        document.head.appendChild(style);
    }

    // Smooth scrolling
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
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
                    
                    // Update URL without page jump
                    history.pushState(null, null, targetId);
                }
            });
        });
        
        // Add scroll progress indicator for mobile
        if (this.isMobile) {
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
            
            function updateScrollProgress() {
                const winScroll = document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - 
                             document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                progressBar.style.width = scrolled + '%';
                progressBar.setAttribute('aria-valuenow', Math.round(scrolled));
            }
            
            window.addEventListener('scroll', updateScrollProgress);
            updateScrollProgress();
        }
    }

    // Event Listeners
    initEventListeners() {
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause heavy animations
                if (this.matrixInterval) {
                    cancelAnimationFrame(this.matrixInterval);
                }
                if (this.animationFrame) {
                    cancelAnimationFrame(this.animationFrame);
                }
            } else {
                // Resume animations
                this.initMatrixRain();
            }
        });
        
        // Handle beforeunload for cleanup
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });
    }
    
    // Cleanup method
    cleanup() {
        // Cancel animation frames
        if (this.matrixInterval) {
            cancelAnimationFrame(this.matrixInterval);
        }
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        // Clear intervals from glitch effects
        document.querySelectorAll('[data-glitch-interval]').forEach(element => {
            clearInterval(element.dataset.glitchInterval);
        });
        
        // Remove event listeners
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        window.removeEventListener('beforeunload', this.cleanup);
    }
    
    // Handle resize
    handleResize() {
        this.isMobile = window.innerWidth <= 768;
        this.isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        
        // Update mobile menu button
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenuBtn) {
            mobileMenuBtn.style.display = window.innerWidth <= 1024 ? 'flex' : 'none';
        }
        
        // Update hologram size
        const heroHologram = document.querySelector('.hero-hologram');
        if (heroHologram) {
            if (window.innerWidth <= 480) {
                heroHologram.style.height = '180px';
            } else if (window.innerWidth <= 768) {
                heroHologram.style.height = '220px';
            } else if (window.innerWidth <= 1024) {
                heroHologram.style.height = '280px';
            } else {
                heroHologram.style.height = '';
            }
        }
    }
}

// Utility functions
function getRandomNeonColor() {
    const colors = ['#00f3ff', '#ff00ff', '#00ff9d', '#9d00ff', '#ffd300', '#00ff41'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomChar() {
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?~";
    return chars[Math.floor(Math.random() * chars.length)];
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
        console.log('Reduced motion preference detected - animations reduced');
    }
    
    // Initialize portfolio
    let portfolio;
    try {
        portfolio = new CyberPortfolio();
        
        // Store reference for debugging
        window.cyberPortfolio = portfolio;
    } catch (error) {
        console.error('Failed to initialize CyberPortfolio:', error);
        // Fallback: show error message to user
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #ff0033;
            color: white;
            padding: 10px;
            text-align: center;
            z-index: 99999;
            font-family: sans-serif;
        `;
        errorMsg.textContent = 'Error loading portfolio. Please refresh the page.';
        document.body.appendChild(errorMsg);
    }
    
    // Update current time in footer
    function updateTime() {
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
        
        const timeElement = document.getElementById('currentTime');
        if (timeElement) {
            timeElement.textContent = `${dateString} | ${timeString}`;
        }
    }
    
    // Update time every second
    const timeInterval = setInterval(updateTime, 1000);
    updateTime();
    
    // Active navigation based on scroll position
    function updateActiveNav() {
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
    
    // Debounced scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNav, 50);
    });
    
    // Initial call
    updateActiveNav();
    
    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        // Wait for orientation to settle
        setTimeout(() => {
            window.location.reload();
        }, 500);
    });
    
    // Service Worker for PWA (optional)
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful');
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed:', error);
                });
        });
    }
    
    // Clean up on page unload
    window.addEventListener('unload', () => {
        if (portfolio && typeof portfolio.cleanup === 'function') {
            portfolio.cleanup();
        }
        clearInterval(timeInterval);
    });
});

// Add missing CSS if not already defined
if (!document.querySelector('#cyber-portfolio-styles')) {
    const styles = document.createElement('style');
    styles.id = 'cyber-portfolio-styles';
    styles.textContent = `
        /* Cyber Portfolio Styles */
        
        @keyframes cyberGlitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
        
        @keyframes cyberPulse {
            0% { box-shadow: 0 0 0 0 rgba(0, 243, 255, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(0, 243, 255, 0); }
            100% { box-shadow: 0 0 0 0 rgba(0, 243, 255, 0); }
        }
        
        /* Themes */
        .cyber-theme {
            --primary: #00f3ff;
            --secondary: #ff00ff;
            --accent: #00ff9d;
            --background: #0a0a0a;
        }
        
        .matrix-theme {
            --primary: #00ff41;
            --secondary: #00ff41;
            --accent: #00ff41;
            --background: #000000;
        }
        
        .neon-theme {
            --primary: #ff00ff;
            --secondary: #00f3ff;
            --accent: #ffd300;
            --background: #111111;
        }
        
        /* Active navigation */
        .nav-item.active {
            background: linear-gradient(45deg, transparent, var(--primary, #00f3ff), transparent) !important;
            box-shadow: 0 0 20px var(--primary, #00f3ff) !important;
        }
        
        /* Loading states */
        .cyber-btn.loading {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        .cyber-btn.success {
            background: linear-gradient(45deg, #00ff41, #00f3ff) !important;
        }
        
        .cyber-btn.error {
            background: linear-gradient(45deg, #ff0033, #ff0066) !important;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .hologram-nav:not(.active) {
                display: none !important;
            }
            
            .hologram-nav.active {
                display: flex !important;
                animation: slideInRight 0.3s ease-out;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            /* Disable heavy animations on mobile */
            .reduced-motion *,
            .reduced-motion *::before,
            .reduced-motion *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        }
        
        /* Form validation */
        .form-input.error,
        .form-textarea.error {
            border-color: #ff0033 !important;
            box-shadow: 0 0 10px rgba(255, 0, 51, 0.5) !important;
        }
        
        .form-input.valid,
        .form-textarea.valid {
            border-color: #00ff41 !important;
            box-shadow: 0 0 10px rgba(0, 255, 65, 0.3) !important;
        }
        
        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        }
        
        /* Focus styles for accessibility */
        *:focus-visible {
            outline: 2px solid var(--primary, #00f3ff) !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(styles);
}
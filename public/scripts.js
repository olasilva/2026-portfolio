// ULTRA-MODERN CYBERPUNK PORTFOLIO SCRIPT - MOBILE OPTIMIZED

class CyberPortfolio {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all components
        this.initMobileNavigation(); // FIRST - Mobile nav setup
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
        this.initPerformanceOptimizations();
        this.initSmoothScrolling();
    }

    // Mobile Navigation Functionality
    // Mobile Navigation Functionality - SIMPLIFIED VERSION
initMobileNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const hologramNav = document.getElementById('hologramNav');
    const body = document.body;
    
    if (!mobileMenuBtn || !hologramNav) {
        console.log('Mobile navigation elements not found');
        return;
    }
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenuBtn.classList.toggle('active');
        hologramNav.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a nav item
    const navItems = hologramNav.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                mobileMenuBtn.classList.remove('active');
                hologramNav.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hologramNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            hologramNav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            mobileMenuBtn.classList.remove('active');
            hologramNav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}
    // Matrix Rain Effect
    initMatrixRain() {
        const canvas = document.getElementById('matrixCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Optimize for mobile
        const isMobile = window.innerWidth <= 768;
        const charSize = isMobile ? 14 : 20;
        
        function resizeCanvas() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // Handle high DPI screens
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.scale(dpr, dpr);
        }
        
        resizeCanvas();
        
        const chars = "01";
        const columns = Math.floor(canvas.width / (charSize * (window.devicePixelRatio || 1)));
        const drops = Array(columns).fill(1);

        function drawMatrix() {
            // Reduce opacity for better performance on mobile
            ctx.fillStyle = window.innerWidth <= 768 ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff41';
            ctx.font = `${charSize}px 'Courier New', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * charSize, drops[i] * charSize);

                if (drops[i] * charSize > canvas.height / (window.devicePixelRatio || 1) && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        // Adjust animation speed for mobile
        const animationSpeed = isMobile ? 80 : 50;
        setInterval(drawMatrix, animationSpeed);

        window.addEventListener('resize', () => {
            resizeCanvas();
            const newColumns = Math.floor(canvas.width / (charSize * (window.devicePixelRatio || 1)));
            while (drops.length < newColumns) drops.push(1);
            while (drops.length > newColumns) drops.pop();
        });
    }

    // 3D Neural Network Background - Lighter version for mobile
    initNeuralNetwork() {
        const canvas = document.getElementById('neuralNetwork');
        if (!canvas || window.innerWidth <= 768) {
            // Disable 3D on mobile for better performance
            if (canvas) canvas.style.display = 'none';
            return;
        }

        // Check if THREE is available
        if (typeof THREE === 'undefined') {
            console.warn('THREE.js is not loaded');
            canvas.style.display = 'none';
            return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas, 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create nodes - fewer on mobile
        const nodes = [];
        const nodeCount = window.innerWidth <= 1024 ? 20 : 50;
        const geometry = new THREE.SphereGeometry(0.1, 6, 6); // Lower resolution
        const material = new THREE.MeshBasicMaterial({ color: 0x00f3ff });

        for (let i = 0; i < nodeCount; i++) {
            const node = new THREE.Mesh(geometry, material);
            node.position.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15
            );
            node.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01
            );
            scene.add(node);
            nodes.push(node);
        }

        // Create connections
        const connectionMaterial = new THREE.LineBasicMaterial({ 
            color: 0x00f3ff, 
            transparent: true, 
            opacity: 0.2 
        });
        const connections = [];

        function createConnections() {
            // Remove old connections
            connections.forEach(conn => {
                scene.remove(conn);
                if (conn.geometry) conn.geometry.dispose();
            });
            connections.length = 0;

            // Create new connections - fewer on mobile
            const maxConnections = window.innerWidth <= 768 ? 30 : 100;
            let connectionCount = 0;

            for (let i = 0; i < nodes.length && connectionCount < maxConnections; i++) {
                for (let j = i + 1; j < nodes.length && connectionCount < maxConnections; j++) {
                    const distance = nodes[i].position.distanceTo(nodes[j].position);
                    if (distance < 8) {
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

        // Animation with performance optimization
        let frameCount = 0;
        function animate() {
            requestAnimationFrame(animate);

            // Skip frames on slower devices
            frameCount++;
            if (window.innerWidth <= 768 && frameCount % 2 === 0) return;

            nodes.forEach(node => {
                node.position.add(node.velocity);
                
                // Bounce off boundaries
                if (Math.abs(node.position.x) > 7.5) node.velocity.x *= -1;
                if (Math.abs(node.position.y) > 7.5) node.velocity.y *= -1;
                if (Math.abs(node.position.z) > 7.5) node.velocity.z *= -1;
            });

            // Update connections less frequently on mobile
            if (frameCount % (window.innerWidth <= 768 ? 10 : 5) === 0) {
                createConnections();
            }

            renderer.render(scene, camera);
        }

        camera.position.z = 12;
        animate();

        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (window.innerWidth <= 768) {
                    // Disable 3D on small screens
                    canvas.style.display = 'none';
                    renderer.dispose();
                } else {
                    canvas.style.display = 'block';
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                }
            }, 250);
        });
    }

    // Audio System
    initAudio() {
        const audioToggle = document.getElementById('audioToggle');
        const hoverSound = document.getElementById('hoverSound');
        const clickSound = document.getElementById('clickSound');

        if (!audioToggle) return;

        let audioEnabled = false;

        // Enable audio on first interaction
        const enableAudio = () => {
            if (!audioEnabled) {
                audioEnabled = true;
                hoverSound.volume = 0.2;
                clickSound.volume = 0.2;
                const btnText = audioToggle.querySelector('.btn-text');
                if (btnText) btnText.textContent = 'AUDIO ON';
            }
        };

        // Toggle audio
        audioToggle.addEventListener('click', (e) => {
            e.preventDefault();
            enableAudio();
            audioEnabled = !audioEnabled;
            const text = audioEnabled ? 'AUDIO ON' : 'AUDIO OFF';
            const btnText = audioToggle.querySelector('.btn-text');
            if (btnText) btnText.textContent = text;
            
            if (audioEnabled) {
                clickSound.currentTime = 0;
                clickSound.play().catch(e => console.log('Audio play failed:', e));
            }
        });

        // Add hover sounds to interactive elements - disable on mobile for performance
        if (window.innerWidth > 768) {
            document.querySelectorAll('.cyber-btn, .nav-item, .matrix-cell, .tech-item').forEach(element => {
                element.addEventListener('mouseenter', () => {
                    if (audioEnabled) {
                        hoverSound.currentTime = 0;
                        hoverSound.play().catch(e => console.log('Audio play failed:', e));
                    }
                });

                element.addEventListener('click', () => {
                    if (audioEnabled) {
                        clickSound.currentTime = 0;
                        clickSound.play().catch(e => console.log('Audio play failed:', e));
                    }
                });
            });
        }

        // Enable audio on first click anywhere
        document.addEventListener('click', enableAudio, { once: true });
    }

    // Typing Animation
    initTyping() {
        const typingElement = document.getElementById('typingCommand');
        if (!typingElement) return;

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

        function type() {
            const currentCommand = commands[commandIndex];

            if (isPaused) {
                setTimeout(type, 1000);
                isPaused = false;
                return;
            }

            if (!isDeleting && charIndex <= currentCommand.length) {
                typingElement.textContent = currentCommand.substring(0, charIndex);
                charIndex++;
                setTimeout(type, window.innerWidth <= 768 ? 120 : 100); // Slower on mobile
            } else if (isDeleting && charIndex >= 0) {
                typingElement.textContent = currentCommand.substring(0, charIndex);
                charIndex--;
                setTimeout(type, window.innerWidth <= 768 ? 80 : 50); // Slower on mobile
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    commandIndex = (commandIndex + 1) % commands.length;
                }
                isPaused = true;
                setTimeout(type, 500);
            }
        }

        setTimeout(type, 1000);
    }

    // Animated Counters
    initCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count')) || 0;
                    const duration = window.innerWidth <= 768 ? 1500 : 2000; // Faster on mobile
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        if (current < target) {
                            current += step;
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { 
            threshold: 0.3, // Lower threshold for mobile
            rootMargin: '0px 0px -50px 0px' // Adjust for mobile view
        });

        counters.forEach(counter => observer.observe(counter));
    }

    // Theme Toggle
    initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        const themes = ['cyber-theme', 'matrix-theme', 'neon-theme'];
        let currentTheme = 0;

        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove all themes first
            themes.forEach(theme => document.body.classList.remove(theme));
            
            // Cycle to next theme
            currentTheme = (currentTheme + 1) % themes.length;
            
            // Apply new theme
            document.body.classList.add(themes[currentTheme]);
            
            // Update button text
            const themeNames = ['CYBER', 'MATRIX', 'NEON'];
            const btnText = themeToggle.querySelector('.btn-text');
            if (btnText) btnText.textContent = themeNames[currentTheme];
            
            // Save to localStorage
            localStorage.setItem('portfolioTheme', themes[currentTheme]);
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('portfolioTheme');
        if (savedTheme && themes.includes(savedTheme)) {
            currentTheme = themes.indexOf(savedTheme);
            document.body.classList.add(savedTheme);
            const themeNames = ['CYBER', 'MATRIX', 'NEON'];
            const btnText = themeToggle.querySelector('.btn-text');
            if (btnText) btnText.textContent = themeNames[currentTheme];
        }
    }

    // Form Submission
    initForm() {
        const form = document.getElementById('cyberForm');
        if (!form) return;

        // Helper function for notifications
        const showNotification = (message, type = 'info') => {
            const notification = document.createElement('div');
            notification.className = `cyber-notification ${type}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: ${window.innerWidth <= 768 ? '10px' : '20px'};
                right: ${window.innerWidth <= 768 ? '10px' : '20px'};
                left: ${window.innerWidth <= 768 ? '10px' : 'auto'};
                padding: ${window.innerWidth <= 768 ? '12px 20px' : '15px 25px'};
                background: ${type === 'error' ? 'rgba(255,0,51,0.95)' : 'rgba(0,255,65,0.95)'};
                color: white;
                border: 2px solid ${type === 'error' ? '#ff0066' : '#00ff41'};
                border-radius: ${window.innerWidth <= 768 ? '8px' : '10px'};
                z-index: 10000;
                font-family: 'Courier New', monospace;
                font-size: ${window.innerWidth <= 768 ? '0.9rem' : '1rem'};
                animation: slideIn 0.3s ease-out;
                max-width: ${window.innerWidth <= 768 ? 'calc(100% - 20px)' : '400px'};
                text-align: center;
                backdrop-filter: blur(10px);
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }, 5000);
        };

        // Add CSS animations for notifications
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { 
                        transform: ${window.innerWidth <= 768 ? 'translateY(-100px)' : 'translateX(100px)'};
                        opacity: 0;
                    }
                    to { 
                        transform: ${window.innerWidth <= 768 ? 'translateY(0)' : 'translateX(0)'};
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    from { 
                        transform: ${window.innerWidth <= 768 ? 'translateY(0)' : 'translateX(0)'};
                        opacity: 1;
                    }
                    to { 
                        transform: ${window.innerWidth <= 768 ? 'translateY(-100px)' : 'translateX(100px)'};
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.querySelector('.btn-text').textContent;
            
            // Validate form
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Show loading state
            submitBtn.querySelector('.btn-text').textContent = 'TRANSMITTING...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // Simulate API call with timeout for demo
            setTimeout(() => {
                // Show success state
                submitBtn.querySelector('.btn-text').textContent = 'TRANSMISSION SUCCESSFUL!';
                submitBtn.style.background = 'linear-gradient(45deg, #00ff41, #00f3ff)';
                
                // Show success notification
                showNotification('Message transmitted successfully! I\'ll get back to you soon.', 'success');
                
                // Reset form
                form.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.querySelector('.btn-text').textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '';
                    submitBtn.style.background = '';
                }, 3000);
            }, 2000);
        });

        // Email validation helper
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // Add input validation styles
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.value.trim() === '') {
                    input.style.borderColor = '#ff0033';
                } else {
                    input.style.borderColor = '#00ff41';
                }
            });
        });
    }

    // Advanced Animations
    initAnimations() {
        // Reduce animations on mobile for performance
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.matrix-cell, .tech-item, .hologram-frame').forEach(element => {
                element.style.animation = 'none';
            });
            return;
        }

        // Glitch effect on hover (desktop only)
        document.querySelectorAll('.matrix-cell, .tech-item, .hologram-frame').forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.animation = 'none';
                setTimeout(() => {
                    element.style.animation = 'matrixGlitch 0.5s';
                }, 10);
            });
        });

        // Random glitch effect (desktop only)
        setInterval(() => {
            const glitchElements = document.querySelectorAll('.title-highlight, .neon-text');
            glitchElements.forEach(element => {
                if (Math.random() > 0.9) {
                    element.style.textShadow = `0 0 20px ${getRandomColor()}`;
                    setTimeout(() => {
                        element.style.textShadow = '';
                    }, 100);
                }
            });
        }, 3000);
    }

    // Parallax Effect - Disable on mobile
    initParallax() {
        if (window.innerWidth <= 768) return;

        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            document.querySelectorAll('.hologram-frame, .matrix-cell').forEach(element => {
                element.style.transform = `translateX(${x}px) translateY(${y}px)`;
            });
        });
    }

    // Custom Cursor Effects - Disable on mobile
    initCursorEffects() {
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            return; // Disable on touch devices
        }

        const cursor = document.createElement('div');
        cursor.className = 'cyber-cursor';
        document.body.appendChild(cursor);

        const cursor2 = document.createElement('div');
        cursor2.className = 'cyber-cursor-2';
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

        function updateCursor() {
            // Primary cursor with smooth follow
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            
            // Secondary cursor with delay
            cursor2X += (mouseX - cursor2X) * 0.05;
            cursor2Y += (mouseY - cursor2Y) * 0.05;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursor2.style.left = cursor2X + 'px';
            cursor2.style.top = cursor2Y + 'px';
            
            requestAnimationFrame(updateCursor);
        }

        updateCursor();

        // Add cursor styles
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
            
            /* Hide default cursor */
            * {
                cursor: none !important;
            }
            
            @media (hover: none) and (pointer: coarse) {
                .cyber-cursor,
                .cyber-cursor-2 {
                    display: none !important;
                }
                
                * {
                    cursor: auto !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Glitch Text Effects - Lighter on mobile
    initGlitchEffects() {
        const glitchElements = document.querySelectorAll('.title-highlight, .logo-text');

        // Reduce intensity on mobile
        const glitchFrequency = window.innerWidth <= 768 ? 0.98 : 0.95;

        glitchElements.forEach(element => {
            const originalText = element.textContent;
            
            setInterval(() => {
                if (Math.random() > glitchFrequency) {
                    const glitchText = originalText.split('').map(char => 
                        Math.random() > 0.9 ? String.fromCharCode(33 + Math.random() * 94) : char
                    ).join('');
                    
                    element.textContent = glitchText;
                    
                    setTimeout(() => {
                        element.textContent = originalText;
                    }, window.innerWidth <= 768 ? 50 : 100); // Shorter on mobile
                }
            }, window.innerWidth <= 768 ? 2000 : 1000); // Less frequent on mobile
        });
    }

    // Touch device optimizations
    initTouchOptimizations() {
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            // Add touch-specific classes
            document.body.classList.add('touch-device');
            
            // Improve touch scrolling
            document.documentElement.style.touchAction = 'manipulation';
            
            // Add active states for touch
            document.querySelectorAll('.cyber-btn, .nav-item, .matrix-cell').forEach(element => {
                element.addEventListener('touchstart', () => {
                    element.classList.add('active-touch');
                });
                
                element.addEventListener('touchend', () => {
                    element.classList.remove('active-touch');
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
            
            // Improve button sizes for touch
            const style = document.createElement('style');
            style.textContent = `
                .touch-device .cyber-btn,
                .touch-device .nav-item {
                    min-height: 44px;
                    min-width: 44px;
                }
                
                .touch-device .form-input,
                .touch-device .form-textarea {
                    font-size: 16px !important;
                }
                
                .active-touch {
                    transform: scale(0.95) !important;
                    transition: transform 0.1s !important;
                }
                
                /* Remove hover effects on touch */
                .touch-device .nav-item:hover .nav-glow,
                .touch-device .matrix-cell:hover .cell-glow,
                .touch-device .tech-item:hover,
                .touch-device .project-hologram:hover {
                    transform: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Performance optimizations for mobile
    initPerformanceOptimizations() {
        // Lazy loading for images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        // Debounce resize events
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Initialize loading state
        this.showLoadingState();
    }

    handleResize() {
        // Update mobile menu button visibility
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenuBtn) {
            mobileMenuBtn.style.display = window.innerWidth <= 1024 ? 'flex' : 'none';
        }
        
        // Update hologram size
        const heroHologram = document.querySelector('.hero-hologram');
        if (heroHologram) {
            if (window.innerWidth <= 480) {
                heroHologram.style.height = '200px';
            } else if (window.innerWidth <= 768) {
                heroHologram.style.height = '250px';
            } else if (window.innerWidth <= 1024) {
                heroHologram.style.height = '350px';
            } else {
                heroHologram.style.height = '';
            }
        }
        
        // Re-initialize 3D if needed
        const neuralCanvas = document.getElementById('neuralNetwork');
        if (neuralCanvas) {
            if (window.innerWidth > 768 && neuralCanvas.style.display === 'none') {
                this.initNeuralNetwork();
            }
        }
    }

    showLoadingState() {
        // Create loading screen
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        loadingScreen.innerHTML = `
            <div class="loading-logo">
                <span style="color: #00f3ff; font-family: Orbitron; font-size: 2rem;">SILVA</span>
                <span style="color: #00ff41; font-family: Rajdhani; font-size: 1rem;">LOADING SYSTEMS...</span>
            </div>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
        `;
        
        loadingScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0a0a;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease-out;
        `;
        
        document.body.appendChild(loadingScreen);
        
        // Remove loading screen after content loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 1000);
        });
        
        // Fallback in case load event doesn't fire
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 3000);
    }

    // Smooth scrolling
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = window.innerWidth <= 768 ? 70 : 100;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Add scroll progress indicator for mobile
        if (window.innerWidth <= 768) {
            const progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #00f3ff, #00ff41);
                z-index: 1000;
                transition: width 0.1s;
            `;
            document.body.appendChild(progressBar);
            
            window.addEventListener('scroll', () => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                progressBar.style.width = scrolled + '%';
            });
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if THREE.js is loaded
    if (typeof THREE === 'undefined') {
        console.warn('THREE.js not loaded. Neural network will not initialize.');
    }

    const portfolio = new CyberPortfolio();

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
            timeElement.textContent = `${dateString} ${timeString}`;
        }
    }

    setInterval(updateTime, 1000);
    updateTime();

    // Add active navigation based on scroll position
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-item');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
});

// Utility function
function getRandomColor() {
    const colors = ['#00f3ff', '#ff00ff', '#00ff9d', '#9d00ff', '#ffd300', '#00ff41'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add missing CSS animations if not already defined
if (!document.querySelector('#cyber-animations')) {
    const additionalStyles = document.createElement('style');
    additionalStyles.id = 'cyber-animations';
    additionalStyles.textContent = `
        @keyframes matrixGlitch {
            0% { transform: translateX(0); }
            20% { transform: translateX(-5px); }
            40% { transform: translateX(5px); }
            60% { transform: translateX(-5px); }
            80% { transform: translateX(5px); }
            100% { transform: translateX(0); }
        }
        
        .cyber-theme {
            --neon-blue: #00f3ff;
            --neon-pink: #ff00ff;
            --neon-green: #00ff9d;
            --neon-purple: #9d00ff;
        }
        
        .matrix-theme {
            --neon-blue: #00ff41;
            --neon-pink: #00ff41;
            --neon-green: #00ff41;
            --neon-purple: #00ff41;
        }
        
        .neon-theme {
            --neon-blue: #ff00ff;
            --neon-pink: #00f3ff;
            --neon-green: #ffd300;
            --neon-purple: #ff00ff;
        }
        
        /* Active state for navigation */
        .nav-item.active {
            background: rgba(0, 243, 255, 0.2) !important;
            box-shadow: 0 0 20px rgba(0, 243, 255, 0.5) !important;
        }
        
        .nav-item.active .nav-glow {
            box-shadow: 0 0 30px rgba(0, 243, 255, 0.8) !important;
            opacity: 1 !important;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .hologram-nav {
                display: none;
            }
            
            .hologram-nav.active {
                display: flex;
                animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
            .logo-pulse,
            .hologram-grid,
            .scan-pulse {
                display: none;
            }
            
            /* Improve touch targets */
            button, 
            .cyber-btn,
            .nav-item {
                min-height: 44px !important;
                min-width: 44px !important;
            }
            
            /* Prevent text selection on interactive elements */
            .cyber-btn,
            .nav-item,
            .matrix-cell {
                user-select: none;
                -webkit-user-select: none;
                -webkit-tap-highlight-color: transparent;
            }
        }
        
        /* Loading animations */
        .loading-bar {
            width: 200px;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
            overflow: hidden;
            margin-top: 20px;
        }
        
        .loading-progress {
            height: 100%;
            width: 0;
            background: linear-gradient(90deg, #00f3ff, #00ff41);
            animation: loading 2s ease-in-out forwards;
        }
        
        @keyframes loading {
            0% { width: 0; }
            100% { width: 100%; }
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(additionalStyles);
}

// Handle orientation changes
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        window.location.reload();
    }, 100);
});

// Service Worker for offline capability (optional)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('Service Worker registration failed:', error);
        });
    });
}
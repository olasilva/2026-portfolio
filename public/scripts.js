// ULTRA-MODERN CYBERPUNK PORTFOLIO SCRIPT

class CyberPortfolio {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all components
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
    }

    // Matrix Rain Effect
    initMatrixRain() {
        const canvas = document.getElementById('matrixCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = "01";
        const charSize = 20;
        const columns = canvas.width / charSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff41';
            ctx.font = `${charSize}px 'Courier New', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * charSize, drops[i] * charSize);

                if (drops[i] * charSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrix, 50);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // 3D Neural Network Background
    initNeuralNetwork() {
        const canvas = document.getElementById('neuralNetwork');
        if (!canvas) return;

        // Check if THREE is available
        if (typeof THREE === 'undefined') {
            console.error('THREE.js is not loaded');
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

        // Create nodes
        const nodes = [];
        const nodeCount = 50;
        const geometry = new THREE.SphereGeometry(0.1, 8, 8);
        const material = new THREE.MeshBasicMaterial({ color: 0x00f3ff });

        for (let i = 0; i < nodeCount; i++) {
            const node = new THREE.Mesh(geometry, material);
            node.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );
            node.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            );
            scene.add(node);
            nodes.push(node);
        }

        // Create connections
        const connectionMaterial = new THREE.LineBasicMaterial({ 
            color: 0x00f3ff, 
            transparent: true, 
            opacity: 0.3 
        });
        const connections = [];

        function createConnections() {
            // Remove old connections
            connections.forEach(conn => {
                scene.remove(conn);
                if (conn.geometry) conn.geometry.dispose();
            });
            connections.length = 0;

            // Create new connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const distance = nodes[i].position.distanceTo(nodes[j].position);
                    if (distance < 5) {
                        const geometry = new THREE.BufferGeometry().setFromPoints([
                            nodes[i].position,
                            nodes[j].position
                        ]);
                        const line = new THREE.Line(geometry, connectionMaterial);
                        scene.add(line);
                        connections.push(line);
                    }
                }
            }
        }

        // Animation
        function animate() {
            requestAnimationFrame(animate);

            nodes.forEach(node => {
                node.position.add(node.velocity);
                
                // Bounce off boundaries
                if (Math.abs(node.position.x) > 10) node.velocity.x *= -1;
                if (Math.abs(node.position.y) > 10) node.velocity.y *= -1;
                if (Math.abs(node.position.z) > 10) node.velocity.z *= -1;
            });

            createConnections();
            renderer.render(scene, camera);
        }

        camera.position.z = 15;
        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
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
                hoverSound.volume = 0.3;
                clickSound.volume = 0.3;
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

        // Add hover sounds to interactive elements
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
                setTimeout(type, 100);
            } else if (isDeleting && charIndex >= 0) {
                typingElement.textContent = currentCommand.substring(0, charIndex);
                charIndex--;
                setTimeout(type, 50);
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
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        if (current < target) {
                            current += step;
                            counter.textContent = Math.ceil(current);
                            setTimeout(updateCounter, 16);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

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
        });
    }

    // Form Submission
    initForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        // Helper function for notifications
        const showNotification = (message, type = 'info') => {
            const notification = document.createElement('div');
            notification.className = `cyber-notification ${type}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                background: ${type === 'error' ? 'rgba(255,0,51,0.9)' : 'rgba(0,255,65,0.9)'};
                color: white;
                border: 2px solid ${type === 'error' ? '#ff0066' : '#00ff41'};
                z-index: 10000;
                font-family: 'Courier New', monospace;
                animation: slideIn 0.3s ease-out;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }, 5000);
        };

        // Helper function for particle effects
        const createParticles = (element, count) => {
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #00ff41;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                `;
                
                const rect = element.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                document.body.appendChild(particle);
                
                const angle = Math.random() * Math.PI * 2;
                const speed = 2 + Math.random() * 3;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;
                
                let opacity = 1;
                const animate = () => {
                    opacity -= 0.02;
                    particle.style.opacity = opacity;
                    particle.style.left = parseFloat(particle.style.left) + vx + 'px';
                    particle.style.top = parseFloat(particle.style.top) + vy + 'px';
                    
                    if (opacity > 0) {
                        requestAnimationFrame(animate);
                    } else {
                        particle.remove();
                    }
                };
                
                animate();
            }
        };

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('.transmit-btn');
            const originalText = submitBtn.querySelector('.btn-text').textContent;

            // Show loading state
            submitBtn.querySelector('.btn-text').textContent = 'TRANSMITTING...';
            submitBtn.disabled = true;

            try {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Use relative path for Vercel
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Show success state
                    submitBtn.querySelector('.btn-text').textContent = 'TRANSMISSION SUCCESSFUL!';
                    submitBtn.style.background = 'linear-gradient(45deg, #00ff41, #00f3ff)';
                    
                    // Add particle effect
                    createParticles(submitBtn, 15);
                    
                    // Show success notification
                    showNotification('Message transmitted successfully!', 'success');
                    
                    // Reset form
                    form.reset();
                } else {
                    // Show error
                    submitBtn.querySelector('.btn-text').textContent = 'TRANSMISSION FAILED';
                    submitBtn.style.background = 'linear-gradient(45deg, #ff0033, #ff0066)';
                    
                    // Show error message
                    showNotification(result.error || 'Transmission failed', 'error');
                }
                
            } catch (error) {
                console.error('Form submission error:', error);
                submitBtn.querySelector('.btn-text').textContent = 'CONNECTION ERROR';
                submitBtn.style.background = 'linear-gradient(45deg, #ff9900, #ff6600)';
                showNotification('Network error. Please check connection.', 'error');
            } finally {
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.querySelector('.btn-text').textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
    }

    // Advanced Animations
    initAnimations() {
        // Glitch effect on hover
        document.querySelectorAll('.matrix-cell, .tech-item, .hologram-frame').forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.animation = 'none';
                setTimeout(() => {
                    element.style.animation = 'matrixGlitch 0.5s';
                }, 10);
            });
        });

        // Random glitch effect
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

    // Parallax Effect
    initParallax() {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            document.querySelectorAll('.hologram-frame, .matrix-cell').forEach(element => {
                element.style.transform = `translateX(${x}px) translateY(${y}px)`;
            });
        });
    }

    // Custom Cursor Effects
    initCursorEffects() {
        const cursor = document.createElement('div');
        cursor.className = 'cyber-cursor';
        document.body.appendChild(cursor);

        const cursor2 = document.createElement('div');
        cursor2.className = 'cyber-cursor-2';
        document.body.appendChild(cursor2);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursor2.style.left = e.clientX + 'px';
                cursor2.style.top = e.clientY + 'px';
            }, 100);
        });

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
                animation: cursorPulse 1s infinite;
                transition: transform 0.1s;
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
            }
            
            @keyframes cursorPulse {
                0%, 100% { transform: scale(1); opacity: 0.5; }
                50% { transform: scale(1.5); opacity: 0.2; }
            }
            
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Glitch Text Effects
    initGlitchEffects() {
        const glitchElements = document.querySelectorAll('.title-highlight, .logo-text');

        glitchElements.forEach(element => {
            const originalText = element.textContent;
            
            setInterval(() => {
                if (Math.random() > 0.95) {
                    const glitchText = originalText.split('').map(char => 
                        Math.random() > 0.9 ? String.fromCharCode(33 + Math.random() * 94) : char
                    ).join('');
                    
                    element.textContent = glitchText;
                    
                    setTimeout(() => {
                        element.textContent = originalText;
                    }, 100);
                }
            }, 1000);
        });
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

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Utility function
function getRandomColor() {
    const colors = ['#00f3ff', '#ff00ff', '#00ff9d', '#9d00ff', '#ffd300', '#00ff41'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add CSS animations if not already defined
const additionalStyles = document.createElement('style');
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
`;
document.head.appendChild(additionalStyles);
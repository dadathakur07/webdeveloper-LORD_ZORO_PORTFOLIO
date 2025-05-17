document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const loader = document.querySelector('.cyber-loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            initializeTerminal();
            animateOnScroll();
            setupTypingEffect();
            setupScrollIndicator();
            setupMenuToggle();
            setupForm();
        }, 1000);
    }, 3000);

    // Terminal Animation
    function initializeTerminal() {
        const terminal = document.querySelector('.cyber-terminal');
        setTimeout(() => {
            terminal.style.display = 'block';
            setTimeout(() => {
                terminal.style.opacity = '1';
                terminal.style.transform = 'translateY(0)';
            }, 100);
            
            // Add interactive terminal
            terminal.addEventListener('click', () => {
                terminal.classList.toggle('expanded');
            });
        }, 3500);
    }

    // Typing Effect
    function setupTypingEffect() {
        const typingText = document.querySelector('.typing-text');
        const phrases = [
            "Full-Stack Developer",
            "UI/UX Designer",
            "Python Enthusiast",
            "Cyberpunk Lover"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isEnd = true;
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 500);
            } else {
                const speed = isDeleting ? 100 : 150;
                setTimeout(type, isEnd ? speed / 2 : speed);
                isEnd = false;
            }
        }

        setTimeout(type, 1000);
    }

    // Scroll Animation
    function animateOnScroll() {
        const sections = document.querySelectorAll('.cyber-section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        function checkScroll() {
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const sectionHeight = section.offsetHeight;
                const windowHeight = window.innerHeight;
                
                if (sectionTop < windowHeight - sectionHeight / 3) {
                    section.classList.add('visible');
                    
                    // Update active nav link
                    const id = section.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
            
            // Animate skill bars
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                if (bar.parentElement.getBoundingClientRect().top < window.innerHeight - 100) {
                    bar.style.width = `${width}%`;
                }
            });
            
            // Animate stats
            const stats = document.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                if (stat.parentElement.getBoundingClientRect().top < window.innerHeight - 100 && !stat.classList.contains('animated')) {
                    animateValue(stat, 0, parseInt(stat.getAttribute('data-count')), 2000);
                    stat.classList.add('animated');
                }
            });
        }
        
        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Initial check
    }

    // Animate number counting
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Scroll Indicator
    function setupScrollIndicator() {
        const scrollLine = document.querySelector('.scroll-line');
        
        function updateScrollIndicator() {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / scrollHeight) * 100;
            scrollLine.style.height = `${scrolled}%`;
        }
        
        window.addEventListener('scroll', updateScrollIndicator);
        updateScrollIndicator(); // Initial update
    }

    // Mobile Menu Toggle
    function setupMenuToggle() {
        const menuToggle = document.createElement('div');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        document.querySelector('.header-grid').appendChild(menuToggle);
        
        const nav = document.querySelector('.cyber-nav');
        
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }

    // Form Submission
    function setupForm() {
        const form = document.querySelector('.cyber-form');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            form.innerHTML = `
                <div class="form-success">
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. I'll get back to you soon.</p>
                </div>
            `;
            
            // In a real implementation, you would send the data to a server
            console.log('Form submitted:', data);
        });
    }

    // Glitch effect on avatar hover
    const avatar = document.querySelector('.cyber-avatar');
    avatar.addEventListener('mouseenter', () => {
        document.querySelector('.avatar-glitch').style.opacity = '1';
    });
    ;
    avatar.addEventListener('mouseleave', () => {
        document.querySelector('.avatar-glitch').style.opacity = '0';
    });
});

// Add these to your existing script.js

// Initialize Particles.js
function initParticles() {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#00f0ff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#00f0ff", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "repulse" },
                "onclick": { "enable": true, "mode": "push" }
            }
        }
    });
}

// 3D Holographic Elements
function createHolographicElements() {
    const container = document.createElement('div');
    container.className = 'holographic-container';
    
    for (let i = 0; i < 3; i++) {
        const element = document.createElement('div');
        element.className = 'holographic-element';
        container.appendChild(element);
    }
    
    document.body.appendChild(container);
}

// Cyberpunk HUD
function createCyberHUD() {
    const hud = document.createElement('div');
    hud.className = 'cyber-hud';
    
    const timeItem = document.createElement('div');
    timeItem.className = 'hud-item';
    timeItem.innerHTML = '<span class="hud-icon"><i class="fas fa-clock"></i></span><span class="hud-time">00:00:00</span>';
    
    const dateItem = document.createElement('div');
    dateItem.className = 'hud-item';
    dateItem.innerHTML = '<span class="hud-icon"><i class="fas fa-calendar-alt"></i></span><span class="hud-date">01/01/2023</span>';
    
    const locationItem = document.createElement('div');
    locationItem.className = 'hud-item';
    locationItem.innerHTML = '<span class="hud-icon"><i class="fas fa-map-marker-alt"></i></span><span class="hud-location">Tokyo, JP</span>';
    
    hud.appendChild(timeItem);
    hud.appendChild(dateItem);
    hud.appendChild(locationItem);
    document.body.appendChild(hud);
    
    // Update time
    function updateTime() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString();
        const dateStr = now.toLocaleDateString();
        document.querySelector('.hud-time').textContent = timeStr;
        document.querySelector('.hud-date').textContent = dateStr;
    }
    
    setInterval(updateTime, 1000);
    updateTime();
}

// Voice Command Interface
function setupVoiceCommands() {
    const voiceContainer = document.createElement('div');
    voiceContainer.className = 'voice-command';
    
    const voiceBtn = document.createElement('div');
    voiceBtn.className = 'voice-btn';
    voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    
    const voiceStatus = document.createElement('div');
    voiceStatus.className = 'voice-status';
    voiceStatus.textContent = 'Click to speak';
    
    voiceContainer.appendChild(voiceBtn);
    voiceContainer.appendChild(voiceStatus);
    document.body.appendChild(voiceContainer);
    
    // Voice recognition
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        
        voiceBtn.addEventListener('click', () => {
            voiceStatus.textContent = 'Listening...';
            voiceBtn.style.background = '#ff00aa';
            recognition.start();
        });
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            voiceStatus.textContent = `Heard: ${transcript}`;
            voiceBtn.style.background = '#00f0ff';
            
            // Process commands
            if (transcript.includes('open projects')) {
                window.location.hash = '#projects';
            } else if (transcript.includes('contact me')) {
                window.location.hash = '#contact';
            } else if (transcript.includes('show skills')) {
                window.location.hash = '#skills';
            } else if (transcript.includes('authenticate')) {
                showBiometricAuth();
            } else if (transcript.includes('show code')) {
                showCodeVisualization();
            }
        };
        
        recognition.onerror = (event) => {
            voiceStatus.textContent = 'Error occurred';
            voiceBtn.style.background = '#ff0000';
        };
        
        recognition.onend = () => {
            setTimeout(() => {
                voiceStatus.textContent = 'Click to speak';
                voiceBtn.style.background = '#ff00aa';
            }, 2000);
        };
    } else {
        voiceStatus.textContent = 'Voice commands not supported';
        voiceBtn.style.display = 'none';
    }
}

// Biometric Authentication
function showBiometricAuth() {
    const authModal = document.createElement('div');
    authModal.className = 'biometric-auth';
    
    authModal.innerHTML = `
        <h3 class="biometric-title">BIOMETRIC AUTHENTICATION</h3>
        <div class="biometric-scan">
            <div class="scan-animation"></div>
        </div>
        <p style="text-align: center; color: var(--text-light); font-size: 14px;">
            Scanning facial recognition patterns...
        </p>
        <div style="display: flex; justify-content: center; margin-block-start: 20px;">
            <button class="cyber-button-small" id="cancel-auth">CANCEL</button>
        </div>
    `;
    
    document.body.appendChild(authModal);
    authModal.style.display = 'block';
    
    // Simulate scan
    setTimeout(() => {
        authModal.innerHTML = `
            <h3 class="biometric-title">AUTHENTICATION SUCCESSFUL</h3>
            <div style="text-align: center; margin: 20px 0;">
                <i class="fas fa-check-circle" style="font-size: 50px; color: #00ff00;"></i>
            </div>
            <p style="text-align: center; color: var(--text-light); font-size: 14px;">
                Identity verified. Access granted.
            </p>
            <div style="display: flex; justify-content: center; margin-block-start: 20px;">
                <button class="cyber-button-small" id="close-auth">CONTINUE</button>
            </div>
        `;
        
        document.getElementById('close-auth').addEventListener('click', () => {
            authModal.style.display = 'none';
            document.body.removeChild(authModal);
        });
    }, 3000);
    
    document.getElementById('cancel-auth').addEventListener('click', () => {
        authModal.style.display = 'none';
        document.body.removeChild(authModal);
    });
}

// AI Chatbot
function setupChatbot() {
    const chatbotToggle = document.createElement('div');
    chatbotToggle.className = 'chatbot-toggle';
    chatbotToggle.innerHTML = '<i class="fas fa-robot"></i>';
    
    const chatbotContainer = document.createElement('div');
    chatbotContainer.className = 'chatbot-container';
    
    chatbotContainer.innerHTML = `
        <div class="chatbot-header">
            <div class="chatbot-title">LORD ZORO AI</div>
            <div class="chatbot-close"><i class="fas fa-times"></i></div>
        </div>
        <div class="chatbot-messages">
            <div class="message bot-message">Hello! I'm Lord Zoro's AI assistant. How can I help you?</div>
        </div>
        <div class="chatbot-input">
            <input type="text" placeholder="Type your message...">
            <button class="cyber-button-small" style="margin-inline-start: 10px;">SEND</button>
        </div>
    `;
    
    document.body.appendChild(chatbotToggle);
    document.body.appendChild(chatbotContainer);
    
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.style.display = 'flex';
    });
    
    document.querySelector('.chatbot-close').addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
    });
    
    // Chat functionality
    const chatInput = document.querySelector('.chatbot-input input');
    const chatMessages = document.querySelector('.chatbot-messages');
    
    document.querySelector('.chatbot-input button').addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            const userMsg = document.createElement('div');
            userMsg.className = 'message user-message';
            userMsg.textContent = message;
            chatMessages.appendChild(userMsg);
            
            // Clear input
            chatInput.value = '';
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Bot response
            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.className = 'message bot-message';
                
                // Simple responses
                if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
                    botMsg.textContent = 'Greetings! How can I assist you today?';
                } else if (message.toLowerCase().includes('project')) {
                    botMsg.textContent = 'Lord Zoro has worked on various projects including cyber security dashboards, e-commerce platforms, and AI applications. Would you like to see them?';
                } else if (message.toLowerCase().includes('contact')) {
                    botMsg.textContent = 'You can contact Lord Zoro through the contact form or via email at contact@lordzoro.dev';
                } else {
                    botMsg.textContent = 'I understand you\'re asking about: ' + message + '. For more details, please check the relevant section of the portfolio.';
                }
                
                chatMessages.appendChild(botMsg);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }
}

// Real-time Coding Visualization
function showCodeVisualization() {
    const codeModal = document.createElement('div');
    codeModal.className = 'code-visualization';
    
    codeModal.innerHTML = `
        <div class="code-header">
            <div class="code-title">CODE VISUALIZATION</div>
            <div class="code-close"><i class="fas fa-times"></i></div>
        </div>
        <div class="code-content" id="code-content"></div>
    `;
    
    document.body.appendChild(codeModal);
    codeModal.style.display = 'block';
    
    // Sample code to display
    const sampleCode = `
// Portfolio Website by Lord Zoro
const initPortfolio = () => {
    // Create 3D holographic elements
    const holograms = createHolographics();
    
    // Initialize cyber HUD
    const hud = new CyberHUD({
        time: true,
        date: true,
        location: true
    });
    
    // Setup voice commands
    if (hasVoiceSupport()) {
        const voiceControl = new VoiceController();
        voiceControl.registerCommands({
            'open projects': () => navigateTo('projects'),
            'contact me': () => navigateTo('contact'),
            'authenticate': () => showBiometricAuth()
        });
    }
    
    // Load projects
    fetchProjects().then(projects => {
        renderProjects(projects);
    });
    
    // Start particle background
    initParticles();
};

// Run portfolio
window.addEventListener('DOMContentLoaded', initPortfolio);
    `;
    
    // Animate code typing
    const codeContent = document.getElementById('code-content');
    let i = 0;
    const lineNumbers = sampleCode.split('\n').length;
    
    function typeCode() {
        if (i < sampleCode.length) {
            const char = sampleCode.charAt(i);
            const line = sampleCode.substr(0, i).split('\n').length;
            
            if (char === '\n') {
                codeContent.innerHTML += `<div class="code-line" data-line="${line}"></div>`;
            } else {
                let styledChar = char;
                
                // Simple syntax highlighting
                if (char === '/' && sampleCode.charAt(i+1) === '/') {
                    const comment = sampleCode.substr(i).split('\n')[0];
                    styledChar = `<span class="code-comment">${comment}</span>`;
                    i += comment.length - 1;
                } else if (char === '"' || char === "'") {
                    const quoteEnd = sampleCode.indexOf(char, i+1);
                    const str = sampleCode.substr(i, quoteEnd - i + 1);
                    styledChar = `<span class="code-string">${str}</span>`;
                    i += str.length - 1;
                } else if (/\b(const|let|var|if|else|for|while|function|new|true|false)\b/.test(sampleCode.substr(i))) {
                    const match = sampleCode.substr(i).match(/\b(const|let|var|if|else|for|while|function|new|true|false)\b/)[0];
                    styledChar = `<span class="code-keyword">${match}</span>`;
                    i += match.length - 1;
                } else if (/\b([0-9]+)\b/.test(sampleCode.substr(i))) {
                    const num = sampleCode.substr(i).match(/\b([0-9]+)\b/)[0];
                    styledChar = `<span class="code-number">${num}</span>`;
                    i += num.length - 1;
                } else if (/\b([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\(/.test(sampleCode.substr(i))) {
                    const func = sampleCode.substr(i).match(/\b([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\(/)[1];
                    styledChar = `<span class="code-function">${func}</span>`;
                    i += func.length - 1;
                }
                
                const lines = codeContent.querySelectorAll('.code-line');
                if (lines.length === 0) {
                    codeContent.innerHTML = `<div class="code-line" data-line="1"></div>`;
                }
                
                const currentLine = lines[lines.length - 1];
                currentLine.innerHTML += styledChar;
            }
            
            i++;
            setTimeout(typeCode, 10);
        }
    }
    
    typeCode();
    
    document.querySelector('.code-close').addEventListener('click', () => {
        codeModal.style.display = 'none';
        document.body.removeChild(codeModal);
    });
}

// Network Status Monitor
function setupNetworkMonitor() {
    const networkStatus = document.createElement('div');
    networkStatus.className = 'network-status';
    
    const statusIndicator = document.createElement('div');
    statusIndicator.className = 'status-indicator';
    
    const statusText = document.createElement('span');
    statusText.className = 'status-text';
    statusText.textContent = 'ONLINE';
    
    networkStatus.appendChild(statusIndicator);
    networkStatus.appendChild(statusText);
    document.body.appendChild(networkStatus);
    
    // Simulate network changes
    setInterval(() => {
        const isOnline = Math.random() > 0.1; // 90% chance online
        if (isOnline) {
            statusIndicator.style.background = '#00ff00';
            statusText.textContent = 'ONLINE';
        } else {
            statusIndicator.style.background = '#ff0000';
            statusText.textContent = 'OFFLINE';
        }
    }, 5000);
}

// Initialize all new features
function initAdvancedFeatures() {
    initParticles();
    createHolographicElements();
    createCyberHUD();
    setupVoiceCommands();
    setupChatbot();
    setupNetworkMonitor();
    
    // Add event listener for biometric auth button
    const authBtn = document.createElement('button');
    authBtn.className = 'cyber-button';
    authBtn.style.position = 'fixed';
    authBtn.style.bottom = '20px';
    authBtn.style.left = '20px';
    authBtn.style.zIndex = '1000';
    authBtn.textContent = 'BIOMETRIC LOGIN';
    authBtn.addEventListener('click', showBiometricAuth);
    document.body.appendChild(authBtn);
    
    // Add event listener for code visualization button
    const codeBtn = document.createElement('button');
    codeBtn.className = 'cyber-button';
    codeBtn.style.position = 'fixed';
    codeBtn.style.bottom = '80px';
    codeBtn.style.left = '20px';
    codeBtn.style.zIndex = '1000';
    codeBtn.textContent = 'VIEW CODE';
    codeBtn.addEventListener('click', showCodeVisualization);
    document.body.appendChild(codeBtn);
}

// Call this at the end of your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Initialize advanced features after everything else
    setTimeout(initAdvancedFeatures, 4000);
});
// Navigation and Section Management
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Handle hash navigation from URL
    handleHashNavigation();

    // Navigation click handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's a hash link, handle it specially
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                
                // Remove active class from all nav links and sections
                navLinks.forEach(nav => nav.classList.remove('active'));
                sections.forEach(section => section.classList.remove('active'));
                
                // Add active class to clicked nav link and target section
                this.classList.add('active');
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
                
                // Smooth scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            // For external links, let them navigate normally
        });
    });

    // Dynamic background effects
    createFloatingParticles();
    
    // Add loading animation for cards
    animateCardsOnScroll();
    
    // Add typing effect to hero title
    addTypingEffect();
});

// Create floating particles for atmospheric effect
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: rgba(184, 134, 11, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 20 + 10}s linear infinite;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 30000);
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Animate cards on scroll
function animateCardsOnScroll() {
    const cards = document.querySelectorAll('.feature-card, .link-card, .download-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
}

// Add typing effect to hero title
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Add hover sound effects (optional - requires audio files)
function addHoverSounds() {
    const buttons = document.querySelectorAll('.btn');
    const hoverSound = new Audio('sounds/hover.mp3'); // You'd need to add this file
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play().catch(() => {
                // Ignore audio play errors (user hasn't interacted yet)
            });
        });
    });
}

// Theme switcher (for future implementation)
function initThemeSwitcher() {
    const themes = {
        vampire: {
            primary: '#8b0000',
            secondary: '#b8860b',
            accent: '#2c1810'
        },
        werewolf: {
            primary: '#556b2f',
            secondary: '#8fbc8f',
            accent: '#1a2f0a'
        },
        mage: {
            primary: '#191970',
            secondary: '#4169e1',
            accent: '#0a0a2f'
        }
    };
    
    // This could be expanded to dynamically change colors based on active section
}

// Smooth scrolling enhancement
function enhanceSmoothScrolling() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Add loading screen (optional)
function addLoadingScreen() {
    const loading = document.createElement('div');
    loading.className = 'loading-screen';
    loading.innerHTML = `
        <div class="loading-content">
            <i class="fas fa-moon"></i>
            <p>Entering the World of Darkness...</p>
        </div>
    `;
    loading.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a0a;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(loading);
    
    // Remove loading screen after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loading);
            }, 500);
        }, 1000);
    });
}

// Add interactive elements
function addInteractiveElements() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', function() {
    enhanceSmoothScrolling();
    addInteractiveElements();
    // addLoadingScreen(); // Uncomment if you want a loading screen
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const activeSection = document.querySelector('.section.active');
    const sections = Array.from(document.querySelectorAll('.section'));
    const currentIndex = sections.indexOf(activeSection);
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % sections.length;
        const nextSection = sections[nextIndex];
        const targetNavLink = document.querySelector(`[href="#${nextSection.id}"]`);
        if (targetNavLink) targetNavLink.click();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
        const prevSection = sections[prevIndex];
        const targetNavLink = document.querySelector(`[href="#${prevSection.id}"]`);
        if (targetNavLink) targetNavLink.click();
    }
});

// Handle hash navigation from URL
function handleHashNavigation() {
    const hash = window.location.hash;
    if (hash) {
        const targetId = hash.substring(1);
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');
        
        // Remove active class from all nav links and sections
        navLinks.forEach(nav => nav.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        // Find and activate the target section
        const targetSection = document.getElementById(targetId);
        const targetNavLink = document.querySelector(`[href="#${targetId}"]`);
        
        if (targetSection) {
            targetSection.classList.add('active');
        }
        if (targetNavLink) {
            targetNavLink.classList.add('active');
        }
    }
}

// Regenerate particles periodically
setInterval(() => {
    const container = document.querySelector('.particles');
    if (container && container.children.length < 20) {
        createParticle(container);
    }
}, 2000);

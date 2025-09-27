// Character Creator Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initCharacterCreatorPage();
});

function initCharacterCreatorPage() {
    const gameLineCards = document.querySelectorAll('.game-line-card');
    
    gameLineCards.forEach(card => {
        card.addEventListener('click', handleGameLineClick);
        card.addEventListener('mouseenter', handleCardHover);
        card.addEventListener('mouseleave', handleCardLeave);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Handle image loading errors
    setupImageFallbacks();
    
    // Add entrance animations
    animateCardsOnLoad();
}

function handleGameLineClick(event) {
    const card = event.currentTarget;
    const url = card.dataset.url;
    const isActive = card.classList.contains('active');
    
    if (!isActive || !url || url === '#') {
        // Show coming soon message
        showComingSoonMessage(card);
        return;
    }
    
    // Add click animation
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = '';
    }, 150);
    
    // Show loading state
    showLoadingState(card);
    
    // Navigate to the character creator
    setTimeout(() => {
        window.open(url, '_blank');
        hideLoadingState(card);
    }, 500);
}

function handleCardHover(event) {
    const card = event.currentTarget;
    const circle = card.querySelector('.game-line-circle');
    
    // Add sparkle effect
    createSparkleEffect(circle);
}

function handleCardLeave(event) {
    const card = event.currentTarget;
    const sparkles = card.querySelectorAll('.sparkle');
    
    sparkles.forEach(sparkle => {
        sparkle.remove();
    });
}

function showComingSoonMessage(card) {
    const gameTitle = card.querySelector('.game-title').textContent;
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'coming-soon-tooltip';
    tooltip.innerHTML = `
        <i class="fas fa-clock"></i>
        <strong>${gameTitle} Character Creator</strong><br>
        Coming Soon! This tool is currently in development.
    `;
    
    tooltip.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(184, 134, 11, 0.95);
        color: #000000;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        font-size: 0.9rem;
        text-align: center;
        z-index: 1000;
        animation: fadeInOut 3s ease;
        pointer-events: none;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    `;
    
    card.appendChild(tooltip);
    
    // Remove after animation
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
        }
    }, 3000);
    
    // Add shake animation to card
    card.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        card.style.animation = '';
    }, 500);
}

function showLoadingState(card) {
    const circle = card.querySelector('.game-line-circle');
    const originalContent = circle.innerHTML;
    
    circle.dataset.originalContent = originalContent;
    circle.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    circle.style.animation = 'pulse 1s infinite';
}

function hideLoadingState(card) {
    const circle = card.querySelector('.game-line-circle');
    const originalContent = circle.dataset.originalContent;
    
    if (originalContent) {
        circle.innerHTML = originalContent;
        circle.style.animation = '';
        delete circle.dataset.originalContent;
    }
}

function createSparkleEffect(element) {
    const sparkleCount = 3;
    
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.innerHTML = '✨';
            
            const rect = element.getBoundingClientRect();
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            
            sparkle.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                font-size: 1rem;
                pointer-events: none;
                z-index: 10;
                animation: sparkleFloat 2s ease-out forwards;
            `;
            
            element.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }, i * 200);
    }
}

function handleKeyboardNavigation(event) {
    const gameCards = Array.from(document.querySelectorAll('.game-line-card'));
    const activeCards = gameCards.filter(card => card.classList.contains('active'));
    
    if (event.key === 'Enter' || event.key === ' ') {
        const focusedCard = document.activeElement;
        if (focusedCard && focusedCard.classList.contains('game-line-card')) {
            event.preventDefault();
            focusedCard.click();
        }
    }
    
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        const focusedCard = document.activeElement;
        const currentIndex = gameCards.indexOf(focusedCard);
        
        if (currentIndex !== -1) {
            event.preventDefault();
            const direction = event.key === 'ArrowRight' ? 1 : -1;
            const nextIndex = (currentIndex + direction + gameCards.length) % gameCards.length;
            gameCards[nextIndex].focus();
        }
    }
}

function animateCardsOnLoad() {
    const cards = document.querySelectorAll('.game-line-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Make cards focusable for keyboard navigation
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(0.5);
        }
        50% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(0.3);
        }
    }
    
    .game-line-card:focus {
        outline: 2px solid #b8860b;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

function setupImageFallbacks() {
    const gameImages = document.querySelectorAll('.game-symbol');
    
    gameImages.forEach(img => {
        img.addEventListener('error', function() {
            handleImageError(this);
        });
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity to 0 for smooth loading
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
}

function handleImageError(img) {
    // Create fallback based on the game type
    const altText = img.alt;
    const gameType = altText.toLowerCase().replace(' symbol', '');
    
    // Create a fallback icon based on game type
    const fallbackIcon = createFallbackIcon(gameType);
    
    // Replace the image with the fallback
    const circle = img.parentElement;
    circle.innerHTML = fallbackIcon;
    
    console.warn(`Failed to load image: ${img.src}. Using fallback icon.`);
}

function createFallbackIcon(gameType) {
    const iconMap = {
        'vampire': '<i class="fas fa-tint" style="font-size: 3rem; color: #8b0000;"></i>',
        'werewolf': '<i class="fas fa-wolf-pack-battalion" style="font-size: 3rem; color: #556b2f;"></i>',
        'mage': '<i class="fas fa-magic" style="font-size: 3rem; color: #191970;"></i>',
        'werebat': '<i class="fas fa-bat" style="font-size: 3rem; color: #4b0082;"></i>',
        'abomination': '<i class="fas fa-skull-crossbones" style="font-size: 3rem; color: #654321;"></i>'
    };
    
    return iconMap[gameType] || '<i class="fas fa-question-circle" style="font-size: 3rem; color: #b8860b;"></i>';
}

// Add tracking for analytics (if needed)
function trackCharacterCreatorClick(gameType) {
    // Add analytics tracking here if needed
    console.log(`Character creator clicked: ${gameType}`);
}
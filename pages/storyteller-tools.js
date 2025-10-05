// Storyteller Tools Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Storyteller Tools page loaded');
    
    // Add click handlers for accessibility
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        // Add keyboard event listener
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
        
        // Add focus styles
        card.addEventListener('focus', function() {
            card.style.outline = '2px solid #dc2626';
            card.style.outlineOffset = '2px';
        });
        
        card.addEventListener('blur', function() {
            card.style.outline = 'none';
        });
    });
    
    // Add smooth scroll behavior for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(_e) {
            if (this.getAttribute('href').startsWith('../index.html#')) {
                // Let the browser handle navigation to index.html with hash
                return;
            }
        });
    });
    
    // Log clicks for debugging
    toolCards.forEach((card, _index) => {
        card.addEventListener('click', function() {
            const toolName = card.querySelector('h3').textContent;
            console.log(`Clicked on tool: ${toolName}`);
        });
    });
});

// Function to open XP Shop
function openXPShop() {
    window.location.href = 'xp-shop.html';
}

// Function to open Weapon Shop
function openWeaponShop() {
    window.location.href = 'weapon-shop.html';
}
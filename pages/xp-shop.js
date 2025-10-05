// XP Shop JavaScript

let _currentSplat = 'vampire';
let cart = [];
let currentXP = 0;

// Initialize the shop
document.addEventListener('DOMContentLoaded', function() {
    initializeShop();
    updateCalculator();
});

function initializeShop() {
    // Set up XP input listener
    const xpInput = document.getElementById('currentXP');
    if (xpInput) {
        xpInput.addEventListener('input', function() {
            currentXP = parseInt(this.value) || 0;
            updateCalculator();
        });
    }
    
    // Initialize with vampire shop
    switchSplat('vampire');
}

function switchSplat(splat) {
    // Check if splat is available
    const splatTab = document.querySelector(`[data-splat="${splat}"]`);
    if (splatTab && splatTab.classList.contains('disabled')) {
        return;
    }
    
    currentSplat = splat;
    
    // Update active tab
    document.querySelectorAll('.splat-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    splatTab.classList.add('active');
    
    // Show/hide shop content
    document.querySelectorAll('.shop-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const shopContent = document.getElementById(`${splat}-shop`);
    if (shopContent) {
        shopContent.classList.add('active');
    }
    
    // Update shop header based on splat
    updateShopHeader(splat);
    
    // Clear cart when switching splats
    clearCart();
}

function updateShopHeader(splat) {
    const shopLogo = document.querySelector('.shop-logo h1');
    const shopTagline = document.querySelector('.shop-tagline');
    
    if (splat === 'vampire') {
        shopLogo.textContent = 'The Crimson Exchange';
        shopTagline.textContent = 'Where Power Has Its Price';
    } else if (splat === 'mage') {
        shopLogo.textContent = 'The Alchemist\'s Sanctum';
        shopTagline.textContent = 'Where Knowledge Becomes Power';
    } else if (splat === 'werewolf') {
        shopLogo.textContent = 'The Spirit Grove';
        shopTagline.textContent = 'Where Nature\'s Fury Awaits';
    } else if (splat === 'hunter') {
        shopLogo.textContent = 'The Hunter\'s Arsenal';
        shopTagline.textContent = 'Where Faith Meets Steel';
    }
    // Add more splats as needed
}

function addToCart(item) {
    cart.push(item);
    updateCart();
    updateCalculator();
    
    // Visual feedback
    showNotification(`Added ${item.name} to cart (${item.cost} XP)`);
}

function removeFromCart(index) {
    const removedItem = cart.splice(index, 1)[0];
    updateCart();
    updateCalculator();
    
    // Visual feedback
    showNotification(`Removed ${removedItem.name} from cart`);
}

function clearCart() {
    cart = [];
    updateCart();
    updateCalculator();
    
    // Visual feedback
    showNotification('Cart cleared');
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }
    
    let cartHTML = '';
    cart.forEach((item, index) => {
        cartHTML += `
            <div class="cart-item">
                <div class="item-info">
                    <span class="item-name">${item.name}</span>
                    <span class="item-cost">${item.cost} XP</span>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    });
    
    cartItems.innerHTML = cartHTML;
}

function updateCalculator() {
    const cartTotal = cart.reduce((total, item) => total + item.cost, 0);
    const remaining = currentXP - cartTotal;
    
    // Update display elements
    const cartTotalElement = document.getElementById('cartTotal');
    const remainingXPElement = document.getElementById('remainingXP');
    
    if (cartTotalElement) {
        cartTotalElement.textContent = `${cartTotal} XP`;
    }
    
    if (remainingXPElement) {
        remainingXPElement.textContent = `${remaining} XP`;
        
        // Color code the remaining XP
        if (remaining < 0) {
            remainingXPElement.style.color = '#dc2626'; // Red for negative
        } else if (remaining === 0) {
            remainingXPElement.style.color = '#fbbf24'; // Yellow for exact
        } else {
            remainingXPElement.style.color = '#10b981'; // Green for positive
        }
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, rgba(220, 38, 127, 0.9), rgba(139, 0, 0, 0.9));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        border: 1px solid #dc267f;
        box-shadow: 0 4px 15px rgba(220, 38, 127, 0.3);
        z-index: 1000;
        font-family: 'Crimson Text', serif;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function _goBack() {
    globalThis.location.href = 'storyteller-tools.html';
}

// Sample item creation function (for future use)
function createShelfItem(name, cost, description, category) {
    return {
        name: name,
        cost: cost,
        description: description,
        category: category
    };
}

// Example of how to populate a shelf (for future implementation)
function populateShelf(shelfId, items) {
    const shelf = document.getElementById(shelfId);
    if (!shelf) return;
    
    const shelfContent = shelf.querySelector('.shelf-content');
    let itemsHTML = '';
    
    items.forEach(item => {
        itemsHTML += `
            <div class="shelf-item" onclick="addToCart(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                <div class="item-header">
                    <h4 class="item-name">${item.name}</h4>
                    <span class="item-cost">${item.cost} XP</span>
                </div>
                <p class="item-description">${item.description}</p>
                <button class="add-to-cart-btn">
                    <i class="fas fa-plus"></i>
                    Add to Cart
                </button>
            </div>
        `;
    });
    
    shelfContent.innerHTML = itemsHTML;
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to clear cart
    if (e.key === 'Escape') {
        clearCart();
    }
    
    // Enter key to focus XP input
    if (e.key === 'Enter' && e.target.tagName !== 'INPUT') {
        const xpInput = document.getElementById('currentXP');
        if (xpInput) {
            xpInput.focus();
            xpInput.select();
        }
    }
});

// Export functions for potential future modules
globalThis.XPShop = {
    addToCart,
    removeFromCart,
    clearCart,
    switchSplat,
    createShelfItem,
    populateShelf,
    updateCalculator
};

// Specific trait addition functions
function addAttributeToCart(level, cost) {
    const item = {
        name: `Attribute Level ${level}`,
        cost: cost,
        category: 'Attributes',
        level: level
    };
    addToCart(item);
}

function addSkillToCart(level, cost) {
    const item = {
        name: `Skill Level ${level}`,
        cost: cost,
        category: 'Skills',
        level: level
    };
    addToCart(item);
}

function addClanDisciplineToCart(level, cost) {
    const item = {
        name: `Clan Discipline Level ${level}`,
        cost: cost,
        category: 'Clan Disciplines',
        level: level
    };
    addToCart(item);
}

function addOtherDisciplineToCart(level, cost) {
    const item = {
        name: `Out-of-Clan Discipline Level ${level}`,
        cost: cost,
        category: 'Other Disciplines',
        level: level
    };
    addToCart(item);
}

function addCaitiffDisciplineToCart(level, cost) {
    const item = {
        name: `Caitiff Discipline Level ${level}`,
        cost: cost,
        category: 'Caitiff Disciplines',
        level: level
    };
    addToCart(item);
}

function addRitualToCart(level, cost) {
    const item = {
        name: `Blood Sorcery Ritual Level ${level}`,
        cost: cost,
        category: 'Blood Sorcery',
        level: level
    };
    addToCart(item);
}

function addFormulaToCart(level, cost) {
    const item = {
        name: `Thin Blood Formula Level ${level}`,
        cost: cost,
        category: 'Thin Blood Alchemy',
        level: level
    };
    addToCart(item);
}

function addAdvantageToCart(dots, cost) {
    const item = {
        name: `Advantage (${dots} dot${dots > 1 ? 's' : ''})`,
        cost: cost,
        category: 'Advantages',
        level: dots
    };
    addToCart(item);
}

function addBloodPotencyToCart(level, cost) {
    const item = {
        name: `Blood Potency Level ${level}`,
        cost: cost,
        category: 'Blood Potency',
        level: level
    };
    addToCart(item);
}

// Mage-specific trait addition functions
function addMageAttributeToCart(level, cost) {
    const item = {
        name: `Mage Attribute Level ${level}`,
        cost: cost,
        category: 'Mage Attributes',
        level: level
    };
    addToCart(item);
}

function addMageSkillToCart(level, cost) {
    const item = {
        name: `Mage Skill Level ${level}`,
        cost: cost,
        category: 'Mage Skills',
        level: level
    };
    addToCart(item);
}

function addMageSphereToCart(level, cost) {
    const item = {
        name: `Sphere Level ${level}`,
        cost: cost,
        category: 'Spheres',
        level: level
    };
    addToCart(item);
}

function addMageAdvantageToCart(dots, cost) {
    const item = {
        name: `Mage Advantage (${dots} dot${dots > 1 ? 's' : ''})`,
        cost: cost,
        category: 'Mage Advantages',
        level: dots
    };
    addToCart(item);
}

function addMageAreteToCart(level, cost) {
    const item = {
        name: `Arete Level ${level}`,
        cost: cost,
        category: 'Arete',
        level: level
    };
    addToCart(item);
}

// Werewolf-specific trait addition functions
function addWerewolfAttributeToCart(level, cost) {
    const item = {
        name: `Werewolf Attribute Level ${level}`,
        cost: cost,
        category: 'Werewolf Attributes',
        level: level
    };
    addToCart(item);
}

function addWerewolfSkillToCart(level, cost) {
    const item = {
        name: `Werewolf Skill Level ${level}`,
        cost: cost,
        category: 'Werewolf Skills',
        level: level
    };
    addToCart(item);
}

function addWerewolfRenownToCart(level, cost) {
    const item = {
        name: `Renown Level ${level}`,
        cost: cost,
        category: 'Renown',
        level: level
    };
    addToCart(item);
}

function addWerewolfAdvantageToCart(dots, cost) {
    const item = {
        name: `Werewolf Advantage (${dots} dot${dots > 1 ? 's' : ''})`,
        cost: cost,
        category: 'Werewolf Advantages',
        level: dots
    };
    addToCart(item);
}

function addWerewolfGiftToCart(level, cost) {
    const item = {
        name: `Gift Level ${level}`,
        cost: cost,
        category: 'Gifts',
        level: level
    };
    addToCart(item);
}

function addWerewolfCaernToCart(level, cost) {
    const item = {
        name: `Caern Value Level ${level}`,
        cost: cost,
        category: 'Caern Value',
        level: level
    };
    addToCart(item);
}

// Hunter-specific trait addition functions
function addHunterAttributeToCart(level, cost) {
    const item = {
        name: `Hunter Attribute Level ${level}`,
        cost: cost,
        category: 'Hunter Attributes',
        level: level
    };
    addToCart(item);
}

function addHunterSkillToCart(level, cost) {
    const item = {
        name: `Hunter Skill Level ${level}`,
        cost: cost,
        category: 'Hunter Skills',
        level: level
    };
    addToCart(item);
}

function addHunterAdvantageToCart(dots, cost) {
    const item = {
        name: `Hunter Advantage (${dots} dot${dots > 1 ? 's' : ''})`,
        cost: cost,
        category: 'Hunter Advantages',
        level: dots
    };
    addToCart(item);
}

// Make all functions globally accessible for HTML onclick handlers
globalThis.addAttributeToCart = addAttributeToCart;
globalThis.addSkillToCart = addSkillToCart;
globalThis.addClanDisciplineToCart = addClanDisciplineToCart;
globalThis.addOtherDisciplineToCart = addOtherDisciplineToCart;
globalThis.addCaitiffDisciplineToCart = addCaitiffDisciplineToCart;
globalThis.addRitualToCart = addRitualToCart;
globalThis.addFormulaToCart = addFormulaToCart;
globalThis.addAdvantageToCart = addAdvantageToCart;
globalThis.addBloodPotencyToCart = addBloodPotencyToCart;
globalThis.addMageAttributeToCart = addMageAttributeToCart;
globalThis.addMageSkillToCart = addMageSkillToCart;
globalThis.addMageSphereToCart = addMageSphereToCart;
globalThis.addMageAdvantageToCart = addMageAdvantageToCart;
globalThis.addMageAreteToCart = addMageAreteToCart;
globalThis.addWerewolfAttributeToCart = addWerewolfAttributeToCart;
globalThis.addWerewolfSkillToCart = addWerewolfSkillToCart;
globalThis.addWerewolfRenownToCart = addWerewolfRenownToCart;
globalThis.addWerewolfAdvantageToCart = addWerewolfAdvantageToCart;
globalThis.addWerewolfGiftToCart = addWerewolfGiftToCart;
globalThis.addWerewolfCaernToCart = addWerewolfCaernToCart;
globalThis.addHunterAttributeToCart = addHunterAttributeToCart;
globalThis.addHunterSkillToCart = addHunterSkillToCart;
globalThis.addHunterAdvantageToCart = addHunterAdvantageToCart;
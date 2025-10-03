// XP Shop JavaScript

let currentSplat = 'vampire';
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
    
    // Clear cart when switching splats
    clearCart();
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

function goBack() {
    window.location.href = 'storyteller-tools.html';
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
window.XPShop = {
    addToCart,
    removeFromCart,
    clearCart,
    switchSplat,
    createShelfItem,
    populateShelf,
    updateCalculator
};
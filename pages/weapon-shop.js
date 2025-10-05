// Weapon Shop JavaScript

// Sample weapon data structure - replace with your actual data
const weaponsData = [
    // Example entries - replace with your actual weapon data
    {
        name: "M1911",
        type: "pistol",
        origin: "United States",
        summary: "A classic .45 ACP semi-automatic pistol used extensively by U.S. forces.",
        resources: 2,
        damage: 3,
        clip: "7+1",
        rarity: "common",
        special: "Reliable, Stopping Power",
        image: "M1911.png"
    },
    {
        name: "AK-47",
        type: "assault_rifle",
        origin: "Soviet Union",
        summary: "Legendary assault rifle known for its reliability and widespread use.",
        resources: 4,
        damage: 4,
        clip: "30",
        rarity: "uncommon",
        special: "Penetrating, Full Auto",
        image: "Ak-47.png"
    },
    {
        name: "Colt Python",
        type: "revolver",
        origin: "United States",
        summary: "Premium .357 Magnum revolver with exceptional accuracy.",
        resources: 3,
        damage: 4,
        clip: "6",
        rarity: "uncommon",
        special: "Accurate, Devastating",
        image: "Colt Pyton.png"
    }
    // Add more weapons here with your data
];

// Shopping cart
let cart = [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Weapon Shop loaded');
    loadWeapons();
    updateCartDisplay();
    
    // Add keyboard support for cart toggle
    const cartToggle = document.querySelector('.cart-toggle');
    if (cartToggle) {
        cartToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCart();
            }
        });
    }
});

// Load and display weapons
function loadWeapons() {
    const weaponsGrid = document.getElementById('weapons-grid');
    if (!weaponsGrid) return;
    
    weaponsGrid.innerHTML = '';
    
    weaponsData.forEach((weapon, index) => {
        const weaponCard = createWeaponCard(weapon, index);
        weaponsGrid.appendChild(weaponCard);
    });
}

// Create weapon card element
function createWeaponCard(weapon, index) {
    const card = document.createElement('div');
    card.className = 'weapon-card';
    card.dataset.type = weapon.type;
    card.dataset.rarity = weapon.rarity;
    card.dataset.name = weapon.name.toLowerCase();
    
    // Create resources dots
    const resourcesDots = Array.from({length: 5}, (_, i) => 
        `<div class="resource-dot ${i < weapon.resources ? 'filled' : ''}"></div>`
    ).join('');
    
    card.innerHTML = `
        <img src="../weaponimgs/${weapon.image}" alt="${weapon.name}" class="weapon-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNGI1NTYzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2QxZDVkYiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
        
        <div class="weapon-header">
            <h3 class="weapon-name">${weapon.name}</h3>
            <div class="weapon-type">${weapon.type.replace('_', ' ').toUpperCase()}</div>
            <div class="weapon-origin">Origin: ${weapon.origin}</div>
        </div>
        
        <div class="weapon-summary">${weapon.summary}</div>
        
        <div class="weapon-stats">
            <div class="stat-row">
                <span class="stat-label">Resources:</span>
                <div class="stat-value">
                    <div class="resources-dots">${resourcesDots}</div>
                </div>
            </div>
            
            <div class="stat-row">
                <span class="stat-label">Damage:</span>
                <div class="stat-value">
                    <span class="damage-value damage-${weapon.damage}">+${weapon.damage}</span>
                </div>
            </div>
            
            <div class="stat-row">
                <span class="stat-label">Clip:</span>
                <div class="stat-value">
                    <span class="clip-value">${weapon.clip}</span>
                </div>
            </div>
            
            <div class="stat-row">
                <span class="stat-label">Rarity:</span>
                <div class="stat-value">
                    <span class="rarity-badge rarity-${weapon.rarity}">${weapon.rarity.toUpperCase()}</span>
                </div>
            </div>
            
            <div class="stat-row">
                <span class="stat-label">Special:</span>
                <div class="stat-value">
                    <span class="special-value">${weapon.special}</span>
                </div>
            </div>
        </div>
        
        <div class="weapon-actions">
            <button class="btn-add-cart" onclick="addToCart(${index})" ${isInCart(weapon.name) ? 'disabled' : ''}>
                ${isInCart(weapon.name) ? 'In Cart' : 'Add to Cart'}
            </button>
        </div>
    `;
    
    return card;
}

// Filter weapons
function filterWeapons() {
    const categoryFilter = document.getElementById('category-filter').value;
    const rarityFilter = document.getElementById('rarity-filter').value;
    const searchFilter = document.getElementById('search-filter').value.toLowerCase();
    
    const weaponCards = document.querySelectorAll('.weapon-card');
    
    weaponCards.forEach(card => {
        const matchesCategory = categoryFilter === 'all' || card.dataset.type === categoryFilter;
        const matchesRarity = rarityFilter === 'all' || card.dataset.rarity === rarityFilter;
        const matchesSearch = searchFilter === '' || card.dataset.name.includes(searchFilter);
        
        if (matchesCategory && matchesRarity && matchesSearch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Cart functionality
function toggleCart() {
    const cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.classList.toggle('active');
}

function addToCart(weaponIndex) {
    const weapon = weaponsData[weaponIndex];
    if (!isInCart(weapon.name)) {
        cart.push(weapon);
        updateCartDisplay();
        loadWeapons(); // Refresh to update button states
    }
}

function removeFromCart(weaponName) {
    cart = cart.filter(weapon => weapon.name !== weaponName);
    updateCartDisplay();
    loadWeapons(); // Refresh to update button states
}

function clearCart() {
    cart = [];
    updateCartDisplay();
    loadWeapons(); // Refresh to update button states
}

function isInCart(weaponName) {
    return cart.some(weapon => weapon.name === weaponName);
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
    
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = cart.map(weapon => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${weapon.name}</div>
                        <div class="cart-item-type">${weapon.type.replace('_', ' ').toUpperCase()}</div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart('${weapon.name}')" title="Remove from cart">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }
}

function exportCart() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    let exportText = "VTM Weapon Shop - Selected Weapons\\n";
    exportText += "=====================================\\n\\n";
    
    cart.forEach(weapon => {
        exportText += `Name: ${weapon.name}\\n`;
        exportText += `Type: ${weapon.type.replace('_', ' ').toUpperCase()}\\n`;
        exportText += `Place of Origin: ${weapon.origin}\\n`;
        exportText += `Summary: ${weapon.summary}\\n`;
        exportText += `Resources: ${weapon.resources}/5\\n`;
        exportText += `Damage: +${weapon.damage}\\n`;
        exportText += `Clip: ${weapon.clip}\\n`;
        exportText += `Rarity: ${weapon.rarity.toUpperCase()}\\n`;
        exportText += `Special: ${weapon.special}\\n`;
        exportText += "\\n---\\n\\n";
    });
    
    // Create downloadable file
    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vtm-weapon-selection.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Close cart when clicking outside
document.addEventListener('click', function(e) {
    const cartContainer = document.querySelector('.cart-container');
    const cartDropdown = document.getElementById('cart-dropdown');
    
    if (cartContainer && !cartContainer.contains(e.target) && cartDropdown.classList.contains('active')) {
        cartDropdown.classList.remove('active');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const cartDropdown = document.getElementById('cart-dropdown');
        if (cartDropdown.classList.contains('active')) {
            cartDropdown.classList.remove('active');
        }
    }
});
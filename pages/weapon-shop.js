// Weapon Shop JavaScript

// Complete weapons database with VTM stats
const weaponsData = [
    // SHOTGUNS
    {
        name: "Remington 1100",
        type: "shotgun",
        origin: "United States",
        summary: "Gas-operated semi-automatic shotgun introduced in 1963. Popular with law enforcement and civilians for its reliability and reduced recoil.",
        resources: 2,
        damage: 4,
        clip: "4+1",
        rarity: "common",
        special: "Gas Operation, Reduced Recoil",
        image: "Remington 1100.png"
    },
    {
        name: "USAS 12",
        type: "shotgun",
        origin: "South Korea",
        summary: "Full-auto selective fire combat shotgun designed for sustained firepower in close-combat scenarios. Uses detachable magazines.",
        resources: 3,
        damage: 4,
        clip: "10/20",
        rarity: "rare",
        special: "Full Auto, Drum Magazines",
        image: "Usas 12.png"
    },
    {
        name: "Winchester Model 1887",
        type: "shotgun",
        origin: "United States",
        summary: "Lever-action shotgun designed by John Browning. Famous for its unique operating mechanism and Hollywood appearances.",
        resources: 3,
        damage: 3,
        clip: "5+1",
        rarity: "rare",
        special: "Can be modified to do a spin reload",
        image: "Winchester Model 1887.png"
    },
    {
        name: "Armsel Striker",
        type: "shotgun",
        origin: "South Africa",
        summary: "Revolving cylinder semi-automatic shotgun with a distinctive drum magazine design for rapid fire capability.",
        resources: 2,
        damage: 4,
        clip: "12",
        rarity: "rare",
        special: "Revolving Cylinder",
        image: "Armsel Striker.png"
    },
    {
        name: "Ithaca M37 (Stakeout)",
        type: "shotgun",
        origin: "United States",
        summary: "Compact pump-action shotgun variant designed for law enforcement. Features shorter barrel for close-quarters use.",
        resources: 1,
        damage: 4,
        clip: "4+1",
        rarity: "common",
        special: "Compact, Law Enforcement",
        image: "Ithaca M37 (Stakeout).png"
    },
    {
        name: "Remington 870",
        type: "shotgun",
        origin: "United States",
        summary: "Legendary pump-action shotgun widely used by military, police, and civilians. Known for extreme reliability and versatility.",
        resources: 1,
        damage: 4,
        clip: "4+1",
        rarity: "common",
        special: "Extreme Reliability",
        image: "Remington 870.png"
    },
    {
        name: "Mossberg M500",
        type: "shotgun",
        origin: "United States",
        summary: "Popular pump-action shotgun with dual extractors and positive steel-to-steel lockup for reliable operation.",
        resources: 1,
        damage: 4,
        clip: "5+1",
        rarity: "common",
        special: "Dual Extractors",
        image: "Mossberg M500.png"
    },
    {
        name: "Franchi Law 12",
        type: "shotgun",
        origin: "Italy",
        summary: "Semi-automatic tactical shotgun designed for military and law enforcement with rapid fire capability.",
        resources: 1,
        damage: 4,
        clip: "8+1",
        rarity: "rare",
        special: "Semi-Auto, Military Design",
        image: "Franchi Law 12.png"
    },
    {
        name: "Benelli M-3 Super 90",
        type: "shotgun",
        origin: "Italy",
        summary: "Dual-mode shotgun that can operate as either pump-action or semi-automatic with convertible action system.",
        resources: 2,
        damage: 4,
        clip: "7+1",
        rarity: "rare",
        special: "Dual Mode Operation",
        image: "Benelli M-3 Super 90.png"
    },
    {
        name: "SPAS 12",
        type: "shotgun",
        origin: "Italy",
        summary: "Combat shotgun with selective pump-action or semi-automatic operation and folding stock configuration.",
        resources: 1,
        damage: 4,
        clip: "8+1",
        rarity: "uncommon",
        special: "Selective Operation",
        image: "Spas 12.png"
    },

    // REVOLVERS
    {
        name: "Smith & Wesson Model 686",
        type: "revolver",
        origin: "United States",
        summary: "Available in six or seven shot cylinders, with a strong and durable frame. Police and Hunters use it with great use.",
        resources: 1,
        damage: 2,
        clip: "6/7",
        rarity: "common",
        special: "Reliable, Police Issue",
        image: "Smith & Wesson Model 686.png"
    },
    {
        name: "Smith & Wesson Model 640",
        type: "revolver",
        origin: "United States",
        summary: "A snubnosed revolver. Easy to conceal and reliable. Were used by police.",
        resources: 1,
        damage: 2,
        clip: "5",
        rarity: "common",
        special: "Concealed Hammer, Compact",
        image: "Smith & Wesson Model 640.png"
    },
    {
        name: "Voss BC",
        type: "revolver",
        origin: "United States",
        summary: "Some people say that the BC stands for body count. Shoots high velocity bullets.",
        resources: 1,
        damage: 2,
        clip: "8",
        rarity: "common",
        special: "Target's Armor -1",
        image: "Voss BC.png"
    },
    {
        name: "Ruger SP101",
        type: "revolver",
        origin: "United States",
        summary: "Compact double-action revolver built on a small frame with a reputation for durability and reliability.",
        resources: 1,
        damage: 2,
        clip: "5",
        rarity: "common",
        special: "Compact Frame, Durable",
        image: "Ruger 10-22.png"
    },
    {
        name: "Beretta Stampede",
        type: "revolver",
        origin: "Italy",
        summary: "Single-action revolver inspired by classic Western designs with modern manufacturing quality.",
        resources: 1,
        damage: 2,
        clip: "6",
        rarity: "common",
        special: "Single Action, Western Style",
        image: "Beretta Stampede.png"
    },
    {
        name: "Colt 1860 Army",
        type: "revolver",
        origin: "United States",
        summary: "Percussion cap and ball revolver used during the American Civil War. A classic piece of American history.",
        resources: 1,
        damage: 2,
        clip: "6",
        rarity: "common",
        special: "Cap and Ball, Historical",
        image: "Colt 1860.png"
    },
    {
        name: "Colt Buntline",
        type: "revolver",
        origin: "United States",
        summary: "Single Action Army variant with extended barrel length for improved accuracy and range.",
        resources: 2,
        damage: 3,
        clip: "6",
        rarity: "uncommon",
        special: "Extended Barrel, Accurate",
        image: "Colt Buntline.png"
    },
    {
        name: "Colt Anaconda",
        type: "revolver",
        origin: "United States",
        summary: "Large-frame double-action revolver chambered in powerful magnum cartridges with exceptional build quality.",
        resources: 2,
        damage: 3,
        clip: "6",
        rarity: "uncommon",
        special: "Magnum Power, Large Frame",
        image: "Colt Anaconda.png"
    },
    {
        name: "Colt Python",
        type: "revolver",
        origin: "United States",
        summary: "Premium double-action revolver known as the 'Rolls Royce of revolvers' for its exceptional accuracy and finish.",
        resources: 2,
        damage: 2,
        clip: "6",
        rarity: "uncommon",
        special: "Exceptional Accuracy",
        image: "Colt Pyton.png"
    },
    {
        name: "Ruger Redhawk",
        type: "revolver",
        origin: "United States",
        summary: "Large-frame double-action revolver designed for hunting and self-defense with robust construction.",
        resources: 2,
        damage: 2,
        clip: "6",
        rarity: "uncommon",
        special: "Hunting Design, Robust",
        image: "Ruger Redhawk.png"
    },
    {
        name: "Taurus 608",
        type: "revolver",
        origin: "Brazil",
        summary: "Large-frame revolver with 8-shot cylinder capacity offering high firepower in a revolver platform.",
        resources: 1,
        damage: 2,
        clip: "8",
        rarity: "common",
        special: "High Capacity Cylinder",
        image: "Taurus 608.png"
    },
    {
        name: "Casull",
        type: "revolver",
        origin: "United States",
        summary: "Custom revolver chambered in powerful .454 Casull cartridge, designed for maximum stopping power.",
        resources: 2,
        damage: 3,
        clip: "5",
        rarity: "rare",
        special: "Vintage",
        image: "Casull.png"
    },
    {
        name: "Taurus 454 Casull",
        type: "revolver",
        origin: "Brazil",
        summary: "Production revolver chambered in .454 Casull offering tremendous power in an affordable package.",
        resources: 1,
        damage: 3,
        clip: "5",
        rarity: "common",
        special: "Affordable Power",
        image: "Taurus 454.png"
    },
    {
        name: "Linebaugh",
        type: "revolver",
        origin: "United States",
        summary: "Custom revolver built by John Linebaugh, known for extremely powerful proprietary cartridges.",
        resources: 2,
        damage: 3,
        clip: "5",
        rarity: "rare",
        special: "Vintage",
        image: "Linebaugh.png"
    },

    // PISTOLS
    {
        name: "Walther PPK",
        type: "pistol",
        origin: "Germany",
        summary: "Compact semi-automatic pistol famous for its use by fictional spy James Bond and law enforcement.",
        resources: 1,
        damage: 2,
        clip: "7+1",
        rarity: "common",
        special: "Compact, Famous",
        image: "Walter PPK.png"
    },
    {
        name: "Heckler & Koch P7M13",
        type: "pistol",
        origin: "Germany",
        summary: "Unique pistol with squeeze-cocking mechanism and gas-delayed blowback operation for accuracy.",
        resources: 2,
        damage: 2,
        clip: "13+1",
        rarity: "uncommon",
        special: "Squeeze Cocking",
        image: "Heckler & Koch P7M13.png"
    },
    {
        name: "Heckler & Koch USP",
        type: "pistol",
        origin: "Germany",
        summary: "Universal self-loading pistol designed for law enforcement and military with modular design.",
        resources: 1,
        damage: 2,
        clip: "15+1",
        rarity: "common",
        special: "Modular Design",
        image: "Heckler & Koch USP.png"
    },
    {
        name: "SigSauer P226",
        type: "pistol",
        origin: "Germany/Switzerland",
        summary: "Full-size service pistol used by military and law enforcement worldwide with exceptional reliability.",
        resources: 2,
        damage: 2,
        clip: "15+1",
        rarity: "common",
        special: "Military Standard",
        image: "SigSauer P226.png"
    },
    {
        name: "Hammerli M280 Target",
        type: "pistol",
        origin: "Switzerland",
        summary: "Precision target pistol designed for competitive shooting with exceptional accuracy capabilities.",
        resources: 3,
        damage: 1,
        clip: "6+1",
        rarity: "rare",
        special: "Target Precision",
        image: "Hammerli M280 Target.png"
    },
    {
        name: "Taurus 22 Poly Pistol",
        type: "pistol",
        origin: "Brazil",
        summary: "Lightweight polymer-framed .22 caliber pistol designed for training and recreational shooting.",
        resources: 1,
        damage: 1,
        clip: "10+1",
        rarity: "uncommon",
        special: "Polymer Frame, Training",
        image: "Taurus 22 Poly Pistol.png"
    },
    {
        name: "Glock 17",
        type: "pistol",
        origin: "Austria",
        summary: "Revolutionary polymer-framed pistol that changed modern handgun design with simplicity and reliability.",
        resources: 1,
        damage: 2,
        clip: "17+1",
        rarity: "common",
        special: "Polymer Revolution",
        image: "Glock 17.png"
    },
    {
        name: "M1911",
        type: "pistol",
        origin: "United States",
        summary: "Classic .45 ACP semi-automatic pistol that served as the U.S. military sidearm for over 70 years.",
        resources: 1,
        damage: 2,
        clip: "7+1",
        rarity: "common",
        special: "Military Classic",
        image: "M1911.png"
    },
    {
        name: "Glock 22",
        type: "pistol",
        origin: "Austria",
        summary: "Law enforcement favorite chambered in .40 S&W offering good balance of power and capacity.",
        resources: 1,
        damage: 2,
        clip: "15+1",
        rarity: "common",
        special: "Law Enforcement",
        image: "Glock 22.png"
    },
    {
        name: "Glock 20",
        type: "pistol",
        origin: "Austria",
        summary: "Full-size pistol chambered in 10mm Auto providing serious stopping power with high capacity.",
        resources: 1,
        damage: 2,
        clip: "15+1",
        rarity: "common",
        special: "10mm Power",
        image: "Glock 20.png"
    },
    {
        name: "Heckler & Koch P7M10",
        type: "pistol",
        origin: "Germany",
        summary: "Compact variant of the P7 series with squeeze-cocking mechanism in .40 S&W caliber.",
        resources: 3,
        damage: 2,
        clip: "10+1",
        rarity: "rare",
        special: "Squeeze Cocking, Compact",
        image: "Heckler & Koch P7M10.png"
    },
    {
        name: "Taurus Millennium G2",
        type: "pistol",
        origin: "Brazil",
        summary: "Compact striker-fired pistol designed for concealed carry with ergonomic grip design.",
        resources: 1,
        damage: 2,
        clip: "12+1",
        rarity: "common",
        special: "Concealed Carry",
        image: "Taurus Millenium G2.png"
    },
    {
        name: "IMI Desert Eagle",
        type: "pistol",
        origin: "Israel",
        summary: "Massive semi-automatic pistol chambered in magnum cartridges, famous for its imposing size and power.",
        resources: 2,
        damage: 3,
        clip: "7+1",
        rarity: "rare",
        special: "Magnum Power, Intimidating",
        image: "IMI Desert Eagle.png"
    },
    {
        name: "SigSauer P220",
        type: "pistol",
        origin: "Germany/Switzerland",
        summary: "Single-stack service pistol known for accuracy and reliability in .45 ACP chambering.",
        resources: 2,
        damage: 2,
        clip: "8+1",
        rarity: "rare",
        special: "Single Stack, Accurate",
        image: "SIGSauer P220.png"
    },
    {
        name: "Heckler & Koch VP70Z",
        type: "pistol",
        origin: "Germany",
        summary: "Early polymer-framed pistol with unique trigger system and high-capacity magazine.",
        resources: 2,
        damage: 2,
        clip: "18+1",
        rarity: "uncommon",
        special: "Early Polymer",
        image: "Heckler & Koch VP70Z.png"
    },
    {
        name: "Glock 18",
        type: "pistol",
        origin: "Austria",
        summary: "Select-fire variant of the Glock 17 capable of full-automatic fire for special operations.",
        resources: 2,
        damage: 2,
        clip: "17+1/33",
        rarity: "rare",
        special: "Full Auto Capable",
        image: "Glock 18.png"
    },
    {
        name: "Beretta 93R",
        type: "pistol",
        origin: "Italy",
        summary: "Select-fire pistol with burst capability and folding foregrip for improved control.",
        resources: 2,
        damage: 2,
        clip: "20+1",
        rarity: "rare",
        special: "Burst Fire, Foregrip",
        image: "Beretta 93R.png"
    },
    {
        name: "Stechkin",
        type: "pistol",
        origin: "Soviet Union",
        summary: "Select-fire pistol with detachable stock that can function as a submachine gun.",
        resources: 2,
        damage: 2,
        clip: "20+1",
        rarity: "rare",
        special: "Select Fire, Detachable Stock",
        image: "Stechkin.png"
    },

    // SMG
    {
        name: "Ingram Mac-10",
        type: "smg",
        origin: "United States",
        summary: "Compact submachine gun with extremely high rate of fire designed for close-quarters combat.",
        resources: 3,
        damage: 2,
        clip: "32",
        rarity: "uncommon",
        special: "Extremely High ROF",
        image: "Ingram Mac-10.png"
    },
    {
        name: "Mini Uzi",
        type: "smg",
        origin: "Israel",
        summary: "Compact variant of the famous Uzi submachine gun with reduced size but maintained reliability.",
        resources: 1,
        damage: 2,
        clip: "20/25/32",
        rarity: "common",
        special: "Compact Design",
        image: "Mini Uzi.png"
    },
    {
        name: "Heckler & Koch MP-5",
        type: "smg",
        origin: "Germany",
        summary: "World's most famous submachine gun used by elite forces worldwide for its accuracy and reliability.",
        resources: 2,
        damage: 2,
        clip: "30",
        rarity: "uncommon",
        special: "Elite Forces Standard",
        image: "Heckler & Koch MP-5.png"
    },
    {
        name: "Skorpion",
        type: "smg",
        origin: "Czechoslovakia",
        summary: "Compact machine pistol with wire stock and rate reducer for controlled automatic fire.",
        resources: 1,
        damage: 1,
        clip: "10/20",
        rarity: "uncommon",
        special: "Rate Reducer, Compact",
        image: "Skorpion.png"
    },
    {
        name: "Spectre M4",
        type: "smg",
        origin: "Italy",
        summary: "Advanced submachine gun with quadruple-stack magazine and ambidextrous controls.",
        resources: 2,
        damage: 2,
        clip: "50",
        rarity: "rare",
        special: "Quadruple Stack Magazine",
        image: "Spectre M4.png"
    },
    {
        name: "TEC-9",
        type: "smg",
        origin: "Sweden/United States",
        summary: "Semi-automatic pistol with large capacity magazines, often associated with urban violence.",
        resources: 1,
        damage: 2,
        clip: "32",
        rarity: "uncommon",
        special: "High Capacity",
        image: "TEC-9.png"
    },
    {
        name: "TEC-22",
        type: "smg",
        origin: "Sweden/United States",
        summary: ".22 caliber variant of the TEC series with reduced power but high capacity.",
        resources: 1,
        damage: 1,
        clip: "30",
        rarity: "common",
        special: ".22 Caliber, High Capacity",
        image: "TEC-22.png"
    },
    {
        name: "Calico 950",
        type: "smg",
        origin: "United States",
        summary: "Unique submachine gun with helical magazine system providing very high ammunition capacity.",
        resources: 1,
        damage: 2,
        clip: "50/100",
        rarity: "uncommon",
        special: "Helical Magazine",
        image: "Calico 950.png"
    },
    {
        name: "Uzi",
        type: "smg",
        origin: "Israel",
        summary: "Legendary submachine gun known worldwide for its simplicity, reliability, and effectiveness.",
        resources: 2,
        damage: 2,
        clip: "25/32",
        rarity: "uncommon",
        special: "Legendary Reliability",
        image: "Uzi.png"
    },
    {
        name: "PPSh-41",
        type: "smg",
        origin: "Soviet Union",
        summary: "WWII-era submachine gun known for its high rate of fire and distinctive drum magazine.",
        resources: 1,
        damage: 2,
        clip: "35/71",
        rarity: "rare",
        special: "WWII Era, Drum Magazine",
        image: "PPSh-41.png"
    },
    {
        name: "Thompson M1928",
        type: "smg",
        origin: "United States",
        summary: "Famous 'Tommy Gun' of prohibition era and WWII with distinctive styling and drum magazines.",
        resources: 1,
        damage: 2,
        clip: "20/30/50",
        rarity: "rare",
        special: "Civilian Variants",
        image: "Thompson M1928.png"
    },

    // RIFLES
    {
        name: "Remington M700",
        type: "rifle",
        origin: "United States",
        summary: "Bolt-action hunting and sniper rifle known for exceptional accuracy and widespread use.",
        resources: 2,
        damage: 4,
        clip: "4+1",
        rarity: "common",
        special: "Sniper Accuracy",
        image: "Remington M700.png"
    },
    {
        name: "Ruger 10-22",
        type: "rifle",
        origin: "United States",
        summary: "Semi-automatic .22 caliber rifle popular for training, hunting small game, and recreational shooting.",
        resources: 1,
        damage: 2,
        clip: "10",
        rarity: "common",
        special: "Training Rifle",
        image: "Ruger 10-22.png"
    },
    {
        name: "Browning BAR",
        type: "rifle",
        origin: "Belgium/United States",
        summary: "Semi-automatic hunting rifle with gas operation system and detachable magazine.",
        resources: 2,
        damage: 4,
        clip: "4+1",
        rarity: "common",
        special: "Semi-Auto Hunting",
        image: "Browning Bar.png"
    },
    {
        name: "Remington M740",
        type: "rifle",
        origin: "United States",
        summary: "Semi-automatic hunting rifle designed for rapid follow-up shots on game.",
        resources: 1,
        damage: 3,
        clip: "4+1",
        rarity: "common",
        special: "Rapid Follow-up",
        image: "Remington M740.png"
    },
    {
        name: "Weatherby Mark V",
        type: "rifle",
        origin: "United States",
        summary: "High-end bolt-action rifle chambered in powerful magnum cartridges for long-range hunting.",
        resources: 2,
        damage: 5,
        clip: "3+1",
        rarity: "common",
        special: "Magnum Power",
        image: "WeatherBy Mark V.png"
    },

    // ASSAULT RIFLES
    {
        name: "Beretta ARX160",
        type: "assault_rifle",
        origin: "Italy",
        summary: "Modern modular assault rifle with ambidextrous controls and multiple caliber capability.",
        resources: 1,
        damage: 3,
        clip: "30",
        rarity: "uncommon",
        special: "Modular Design",
        image: "Beretta ARX160.png"
    },
    {
        name: "Steyr AUG",
        type: "assault_rifle",
        origin: "Austria",
        summary: "Bullpup assault rifle with integrated optics and distinctive design used by many nations.",
        resources: 2,
        damage: 3,
        clip: "30/42",
        rarity: "uncommon",
        special: "Bullpup Design, Integrated Optics",
        image: "Steyr AUG.png"
    },
    {
        name: "M16",
        type: "assault_rifle",
        origin: "United States",
        summary: "Standard U.S. military assault rifle known for its lightweight design and modular system.",
        resources: 1,
        damage: 3,
        clip: "20/30",
        rarity: "common",
        special: "Military Standard",
        image: "M16.png"
    },
    {
        name: "FAMAS",
        type: "assault_rifle",
        origin: "France",
        summary: "French bullpup assault rifle with distinctive angular design and high rate of fire.",
        resources: 3,
        damage: 3,
        clip: "25/30",
        rarity: "rare",
        special: "Bullpup, High ROF",
        image: "Famas.png"
    },
    {
        name: "AK-74",
        type: "assault_rifle",
        origin: "Soviet Union",
        summary: "Modernized variant of the AK-47 with improved cartridge and reduced recoil.",
        resources: 2,
        damage: 3,
        clip: "30",
        rarity: "rare",
        special: "AK Reliability, Modern",
        image: "Ak-74.png"
    },
    {
        name: "SA-80",
        type: "assault_rifle",
        origin: "United Kingdom",
        summary: "British bullpup assault rifle with SUSAT optic system used by UK forces.",
        resources: 3,
        damage: 3,
        clip: "30",
        rarity: "rare",
        special: "SUSAT Optics",
        image: "SA-80.png"
    },
    {
        name: "Mini-14",
        type: "assault_rifle",
        origin: "United States",
        summary: "Civilian semi-automatic rifle based on M14 design popular for ranch and sporting use.",
        resources: 1,
        damage: 3,
        clip: "5/20/30",
        rarity: "common",
        special: "Civilian Design",
        image: "Mini-14.png"
    },
    {
        name: "Volkssturmgewehr",
        type: "assault_rifle",
        origin: "Germany",
        summary: "Late WWII German assault rifle designed for mass production with simplified construction.",
        resources: 1,
        damage: 3,
        clip: "30",
        rarity: "common",
        special: "WWII Era, Simplified",
        image: "Volkssturmgewehr.png"
    },

    // BATTLE RIFLES
    {
        name: "M-14",
        type: "battle_rifle",
        origin: "United States",
        summary: "Full-power battle rifle that served as U.S. military standard before being replaced by M16.",
        resources: 3,
        damage: 4,
        clip: "20",
        rarity: "common",
        special: "Full Power, Military Service",
        image: "M-14.png"
    },
    {
        name: "AK-47",
        type: "battle_rifle",
        origin: "Soviet Union",
        summary: "Legendary assault rifle known worldwide for its simplicity, reliability, and effectiveness in combat.",
        resources: 1,
        damage: 4,
        clip: "30",
        rarity: "common",
        special: "Legendary Reliability",
        image: "Ak-47.png"
    },
    {
        name: "Heckler & Koch G3",
        type: "battle_rifle",
        origin: "Germany",
        summary: "Delayed blowback battle rifle used by many nations with distinctive roller-delayed action.",
        resources: 3,
        damage: 3,
        clip: "20",
        rarity: "rare",
        special: "Roller-Delayed Action",
        image: "Heckler & Koch G3.png"
    },
    {
        name: "FN FAL",
        type: "battle_rifle",
        origin: "Belgium",
        summary: "Battle rifle used by over 90 countries, known as 'The Right Arm of the Free World'.",
        resources: 2,
        damage: 4,
        clip: "20",
        rarity: "uncommon",
        special: "Free World Standard",
        image: "FN Fal.png"
    }
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
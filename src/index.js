/**
 * VTM Map Application - Main Entry Point
 * 
 * This is the main application class for the Vampire: The Masquerade territory mapping tool.
 * It provides a command-line interface for managing the application, extracting map data,
 * and displaying information about clans and territories.
 * 
 * Commands:
 * - node src/index.js status   - Show project status and next steps
 * - node src/index.js extract  - Extract OSM data for a city
 * - node src/index.js clans    - List available vampire clans
 * - node src/index.js territories - List territory types
 * 
 * @author VTM Map Project
 * @version 1.0.0
 */

const OSMDataExtractor = require('./data-extraction/extract-osm-data');
const path = require('path');
const fs = require('fs-extra');

/**
 * Main application class that manages the VTM Map system
 * Handles configuration loading, data extraction coordination, and CLI interface
 */
class VTMMapApp {
    /**
     * Initialize the VTM Map application
     * Sets up configuration file path and prepares for loading
     */
    constructor() {
        this.configPath = path.join(__dirname, '../config/config.json');
        this.config = null; // Will hold loaded configuration
    }

    async init() {
        try {
            // Load configuration
            this.config = await fs.readJson(this.configPath);
            console.log('🧛 VTM Map Application Starting...');
            console.log('📍 Available cities:', Object.keys(this.config.cities).join(', '));
            
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize application:', error.message);
            return false;
        }
    }

    async extractCityData(cityKey = 'santa-cruz') {
        if (!this.config) {
            throw new Error('Application not initialized. Call init() first.');
        }

        if (!this.config.cities[cityKey]) {
            throw new Error(`City '${cityKey}' not found in configuration.`);
        }

        console.log(`🏙️  Extracting data for ${this.config.cities[cityKey].name}...`);
        
        const extractor = new OSMDataExtractor();
        
        if (cityKey === 'santa-cruz') {
            return await extractor.extractSantaCruzData();
        } else {
            throw new Error(`Data extraction for '${cityKey}' not yet implemented.`);
        }
    }

    listAvailableClans() {
        if (!this.config) {
            throw new Error('Application not initialized. Call init() first.');
        }

        console.log('🧛 Available Vampire Clans:');
        Object.entries(this.config.vtm.clans).forEach(([key, clan]) => {
            console.log(`  • ${clan.name} - ${clan.description}`);
            console.log(`    Disciplines: ${clan.disciplines.join(', ')}`);
            console.log(`    Color: ${clan.color}`);
        });
    }

    listTerritoryTypes() {
        if (!this.config) {
            throw new Error('Application not initialized. Call init() first.');
        }

        console.log('🗺️  Territory Types:');
        Object.entries(this.config.vtm.territoryTypes).forEach(([key, territory]) => {
            console.log(`  • ${territory.name} - ${territory.description}`);
            console.log(`    Examples: ${territory.examples.join(', ')}`);
        });
    }

    async showProjectStatus() {
        console.log('\n📊 VTM Map Project Status:');
        console.log('✅ Project structure created');
        console.log('✅ OpenStreetMap data extraction ready');
        console.log('✅ Configuration system set up');
        console.log('✅ Utility functions available');
        console.log('\n📋 Next Steps:');
        console.log('1. Run "npm install" to install dependencies');
        console.log('2. Run "npm run extract-data" to download Santa Cruz data');
        console.log('3. Set up Three.js 3D rendering engine');
        console.log('4. Create web interface for faction assignment');
        console.log('5. Implement territory visualization');
        
        // Check if data directory exists
        const dataDir = path.join(__dirname, '../data');
        const hasData = await fs.pathExists(dataDir);
        
        if (hasData) {
            const files = await fs.readdir(dataDir);
            console.log(`\n📁 Data files found: ${files.join(', ')}`);
        } else {
            console.log('\n📁 No data files found yet');
        }
    }
}

// CLI interface
async function main() {
    const app = new VTMMapApp();
    const success = await app.init();
    
    if (!success) {
        process.exit(1);
    }

    const command = process.argv[2];
    
    try {
        switch (command) {
            case 'extract':
                const cityKey = process.argv[3] || 'santa-cruz';
                await app.extractCityData(cityKey);
                break;
                
            case 'clans':
                app.listAvailableClans();
                break;
                
            case 'territories':
                app.listTerritoryTypes();
                break;
                
            case 'status':
            default:
                await app.showProjectStatus();
                break;
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = VTMMapApp;

/**
 * VTM Map Web Server
 * 
 * Express.js web server that serves the 3D visualization interface and provides
 * REST API endpoints for accessing map data, city information, and VTM configuration.
 * 
 * Server features:
 * - Static file serving for the web interface
 * - REST API for map data and configuration
 * - CORS support for development
 * - Error handling and logging
 * 
 * API Endpoints:
 * - GET /api/city/:cityName - Get processed map data for a city
 * - GET /api/cities - List all available cities
 * - GET /api/vtm-config - Get VTM clan and territory configuration
 * - GET /api/health - Health check endpoint
 * 
 * @author VTM Map Project
 * @version 1.0.0
 */

const express = require('express');
const path = require('path');
const fs = require('fs-extra');

/**
 * Web server class for the VTM Map application
 * Handles HTTP requests and serves both static files and API endpoints
 */

class VTMWebServer {
    /**
     * Initialize the web server
     * Sets up Express app, port configuration, and route handlers
     */
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000; // Allow port override via environment variable
        this.setupRoutes();
    }

    /**
     * Set up all HTTP routes and middleware
     * Configures static file serving and API endpoints
     */
    setupRoutes() {
        // Serve static files from public directory (HTML, CSS, JS, images)
        this.app.use(express.static(path.join(__dirname, '../public')));
        
        // Parse JSON request bodies
        this.app.use(express.json());
        
        // API endpoint to get processed city data
        // Returns building, road, and landmark data for 3D visualization
        this.app.get('/api/city/:cityName', async (req, res) => {
            try {
                const cityName = req.params.cityName;
                const dataPath = path.join(__dirname, '../data', `${cityName}-processed.json`);
                
                if (await fs.pathExists(dataPath)) {
                    const data = await fs.readJson(dataPath);
                    res.json(data);
                } else {
                    res.status(404).json({ error: 'City data not found' });
                }
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        
        // API endpoint to get available cities
        this.app.get('/api/cities', async (req, res) => {
            try {
                const configPath = path.join(__dirname, '../config/config.json');
                const config = await fs.readJson(configPath);
                res.json(config.cities);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        
        // API endpoint to get VTM configuration
        this.app.get('/api/vtm-config', async (req, res) => {
            try {
                const configPath = path.join(__dirname, '../config/config.json');
                const config = await fs.readJson(configPath);
                res.json(config.vtm);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        
        // Health check endpoint
        this.app.get('/api/health', (req, res) => {
            res.json({ status: 'ok', timestamp: new Date().toISOString() });
        });
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`🧛 VTM Map server running at http://localhost:${this.port}`);
            console.log(`📍 Open your browser to view the 3D map visualization`);
            console.log(`🔧 API endpoints available at /api/`);
        });
    }
}

// Start server if run directly
if (require.main === module) {
    const server = new VTMWebServer();
    server.start();
}

module.exports = VTMWebServer;

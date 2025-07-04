/**
 * OpenStreetMap Data Extractor for VTM Map
 * 
 * This module handles the extraction and processing of real-world map data from OpenStreetMap
 * using the Overpass API. It downloads building, road, and landmark data for specified cities
 * and processes it into a format suitable for 3D visualization and vampire territory assignment.
 * 
 * Features:
 * - Downloads comprehensive city data (buildings, roads, amenities, natural features)
 * - Processes and categorizes OSM elements
 * - Estimates building heights from OSM tags
 * - Saves both raw and processed data for analysis
 * 
 * @author VTM Map Project
 * @version 1.0.0
 */

const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

/**
 * Main class for extracting OpenStreetMap data
 * Handles API communication, data processing, and file output
 */

class OSMDataExtractor {
    /**
     * Initialize the OSM data extractor
     * Sets up API endpoint and data storage directory
     */
    constructor() {
        // Overpass API endpoint - free service for querying OSM data
        this.overpassEndpoint = 'https://overpass-api.de/api/interpreter';
        // Directory to store extracted data files
        this.dataDir = path.join(__dirname, '../../data');
    }

    /**
     * Get bounding box coordinates for Santa Cruz, California
     * 
     * These coordinates define the geographic area to extract data from.
     * The bounding box covers downtown Santa Cruz, the university area,
     * and extends to the coast to include the boardwalk and pier.
     * 
     * @returns {Object} Bounding box with south, west, north, east coordinates
     */
    getSantaCruzBoundingBox() {
        return {
            south: 36.9400,  // Southern boundary (near Aptos)
            west: -122.0700, // Western boundary (Pacific Ocean)
            north: 37.0100,  // Northern boundary (near Scotts Valley)
            east: -121.9800  // Eastern boundary (near Soquel)
        };
    }

    /**
     * Generate Overpass QL query for comprehensive city data
     * 
     * This creates an Overpass Query Language (QL) query that extracts
     * all the data needed for the VTM map visualization:
     * - Buildings (for territory assignment)
     * - Roads and highways (for navigation context)
     * - Amenities (potential feeding grounds, havens, etc.)
     * - Natural features (parks, water bodies)
     * - Administrative boundaries
     * 
     * @param {Object} bbox - Bounding box with south, west, north, east coordinates
     * @returns {string} Overpass QL query string
     */
    generateOverpassQuery(bbox) {
        return `
[out:json][timeout:60];
(
  // Buildings
  way["building"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
  
  // Roads and streets
  way["highway"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
  
  // Landmarks and amenities
  way["amenity"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
  node["amenity"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
  
  // Parks and natural features
  way["leisure"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
  way["natural"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
  
  // Water features
  way["waterway"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
  
  // Administrative boundaries
  relation["boundary"="administrative"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
);
out body;
>;
out skel qt;
        `.trim();
    }

    /**
     * Extract OSM data for Santa Cruz
     */
    async extractSantaCruzData() {
        try {
            console.log('Starting OpenStreetMap data extraction for Santa Cruz, CA...');
            
            const bbox = this.getSantaCruzBoundingBox();
            const query = this.generateOverpassQuery(bbox);
            
            console.log('Sending request to Overpass API...');
            console.log(`Bounding box: SW(${bbox.south}, ${bbox.west}) to NE(${bbox.north}, ${bbox.east})`);
            
            const response = await axios.post(this.overpassEndpoint, query, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                timeout: 120000 // 2 minutes timeout
            });

            // Ensure data directory exists
            await fs.ensureDir(this.dataDir);

            // Save raw OSM data
            const rawDataPath = path.join(this.dataDir, 'santa-cruz-raw.json');
            await fs.writeJson(rawDataPath, response.data, { spaces: 2 });
            
            console.log(`✅ Raw OSM data saved to: ${rawDataPath}`);
            console.log(`📊 Data summary:`);
            console.log(`   - Elements: ${response.data.elements?.length || 0}`);
            
            // Process and categorize the data
            const processedData = this.processOSMData(response.data);
            
            // Save processed data
            const processedDataPath = path.join(this.dataDir, 'santa-cruz-processed.json');
            await fs.writeJson(processedDataPath, processedData, { spaces: 2 });
            
            console.log(`✅ Processed data saved to: ${processedDataPath}`);
            console.log(`📊 Processed data summary:`);
            console.log(`   - Buildings: ${processedData.buildings.length}`);
            console.log(`   - Roads: ${processedData.roads.length}`);
            console.log(`   - Amenities: ${processedData.amenities.length}`);
            console.log(`   - Natural features: ${processedData.natural.length}`);
            
            return processedData;
            
        } catch (error) {
            console.error('❌ Error extracting OSM data:', error.message);
            
            if (error.code === 'ECONNABORTED') {
                console.error('Request timed out. The area might be too large or the server is busy.');
            } else if (error.response) {
                console.error(`Server responded with status: ${error.response.status}`);
            }
            
            throw error;
        }
    }

    /**
     * Process and categorize OSM data
     */
    processOSMData(osmData) {
        const processed = {
            buildings: [],
            roads: [],
            amenities: [],
            natural: [],
            waterways: [],
            boundaries: [],
            metadata: {
                bbox: this.getSantaCruzBoundingBox(),
                extractedAt: new Date().toISOString(),
                totalElements: osmData.elements?.length || 0
            }
        };

        if (!osmData.elements) {
            console.warn('No elements found in OSM data');
            return processed;
        }

        // Create a map of node IDs to coordinates for way reconstruction
        const nodes = new Map();
        
        // First pass: collect all nodes
        osmData.elements
            .filter(element => element.type === 'node')
            .forEach(node => {
                nodes.set(node.id, { lat: node.lat, lon: node.lon });
            });

        // Second pass: process ways and relations
        osmData.elements.forEach(element => {
            if (element.type === 'way') {
                const coordinates = element.nodes
                    .map(nodeId => nodes.get(nodeId))
                    .filter(coord => coord); // Remove undefined coordinates

                const wayData = {
                    id: element.id,
                    tags: element.tags || {},
                    coordinates: coordinates
                };

                // Categorize based on tags
                if (element.tags?.building) {
                    processed.buildings.push({
                        ...wayData,
                        buildingType: element.tags.building,
                        height: element.tags.height,
                        levels: element.tags['building:levels']
                    });
                } else if (element.tags?.highway) {
                    processed.roads.push({
                        ...wayData,
                        roadType: element.tags.highway,
                        name: element.tags.name
                    });
                } else if (element.tags?.amenity) {
                    processed.amenities.push({
                        ...wayData,
                        amenityType: element.tags.amenity,
                        name: element.tags.name
                    });
                } else if (element.tags?.natural || element.tags?.leisure) {
                    processed.natural.push({
                        ...wayData,
                        featureType: element.tags.natural || element.tags.leisure,
                        name: element.tags.name
                    });
                } else if (element.tags?.waterway) {
                    processed.waterways.push({
                        ...wayData,
                        waterwayType: element.tags.waterway,
                        name: element.tags.name
                    });
                }
            } else if (element.type === 'node' && element.tags?.amenity) {
                // Point amenities
                processed.amenities.push({
                    id: element.id,
                    tags: element.tags,
                    coordinates: [{ lat: element.lat, lon: element.lon }],
                    amenityType: element.tags.amenity,
                    name: element.tags.name
                });
            }
        });

        return processed;
    }
}

// CLI usage
if (require.main === module) {
    const extractor = new OSMDataExtractor();
    extractor.extractSantaCruzData()
        .then(() => {
            console.log('🎉 Data extraction completed successfully!');
            console.log('Next steps:');
            console.log('1. Review the extracted data in the /data folder');
            console.log('2. Use the processed data to generate 3D models');
            console.log('3. Set up the Three.js visualization');
        })
        .catch(error => {
            console.error('💥 Extraction failed:', error.message);
            process.exit(1);
        });
}

module.exports = OSMDataExtractor;

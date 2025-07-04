/**
 * Map Utility Functions for VTM Map
 * 
 * This module provides utility functions for geographic calculations,
 * coordinate transformations, and map data processing used throughout
 * the VTM territory mapping application.
 * 
 * Key features:
 * - Coordinate system conversions (lat/lon to local coordinates)
 * - Distance calculations using the Haversine formula
 * - Building type detection from OSM tags
 * - Height estimation for 3D visualization
 * - Polygon geometry operations
 * 
 * @author VTM Map Project
 * @version 1.0.0
 */

/**
 * Utility class containing static methods for map operations
 * All methods are stateless and can be called independently
 */

class MapUtils {
    /**
     * Convert latitude/longitude coordinates to local 3D space coordinates
     * 
     * This function transforms GPS coordinates into a local coordinate system
     * suitable for 3D rendering. It uses a simple equirectangular projection
     * which works well for small areas like cities.
     * 
     * For larger areas or higher accuracy requirements, consider using
     * a proper map projection library like proj4js.
     * 
     * @param {number} lat - Latitude in decimal degrees
     * @param {number} lon - Longitude in decimal degrees  
     * @param {Object} center - Center point {lat, lon} for the projection
     * @returns {Object} Local coordinates {x, y} in meters
     */
    static latLonToLocal(lat, lon, center) {
        const earthRadius = 6371000; // Earth's radius in meters (mean radius)
        
        // Convert degrees to radians for trigonometric calculations
        const lat1 = center.lat * Math.PI / 180;
        const lat2 = lat * Math.PI / 180;
        const deltaLon = (lon - center.lon) * Math.PI / 180;
        
        // Simple equirectangular projection
        // X coordinate: longitude difference scaled by latitude cosine
        const x = deltaLon * Math.cos((lat1 + lat2) / 2) * earthRadius;
        // Y coordinate: latitude difference scaled by Earth's radius
        const y = (lat2 - lat1) * earthRadius;
        
        return { x, y };
    }

    /**
     * Calculate the center point of a bounding box
     */
    static getBoundingBoxCenter(bbox) {
        return {
            lat: (bbox.north + bbox.south) / 2,
            lon: (bbox.east + bbox.west) / 2
        };
    }

    /**
     * Calculate distance between two lat/lon points (Haversine formula)
     */
    static calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c; // Distance in kilometers
    }

    /**
     * Determine building type from OSM tags
     */
    static getBuildingType(tags) {
        if (!tags) return 'unknown';
        
        // Check specific building types
        if (tags.building && tags.building !== 'yes') {
            return tags.building;
        }
        
        // Check amenities
        if (tags.amenity) {
            return tags.amenity;
        }
        
        // Check for specific uses
        if (tags.use || tags.landuse) {
            return tags.use || tags.landuse;
        }
        
        return 'building';
    }

    /**
     * Estimate building height from OSM data
     */
    static estimateBuildingHeight(tags, config) {
        // If height is explicitly provided
        if (tags.height) {
            const height = parseFloat(tags.height.replace(/[^\d.]/g, ''));
            if (!isNaN(height)) return height;
        }
        
        // If building levels are provided
        if (tags['building:levels']) {
            const levels = parseInt(tags['building:levels']);
            if (!isNaN(levels)) return levels * 3.5; // Assume 3.5m per level
        }
        
        // Use building type to estimate
        const buildingType = this.getBuildingType(tags);
        const heights = config.rendering?.buildingHeights || {};
        
        return heights[buildingType] || heights.default || 12;
    }

    /**
     * Check if a point is inside a polygon (ray casting algorithm)
     */
    static pointInPolygon(point, polygon) {
        const x = point.x;
        const y = point.y;
        let inside = false;
        
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i].x;
            const yi = polygon[i].y;
            const xj = polygon[j].x;
            const yj = polygon[j].y;
            
            if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
                inside = !inside;
            }
        }
        
        return inside;
    }

    /**
     * Convert OSM way coordinates to local coordinate system
     */
    static convertWayToLocal(way, center) {
        return way.coordinates.map(coord => 
            this.latLonToLocal(coord.lat, coord.lon, center)
        );
    }

    /**
     * Generate a random color for a clan or territory
     */
    static generateColor(seed = '') {
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            hash = seed.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        const color = Math.abs(hash) % 16777215;
        return '#' + color.toString(16).padStart(6, '0');
    }

    /**
     * Validate bounding box coordinates
     */
    static isValidBoundingBox(bbox) {
        return bbox && 
               typeof bbox.north === 'number' && 
               typeof bbox.south === 'number' && 
               typeof bbox.east === 'number' && 
               typeof bbox.west === 'number' &&
               bbox.north > bbox.south &&
               bbox.east > bbox.west &&
               bbox.north <= 90 && bbox.south >= -90 &&
               bbox.east <= 180 && bbox.west >= -180;
    }

    /**
     * Format coordinate for display
     */
    static formatCoordinate(coord, precision = 4) {
        return Number(coord).toFixed(precision);
    }
}

module.exports = MapUtils;

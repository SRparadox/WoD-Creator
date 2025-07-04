/**
 * VTM Map Configuration
 * 
 * This file contains all the configuration for the Vampire: The Masquerade territory mapping tool.
 * It includes city definitions, clan information, territory types, and rendering settings.
 * 
 * @author VTM Map Project
 * @version 1.0.0
 */

module.exports = {
  /**
   * Supported cities with their geographic boundaries
   * Each city includes bounding box coordinates for OpenStreetMap data extraction
   */
  cities: {
    /**
     * Santa Cruz, California
     * A coastal city perfect for VTM campaigns with its mix of university, beach, and urban areas
     */
    'santa-cruz': {
      name: 'Santa Cruz, CA',
      // Bounding box coordinates (latitude/longitude)
      bbox: {
        south: 36.9400,  // Southern boundary
        west: -122.0700, // Western boundary
        north: 37.0100,  // Northern boundary
        east: -121.9800  // Eastern boundary
      },
      // Geographic center point for map projections
      center: {
        lat: 36.9741,
        lon: -122.0308
      },
      timezone: 'America/Los_Angeles'
    },
    
    /**
     * Los Angeles, California
     * The classic World of Darkness setting with extensive urban sprawl
     */
    'los-angeles': {
      name: 'Los Angeles, CA',
      bbox: {
        south: 34.0000,
        west: -118.5000,
        north: 34.1500,
        east: -118.2000
      },
      center: {
        lat: 34.0522,
        lon: -118.2437
      },
      timezone: 'America/Los_Angeles'
    }
  },

  /**
   * Vampire: The Masquerade specific configuration
   * Contains clan definitions, territory types, and game mechanics
   */
  vtm: {
    /**
     * The seven main Camarilla clans with their canonical information
     * Each clan includes name, color (for territory visualization), description, and disciplines
     */
    clans: {
      /**
       * Clan Ventrue - The Blue Bloods
       * Known for their aristocratic nature and political acumen
       */
      ventrue: {
        name: 'Ventrue',
        color: '#1a365d',  // Deep blue representing nobility
        description: 'The Clan of Kings',
        disciplines: ['Dominate', 'Fortitude', 'Presence'],
        // Typical territories: financial districts, government buildings, high-end establishments
        preferredTerritories: ['influence', 'elysium']
      },
      
      /**
       * Clan Toreador - The Degenerates
       * Artists and aesthetes obsessed with beauty and creativity
       */
      toreador: {
        name: 'Toreador',
        color: '#c53030',  // Deep red for passion and art
        description: 'The Clan of the Rose',
        disciplines: ['Auspex', 'Celerity', 'Presence'],
        preferredTerritories: ['feeding', 'elysium']
      },
      
      /**
       * Clan Brujah - The Rabble
       * Revolutionary idealists with a passion for change
       */
      brujah: {
        name: 'Brujah',
        color: '#d69e2e',  // Golden yellow for rebellion
        description: 'The Rabble',
        disciplines: ['Celerity', 'Potence', 'Presence'],
        preferredTerritories: ['contested', 'feeding']
      },
      
      /**
       * Clan Malkavian - The Lunatics
       * Cursed with madness but gifted with insight
       */
      malkavian: {
        name: 'Malkavian',
        color: '#553c9a',  // Purple for madness and mystery
        description: 'The Clan of the Moon',
        disciplines: ['Auspex', 'Dementation', 'Obfuscate'],
        preferredTerritories: ['feeding', 'haven']
      },
      
      /**
       * Clan Nosferatu - The Sewer Rats
       * Hideously deformed but master information brokers
       */
      nosferatu: {
        name: 'Nosferatu',
        color: '#2d3748',  // Dark gray for shadows and sewers
        description: 'The Sewer Rats',
        disciplines: ['Animalism', 'Obfuscate', 'Potence'],
        preferredTerritories: ['haven', 'influence']
      },
      
      /**
       * Clan Gangrel - The Outlanders
       * Feral vampires who embrace their beast nature
       */
      gangrel: {
        name: 'Gangrel',
        color: '#38a169',  // Forest green for nature and wilderness
        description: 'The Outlanders',
        disciplines: ['Animalism', 'Fortitude', 'Protean'],
        preferredTerritories: ['haven', 'feeding']
      },
      
      /**
       * Clan Tremere - The Warlocks
       * Blood sorcerers who traded their humanity for power
       */
      tremere: {
        name: 'Tremere',
        color: '#805ad5',  // Mystical purple for blood magic
        description: 'The Warlocks',
        disciplines: ['Auspex', 'Dominate', 'Thaumaturgy'],
        preferredTerritories: ['haven', 'influence']
      }
    },

    /**
     * Territory types that can be assigned to areas of the city
     * Each type serves different purposes in vampire society
     */
    territoryTypes: {
      /**
       * Feeding Grounds - Where vampires hunt for blood
       * Essential for survival, often contested between clans
       */
      feeding: {
        name: 'Feeding Grounds',
        description: 'Areas where vampires hunt for blood',
        examples: ['nightclubs', 'bars', 'hospitals', 'homeless shelters'],
        // OSM tags that might indicate good feeding grounds
        osmTags: ['amenity=bar', 'amenity=nightclub', 'amenity=hospital', 'amenity=pub']
      },
      
      /**
       * Havens - Safe houses and resting places
       * Where vampires sleep during the day and store their possessions
       */
      haven: {
        name: 'Haven',
        description: 'Safe houses and resting places',
        examples: ['mansions', 'apartments', 'warehouses', 'underground bunkers'],
        osmTags: ['building=residential', 'building=warehouse', 'building=industrial']
      },
      
      /**
       * Influence - Areas of mortal power and control
       * Where vampires manipulate human society
       */
      influence: {
        name: 'Influence',
        description: 'Areas of mortal influence and control',
        examples: ['city hall', 'police stations', 'banks', 'media outlets'],
        osmTags: ['amenity=townhall', 'amenity=police', 'amenity=bank', 'office=government']
      },
      
      /**
       * Elysium - Neutral meeting grounds
       * Sacred spaces where violence is forbidden
       */
      elysium: {
        name: 'Elysium',
        description: 'Neutral meeting grounds',
        examples: ['museums', 'theaters', 'libraries', 'parks'],
        osmTags: ['amenity=theatre', 'amenity=library', 'tourism=museum', 'leisure=park']
      },
      
      /**
       * Contested Territory - Areas under dispute
       * Valuable locations that multiple clans want to control
       */
      contested: {
        name: 'Contested Territory',
        description: 'Areas under dispute between clans',
        examples: ['border areas', 'valuable resources', 'strategic locations'],
        osmTags: [] // These are typically assigned manually based on game narrative
      }
    }
  },

  /**
   * 3D rendering and visualization settings
   * Controls how the map appears in the browser
   */
  rendering: {
    /**
     * Building height estimates in meters
     * Used when OSM data doesn't include explicit height information
     */
    buildingHeights: {
      default: 12,      // Default building height
      residential: 8,   // Houses and apartments
      commercial: 15,   // Shops and offices
      industrial: 10,   // Factories and warehouses
      hospital: 20,     // Medical facilities
      university: 18,   // Educational buildings
      government: 25,   // Important civic buildings
      religious: 15     // Churches and temples
    },
    
    /**
     * Color scheme for different map elements
     * Hex colors used in the 3D visualization
     */
    colors: {
      building: '#cccccc',  // Default building color (light gray)
      road: '#444444',      // Street color (dark gray)
      water: '#4299e1',     // Water bodies (blue)
      park: '#68d391',      // Parks and green spaces (green)
      neutral: '#e2e8f0'    // Neutral/unassigned areas (light gray)
    },
    
    /**
     * Camera and lighting settings
     */
    camera: {
      fov: 75,              // Field of view in degrees
      near: 1,              // Near clipping plane
      far: 3000,            // Far clipping plane
      initialPosition: {
        x: 0,
        y: 200,
        z: 300
      }
    },
    
    /**
     * Atmospheric settings for vampire theme
     */
    atmosphere: {
      fogColor: 0x0a0a0a,   // Dark fog color
      fogNear: 500,         // Fog start distance
      fogFar: 2000,         // Fog end distance
      ambientLight: 0x404040, // Ambient light color
      moonLight: 0x4060aa   // Directional light color (moonlight)
    }
  },

  /**
   * OpenStreetMap data extraction settings
   */
  osm: {
    /**
     * Overpass API configuration
     */
    overpass: {
      endpoint: 'https://overpass-api.de/api/interpreter',
      timeout: 60,  // Request timeout in seconds
      retryAttempts: 3,
      retryDelay: 5000  // Delay between retries in milliseconds
    },
    
    /**
     * Tags to extract from OSM data
     * These determine what features are included in the map
     */
    tagsToExtract: {
      buildings: ['building', 'building:levels', 'height', 'amenity'],
      roads: ['highway', 'name', 'surface'],
      amenities: ['amenity', 'name', 'opening_hours'],
      natural: ['natural', 'leisure', 'name'],
      waterways: ['waterway', 'name']
    }
  }
};

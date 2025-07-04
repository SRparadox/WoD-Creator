/**
 * VTM Map Project - Code Documentation
 * 
 * This file provides comprehensive documentation for the VTM Map project,
 * including architecture overview, code structure, and development guidelines.
 * 
 * @author VTM Map Project
 * @version 1.0.0
 * @updated 2025-07-04
 */

# VTM Map - Complete Code Documentation

## Project Overview

The VTM Map project is a comprehensive web application for creating interactive 3D maps of real-world cities where players can assign vampire clan territories for Vampire: The Masquerade campaigns. The system combines real OpenStreetMap data with Three.js 3D visualization and VTM-specific game mechanics.

## Architecture

### Core Components

1. **Data Extraction Layer** (`src/data-extraction/`)
   - Fetches real-world map data from OpenStreetMap
   - Processes and categorizes geographic features
   - Stores data in JSON format for visualization

2. **3D Visualization Layer** (`public/index.html`)
   - Three.js-based 3D rendering engine
   - Interactive camera controls and mouse interaction
   - Real-time territory assignment and visualization

3. **Web Server Layer** (`src/server.js`)
   - Express.js REST API server
   - Static file serving for the web interface
   - Configuration and data access endpoints

4. **Configuration System** (`config/`)
   - City definitions and bounding boxes
   - VTM clan and territory type definitions
   - Rendering and visualization settings

5. **Utility Functions** (`src/utils/`)
   - Geographic coordinate transformations
   - Map data processing helpers
   - Building type detection and height estimation

## File Structure and Responsibilities

```
VTM-Map/
├── src/
│   ├── data-extraction/
│   │   └── extract-osm-data.js     # OpenStreetMap data extraction
│   ├── utils/
│   │   └── map-utils.js            # Geographic utility functions
│   ├── index.js                    # Main CLI application
│   └── server.js                   # Web server and API
├── public/
│   └── index.html                  # 3D visualization interface
├── config/
│   ├── config.json                 # JSON configuration (runtime)
│   └── config.js                   # JavaScript configuration (documented)
├── data/                          # Generated OSM data files
├── package.json                   # Node.js dependencies
└── README.md                      # Project documentation
```

## Key Classes and Functions

### OSMDataExtractor Class

**Purpose**: Extract and process OpenStreetMap data for specified cities

**Key Methods**:
- `getSantaCruzBoundingBox()`: Returns geographic boundaries for Santa Cruz
- `generateOverpassQuery(bbox)`: Creates Overpass API query for comprehensive data
- `extractSantaCruzData()`: Main extraction method with error handling
- `processOSMData(osmData)`: Categorizes and processes raw OSM data

**Data Processing Flow**:
1. Define geographic bounding box
2. Generate Overpass QL query for buildings, roads, amenities
3. Send HTTP request to Overpass API
4. Process and categorize returned data
5. Save both raw and processed data to JSON files

### VTMMap Class (3D Visualization)

**Purpose**: Manage 3D scene, user interactions, and territory assignments

**Key Methods**:
- `init()`: Initialize Three.js scene, camera, renderer, and lighting
- `createSampleCity()`: Generate sample 3D city with buildings and roads
- `onMouseClick(event)`: Handle mouse clicks for territory assignment
- `assignTerritoryToBuilding(building, clan)`: Assign clan to building
- `animate()`: Main rendering loop

**Interaction System**:
- Left click: Assign selected clan to building
- Right click: Remove clan assignment
- Mouse drag: Pan camera around scene
- Mouse wheel: Zoom in/out

### MapUtils Class

**Purpose**: Provide utility functions for geographic calculations

**Key Methods**:
- `latLonToLocal(lat, lon, center)`: Convert GPS coordinates to local 3D space
- `calculateDistance(lat1, lon1, lat2, lon2)`: Haversine distance calculation
- `getBuildingType(tags)`: Determine building type from OSM tags
- `estimateBuildingHeight(tags, config)`: Estimate 3D building height

### VTMWebServer Class

**Purpose**: Serve web interface and provide REST API

**API Endpoints**:
- `GET /api/city/:cityName`: Get processed map data for a city
- `GET /api/cities`: List all available cities
- `GET /api/vtm-config`: Get VTM clan and territory configuration
- `GET /api/health`: Health check endpoint

## Configuration System

### City Configuration
Each city includes:
- Geographic bounding box (south, west, north, east)
- Center point for coordinate projection
- Timezone information
- Name and display information

### VTM Configuration
- **Clans**: Name, color, description, disciplines, preferred territories
- **Territory Types**: Feeding grounds, havens, influence areas, elysium, contested
- **Rendering Settings**: Building heights, colors, camera settings

## Data Flow

1. **Data Extraction**:
   - User runs `npm run extract-data`
   - OSMDataExtractor queries Overpass API
   - Raw OSM data is processed and categorized
   - Results saved to `data/` directory

2. **3D Visualization**:
   - User opens web interface
   - VTMMap initializes Three.js scene
   - Sample city is generated (will be replaced with real data)
   - User interacts with buildings to assign territories

3. **Territory Assignment**:
   - User selects vampire clan
   - Clicks on buildings to assign territories
   - Building colors change to reflect clan ownership
   - Territory data stored in browser memory

## Development Guidelines

### Code Style
- Use JSDoc comments for all functions and classes
- Include parameter and return type documentation
- Explain complex algorithms and business logic
- Use meaningful variable and function names

### Error Handling
- Wrap API calls in try-catch blocks
- Provide meaningful error messages to users
- Log errors for debugging purposes
- Gracefully handle network failures and timeouts

### Performance Considerations
- Limit OSM data extraction to reasonable geographic areas
- Use efficient 3D rendering techniques
- Implement level-of-detail for large datasets
- Cache processed data when possible

### Testing Approach
- Test geographic coordinate calculations
- Verify OSM data processing accuracy
- Test 3D rendering performance
- Validate API endpoint responses

## Future Enhancements

### Planned Features
1. **Real OSM Data Integration**: Replace sample city with actual building data
2. **Multi-City Support**: Add Los Angeles, San Francisco, Chicago, etc.
3. **Territory Persistence**: Save clan assignments to database
4. **Advanced Visualization**: Height-based rendering, texture mapping
5. **Campaign Management**: Support for multiple game sessions
6. **Mobile Support**: Responsive design for tablets and phones

### Technical Improvements
1. **Map Projections**: Use proper cartographic projections for accuracy
2. **Database Integration**: MongoDB or PostgreSQL for data persistence
3. **Real-time Updates**: WebSocket support for multiplayer sessions
4. **Performance Optimization**: WebGL optimization, LOD systems
5. **Security**: User authentication, data validation

## Troubleshooting

### Common Issues
1. **OSM Data Download Fails**: Check internet connection, try smaller bounding box
2. **3D Rendering Issues**: Ensure WebGL is supported in browser
3. **Server Won't Start**: Check if port 3000 is available
4. **Building Heights Wrong**: Verify OSM tags and height estimation logic

### Debug Information
- Enable browser developer tools for JavaScript errors
- Check network tab for API request failures
- Use console.log for debugging 3D scene issues
- Verify JSON configuration file syntax

This documentation provides a comprehensive overview of the VTM Map project architecture and implementation details. All code files include detailed comments explaining their purpose and functionality.

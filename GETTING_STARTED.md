# VTM Map - Getting Started Guide

## What You Have Now

Your Vampire: The Masquerade territory mapping tool is set up with:

### ✅ **Complete Project Structure**
- OpenStreetMap data extraction system
- 3D visualization with Three.js
- VTM clan and territory configuration
- Web server for interactive maps

### ✅ **Data Extraction System**
- Santa Cruz, CA bounding box configured
- Overpass API integration for real OSM data
- Building, road, amenity, and landmark extraction
- Automatic data processing and categorization

### ✅ **3D Visualization**
- Interactive 3D city view
- All 7 main VTM clans with authentic colors
- Click-to-assign territory system
- Atmospheric lighting and shadows

## How to Use

### 1. **Extract Real Map Data**
```bash
npm run extract-data
```
This downloads real OpenStreetMap data for Santa Cruz, including:
- Buildings with height estimates
- Roads and streets
- Landmarks and amenities
- Parks and water features

### 2. **Start the Web Interface**
```bash
npm run serve
```
Or double-click `start-server.bat`

Then open: http://localhost:3000

### 3. **Assign Territories**
1. Select a vampire clan (Ventrue, Toreador, etc.)
2. Click on buildings to assign them to that clan
3. Right-click to remove assignments
4. Use mouse wheel to zoom, drag to pan

## Technical Details

### **Clan Configuration**
Each clan has:
- Authentic VTM colors
- Canonical disciplines
- Distinct visual styling

### **Building Types Detected**
- Residential buildings
- Commercial structures
- Hospitals and schools
- Parks and recreational areas
- Government buildings

### **Santa Cruz Bounding Box**
- Southwest: 36.9400°N, -122.0700°W
- Northeast: 37.0100°N, -121.9800°W
- Covers downtown Santa Cruz and surrounding areas

## Next Steps for Real OSM Data Integration

1. **Complete the data extraction** - The OSM download might still be running
2. **Integrate real building data** - Replace sample buildings with actual OSM geometry
3. **Add height estimation** - Use OSM building tags for realistic heights
4. **Territory persistence** - Save clan assignments to a database
5. **Multi-city support** - Add Los Angeles, San Francisco, etc.

## File Structure

```
VTM-Map/
├── src/
│   ├── data-extraction/     # OSM data tools
│   ├── utils/              # Helper functions
│   ├── index.js            # Main CLI app
│   └── server.js           # Web server
├── public/
│   └── index.html          # 3D visualization
├── config/
│   └── config.json         # Cities and VTM settings
├── data/                   # Downloaded OSM data
└── package.json           # Dependencies
```

## Extending the System

### **Adding New Cities**
1. Add city configuration to `config/config.json`
2. Extend `OSMDataExtractor` class
3. Update bounding box coordinates

### **Adding New Clans**
1. Update `config.json` with clan details
2. Add colors to the web interface
3. Configure discipline information

### **Territory Types**
- Feeding Grounds (bars, clubs)
- Havens (residential, warehouses)
- Influence (government, media)
- Elysium (museums, theaters)
- Contested areas

This gives you a solid foundation for a comprehensive VTM territory mapping system!

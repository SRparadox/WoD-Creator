# VTM-Map: Vampire the Masquerade Territory Mapping Tool

A 2D city visualization tool that uses real-world OpenStreetMap data to create interactive cities where players can assign and visualize vampire faction territories and influence.

## Features (Planned)
- Extract real-world city data from OpenStreetMap
- Generate 2D city models with buildings, roads, and landmarks
- Interactive faction territory assignment
- Visual representation of vampire sect influence and power
- Support for custom scenarios and campaigns

## Getting Started

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Installation
1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd VTM-Map
   ```

2. Install required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the application:
   ```bash
   streamlit run app.py
   ```

4. Open your web browser and navigate to `http://localhost:8501`

### Quick Test
To test basic functionality without installing all dependencies:
```bash
python test_basic.py
```

## Project Structure
```
VTM-Map/
├── app.py              # Main Streamlit application
├── city_manager.py     # City data loading and map generation
├── vtm_factions.py     # Vampire faction definitions and logic
├── test_basic.py       # Basic functionality test
├── requirements.txt    # Python dependencies
└── README.md          # This file
```

## Supported Cities
- Santa Cruz, CA (initial implementation)
- More cities coming soon...

## VTM Integration
This tool is designed to support:
- Vampire Factions (Anarch, Camarilla, Hecata, Sabbat, Independent)
- Domain boundaries
- Influence mapping
- Resource control visualization
- Chronicle management

## Key Features

### City Manager
- **Real-world Data**: Extracts building, road, and POI data from OpenStreetMap
- **Interactive Mapping**: Uses Folium for interactive 2D city visualization
- **Point of Interest Highlighting**: Automatically identifies and highlights:
  - Banks (important for Camarilla influence)
  - Hospitals (crucial for Hecata operations)
  - Government buildings (seats of power)
  - Universities (academic influence)
  - Transport hubs (control points)
  - Entertainment venues (feeding grounds)

### VTM Faction System
- **Five Major Factions**: Anarch, Camarilla, Hecata, Sabbat, Independent
- **Territory Types**: Haven, Feeding Ground, Elysium, Rack, Domain, Contested
- **Influence Mapping**: Match faction characteristics to appropriate city locations
- **Color Coding**: Visual representation of faction control

### Interactive Features
- Click-to-assign territory control
- Faction-specific location recommendations
- Territory conflict detection
- City statistics and analytics

## Usage

1. **Load City Data**: Select a city and load its OpenStreetMap data
2. **Explore the Map**: Use the interactive controls to show/hide different map layers
3. **Assign Territories**: Click on locations to assign them to vampire factions
4. **Manage Influence**: Track faction control and identify conflicts

## Dependencies
- `streamlit`: Web application framework
- `folium`: Interactive mapping library
- `osmnx`: OpenStreetMap data extraction
- `geopandas`: Geospatial data processing
- `pandas`: Data manipulation
- `overpy`: Overpass API interface

## Contributing
This is a development project for creating Vampire the Masquerade territory management tools. Feel free to contribute improvements or additional features.

## License
This project is for educational and gaming purposes.

## Roadmap
- [ ] Complete Santa Cruz implementation
- [ ] Add more cities
- [ ] Implement territory conflict resolution
- [ ] Add save/load functionality for campaigns
- [ ] Create faction-specific game mechanics
- [ ] Add random event generation
- [ ] Implement influence spread mechanics

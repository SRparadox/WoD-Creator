# VTM-Map: Vampire the Masquerade Territory Mapping Tool

A 3D city visualization tool that uses real-world OpenStreetMap data to create interactive cities where players can assign and visualize vampire faction territories and influence.

## Features (Planned)
- Extract real-world city data from OpenStreetMap
- Generate 3D city models with buildings, roads, and landmarks
- Interactive faction territory assignment
- Visual representation of vampire clan influence and power
- Support for custom scenarios and campaigns

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Data Extraction
To extract OpenStreetMap data for a city:
```bash
npm run extract-data
```

### Development
```bash
npm run dev
```

## Project Structure
```
src/
├── data-extraction/     # OSM data extraction tools
├── 3d-engine/          # Three.js 3D rendering
├── faction-system/     # VTM faction and territory logic
├── ui/                 # User interface components
└── utils/              # Utility functions
```

## Supported Cities
- Santa Cruz, CA (initial implementation)
- More cities coming soon...

## VTM Integration
This tool is designed to support:
- Clan territories (Ventrue, Toreador, Brujah, etc.)
- Domain boundaries
- Influence mapping
- Resource control visualization
- Chronicle management

## License
MIT

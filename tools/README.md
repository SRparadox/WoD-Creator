# Tools Directory

This directory will contain standalone web applications and interactive tools:

## Planned Tools

### Vampire: The Masquerade
- **Character Creator**: Full character generation with clan selection, disciplines, and backgrounds
- **Territory Manager**: Interactive city mapping and domain management
- **Coterie Tracker**: Group management for players and Storytellers
- **Blood Hunt Tracker**: Track boons, prestation, and political relationships

### Werewolf: The Apocalypse
- **Garou Generator**: Tribe-based character creation with gifts and rites
- **Sept Manager**: Manage sept politics and caern maintenance
- **Umbra Navigator**: Track spirit world journeys and encounters
- **Pack Dynamics**: Monitor pack totem and relationships

### Mage: The Ascension
- **Awakened Creator**: Tradition-based character builder with paradigms
- **Chantry Manager**: Library management and cabal organization
- **Paradox Tracker**: Monitor reality backlash and magical effects
- **Paradigm Guide**: Reference tool for magical practices

### Cross-Game Tools
- **Chronicle Manager**: Campaign tracking across all game lines
- **NPC Database**: Shared character database for Storytellers
- **City Builder**: Create custom locations for chronicles
- **Random Generators**: Names, events, and plot hooks

## Technical Structure

Each tool will be a standalone web application that can be:
- Launched from the main hub
- Used independently
- Integrated with the download resources
- Shared between campaigns

```
tools/
├── vampire/
│   ├── character-creator/
│   ├── territory-manager/
│   └── coterie-tracker/
├── werewolf/
│   ├── garou-generator/
│   ├── sept-manager/
│   └── umbra-navigator/
├── mage/
│   ├── awakened-creator/
│   ├── chantry-manager/
│   └── paradigm-guide/
└── shared/
    ├── chronicle-manager/
    ├── npc-database/
    └── generators/
```

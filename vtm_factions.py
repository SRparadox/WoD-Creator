class VTMFactions:
    """Vampire the Masquerade faction definitions and utilities"""
    
    def __init__(self):
        self.factions = {
            "Anarch": {
                "color": "#8B0000",  # Dark red
                "description": "Rebels against the Camarilla's rigid hierarchy",
                "domains": ["Industrial areas", "Underground venues", "Abandoned buildings"],
                "influence": ["Street gangs", "Punk venues", "Alternative culture"]
            },
            "Camarilla": {
                "color": "#000080",  # Navy blue
                "description": "The established vampire government of most cities",
                "domains": ["Downtown", "Financial district", "Upscale neighborhoods"],
                "influence": ["Banks", "Government", "High society", "Universities"]
            },
            "Hecata": {
                "color": "#800080",  # Purple
                "description": "Death-obsessed necromantic clan",
                "domains": ["Cemeteries", "Funeral homes", "Morgues"],
                "influence": ["Medical facilities", "Death industry", "Occult shops"]
            },
            "Sabbat": {
                "color": "#FF0000",  # Bright red
                "description": "Fanatical enemies of the Antediluvians",
                "domains": ["Warehouses", "Abandoned areas", "Criminal territories"],
                "influence": ["Criminal organizations", "Extremist groups", "War zones"]
            },
            "Independent": {
                "color": "#808080",  # Gray
                "description": "Unaligned vampires and neutral territories",
                "domains": ["Mixed areas", "Transit zones", "Neutral ground"],
                "influence": ["Small businesses", "Community centers", "Transport hubs"]
            }
        }
        
        self.territory_types = {
            "Haven": "Secure vampire residence",
            "Feeding Ground": "Area for hunting mortals",
            "Elysium": "Neutral meeting ground",
            "Rack": "Regular feeding location",
            "Domain": "Claimed territory with exclusive rights",
            "Contested": "Disputed territory between factions"
        }
    
    def get_faction_color(self, faction_name):
        """Get the color associated with a faction"""
        return self.factions.get(faction_name, {}).get("color", "#000000")
    
    def get_faction_info(self, faction_name):
        """Get complete information about a faction"""
        return self.factions.get(faction_name, {})
    
    def get_suitable_locations(self, faction_name, poi_category):
        """Determine if a POI category is suitable for a faction's influence"""
        faction_info = self.factions.get(faction_name, {})
        influences = faction_info.get("influence", [])
        
        # Mapping POI categories to faction suitability
        category_mapping = {
            "banks": ["Camarilla"],
            "hospitals": ["Hecata", "Camarilla"],
            "government": ["Camarilla"],
            "universities": ["Camarilla"],
            "transport": ["Independent", "Anarch"],
            "entertainment": ["Anarch", "Independent"],
            "shopping": ["Independent", "Camarilla"]
        }
        
        return faction_name in category_mapping.get(poi_category, [])
    
    def assign_territory(self, location_data, faction_name, territory_type="Domain"):
        """Assign a territory to a faction"""
        return {
            "location": location_data,
            "faction": faction_name,
            "territory_type": territory_type,
            "color": self.get_faction_color(faction_name),
            "assigned_date": None  # Could add timestamp
        }
    
    def get_territory_conflicts(self, territories):
        """Identify potential conflicts between territorial assignments"""
        conflicts = []
        
        for i, territory1 in enumerate(territories):
            for j, territory2 in enumerate(territories[i+1:], i+1):
                # Check if territories overlap (simplified distance check)
                if self._territories_overlap(territory1, territory2):
                    if territory1["faction"] != territory2["faction"]:
                        conflicts.append({
                            "territory1": territory1,
                            "territory2": territory2,
                            "conflict_type": "Faction Dispute"
                        })
        
        return conflicts
    
    def _territories_overlap(self, territory1, territory2):
        """Simple overlap detection (could be enhanced with proper geometry)"""
        # Placeholder - would need actual coordinate comparison
        return False

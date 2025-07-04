import osmnx as ox
import geopandas as gpd
import pandas as pd
import folium
from folium import plugins
import overpy
import requests

class CityManager:
    def __init__(self, city_name="Santa Cruz, CA"):
        self.city_name = city_name
        self.city_graph = None
        self.buildings = None
        self.pois = None
        self.boundaries = None
        self.center_coords = None
        
        # Configure OSMnx
        ox.config(use_cache=True, log_console=True)
    
    def load_city_data(self):
        """Load comprehensive city data from OpenStreetMap"""
        try:
            # Get city boundaries and center point
            print(f"Loading data for {self.city_name}...")
            
            # Get the city's administrative boundary
            self.boundaries = ox.geocode_to_gdf(self.city_name)
            self.center_coords = [
                self.boundaries.geometry.centroid.y.iloc[0],
                self.boundaries.geometry.centroid.x.iloc[0]
            ]
            
            # Get street network
            print("Loading street network...")
            self.city_graph = ox.graph_from_place(self.city_name, network_type='all')
            
            # Get buildings
            print("Loading buildings...")
            self.buildings = ox.geometries_from_place(
                self.city_name, 
                tags={'building': True}
            )
            
            # Get points of interest
            print("Loading points of interest...")
            self.pois = self._load_points_of_interest()
            
            print("City data loaded successfully!")
            return True
            
        except Exception as e:
            print(f"Error loading city data: {str(e)}")
            raise e
    
    def _load_points_of_interest(self):
        """Load various points of interest"""
        poi_tags = {
            'banks': {'amenity': 'bank'},
            'hospitals': {'amenity': ['hospital', 'clinic']},
            'government': {'amenity': ['townhall', 'courthouse', 'police', 'fire_station']},
            'universities': {'amenity': ['university', 'college', 'school']},
            'transport': {'amenity': ['bus_station'], 'railway': ['station']},
            'entertainment': {'amenity': ['theatre', 'cinema', 'nightclub', 'bar']},
            'shopping': {'shop': True, 'amenity': 'marketplace'}
        }
        
        all_pois = {}
        
        for category, tags in poi_tags.items():
            try:
                pois = ox.geometries_from_place(self.city_name, tags=tags)
                if not pois.empty:
                    pois['category'] = category
                    all_pois[category] = pois
            except Exception as e:
                print(f"Could not load {category}: {str(e)}")
                all_pois[category] = gpd.GeoDataFrame()
        
        return all_pois
    
    def create_interactive_map(self, show_buildings=True, show_roads=True, 
                             show_pois=True, poi_filters=None):
        """Create an interactive Folium map"""
        if not self.center_coords:
            raise ValueError("City data not loaded. Call load_city_data() first.")
        
        # Create base map
        m = folium.Map(
            location=self.center_coords,
            zoom_start=13,
            tiles='OpenStreetMap'
        )
        
        # Add different tile layers
        folium.TileLayer('Stamen Terrain').add_to(m)
        folium.TileLayer('CartoDB dark_matter').add_to(m)
        
        # Add city boundary
        if self.boundaries is not None:
            folium.GeoJson(
                self.boundaries,
                style_function=lambda x: {
                    'fillColor': 'red',
                    'color': 'darkred',
                    'weight': 3,
                    'fillOpacity': 0.1
                },
                popup=f"{self.city_name} Boundary"
            ).add_to(m)
        
        # Add roads
        if show_roads and self.city_graph:
            road_group = folium.FeatureGroup(name="Roads")
            
            # Convert graph to GeoDataFrame
            edges = ox.graph_to_gdfs(self.city_graph, nodes=False, edges=True)
            
            for idx, row in edges.iterrows():
                folium.GeoJson(
                    row['geometry'],
                    style_function=lambda x: {
                        'color': 'blue',
                        'weight': 2,
                        'opacity': 0.6
                    }
                ).add_to(road_group)
            
            road_group.add_to(m)
        
        # Add buildings
        if show_buildings and self.buildings is not None:
            building_group = folium.FeatureGroup(name="Buildings")
            
            for idx, building in self.buildings.iterrows():
                if building.geometry.geom_type == 'Polygon':
                    folium.GeoJson(
                        building.geometry,
                        style_function=lambda x: {
                            'fillColor': 'gray',
                            'color': 'black',
                            'weight': 1,
                            'fillOpacity': 0.6
                        },
                        popup=f"Building: {building.get('name', 'Unknown')}"
                    ).add_to(building_group)
            
            building_group.add_to(m)
        
        # Add points of interest
        if show_pois and self.pois:
            self._add_pois_to_map(m, poi_filters or {})
        
        # Add layer control
        folium.LayerControl().add_to(m)
        
        # Add minimap
        minimap = plugins.MiniMap()
        m.add_child(minimap)
        
        return m
    
    def _add_pois_to_map(self, m, poi_filters):
        """Add points of interest to the map"""
        poi_colors = {
            'banks': 'green',
            'hospitals': 'red',
            'government': 'blue',
            'universities': 'purple',
            'transport': 'orange',
            'entertainment': 'pink',
            'shopping': 'yellow'
        }
        
        poi_icons = {
            'banks': 'dollar-sign',
            'hospitals': 'hospital',
            'government': 'landmark',
            'universities': 'graduation-cap',
            'transport': 'train',
            'entertainment': 'music',
            'shopping': 'shopping-cart'
        }
        
        for category, pois in self.pois.items():
            if poi_filters.get(category, True) and not pois.empty:
                group = folium.FeatureGroup(name=category.title())
                
                for idx, poi in pois.iterrows():
                    if poi.geometry.geom_type == 'Point':
                        lat, lon = poi.geometry.y, poi.geometry.x
                        
                        popup_text = f"""
                        <b>{poi.get('name', 'Unknown')}</b><br>
                        Category: {category}<br>
                        Type: {poi.get('amenity', poi.get('shop', 'N/A'))}<br>
                        Address: {poi.get('addr:street', 'N/A')}
                        """
                        
                        folium.Marker(
                            location=[lat, lon],
                            popup=folium.Popup(popup_text, max_width=300),
                            icon=folium.Icon(
                                color=poi_colors.get(category, 'gray'),
                                icon=poi_icons.get(category, 'info-sign'),
                                prefix='fa'
                            )
                        ).add_to(group)
                
                group.add_to(m)
    
    def get_city_stats(self):
        """Get statistics about the city"""
        stats = {}
        
        if self.buildings is not None:
            stats['buildings'] = len(self.buildings)
        
        if self.city_graph:
            stats['roads'] = len(self.city_graph.edges())
        
        if self.pois:
            for category, pois in self.pois.items():
                stats[category] = len(pois) if not pois.empty else 0
        
        return stats
    
    def get_locations_in_radius(self, center_lat, center_lon, radius_km=1.0):
        """Get all locations within a radius of a point"""
        if not self.pois:
            return {}
        
        from shapely.geometry import Point
        import math
        
        center_point = Point(center_lon, center_lat)
        
        # Convert km to degrees (rough approximation)
        radius_deg = radius_km / 111.0  # 1 degree ≈ 111 km
        
        nearby_locations = {}
        
        for category, pois in self.pois.items():
            if not pois.empty:
                nearby = []
                for idx, poi in pois.iterrows():
                    if poi.geometry.geom_type == 'Point':
                        distance = center_point.distance(poi.geometry)
                        if distance <= radius_deg:
                            nearby.append({
                                'name': poi.get('name', 'Unknown'),
                                'distance_km': distance * 111.0,
                                'lat': poi.geometry.y,
                                'lon': poi.geometry.x
                            })
                
                if nearby:
                    nearby_locations[category] = nearby
        
        return nearby_locations

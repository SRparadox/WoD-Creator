import streamlit as st
import folium
from streamlit_folium import st_folium
import osmnx as ox
import geopandas as gpd
import pandas as pd
from city_manager import CityManager
from vtm_factions import VTMFactions

# Configure page
st.set_page_config(
    page_title="VTM Territory Mapping Tool",
    page_icon="🧛",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for VTM theme
st.markdown("""
<style>
    .main-header {
        color: #8B0000;
        text-align: center;
        font-family: 'Georgia', serif;
        border-bottom: 2px solid #8B0000;
        padding-bottom: 10px;
    }
    .faction-info {
        background-color: #1a1a1a;
        color: #ffffff;
        padding: 10px;
        border-radius: 5px;
        margin: 5px 0;
    }
</style>
""", unsafe_allow_html=True)

def main():
    st.markdown('<h1 class="main-header">🧛 VTM Territory Mapping Tool</h1>', unsafe_allow_html=True)
    
    # Initialize session state
    if 'city_manager' not in st.session_state:
        st.session_state.city_manager = None
    if 'map_data' not in st.session_state:
        st.session_state.map_data = None
    
    # Sidebar for controls
    with st.sidebar:
        st.header("🏙️ City Controls")
        
        # City selection
        city = st.selectbox(
            "Select City",
            ["Santa Cruz, CA", "San Francisco, CA", "Los Angeles, CA"],
            index=0
        )
        
        # Load city button
        if st.button("Load City Data", type="primary"):
            with st.spinner("Loading city data from OpenStreetMap..."):
                try:
                    st.session_state.city_manager = CityManager(city)
                    st.session_state.map_data = st.session_state.city_manager.load_city_data()
                    st.success("City data loaded successfully!")
                except Exception as e:
                    st.error(f"Error loading city data: {str(e)}")
        
        st.divider()
        
        # Map controls
        st.header("🗺️ Map Options")
        show_buildings = st.checkbox("Show Buildings", value=True)
        show_roads = st.checkbox("Show Roads", value=True)
        show_pois = st.checkbox("Show Points of Interest", value=True)
        
        # POI filters
        st.subheader("Key Locations")
        show_banks = st.checkbox("Banks", value=True)
        show_hospitals = st.checkbox("Hospitals", value=True)
        show_government = st.checkbox("Government Buildings", value=True)
        show_universities = st.checkbox("Universities", value=True)
        show_transport = st.checkbox("Transport Hubs", value=True)
        
        st.divider()
        
        # VTM Faction controls
        st.header("🩸 VTM Factions")
        vtm_factions = VTMFactions()
        
        selected_faction = st.selectbox(
            "Select Faction",
            list(vtm_factions.factions.keys())
        )
        
        faction_info = vtm_factions.factions[selected_faction]
        st.markdown(f"""
        <div class="faction-info">
            <strong>{selected_faction}</strong><br>
            Color: <span style="color: {faction_info['color']}">{faction_info['color']}</span><br>
            Description: {faction_info['description']}
        </div>
        """, unsafe_allow_html=True)
    
    # Main content area
    if st.session_state.city_manager is None:
        st.info("👆 Please select a city and click 'Load City Data' to begin")
        
        # Show project information
        col1, col2 = st.columns(2)
        
        with col1:
            st.subheader("🎯 Project Features")
            st.write("""
            - **Real-world Data**: Extract city data from OpenStreetMap
            - **Interactive Mapping**: 2D city visualization with buildings and roads
            - **VTM Integration**: Support for vampire factions and territories
            - **Key Locations**: Highlight banks, hospitals, and important venues
            - **Territory Management**: Assign and visualize faction influence
            """)
        
        with col2:
            st.subheader("🧛 Supported Factions")
            for faction, info in vtm_factions.factions.items():
                st.write(f"**{faction}**: {info['description']}")
    
    else:
        # Display the map
        col1, col2 = st.columns([3, 1])
        
        with col1:
            st.subheader(f"🗺️ {city} - Interactive Map")
            
            # Create map with city manager
            city_map = st.session_state.city_manager.create_interactive_map(
                show_buildings=show_buildings,
                show_roads=show_roads,
                show_pois=show_pois,
                poi_filters={
                    'banks': show_banks,
                    'hospitals': show_hospitals,
                    'government': show_government,
                    'universities': show_universities,
                    'transport': show_transport
                }
            )
            
            # Display map
            map_data = st_folium(city_map, width=700, height=600)
        
        with col2:
            st.subheader("📊 City Statistics")
            stats = st.session_state.city_manager.get_city_stats()
            
            st.metric("Buildings", stats.get('buildings', 0))
            st.metric("Roads", stats.get('roads', 0))
            st.metric("Banks", stats.get('banks', 0))
            st.metric("Hospitals", stats.get('hospitals', 0))
            st.metric("Government", stats.get('government', 0))
            
            # Territory assignment
            st.subheader("🏴 Territory Assignment")
            if map_data['last_object_clicked_popup']:
                st.write("Click on map features to assign territories")
                st.write(f"Last clicked: {map_data['last_object_clicked_popup']}")

if __name__ == "__main__":
    main()

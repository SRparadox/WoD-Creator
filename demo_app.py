import streamlit as st
import pandas as pd
from vtm_factions import VTMFactions

# Configure page
st.set_page_config(
    page_title="VTM Territory Mapping Tool - Demo",
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
    .location-card {
        background-color: #f0f0f0;
        padding: 10px;
        border-radius: 5px;
        margin: 5px 0;
        border-left: 4px solid #8B0000;
    }
</style>
""", unsafe_allow_html=True)

def main():
    st.markdown('<h1 class="main-header">🧛 VTM Territory Mapping Tool - Demo</h1>', unsafe_allow_html=True)
    
    # Initialize VTM factions
    vtm_factions = VTMFactions()
    
    # Sidebar for controls
    with st.sidebar:
        st.header("🏙️ Demo Controls")
        
        st.info("This is a demo version. Install all dependencies and use app.py for full functionality.")
        
        # City selection
        city = st.selectbox(
            "Select City",
            ["Santa Cruz, CA", "San Francisco, CA", "Los Angeles, CA"],
            index=0
        )
        
        st.divider()
        
        # VTM Faction controls
        st.header("🩸 VTM Factions")
        
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
        
        # Territory type selection
        territory_type = st.selectbox(
            "Territory Type",
            list(vtm_factions.territory_types.keys())
        )
        
        st.write(f"**{territory_type}**: {vtm_factions.territory_types[territory_type]}")
    
    # Main content area
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.subheader(f"🗺️ {city} - Demo Map")
        
        # Create sample locations for Santa Cruz
        sample_locations = [
            {"name": "Santa Cruz Bank", "type": "Bank", "lat": 36.9741, "lon": -122.0308, "suitable_factions": ["Camarilla"]},
            {"name": "Dominican Hospital", "type": "Hospital", "lat": 36.9705, "lon": -122.0138, "suitable_factions": ["Hecata", "Camarilla"]},
            {"name": "Santa Cruz City Hall", "type": "Government", "lat": 36.9746, "lon": -122.0296, "suitable_factions": ["Camarilla"]},
            {"name": "UC Santa Cruz", "type": "University", "lat": 36.9914, "lon": -122.0627, "suitable_factions": ["Camarilla"]},
            {"name": "Santa Cruz Beach Boardwalk", "type": "Entertainment", "lat": 36.9641, "lon": -122.0186, "suitable_factions": ["Anarch", "Independent"]},
            {"name": "Greyhound Station", "type": "Transport", "lat": 36.9758, "lon": -122.0302, "suitable_factions": ["Independent", "Anarch"]},
        ]
        
        # Display sample locations
        st.info("🗺️ In the full version, this would show an interactive map with real OpenStreetMap data")
        
        for location in sample_locations:
            suitable = selected_faction in location["suitable_factions"]
            suitability_color = "green" if suitable else "gray"
            
            st.markdown(f"""
            <div class="location-card">
                <strong>{location['name']}</strong> ({location['type']})<br>
                <small>Coordinates: {location['lat']}, {location['lon']}</small><br>
                <span style="color: {suitability_color}">
                    {'✅ Suitable' if suitable else '❌ Not ideal'} for {selected_faction}
                </span>
            </div>
            """, unsafe_allow_html=True)
            
            if st.button(f"Assign to {selected_faction}", key=location['name']):
                territory = vtm_factions.assign_territory(location, selected_faction, territory_type)
                st.success(f"Assigned {location['name']} to {selected_faction} as {territory_type}")
    
    with col2:
        st.subheader("📊 Demo Statistics")
        
        # Sample statistics
        stats = {
            "Buildings": 1247,
            "Roads": 523,
            "Banks": 8,
            "Hospitals": 3,
            "Government": 12,
            "Universities": 2,
            "Entertainment": 45
        }
        
        for stat, value in stats.items():
            st.metric(stat, value)
        
        st.divider()
        
        st.subheader("🎯 Faction Details")
        
        # Show all factions
        for faction_name, info in vtm_factions.factions.items():
            with st.expander(f"{faction_name}"):
                st.write(f"**Description**: {info['description']}")
                st.write(f"**Color**: {info['color']}")
                st.write("**Typical Domains**:")
                for domain in info['domains']:
                    st.write(f"  • {domain}")
                st.write("**Areas of Influence**:")
                for influence in info['influence']:
                    st.write(f"  • {influence}")
        
        st.divider()
        
        st.subheader("🚀 Full Version Features")
        st.write("""
        - Real OpenStreetMap integration
        - Interactive map with Folium
        - Click-to-assign territories
        - Territory conflict detection
        - Save/load functionality
        - Multiple city support
        """)

if __name__ == "__main__":
    main()

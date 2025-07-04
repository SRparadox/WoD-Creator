#!/usr/bin/env python3
"""
VTM Map - Vampire the Masquerade Territory Mapping Tool
A simple test script to verify the core functionality
"""

import sys
import os

# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def test_basic_functionality():
    """Test basic functionality without external dependencies"""
    
    print("🧛 VTM Territory Mapping Tool - Basic Test")
    print("=" * 50)
    
    # Test VTM Factions
    try:
        from vtm_factions import VTMFactions
        
        factions = VTMFactions()
        print("✅ VTM Factions module loaded successfully")
        
        # Test faction data
        print("\n📋 Available Factions:")
        for faction_name, info in factions.factions.items():
            print(f"  - {faction_name}: {info['description']}")
        
        # Test faction methods
        camarilla_color = factions.get_faction_color("Camarilla")
        print(f"\n🎨 Camarilla faction color: {camarilla_color}")
        
        # Test territory assignment
        sample_location = {"name": "Sample Bank", "lat": 36.9741, "lon": -122.0308}
        territory = factions.assign_territory(sample_location, "Camarilla", "Domain")
        print(f"\n🏴 Sample territory assignment: {territory}")
        
    except ImportError as e:
        print(f"❌ Error importing VTM Factions: {e}")
    except Exception as e:
        print(f"❌ Error testing VTM Factions: {e}")
    
    print("\n" + "=" * 50)
    print("🧛 Basic test completed!")
    print("\nTo run the full application:")
    print("1. Install dependencies: pip install -r requirements.txt")
    print("2. Run the app: streamlit run app.py")

if __name__ == "__main__":
    test_basic_functionality()

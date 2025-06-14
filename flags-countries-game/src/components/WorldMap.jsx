import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './WorldMap.css';

const MAP_STYLE = 'https://api.maptiler.com/maps/bright/style.json?key=GetYourOwnKey'; // Placeholder, replace with a free style or custom style

function WorldMap() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;
    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: [0, 20], // Center on the world
      zoom: 1.2,
      attributionControl: false,
    });
    // TODO: Add overlays for countries/continents
    return () => mapRef.current && mapRef.current.remove();
  }, []);

  return (
    <div className="world-map-container">
      <div ref={mapContainer} className="maplibre-map" />
    </div>
  );
}

export default WorldMap; 
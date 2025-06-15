
import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const FranceMap = () => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // URL pour les données géographiques de la France (régions)
  const geoUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
  
  // Régions prioritaires avec leurs coordonnées approximatives
  const priorityRegions = [
    { 
      name: 'Île-de-France', 
      coordinates: [2.3522, 48.8566],
      description: 'Accompagnement obligatoire'
    },
    { 
      name: 'Auvergne-Rhône-Alpes', 
      coordinates: [4.8357, 45.7640],
      description: 'Taux de réussite élevé'
    },
    { 
      name: 'Hauts-de-France', 
      coordinates: [3.0573, 50.6292],
      description: 'Région prioritaire'
    },
    { 
      name: 'Nouvelle-Aquitaine', 
      coordinates: [-0.5792, 44.8378],
      description: 'Accompagnement renforcé'
    }
  ];

  return (
    <div className="relative">
      <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-primary/20">
        <h4 className="text-lg font-semibold text-center mb-4">Régions à fort accompagnement</h4>
        
        <div className="relative w-full h-80 bg-gray-50 rounded-lg overflow-hidden">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 2800,
              center: [2.5, 46.5]
            }}
            width={800}
            height={600}
            className="w-full h-full"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies
                  .filter((geo) => geo.properties.NAME === "France")
                  .map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#e5e7eb"
                      stroke="#9ca3af"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#d1d5db" },
                        pressed: { outline: "none" }
                      }}
                    />
                  ))
              }
            </Geographies>
            
            {/* Marqueurs pour les régions prioritaires */}
            {priorityRegions.map((region, index) => (
              <Marker
                key={index}
                coordinates={region.coordinates}
                onMouseEnter={() => setHoveredRegion(region.name)}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                <circle
                  r={8}
                  fill="#F8D164"
                  stroke="#D97706"
                  strokeWidth={2}
                  className="cursor-pointer transition-all duration-200 hover:r-10"
                  style={{
                    filter: hoveredRegion === region.name ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : 'none'
                  }}
                />
                <text
                  textAnchor="middle"
                  y={-12}
                  className="text-xs font-medium fill-gray-700"
                  style={{ fontSize: '10px' }}
                >
                  {region.name.split('-')[0]}
                </text>
              </Marker>
            ))}
          </ComposableMap>
          
          {/* Tooltip au survol */}
          {hoveredRegion && (
            <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200 z-10">
              <h5 className="font-semibold text-primary">{hoveredRegion}</h5>
              <p className="text-sm text-gray-600">
                {priorityRegions.find(r => r.name === hoveredRegion)?.description}
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
              <span>Régions prioritaires</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
              <span>Autres régions</span>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Les régions marquées offrent un accompagnement renforcé et des taux de réussite généralement plus élevés.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FranceMap;

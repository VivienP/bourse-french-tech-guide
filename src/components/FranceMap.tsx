
import React, { useState } from 'react';

const FranceMap = () => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const regions = [
    { name: 'Île-de-France', highlighted: true, x: 48.8566, y: 2.3522 },
    { name: 'Auvergne-Rhône-Alpes', highlighted: true, x: 45.7640, y: 4.8357 },
    { name: 'Hauts-de-France', highlighted: true, x: 50.6292, y: 3.0573 },
    { name: 'Nouvelle-Aquitaine', highlighted: true, x: 44.8378, y: -0.5792 },
  ];

  return (
    <div className="relative">
      <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-primary/20">
        <h4 className="text-lg font-semibold text-center mb-4">Régions à fort accompagnement</h4>
        
        {/* Simplified France map representation */}
        <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
          <svg viewBox="0 0 200 250" className="w-full h-full">
            {/* Simplified France outline */}
            <path
              d="M50 50 L150 45 L160 60 L155 80 L170 100 L165 140 L160 180 L140 200 L120 210 L100 215 L80 210 L60 200 L45 180 L40 160 L35 140 L30 120 L35 100 L40 80 L45 60 Z"
              fill="#e5e7eb"
              stroke="#9ca3af"
              strokeWidth="2"
            />
            
            {/* Highlighted regions */}
            {/* Île-de-France */}
            <circle cx="95" cy="95" r="8" fill="#F8D164" stroke="#D97706" strokeWidth="2" />
            <text x="95" y="85" textAnchor="middle" className="text-xs font-medium fill-gray-700">IDF</text>
            
            {/* Auvergne-Rhône-Alpes */}
            <circle cx="125" cy="135" r="8" fill="#F8D164" stroke="#D97706" strokeWidth="2" />
            <text x="125" y="125" textAnchor="middle" className="text-xs font-medium fill-gray-700">ARA</text>
            
            {/* Hauts-de-France */}
            <circle cx="85" cy="65" r="8" fill="#F8D164" stroke="#D97706" strokeWidth="2" />
            <text x="85" y="55" textAnchor="middle" className="text-xs font-medium fill-gray-700">HDF</text>
            
            {/* Nouvelle-Aquitaine */}
            <circle cx="70" cy="155" r="8" fill="#F8D164" stroke="#D97706" strokeWidth="2" />
            <text x="70" y="145" textAnchor="middle" className="text-xs font-medium fill-gray-700">NA</text>
          </svg>
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
              Les régions en jaune offrent un accompagnement renforcé et des taux de réussite généralement plus élevés.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FranceMap;

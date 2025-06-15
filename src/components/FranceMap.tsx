
import React from 'react';
import { MapPin, Users, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FranceMap = () => {
  // Régions prioritaires avec leurs informations
  const priorityRegions = [
    { 
      name: 'Île-de-France', 
      description: 'Accompagnement obligatoire',
      difficulty: 'Difficile',
      details: 'Incubation labellisée requise'
    },
    { 
      name: 'Auvergne-Rhône-Alpes', 
      description: 'Taux de réussite élevé',
      difficulty: 'Favorable',
      details: 'Région active avec bon accompagnement'
    },
    { 
      name: 'Hauts-de-France', 
      description: 'Région prioritaire',
      difficulty: 'Favorable',
      details: 'Moins de concurrence'
    },
    { 
      name: 'Nouvelle-Aquitaine', 
      description: 'Accompagnement renforcé',
      difficulty: 'Favorable',
      details: 'Écosystème startup en développement'
    }
  ];

  return (
    <div className="relative">
      <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-primary/20">
        <h4 className="text-lg font-semibold text-center mb-6">Régions et facilité d'obtention</h4>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {priorityRegions.map((region, index) => (
            <Card key={index} className={`border-l-4 ${
              region.difficulty === 'Difficile' ? 'border-l-red-400 bg-red-50' : 'border-l-green-400 bg-green-50'
            }`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {region.name}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    region.difficulty === 'Difficile' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {region.difficulty}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm font-medium text-gray-700 mb-1">{region.description}</p>
                <p className="text-xs text-gray-600">{region.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Card className="border-l-4 border-l-blue-400 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <Users className="h-4 w-4 mr-2 text-blue-600" />
                Île-de-France (Paris et région)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-red-500 mr-2" />
                  <span className="font-medium text-red-700">Accompagnement obligatoire</span>
                </div>
                <p className="text-xs text-gray-700 ml-6">
                  Incubateur référencé ou structure labellisée requis
                </p>
                <p className="text-xs text-gray-600 ml-6">
                  À Paris intra-muros : seule l'incubation labellisée par la Ville de Paris donne accès au dispositif PIA
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-400 bg-green-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-green-600" />
                Autres régions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="font-medium text-green-700">Accompagnement recommandé</span>
                </div>
                <p className="text-xs text-gray-700 ml-6">
                  Non imposé mais renforce significativement la crédibilité du dossier
                </p>
                <p className="text-xs text-gray-600 ml-6">
                  Taux de réussite généralement plus élevé que Paris
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium text-gray-800 mb-2">💡 Conseil stratégique</h5>
          <p className="text-sm text-gray-600">
            Les régions hors Île-de-France offrent généralement de meilleures chances d'acceptation 
            en raison d'une concurrence moins forte et d'enveloppes budgétaires souvent moins sollicitées.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FranceMap;

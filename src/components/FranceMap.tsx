
import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const FranceMap = () => {
  const regionDelegations = [
    {
      region: 'Hauts-de-France',
      delegations: [
        { name: 'Délégation Compiègne', difficulty: 'Accessible' },
        { name: 'Direction régionale Amiens', difficulty: 'Modéré' },
        { name: 'Direction régionale Lille', difficulty: 'Compétitif' }
      ]
    },
    {
      region: 'Normandie',
      delegations: [
        { name: 'Direction régionale Caen', difficulty: 'Accessible' },
        { name: 'Direction régionale Rouen', difficulty: 'Accessible' }
      ]
    },
    {
      region: 'Bretagne',
      delegations: [
        { name: 'Délégation Brest', difficulty: 'Accessible' },
        { name: 'Délégation Lorient', difficulty: 'Accessible' },
        { name: 'Délégation Saint-Brieuc', difficulty: 'Accessible' },
        { name: 'Direction régionale Rennes', difficulty: 'Modéré' }
      ]
    },
    {
      region: 'Grand Est',
      delegations: [
        { name: 'Délégation Metz', difficulty: 'Accessible' },
        { name: 'Délégation Troyes', difficulty: 'Accessible' },
        { name: 'Direction régionale Nancy', difficulty: 'Accessible' },
        { name: 'Direction régionale Reims', difficulty: 'Accessible' },
        { name: 'Direction régionale Strasbourg', difficulty: 'Compétitif' }
      ]
    },
    {
      region: 'Île-de-France',
      delegations: [
        { name: 'Direction régionale La Défense', difficulty: 'Compétitif' },
        { name: 'Direction régionale Val de Fontenay', difficulty: 'Compétitif' },
        { name: 'Direction régionale Paris', difficulty: 'Compétitif' }
      ]
    },
    {
      region: 'Pays de la Loire',
      delegations: [
        { name: 'Délégation La Roche-sur-Yon', difficulty: 'Accessible' },
        { name: 'Délégation Le Mans', difficulty: 'Accessible' },
        { name: 'Direction régionale Nantes', difficulty: 'Modéré' }
      ]
    },
    {
      region: 'Centre-Val de Loire',
      delegations: [
        { name: 'Délégation Tours', difficulty: 'Modéré' },
        { name: 'Direction régionale Orléans', difficulty: 'Modéré' }
      ]
    },
    {
      region: 'Bourgogne-Franche-Comté',
      delegations: [
        { name: 'Délégation Besançon', difficulty: 'Accessible' },
        { name: 'Direction régionale Dijon', difficulty: 'Accessible' }
      ]
    },
    {
      region: 'Nouvelle-Aquitaine',
      delegations: [
        { name: 'Délégation La Rochelle', difficulty: 'Accessible' },
        { name: 'Délégation Limoges', difficulty: 'Accessible' },
        { name: 'Délégation Pau', difficulty: 'Accessible' },
        { name: 'Direction régionale Bordeaux', difficulty: 'Modéré' },
        { name: 'Direction régionale Poitiers', difficulty: 'Accessible' }
      ]
    },
    {
      region: 'Auvergne-Rhône-Alpes',
      delegations: [
        { name: 'Délégation Annecy', difficulty: 'Accessible' },
        { name: 'Délégation Bourg-en-Bresse', difficulty: 'Accessible' },
        { name: 'Délégation Saint-Etienne', difficulty: 'Modéré' },
        { name: 'Délégation Valence', difficulty: 'Accessible' },
        { name: 'Direction régionale Clermont-Ferrand', difficulty: 'Accessible' },
        { name: 'Direction régionale Grenoble', difficulty: 'Compétitif' },
        { name: 'Direction régionale Lyon', difficulty: 'Compétitif' }
      ]
    },
    {
      region: 'Occitanie',
      delegations: [
        { name: 'Délégation Perpignan', difficulty: 'Accessible' },
        { name: 'Direction régionale Montpellier', difficulty: 'Modéré' },
        { name: 'Direction régionale Toulouse', difficulty: 'Compétitif' },
        { name: 'Délégation territoriale Aveyron - Lot - Tarn', difficulty: 'Accessible' }
      ]
    },
    {
      region: 'Provence-Alpes-Côte d\'Azur',
      delegations: [
        { name: 'Délégation Avignon', difficulty: 'Accessible' },
        { name: 'Délégation Nice', difficulty: 'Modéré' },
        { name: 'Direction régionale Marseille', difficulty: 'Compétitif' }
      ]
    },
    {
      region: 'Corse',
      delegations: [
        { name: 'Direction régionale Ajaccio', difficulty: 'Accessible' }
      ]
    },
    {
      region: 'Outre-mer',
      delegations: [
        { name: 'Direction régionale Guadeloupe', difficulty: 'Accessible' },
        { name: 'Direction régionale Martinique', difficulty: 'Accessible' },
        { name: 'Direction régionale Guyane', difficulty: 'Accessible' },
        { name: 'Direction régionale La Réunion', difficulty: 'Accessible' },
        { name: 'Direction régionale Mayotte', difficulty: 'Accessible' },
        { name: 'Direction régionale Nouvelle-Calédonie', difficulty: 'Accessible' }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Compétitif':
        return 'text-red-700 bg-red-100';
      case 'Modéré':
        return 'text-orange-700 bg-orange-100';
      default:
        return 'text-green-700 bg-green-100';
    }
  };

  const getRegionColor = (delegations: any[]) => {
    const hasCompetitif = delegations.some(d => d.difficulty === 'Compétitif');
    const hasModere = delegations.some(d => d.difficulty === 'Modéré');
    
    if (hasCompetitif) return 'border-l-red-400';
    if (hasModere) return 'border-l-orange-400';
    return 'border-l-green-400';
  };

  return (
    <div className="relative">
      <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-primary/20">
        <h4 className="text-lg font-semibold text-center mb-6">Délégations par région et niveau de difficulté</h4>
        
        <div className="space-y-2">
          {regionDelegations.map((regionData, index) => (
            <Collapsible key={index}>
              <Card className={`border-l-4 ${getRegionColor(regionData.delegations)}`}>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="py-3 hover:bg-gray-50">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {regionData.region}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {regionData.delegations.length} délégation{regionData.delegations.length > 1 ? 's' : ''}
                        </span>
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-3">
                    <div className="space-y-2">
                      {regionData.delegations.map((delegation, delIndex) => (
                        <div key={delIndex} className="flex items-center justify-between py-1 px-2 rounded bg-gray-50">
                          <span className="text-sm text-gray-800">{delegation.name}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(delegation.difficulty)}`}>
                            {delegation.difficulty}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium text-gray-800 mb-2">💡 Conseil stratégique</h5>
          <p className="text-sm text-gray-600">
            Les délégations marquées "Accessible" offrent généralement de meilleures chances d'acceptation 
            en raison d'une concurrence moins forte et d'enveloppes budgétaires souvent moins sollicitées.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FranceMap;

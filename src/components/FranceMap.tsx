import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const FranceMap = () => {
  const regionDelegations = [
    { region: 'Auvergne-Rhône-Alpes', delegations: [{ name: 'Délégation Annecy', difficulty: 'Accessible' }, { name: 'Délégation Bourg-en-Bresse', difficulty: 'Accessible' }, { name: 'Délégation Saint-Etienne', difficulty: 'Modéré' }, { name: 'Délégation Valence', difficulty: 'Accessible' }, { name: 'Direction régionale Clermont-Ferrand', difficulty: 'Accessible' }, { name: 'Direction régionale Grenoble', difficulty: 'Compétitif' }, { name: 'Direction régionale Lyon', difficulty: 'Compétitif' }] },
    { region: 'Bourgogne-Franche-Comté', delegations: [{ name: 'Délégation Besançon', difficulty: 'Accessible' }, { name: 'Direction régionale Dijon', difficulty: 'Accessible' }] },
    { region: 'Bretagne', delegations: [{ name: 'Délégation Brest', difficulty: 'Accessible' }, { name: 'Délégation Lorient', difficulty: 'Accessible' }, { name: 'Délégation Saint-Brieuc', difficulty: 'Accessible' }, { name: 'Direction régionale Rennes', difficulty: 'Accessible' }] },
    { region: 'Centre-Val de Loire', delegations: [{ name: 'Délégation Tours', difficulty: 'Accessible' }, { name: 'Direction régionale Orléans', difficulty: 'Modéré' }] },
    { region: 'Corse', delegations: [{ name: 'Direction régionale Ajaccio', difficulty: 'Accessible' }] },
    { region: 'Grand Est', delegations: [{ name: 'Délégation Metz', difficulty: 'Accessible' }, { name: 'Délégation Troyes', difficulty: 'Accessible' }, { name: 'Direction régionale Nancy', difficulty: 'Accessible' }, { name: 'Direction régionale Reims', difficulty: 'Accessible' }, { name: 'Direction régionale Strasbourg', difficulty: 'Modéré' }] },
    { region: 'Hauts-de-France', delegations: [{ name: 'Délégation Compiègne', difficulty: 'Accessible' }, { name: 'Direction régionale Amiens', difficulty: 'Accessible' }, { name: 'Direction régionale Lille', difficulty: 'Compétitif' }] },
    { region: 'Île-de-France', delegations: [{ name: 'Direction régionale La Défense', difficulty: 'Compétitif' }, { name: 'Direction régionale Val de Fontenay', difficulty: 'Compétitif' }, { name: 'Direction régionale Paris', difficulty: 'Compétitif' }] },
    { region: 'Normandie', delegations: [{ name: 'Direction régionale Caen', difficulty: 'Accessible' }, { name: 'Direction régionale Rouen', difficulty: 'Accessible' }] },
    { region: 'Nouvelle-Aquitaine', delegations: [{ name: 'Délégation La Rochelle', difficulty: 'Accessible' }, { name: 'Délégation Limoges', difficulty: 'Accessible' }, { name: 'Délégation Pau', difficulty: 'Accessible' }, { name: 'Direction régionale Bordeaux', difficulty: 'Modéré' }, { name: 'Direction régionale Poitiers', difficulty: 'Accessible' }] },
    { region: 'Occitanie', delegations: [{ name: 'Délégation Perpignan', difficulty: 'Accessible' }, { name: 'Direction régionale Montpellier', difficulty: 'Modéré' }, { name: 'Direction régionale Toulouse', difficulty: 'Modéré' }, { name: 'Délégation territoriale Aveyron - Lot - Tarn', difficulty: 'Accessible' }] },
    { region: 'Outre-mer', delegations: [{ name: 'Direction régionale Guadeloupe', difficulty: 'Accessible' }, { name: 'Direction régionale Martinique', difficulty: 'Accessible' }, { name: 'Direction régionale Guyane', difficulty: 'Accessible' }, { name: 'Direction régionale La Réunion', difficulty: 'Accessible' }, { name: 'Direction régionale Mayotte', difficulty: 'Accessible' }, { name: 'Direction régionale Nouvelle-Calédonie', difficulty: 'Accessible' }] },
    { region: 'Pays de la Loire', delegations: [{ name: 'Délégation La Roche-sur-Yon', difficulty: 'Accessible' }, { name: 'Délégation Le Mans', difficulty: 'Accessible' }, { name: 'Direction régionale Nantes', difficulty: 'Modéré' }] },
    { region: "Provence-Alpes-Côte d'Azur", delegations: [{ name: 'Délégation Avignon', difficulty: 'Accessible' }, { name: 'Délégation Nice', difficulty: 'Modéré' }, { name: 'Direction régionale Marseille', difficulty: 'Compétitif' }] }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Compétitif': return 'text-destructive bg-destructive/10';
      case 'Modéré': return 'text-primary bg-primary/10';
      default: return 'text-foreground bg-accent';
    }
  };

  const getRegionColor = (delegations: any[]) => {
    const hasCompetitif = delegations.some(d => d.difficulty === 'Compétitif');
    const hasModere = delegations.some(d => d.difficulty === 'Modéré');
    if (hasCompetitif) return 'border-l-destructive';
    if (hasModere) return 'border-l-primary';
    return 'border-l-foreground/30';
  };

  return (
    <div className="relative">
      <div className="p-6 rounded-2xl border border-border">
        <h3 className="text-lg font-semibold text-center mb-6 text-foreground">Délégations par région et niveau de difficulté (à titre indicatif)</h3>
        
        <div className="space-y-2">
          {regionDelegations.map((regionData, index) => (
            <Collapsible key={index}>
              <Card className={`border-l-4 ${getRegionColor(regionData.delegations)} rounded-xl`}>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="py-3 hover:bg-accent/50 transition-colors rounded-xl">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span className="flex items-center text-foreground">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        {regionData.region}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {regionData.delegations.length} délégation{regionData.delegations.length > 1 ? 's' : ''}
                        </span>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-3">
                    <div className="space-y-2">
                      {regionData.delegations.map((delegation, delIndex) => (
                        <div key={delIndex} className="flex items-center justify-between py-1 px-2 rounded-lg bg-accent">
                          <span className="text-sm text-foreground">{delegation.name}</span>
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

        <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
          <h5 className="font-medium text-foreground mb-2">💡 Conseil stratégique</h5>
          <p className="text-sm text-muted-foreground">
            Les délégations marquées "Accessible" offrent généralement de meilleures chances d'acceptation 
            en raison d'une concurrence moins forte et d'enveloppes budgétaires souvent moins sollicitées.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FranceMap;

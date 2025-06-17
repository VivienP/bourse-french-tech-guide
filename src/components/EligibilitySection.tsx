
import React from 'react';
import { MapPin, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CriteriaGrid from '@/components/CriteriaGrid';
import FranceMap from '@/components/FranceMap';

const EligibilitySection = () => {
  return (
    <section id="criteres" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Critères d'éligibilité
        </h2>
        
        <p className="text-xl text-gray-600 text-center mb-12">
          L'éligibilité à la Bourse French Tech repose sur des critères propres à l'entreprise et et propres au projet.
        </p>

        <CriteriaGrid />

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Régions et accompagnement</h3>
          <div className="flex flex-col gap-12">
            <FranceMap />
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-2" />
                    Île-de-France
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Accompagnement par un incubateur référencé ou une structure labellisée <strong>obligatoire</strong>.</p>
                  <p className="mt-2 text-sm text-gray-600">
                    À Paris intra-muros (75), seule les incubateurs labellisés donne accès au dispositif Fonds Parisien pour l'Innovation (FPI).
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 text-primary mr-2" />
                    Autres régions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Accompagnement <strong>fortement recommandé</strong> mais non imposé.</p>
                  <p className="mt-2 text-sm text-gray-600">
                    Renforce significativement la crédibilité du dossier.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EligibilitySection;

import React from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CriteriaGrid from '@/components/CriteriaGrid';
import FranceMap from '@/components/FranceMap';

const EligibilitySection = () => {
  return (
    <section id="criteres" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-[1rem]">
          <div className="h-1 w-12 rounded-full bg-primary" />
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Éligibilité</span>
          <div className="h-1 w-12 rounded-full bg-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
          Critères d'éligibilité
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12">L'éligibilité à la Bourse French Tech repose sur des critères propres à l'entreprise et au projet.</p>

        <CriteriaGrid />

        <div className="mt-24">
          <h2 className="font-bold text-foreground mb-8 text-center text-4xl">Régions et accompagnement</h2>
          <div className="flex flex-col gap-12">
            <FranceMap />
            <div className="space-y-6">
              <Card className="border-t-4 border-t-primary rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-2" />
                    Île-de-France
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Accompagnement par un incubateur référencé ou une structure labellisée <strong className="text-foreground">obligatoire</strong>.</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    À Paris intra-muros (75), seuls les incubateurs labellisés donnent accès au dispositif Fonds Parisien pour l'Innovation (FPI).
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

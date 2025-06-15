
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Lightbulb } from 'lucide-react';

const CriteriaGrid = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Critères Entreprise */}
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Building className="h-6 w-6 text-primary mr-3" />
            Critères Entreprise
          </CardTitle>
          <CardDescription>
            Conditions relatives à la structure juridique et financière de votre société.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            <strong>Statut juridique :</strong> Seules les sociétés commerciales (<strong>SAS, SARL</strong>) sont éligibles. Les statuts d'auto-entrepreneur et d'EIRL sont exclus.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Âge de l'entreprise :</strong> La société doit avoir été créée il y a <strong>moins d'un an</strong>.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Capital social :</strong> Un minimum de <strong>5 000 €</strong> est fortement recommandé pour signaler un engagement financier sérieux.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Fonds propres :</strong> Il est nécessaire de disposer de fonds propres à hauteur de <strong>20k€ à 30k€</strong> en Île-de-France et de <strong>10k€ à 30k€</strong> en régions.
          </p>
        </CardContent>
      </Card>

      {/* Critères Projet */}
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Lightbulb className="h-6 w-6 text-primary mr-3" />
            Critères Projet
          </CardTitle>
          <CardDescription>
            Conditions relatives au caractère innovant et au potentiel de votre projet.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            <strong>Type d'innovation :</strong> L'innovation peut être <strong>technologique, d'usage, de procédé ou organisationnelle</strong>. Une innovation de rupture n'est pas obligatoire.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Secteurs d'activité :</strong> Tous les secteurs sont éligibles, bien que les projets dans le <strong>numérique, l'IA, la santé et l'e-commerce</strong> soient fréquents.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Durée du projet :</strong> La phase de faisabilité financée ne doit pas excéder <strong>24 mois</strong>.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Transfert de technologie :</strong> Les projets issus d'un transfert technologique d'un laboratoire vers une entreprise sont <strong>pleinement éligibles</strong>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CriteriaGrid;

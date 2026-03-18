import React from 'react';
import { CheckCircle, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ExpensesSection = () => {
  const externalExpenses = [
  { title: 'Conception et prototypage', description: 'Dépenses liées à la création de maquettes, prototypes fonctionnels ou essais techniques réalisés par des prestataires externes.' },
  { title: 'Études de marché ou de faisabilité', description: "Validation de l'opportunité commerciale, tests d'usage, études de faisabilité technique ou économique." },
  { title: "Prestations de conseil ou d'accompagnement", description: "Accompagnement stratégique ou R&D, structuration du projet, mentorat par des incubateurs ou laboratoires de recherche." },
  { title: 'Dépôts de brevet', description: "Frais de rédaction, de dépôt et de suivi de brevets auprès des offices nationaux ou internationaux de propriété intellectuelle." },
  { title: 'Formations techniques', description: "Formations spécifiques nécessaires à la réalisation du projet innovant, à condition qu'elles soient directement liées au projet." },
  { title: 'Prestations juridiques', description: "Conseil juridique pour la structuration du projet, la rédaction de contrats, la protection de la propriété intellectuelle ou la conformité réglementaire." },
  { title: 'Frais de déplacement', description: "Déplacements chez des design partners, prestataires R&D ou participation à des salons professionnels en lien avec le projet." }];

  const internalExpenses = [
  { title: "Rémunérations des membres de l'équipe projet", description: "Salaires et charges sociales des personnes directement impliquées dans la réalisation du projet innovant." },
  { title: 'Frais généraux forfaitaires (20 % des salaires)', description: "Pris en compte forfaitairement à hauteur de 20 % des salaires déclarés sur le projet." },
  { title: 'Autres dépenses internes', description: "Produits consommables, entretien du matériel, fluides et énergie, autres frais généraux et achats." }];


  return (
    <section id="depenses" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-[2rem]">
          <div className="h-1 w-12 rounded-full bg-primary" />
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Budget</span>
          <div className="h-1 w-12 rounded-full bg-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Dépenses éligibles</h2>
        <p className="text-muted-foreground text-center mb-12 text-base">Les dépenses financées par la BFT se répartissent en frais externes et frais internes.</p>

        <div className="flex flex-col gap-8">
          <Card className="h-full border-t-4 border-t-primary rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Frais externes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {externalExpenses.map((item, index) =>
                <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="h-full border-t-4 border-t-secondary rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-secondary">Frais internes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {internalExpenses.map((item, index) =>
                <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-destructive/5 border-l-4 border-destructive rounded-r-2xl">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-destructive mr-2" />
            <h4 className="font-semibold text-destructive">Important</h4>
          </div>
          <p className="mt-2 text-destructive/70">Les dépenses déjà engagées avant le dépôt du dossier ne peuvent pas être couvertes. Les dépenses liées à la communication ou à l'activité commerciale ne sont pas éligibles.</p>
        </div>
      </div>
    </section>);

};

export default ExpensesSection;
import React from 'react';
import { CheckCircle, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const ExpensesSection = () => {
  const externalExpenses = [{
    title: 'Conception et prototypage',
    description: 'Dépenses liées à la création de maquettes, prototypes fonctionnels ou essais techniques réalisés par des prestataires externes.'
  }, {
    title: 'Études de marché ou de faisabilité',
    description: 'Validation de l\'opportunité commerciale, tests d\'usage, études de faisabilité technique ou économique.'
  }, {
    title: 'Prestations de conseil ou d\'accompagnement',
    description: 'Accompagnement stratégique ou R&D, structuration du projet, mentorat par des incubateurs ou laboratoires de recherche.'
  }, {
    title: 'Dépôts de brevet',
    description: 'Frais de rédaction, de dépôt et de suivi de brevets auprès des offices nationaux ou internationaux de propriété intellectuelle.'
  }, {
    title: 'Formations techniques',
    description: 'Formations spécifiques nécessaires à la réalisation du projet innovant (technologies, outils, méthodologies), à condition qu\'elles soient directement liées au projet.'
  }, {
    title: 'Prestations juridiques',
    description: 'Conseil juridique pour la structuration du projet, la rédaction de contrats, la protection de la propriété intellectuelle ou la conformité réglementaire.'
  }];
  const internalExpenses = [{
    title: 'Rémunérations des membres de l\'équipe projet',
    description: 'Salaires et charges sociales des personnes directement impliquées dans la réalisation du projet innovant (fondateurs, ingénieurs, développeurs, etc.).'
  }, {
    title: 'Frais généraux forfaitaires (20% des salaires)',
    description: 'Prise en compte forfaitaire des frais de fonctionnement (loyer, énergie, fournitures) à hauteur de 20% des salaires déclarés sur le projet.'
  }];
  return <section id="depenses" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Dépenses éligibles
        </h2>
        
        <p className="text-xl text-gray-600 text-center mb-12">
          Les dépenses financées par la BFT se répartissent en frais externes et frais internes.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl text-yellow-600">Frais externes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {externalExpenses.map((item, index) => <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl text-yellow-600">Frais internes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {internalExpenses.map((item, index) => <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-red-400 mr-2" />
            <h4 className="font-semibold text-red-800">Important</h4>
          </div>
          <p className="mt-2 text-red-700">Les dépenses déjà engagées avant le dépôt du dossier ne peuvent pas être couvertes.
Les dépenses liées à la communication ou à l'activité commerciale ne sont pas éligibles.</p>
        </div>
      </div>
    </section>;
};
export default ExpensesSection;
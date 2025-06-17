
import React from 'react';
import { CheckCircle, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ExpensesSection = () => {
  const externalExpenses = [
    {
      title: 'Conception et prototypage',
      description: 'Dépenses liées à la création de maquettes, prototypes fonctionnels ou essais techniques réalisés par des prestataires externes.'
    },
    {
      title: 'Études de marché ou de faisabilité',
      description: 'Validation de l\'opportunité commerciale, tests d\'usage, études de faisabilité technique ou économique.'
    },
    {
      title: 'Prestations de conseil ou d\'accompagnement',
      description: 'Accompagnement stratégique ou R&D, structuration du projet, mentorat par des incubateurs ou laboratoires de recherche.'
    },
    {
      title: 'Dépôts de brevet',
      description: 'Frais de rédaction, de dépôt et de suivi de brevets auprès des offices nationaux ou internationaux de propriété intellectuelle.'
    },
    {
      title: 'Formations techniques',
      description: 'Formations spécifiques nécessaires à la réalisation du projet innovant (technologies, outils, méthodologies), à condition qu\'elles soient directement liées au projet.'
    },
    {
      title: 'Prestations juridiques',
      description: 'Conseil juridique pour la structuration du projet, la rédaction de contrats, la protection de la propriété intellectuelle ou la conformité réglementaire.'
    }
  ];

  const internalExpenses = ['Rémunérations des membres de l\'équipe projet', 'Frais généraux forfaitaires (20% des salaires)'];

  return (
    <section id="depenses" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
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
              <CardTitle className="text-xl text-primary">Frais externes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {externalExpenses.map((item, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-start mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 ml-8">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Frais internes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {internalExpenses.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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
    </section>
  );
};

export default ExpensesSection;

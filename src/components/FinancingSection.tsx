import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const FinancingSection = () => {
  return <section id="financement" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Financement et tranches de versement
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-yellow-600">Conditions de financement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Plafond maximum</span>
                <span className="font-bold text-yellow-600">50 000 €</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Taux d'intervention</span>
                <span className="font-bold text-yellow-600">Jusqu'à 70%</span>
              </div>
              <p className="text-sm text-gray-600">
                L'entreprise doit avancer les fonds propres nécessaires à l'équilibre financier du projet.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-yellow-600">Versement en 2 tranches</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <div>
                    <div className="font-medium">Première tranche : 70%</div>
                    <div className="text-sm text-gray-600">À la signature de la convention</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                  <div>
                    <div className="font-medium">Seconde tranche : 30%</div>
                    <div className="text-sm text-gray-600">Sous réserve de bonne utilisation de la 1ère tranche</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default FinancingSection;
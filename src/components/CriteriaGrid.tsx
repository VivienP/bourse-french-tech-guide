
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Lightbulb, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

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
            Conditions relatives à la structure juridique et financière
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Statut juridique
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="text-sm">SAS, SARL</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">Accepté</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                <span className="text-sm">Auto-entrepreneur, EIRL</span>
                <Badge variant="destructive">Refusé</Badge>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
              Âge de l'entreprise
            </h4>
            <p className="text-sm text-gray-600 p-3 bg-yellow-50 rounded">
              Créée depuis <strong>moins d'un an</strong>
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Capital social
            </h4>
            <div className="space-y-2">
              <div className="p-3 bg-green-50 rounded">
                <p className="text-sm font-medium text-green-800">Recommandé : minimum 5 000 €</p>
                <p className="text-xs text-green-600 mt-1">Signal positif pour Bpifrance</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Fonds propres exigés</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-2 bg-blue-50 rounded text-center">
                <p className="font-medium">Paris</p>
                <p className="text-blue-600">20k-30k €</p>
              </div>
              <div className="p-2 bg-blue-50 rounded text-center">
                <p className="font-medium">Régions</p>
                <p className="text-blue-600">10k-30k €</p>
              </div>
            </div>
          </div>
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
            Conditions relatives à l'innovation et au potentiel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Types d'innovation acceptés</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Technologique',
                'D\'usage',
                'De procédé',
                'Organisationnel'
              ].map((type, index) => (
                <div key={index} className="flex items-center p-2 bg-primary/10 rounded">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">{type}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Secteurs populaires en 2025</h4>
            <div className="space-y-2">
              <Badge variant="outline" className="mr-2 mb-2">Logiciels</Badge>
              <Badge variant="outline" className="mr-2 mb-2">Intelligence Artificielle</Badge>
              <Badge variant="outline" className="mr-2 mb-2">Santé connectée</Badge>
              <Badge variant="outline" className="mr-2 mb-2">E-commerce</Badge>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Tous les secteurs sont éligibles avec une innovation démontrée
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Durée du projet</h4>
            <div className="p-3 bg-blue-50 rounded">
              <p className="text-sm font-medium text-blue-800">Maximum 24 mois</p>
              <p className="text-xs text-blue-600 mt-1">Phase de validation technico-économique</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Transfert technologique</h4>
            <div className="flex items-center p-3 bg-green-50 rounded">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm">Projets de laboratoire vers entreprise éligibles</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CriteriaGrid;

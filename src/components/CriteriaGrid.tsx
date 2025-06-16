import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Lightbulb, Calendar, Circle, CheckCircle } from 'lucide-react';
const CriteriaGrid = () => {
  const companyCriteria = [{
    icon: Building,
    title: 'Statut juridique',
    requirement: 'SAS, SARL uniquement',
    description: 'Les statuts d\'auto-entrepreneur et d\'EIRL sont exclus',
    status: 'required'
  }, {
    icon: Calendar,
    title: 'Âge de l\'entreprise',
    requirement: '< 1 an',
    description: 'La société doit avoir été créée il y a moins d\'un an',
    status: 'required'
  }, {
    icon: Circle,
    title: 'Capital social',
    requirement: '≥ 5 000 €',
    description: 'Fortement recommandé pour signaler un engagement sérieux',
    status: 'recommended'
  }, {
    icon: CheckCircle,
    title: 'Fonds propres',
    requirement: '10-30k€',
    description: 'IDF: 20-30k€ • Régions: 10-30k€',
    status: 'required'
  }];
  const projectCriteria = [{
    icon: Lightbulb,
    title: 'Type d\'innovation',
    requirement: 'Innovation démontrée',
    description: 'Technologique, d\'usage, de procédé ou organisationnelle',
    status: 'required'
  }, {
    icon: Building,
    title: 'Secteurs d\'activité',
    requirement: 'Tous secteurs',
    description: 'Numérique, IA, santé et e-commerce sont fréquents',
    status: 'flexible'
  }, {
    icon: Calendar,
    title: 'Durée du projet',
    requirement: '≤ 24 mois',
    description: 'Phase de faisabilité financée limitée à 24 mois',
    status: 'required'
  }, {
    icon: CheckCircle,
    title: 'Transfert de technologie',
    requirement: 'Pleinement éligible',
    description: 'Projets issus d\'un laboratoire vers une entreprise',
    status: 'eligible'
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'required':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'recommended':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'flexible':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'eligible':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'required':
        return 'Obligatoire';
      case 'recommended':
        return 'Recommandé';
      case 'flexible':
        return 'Flexible';
      case 'eligible':
        return 'Éligible';
      default:
        return 'Info';
    }
  };
  const CriteriaCard = ({
    title,
    criteria,
    iconColor
  }: {
    title: string;
    criteria: typeof companyCriteria;
    iconColor: string;
  }) => <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl mb-2">
          {criteria === companyCriteria ? <Building className={`h-6 w-6 ${iconColor} mr-3`} /> : <Lightbulb className={`h-6 w-6 ${iconColor} mr-3`} />}
          {title}
        </CardTitle>
        <CardDescription className="text-base">
          {criteria === companyCriteria ? "Conditions relatives à la structure juridique et financière de votre société." : "Conditions relatives au caractère innovant et au potentiel de votre projet."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {criteria.map((criterion, index) => <div key={index} className="group p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <criterion.icon className="h-5 w-5 text-gray-600 group-hover:text-primary transition-colors" />
                <h4 className="font-semibold text-gray-900">{criterion.title}</h4>
              </div>
              <Badge variant="outline" className={`text-xs font-medium ${getStatusColor(criterion.status)}`}>
                {getStatusLabel(criterion.status)}
              </Badge>
            </div>
            
            <div className="ml-8">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-primary/10 font-semibold text-sm rounded-full text-yellow-600">
                  {criterion.requirement}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {criterion.description}
              </p>
            </div>
          </div>)}
      </CardContent>
    </Card>;
  return <div className="grid lg:grid-cols-2 gap-8">
      <CriteriaCard title="Critères Entreprise" criteria={companyCriteria} iconColor="text-blue-600" />
      <CriteriaCard title="Critères Projet" criteria={projectCriteria} iconColor="text-green-600" />
    </div>;
};
export default CriteriaGrid;
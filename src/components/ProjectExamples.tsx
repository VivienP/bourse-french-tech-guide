import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Heart, Lightbulb } from 'lucide-react';
const ProjectExamples = () => {
  const projects = [{
    icon: Bot,
    title: 'Solution SaaS d’optimisation logistique',
    sector: 'Intelligence Artificielle',
    subvention: '28 000 €',
    fondsPropres: '28 000 €',
    description: 'Développement d’une plateforme basée sur l’intelligence artificielle pour optimiser les flux logistiques des PME.',
    depenses: ['R&D : 20 000 €', 'Prototypage : 10 000 €', 'Étude de marché : 6 000 €', 'Accompagnement incubateur : 3 000 €', 'Frais juridiques : 1 000 €'],
    color: 'bg-blue-500'
  }, {
    icon: Heart,
    title: 'Dispositif médical connecté',
    sector: 'Santé & Bien-être',
    subvention: '30 000 €',
    fondsPropres: '30 000 €',
    description: 'Création d’un algorithme IA pour l\'identification précoce des troubles cardiaques des personnes âgées isolées via capteur portable connecté.',
    depenses: ['Développement par laboratoire IA : 35 000 €', 'Frais de personnel & fonctionnement : 7 000 €', 'Protection propriété intellectuelle : 1 000 €'],
    color: 'bg-red-500'
  }, {
    icon: Lightbulb,
    title: 'Application mobile écoresponsable',
    sector: 'Tech & Impact',
    subvention: '29 000 €',
    fondsPropres: '18 000 €',
    description: 'Développement d’une application pour encourager les comportements écoresponsables via gamification et neurosciences.',
    depenses: ['Prototypage & tests (CTO ext.) : 20 000 €', 'Partenariat neurosciences : 7 000 €', 'Participation salon : 2 000 €', 'Étude de marché (ChatGPT Pro) : 400 €'],
    color: 'bg-green-500'
  }];
  return <div className="grid lg:grid-cols-3 gap-6">
      {projects.map((project, index) => <Card key={index} className="h-full hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${project.color} rounded-lg flex items-center justify-center`}>
                <project.icon className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline">{project.sector}</Badge>
            </div>
            <CardTitle className="text-lg leading-tight">{project.title}</CardTitle>
            <CardDescription className="text-base">{project.description}</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Financing */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-primary/10 rounded-lg text-center">
                <p className="text-sm font-medium text-gray-600">Subvention obtenue</p>
                <p className="text-lg font-bold text-primary">{project.subvention}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <p className="text-sm font-medium text-gray-600">Fonds propres</p>
                <p className="text-lg font-bold text-gray-700">{project.fondsPropres}</p>
              </div>
            </div>
            
            {/* Expenses */}
            <div>
              <h4 className="font-medium mb-2 text-sm text-gray-700">Dépenses couvertes :</h4>
              <ul className="space-y-1">
                {project.depenses.map((depense, depenseIndex) => <li key={depenseIndex} className="text-sm text-gray-600 flex items-center">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                    <span>{depense}</span>
                  </li>)}
              </ul>
            </div>
          </CardContent>
        </Card>)}
    </div>;
};
export default ProjectExamples;
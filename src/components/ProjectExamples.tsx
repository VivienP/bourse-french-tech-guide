import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Heart, Lightbulb } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
const ProjectExamples = () => {
  const {
    ref,
    isVisible
  } = useScrollAnimation();
  const projects = [{
    icon: Bot,
    title: 'Solution SaaS d\'optimisation logistique',
    sector: 'Intelligence Artificielle',
    subvention: '30 000 €',
    montantTotal: '43 000 €',
    fondsPropres: '30 000 €',
    description: 'Développement d\'une plateforme basée sur l\'IA pour optimiser les flux logistiques des PME.',
    depenses: ['Développement algorithme IA : 20 000 €', 'Intégration & tests plateforme : 11 000 €', 'Infrastructure cloud & licences : 4 000 €', 'Étude de marché terrain : 4 000 €', 'Accompagnement incubateur : 3 000 €', 'Frais juridiques & conformité : 1 000 €'],
    color: 'bg-blue-500'
  }, {
    icon: Heart,
    title: 'Dispositif médical connecté',
    sector: 'Santé & Bien-être',
    subvention: '30 000 €',
    montantTotal: '57 000 €',
    fondsPropres: '30 000 €',
    description: 'Algorithme IA pour détecter précocement les troubles cardiaques chez les seniors via capteur portable.',
    depenses: ['Conception capteur & électronique : 20 000 €', 'Développement software & IA : 22 000 €', 'Tests cliniques & validation : 10 000 €', 'Propriété intellectuelle & brevets : 5 000 €'],
    color: 'bg-red-500'
  }, {
    icon: Lightbulb,
    title: 'Application mobile écoresponsable',
    sector: 'Tech & Impact',
    subvention: '29 000 €',
    montantTotal: '47 000 €',
    fondsPropres: '18 000 €',
    description: 'App pour encourager les comportements écoresponsables grâce à la gamification et aux neurosciences.',
    depenses: ['Design UX/UI & gamification : 12 000 €', 'Développement mobile (iOS/Android) : 20 000 €', 'Recherche neurosciences : 8 000 €', 'Hébergement & services cloud : 3 000 €', 'Lancement marketing & salon : 4 000 €'],
    color: 'bg-green-500'
  }];
  return <div ref={ref} className={`grid lg:grid-cols-3 gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {projects.map((project, index) => <div key={index} className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{
      transitionDelay: `${index * 150}ms`
    }}>
          <Card className="h-full hover:shadow-lg transition-shadow">
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
              {/* Total Project Amount */}
              <div className="p-3 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg text-center border border-primary/20">
                <p className="text-sm font-medium text-gray-600">Montant total du projet</p>
                <p className="text-xl font-bold text-yellow-600">{project.montantTotal}</p>
              </div>

              {/* Financing */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-primary/10 rounded-lg text-center">
                  <p className="text-sm font-medium text-gray-600">Subvention obtenue</p>
                  <p className="text-lg font-bold text-yellow-600">{project.subvention}</p>
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
          </Card>
        </div>)}
    </div>;
};
export default ProjectExamples;
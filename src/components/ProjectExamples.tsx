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
    title: 'Application IA de recommandation d\'itinéraires à faible impact carbone',
    sector: 'Intelligence Artificielle',
    subvention: '30 000 €',
    montantTotal: '43 000 €',
    fondsPropres: '13 000 €',
    summary: 'Développement d\'une application mobile basée sur l\'IA pour la recommandation de trajets décarbonés, intégrant les transports publics, la marche, le vélo et le covoiturage.',
    description: 'Ce projet propose une application innovante utilisant un modèle prédictif avancé (IA) pour calculer en temps réel l\'itinéraire le plus écologique, adapté à chaque utilisateur en fonction de ses préférences (temps, confort, sécurité). L\'innovation repose sur l\'intégration d\'une multitude de données ouvertes (horaires transports publics, pistes cyclables, trafic temps réel, émissions CO₂), combinées avec des modèles comportementaux apprenants.',
    depenses: [
      'Développement algorithme IA prédictif : 18 000 €',
      'Intégration APIs données ouvertes : 8 000 €',
      'Développement application mobile : 12 000 €',
      'Tests utilisateurs & validation : 3 000 €',
      'Infrastructure cloud & hébergement : 2 000 €'
    ],
    color: 'bg-green-500'
  }, {
    icon: Recycle,
    title: 'Plateforme d\'économie circulaire pour équipements électroniques professionnels',
    sector: 'Tech & Blockchain',
    subvention: '30 000 €',
    montantTotal: '52 000 €',
    fondsPropres: '22 000 €',
    summary: 'Création d\'une plateforme numérique facilitant le reconditionnement, la traçabilité et la revente sécurisée des équipements électroniques professionnels en fin de cycle, via une blockchain.',
    description: 'Ce projet vise à développer une plateforme SaaS dédiée à l\'économie circulaire, utilisant la technologie blockchain pour garantir la traçabilité et la sécurité des données liées au reconditionnement d\'équipements électroniques. L\'innovation réside dans l\'utilisation avancée de la blockchain pour assurer la transparence totale des échanges et certifier le cycle de vie complet des appareils.',
    depenses: [
      'Développement plateforme SaaS : 20 000 €',
      'Intégration blockchain & smart contracts : 15 000 €',
      'Système de traçabilité avancé : 10 000 €',
      'Tests sécurité & audit blockchain : 5 000 €',
      'Conformité réglementaire RGPD : 2 000 €'
    ],
    color: 'bg-purple-500'
  }, {
    icon: Heart,
    title: 'Solution digitale immersive pour la rééducation post-traumatique à domicile',
    sector: 'Santé & Réalité Augmentée',
    subvention: '30 000 €',
    montantTotal: '48 000 €',
    fondsPropres: '18 000 €',
    summary: 'Développement d\'une solution digitale immersive (réalité augmentée) permettant aux patients d\'effectuer leur rééducation post-traumatique à domicile, avec suivi à distance par des professionnels de santé.',
    description: 'Le projet consiste à créer une application interactive utilisant la réalité augmentée afin d\'accompagner efficacement les patients dans leur rééducation musculaire et articulaire à domicile. Grâce à un système de captation gestuelle avancé et un suivi personnalisé en temps réel par des thérapeutes à distance, le patient bénéficie d\'exercices adaptés et sécurisés.',
    depenses: [
      'Développement application réalité augmentée : 20 000 €',
      'Système captation gestuelle avancé : 12 000 €',
      'Plateforme suivi thérapeutes : 8 000 €',
      'Tests cliniques & validation médicale : 6 000 €',
      'Conformité dispositif médical : 2 000 €'
    ],
    color: 'bg-red-500'
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
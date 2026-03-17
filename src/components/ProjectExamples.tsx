
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Heart, Recycle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ProjectExamples = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  const projects = [{
    icon: Bot,
    title: "Application IA de recommandation d'itinéraires à faible impact carbone",
    sector: 'Intelligence Artificielle',
    subvention: '30 000 €',
    montantTotal: '43 000 €',
    fondsPropres: '30 000 €',
    summary: "Développement d'une application mobile basée sur l'intelligence artificielle permettant de recommander aux utilisateurs les trajets les moins carbonés.",
    description: "Ce projet propose une application innovante utilisant un modèle prédictif avancé (IA) pour calculer en temps réel l'itinéraire le plus écologique, adapté à chaque utilisateur en fonction de ses préférences.",
    depenses: ['Développement algorithme IA prédictif : 18 000 €', 'Intégration APIs données ouvertes : 8 000 €', 'Développement application mobile : 12 000 €', 'Tests utilisateurs & validation : 3 000 €', 'Infrastructure cloud & hébergement : 2 000 €'],
  }, {
    icon: Recycle,
    title: "Plateforme d'économie circulaire pour équipements électroniques professionnels",
    sector: 'Tech & Blockchain',
    subvention: '29 500 €',
    montantTotal: '42 000 €',
    fondsPropres: '20 000 €',
    summary: "Création d'une plateforme numérique facilitant le reconditionnement, la traçabilité et la revente sécurisée des équipements électroniques professionnels.",
    description: "Ce projet vise à développer une plateforme SaaS dédiée à l'économie circulaire, utilisant la technologie blockchain pour garantir la traçabilité et la sécurité des données.",
    depenses: ['Développement plateforme SaaS : 20 000 €', 'Intégration blockchain & smart contracts : 15 000 €', 'Tests sécurité & audit blockchain : 5 000 €', 'Conformité réglementaire RGPD : 2 000 €'],
  }, {
    icon: Heart,
    title: 'Solution digitale immersive pour la rééducation post-traumatique à domicile',
    sector: 'Santé & Réalité Augmentée',
    subvention: '30 000 €',
    montantTotal: '53 000 €',
    fondsPropres: '70 000 €',
    summary: "Développement d'une solution digitale immersive (réalité augmentée) permettant aux patients d'effectuer leur rééducation à domicile.",
    description: "Le projet consiste à créer une application interactive utilisant la réalité augmentée afin d'accompagner efficacement les patients dans leur rééducation musculaire et articulaire.",
    depenses: ['Développement application réalité augmentée : 20 000 €', 'Algorithmes de pose estimation : 15 000 €', 'Plateforme suivi thérapeutes : 10 000 €', 'Tests cliniques & validation médicale : 6 000 €', 'Conformité dispositif médical : 2 000 €'],
  }];

  return (
    <div ref={ref} className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {projects.map((project, index) => (
        <div 
          key={index} 
          className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <Card className="border-t-4 border-t-primary rounded-2xl shadow-warm hover:shadow-warm-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <project.icon className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="outline" className="border-primary/20 text-primary">{project.sector}</Badge>
              </div>
              <CardTitle className="text-lg leading-tight text-foreground">{project.title}</CardTitle>
              <CardDescription className="text-base">{project.summary}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-primary/10 rounded-xl text-center border border-primary/15">
                  <p className="text-sm font-medium text-muted-foreground">Montant total</p>
                  <p className="text-xl font-bold text-primary">{project.montantTotal}</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-xl text-center border border-primary/10">
                  <p className="text-sm font-medium text-muted-foreground">Subvention</p>
                  <p className="text-xl font-bold text-primary">{project.subvention}</p>
                </div>
                <div className="p-4 bg-accent rounded-xl text-center border border-border">
                  <p className="text-sm font-medium text-muted-foreground">Fonds propres</p>
                  <p className="text-xl font-bold text-foreground">{project.fondsPropres}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Description :</h4>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Répartition des dépenses :</h4>
                  <ul className="space-y-2">
                    {project.depenses.map((depense, depenseIndex) => (
                      <li key={depenseIndex} className="text-sm text-muted-foreground flex items-start">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0 mt-2" />
                        <span>{depense}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ProjectExamples;

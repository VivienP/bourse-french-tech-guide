
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, ShoppingCart, Heart, Lightbulb, TrendingUp, Shield } from 'lucide-react';

const ProjectExamples = () => {
  const projects = [
    {
      icon: Bot,
      title: 'Intelligence Artificielle - Support Client',
      sector: 'IA & Automatisation',
      subvention: '30 000 €',
      fondsPropres: '20 000 €',
      description: 'Développement d\'une solution IA pour automatiser le support client avec traitement du langage naturel.',
      depenses: ['Prototypage', 'Validation utilisateur', 'Protection intellectuelle'],
      color: 'bg-blue-500'
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Alimentaire - Circuits Courts',
      sector: 'Commerce & Distribution',
      subvention: '25 000 €',
      fondsPropres: '15 000 €',
      description: 'Plateforme e-commerce spécialisée dans les circuits courts et l\'alimentation locale.',
      depenses: ['Prototype logiciel', 'Étude de marché', 'Aspects juridiques'],
      color: 'bg-green-500'
    },
    {
      icon: Heart,
      title: 'SaaS Santé Connectée',
      sector: 'Santé & Bien-être',
      subvention: '50 000 €',
      fondsPropres: '30 000 €',
      description: 'Solution SaaS pour le suivi médical à distance et la télémédecine.',
      depenses: ['R&D avancée', 'Tests d\'usage', 'Déplacements partenaires'],
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <Card key={index} className="h-full hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${project.color} rounded-lg flex items-center justify-center`}>
                <project.icon className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline">{project.sector}</Badge>
            </div>
            <CardTitle className="text-lg leading-tight">{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Financing */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-primary/10 rounded-lg text-center">
                <p className="text-sm font-medium text-gray-600">Subvention</p>
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
                {project.depenses.map((depense, depenseIndex) => (
                  <li key={depenseIndex} className="text-sm text-gray-600 flex items-center">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                    {depense}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectExamples;

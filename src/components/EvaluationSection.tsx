
import React from 'react';
import { Users, Target, Lightbulb, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EvaluationSection = () => {
  const criteria = [
    {
      icon: Users,
      title: "L'équipe fondatrice",
      description: "Un profil expérimenté, multi-entrepreneur ou expert reconnu dans son domaine, est un signal très positif. La capacité à mener le projet et à mobiliser des ressources est déterminante."
    },
    {
      icon: Lightbulb,
      title: "La qualité du projet",
      description: "Son caractère innovant, sa proposition de valeur, son positionnement marché."
    },
    {
      icon: Target,
      title: "La structuration du projet",
      description: "Cohérence des étapes, clarté des livrables, crédibilité du planning, alignement entre objectifs et budget."
    },
    {
      icon: TrendingUp,
      title: "L'innovation vs concurrence",
      description: "Différenciation claire, éléments de rupture ou d'originalité."
    },
    {
      icon: Award,
      title: "L'impact global",
      description: "Bénéfices pour les utilisateurs, impact sociétal ou environnemental, potentiel de création d'emplois ou de valeur durable."
    }
  ];

  return (
    <section id="evaluation" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Critères d'évaluation
        </h2>
        
        <p className="text-xl text-gray-600 text-center mb-12">
          Le comité Bpifrance évalue chaque projet selon cinq axes principaux
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {criteria.map((criterion, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <criterion.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{criterion.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{criterion.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EvaluationSection;

import React from 'react';
import { Users, Target, Lightbulb, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const EvaluationSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const criteria = [
    { icon: Users, title: "L'équipe fondatrice", description: "Un profil expérimenté, entrepreneur ou expert dans son domaine, est un signal positif." },
    { icon: Lightbulb, title: "La qualité du projet", description: "Son caractère innovant, sa proposition de valeur, son positionnement marché." },
    { icon: Target, title: "La structuration du projet", description: "Cohérence des étapes, clarté des livrables, crédibilité du planning, alignement entre objectifs et budget." },
    { icon: TrendingUp, title: "L'innovation vs concurrence", description: "Différenciation claire, éléments de rupture ou d'originalité." },
    { icon: Award, title: "L'impact global", description: "Bénéfices pour les utilisateurs, impact sociétal ou environnemental, potentiel de création d'emplois." }
  ];

  return (
    <section id="evaluation" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-1 w-12 rounded-full bg-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Évaluation</span>
            <div className="h-1 w-12 rounded-full bg-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Critères d'évaluation</h2>
          <p className="text-xl text-muted-foreground text-center mb-12">Cinq axes principaux guident l'évaluation de votre dossier</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {criteria.map((criterion, index) => (
              <div key={index} className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                <Card className="h-full rounded-2xl border border-border hover:bg-muted/50 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <criterion.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg text-foreground">{criterion.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{criterion.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EvaluationSection;

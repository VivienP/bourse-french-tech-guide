
import React from 'react';
import { Rocket, Handshake, TrendingUp, BadgeCheck } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const BenefitsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const benefits = [
    {
      icon: Rocket,
      title: 'Financer l\'amorçage',
      description: 'Couvrir les premières étapes du développement technologique sans dilution de capital.',
    },
    {
      icon: Handshake,
      title: 'Premier lien avec Bpifrance',
      description: 'Établir une relation privilégiée qui facilitera vos futurs financements.',
    },
    {
      icon: TrendingUp,
      title: 'Accélérer la croissance',
      description: 'Accéder ensuite aux prêts RDI, avances remboursables et dispositifs d\'investissement.',
    },
    {
      icon: BadgeCheck,
      title: 'Crédibiliser le projet',
      description: 'Le label Bpifrance renforce votre crédibilité auprès des investisseurs et partenaires.',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div 
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-1 w-12 rounded-full bg-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Stratégie</span>
            <div className="h-1 w-12 rounded-full bg-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Importance de la BFT dans le parcours de financement
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Un tremplin stratégique pour les startups innovantes en phase d'amorçage.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 p-6 rounded-2xl border border-border hover:bg-muted/50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-11 h-11 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

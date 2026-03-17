
import React from 'react';
import { Rocket, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const BenefitsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div 
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-1 w-12 rounded-full bg-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Stratégie</span>
            <div className="h-1 w-12 rounded-full bg-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
            Importance de la BFT dans le parcours de financement
          </h2>
          
          <div className="p-8 rounded-2xl border border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center flex-shrink-0">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <div className="text-muted-foreground leading-relaxed">
                <p className="text-base mb-4">
                  La BFT et la BFTE sont des dispositifs clés pour les startups innovantes en phase d'amorçage. Elles permettent non seulement de financer les premières étapes du développement technologique, mais aussi d'établir un premier lien privilégié avec Bpifrance.
                </p>
                <p className="text-base">
                  Ce contact facilite l'accès futur à d'autres solutions de financement adaptées à la croissance de l'entreprise, telles que les prêts RDI, les avances remboursables, ou encore des dispositifs d'accompagnement et d'investissement plus conséquents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

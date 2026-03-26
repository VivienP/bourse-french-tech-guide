
import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-primary/15">
      <div className="max-w-6xl mx-auto relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-md">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-foreground mb-4 text-center md:text-3xl">
            Votre projet est-il éligible ?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-base text-center">
            Répondez à quelques questions et obtenez une évaluation instantanée de votre éligibilité à la Bourse French Tech.
          </p>

          <div className="flex justify-center">
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors text-base shadow-md"
            >
              Évaluer mon éligibilité gratuitement
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;

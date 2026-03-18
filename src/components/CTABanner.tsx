
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const CTABanner = () => {
  const { ref, isVisible } = useScrollAnimation();

  const scrollToCTA = () => {
    const element = document.getElementById('cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-primary/15">
      <div className="max-w-4xl mx-auto relative z-10">
        <div
          ref={ref}
          className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Besoin d'un accompagnement personnalisé ?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-lg">
            Déléguez la constitution de votre dossier et maximisez vos chances de financement.
          </p>
          <Button
            onClick={scrollToCTA}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
          >
            Réserver un créneau
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;

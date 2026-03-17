
import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(43_92%_68%_/_0.08),transparent_70%)]" />
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div 
          ref={ref}
          className={`bg-card/80 backdrop-blur-sm rounded-3xl p-12 shadow-warm-lg border border-primary/10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Vous envisagez de candidater à la <span className="whitespace-nowrap">Bourse French Tech</span> ?
          </h2>
          
          <p className="text-muted-foreground mb-8 max-w-3xl mx-auto text-lg">
            Structurer votre dossier et maximiser vos chances de financement grâce à l'IA.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-4 h-auto rounded-xl shadow-warm transition-all duration-300"
              onClick={() => window.open('https://taap.it/bft-bpifrance-oseille-landing', '_blank')}
            >
              <ArrowRight className="mr-3 h-5 w-5" />
              En savoir plus
            </Button>
            
            <Button 
              size="lg" 
              className="relative bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-4 h-auto rounded-xl shadow-warm-lg transition-all duration-300 overflow-hidden group"
              onClick={() => window.open('https://taap.it/bft-bpifrance-oseille-auth', '_blank')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="relative flex items-center">
                <FileText className="mr-3 h-5 w-5" />
                Constituer mon dossier
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

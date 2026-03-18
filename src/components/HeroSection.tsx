import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatsSection from '@/components/StatsSection';

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  return (
    <section className="relative pt-36 sm:pt-44 md:pt-48 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden" style={{ minHeight: '75vh' }}>
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(43_92%_68%_/_0.12),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(43_92%_68%_/_0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_2px_at_20px_20px,hsl(43_92%_68%_/_0.08)_1px,transparent_0)] bg-[length:40px_40px]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/60 backdrop-blur-md text-sm font-medium text-foreground mb-8 animate-fade-in border-primary/40 hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] transition-shadow duration-300 border-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Subvention Innovation
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-in tracking-tight">
            <span className="whitespace-nowrap">Bourse French Tech</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards] md:text-xl">
            Subvention publique non remboursable jusqu'à <span className="text-primary font-bold">50 000 €</span> pour soutenir 
            la création d'entreprises innovantes à fort potentiel de croissance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
            <Button size="lg" variant="outline" onClick={() => scrollToSection('definition')} className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-3 transition-all duration-200 rounded-xl text-base">
              Découvrir le dispositif
            </Button>
            <Button size="lg" onClick={() => scrollToSection('cta')} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 transition-all duration-200 rounded-xl shadow-md hover:shadow-lg text-base">
              Échangez avec un expert
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="animate-fade-in [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
            <StatsSection />
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;
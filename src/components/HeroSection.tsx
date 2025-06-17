
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatsSection from '@/components/StatsSection';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.1, 0);
  const { ref: subtitleRef, isVisible: subtitleVisible } = useScrollAnimation(0.1, 200);
  const { ref: buttonsRef, isVisible: buttonsVisible } = useScrollAnimation(0.1, 400);
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation(0.1, 600);

  return (
    <section className="pt-36 sm:pt-44 md:pt-48 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center" style={{ minHeight: '75vh' }}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center">
          <div 
            ref={titleRef}
            className={`transition-all duration-700 ${
              titleVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="whitespace-nowrap">Bourse French Tech</span>
            </h1>
          </div>

          <div 
            ref={subtitleRef}
            className={`transition-all duration-700 ${
              subtitleVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Subvention publique non remboursable jusqu'à <span className="bg-gradient-to-r from-[#F8D164] to-[#E6B800] bg-clip-text text-transparent font-semibold">30 000 €</span> pour soutenir 
              la création d'entreprises innovantes à fort potentiel de croissance.
            </p>
          </div>
          
          <div 
            ref={buttonsRef}
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-700 ${
              buttonsVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('definition')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3 transition-all duration-200 rounded-lg hover:scale-105"
            >
              Découvrir le dispositif
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('cta')}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-3 transition-all duration-200 rounded-lg hover:scale-105"
            >
              Prendre rendez-vous
            </Button>
          </div>

          <div 
            ref={statsRef}
            className={`transition-all duration-700 ${
              statsVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <StatsSection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

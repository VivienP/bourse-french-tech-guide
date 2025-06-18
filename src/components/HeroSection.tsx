import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatsSection from '@/components/StatsSection';
interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}
const HeroSection = ({
  scrollToSection
}: HeroSectionProps) => {
  return <section className="pt-36 sm:pt-44 md:pt-48 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center" style={{
    minHeight: '75vh'
  }}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            <span className="whitespace-nowrap">Bourse French Tech</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            Subvention publique non remboursable jusqu'à <span className="bg-gradient-to-r from-[#E6B800] to-[#F8D164] bg-clip-text text-transparent font-semibold">30 000 €</span> pour soutenir 
            la création d'entreprises innovantes à fort potentiel de croissance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
            <Button size="lg" onClick={() => scrollToSection('definition')} className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3 transition-all duration-200 rounded-lg">
              Découvrir le dispositif
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('cta')} className="border-primary hover:bg-primary text-lg px-8 py-3 transition-all duration-200 rounded-lg text-yellow-600">
              Prendre rendez-vous
            </Button>
          </div>

          <div className="animate-fade-in [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
            <StatsSection />
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;
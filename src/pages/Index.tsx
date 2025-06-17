
import React, { useEffect, useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import HeroSection from '@/components/HeroSection';
import DefinitionSection from '@/components/DefinitionSection';
import EligibilitySection from '@/components/EligibilitySection';
import ExpensesSection from '@/components/ExpensesSection';
import FinancingSection from '@/components/FinancingSection';
import ApplicationProcessSection from '@/components/ApplicationProcessSection';
import EvaluationSection from '@/components/EvaluationSection';
import ProjectExamples from '@/components/ProjectExamples';
import BenefitsSection from '@/components/BenefitsSection';
import CTASection from '@/components/CTASection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Index = () => {
  const [activeSection, setActiveSection] = useState('');
  const { ref: examplesRef, isVisible: examplesVisible } = useScrollAnimation(0.1, 0);
  const { ref: examplesTitleRef, isVisible: examplesTitleVisible } = useScrollAnimation(0.1, 200);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['definition', 'criteres', 'depenses', 'financement', 'processus', 'evaluation', 'exemples', 'faq'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <NavigationBar activeSection={activeSection} scrollToSection={scrollToSection} />
      <HeroSection scrollToSection={scrollToSection} />
      <DefinitionSection />
      <EligibilitySection />
      <ExpensesSection />
      <FinancingSection />
      <ApplicationProcessSection />
      <CTASection />
      <EvaluationSection />
      
      {/* Exemples de projets */}
      <section id="exemples" className="py-16 px-4 sm:px-6 lg:px-8 bg-white" ref={examplesRef}>
        <div className="max-w-6xl mx-auto">
          <div 
            ref={examplesTitleRef}
            className={`transition-all duration-700 ${
              examplesTitleVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Exemples de projets éligibles en 2025
            </h2>
          </div>
          
          <div className={`transition-all duration-700 delay-300 ${
            examplesVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <ProjectExamples />
          </div>
        </div>
      </section>

      <FAQSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;

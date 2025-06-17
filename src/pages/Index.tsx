
import React, { useEffect, useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import HeroSection from '@/components/HeroSection';
import DefinitionSection from '@/components/DefinitionSection';
import EligibilitySection from '@/components/EligibilitySection';
import ExpensesSection from '@/components/ExpensesSection';
import FinancingSection from '@/components/FinancingSection';
import ApplicationProcessSection from '@/components/ApplicationProcessSection';
import EvaluationSection from '@/components/EvaluationSection';
import PracticalAdviceSection from '@/components/PracticalAdviceSection';
import ProjectExamples from '@/components/ProjectExamples';
import BenefitsSection from '@/components/BenefitsSection';
import CTASection from '@/components/CTASection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['definition', 'criteres', 'depenses', 'financement', 'processus', 'evaluation', 'conseils', 'exemples', 'faq'];
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
      <PracticalAdviceSection />
      
      {/* Exemples de projets */}
      <section id="exemples" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Exemples de projets éligibles en 2025
          </h2>
          <ProjectExamples />
        </div>
      </section>

      <CTASection />
      <FAQSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;

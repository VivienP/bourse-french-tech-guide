
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
import ChatBubble from '@/components/ChatBubble';

const Index = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['definition', 'avantages', 'criteres', 'exemples', 'depenses', 'financement', 'processus', 'evaluation', 'conseils', 'faq'];
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
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar activeSection={activeSection} scrollToSection={scrollToSection} />
      <HeroSection scrollToSection={scrollToSection} />
      <DefinitionSection />
      <BenefitsSection />
      <EligibilitySection />
      
      <section id="exemples" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-1 w-12 rounded-full bg-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Exemples</span>
            <div className="h-1 w-12 rounded-full bg-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
            Exemples de projets éligibles en 2026
          </h2>
          <ProjectExamples />
        </div>
      </section>

      <CTASection />
      <ExpensesSection />
      <FinancingSection />
      <ApplicationProcessSection />
      <EvaluationSection />
      <PracticalAdviceSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <ChatBubble />
    </div>
  );
};

export default Index;


import React from 'react';
import { Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationBarProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

const NavigationBar = ({ activeSection, scrollToSection }: NavigationBarProps) => {
  const navItems = [
    { id: 'definition', label: 'Définition' },
    { id: 'criteres', label: 'Critères' },
    { id: 'processus', label: 'Processus' },
    { id: 'exemples', label: 'Exemples' },
    { id: 'faq', label: 'FAQ' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Award className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gray-900 whitespace-nowrap hidden sm:inline">Bourse French Tech</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                  activeSection === item.id ? 'text-primary' : 'text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <Button
            onClick={() => scrollToSection('cta')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200"
          >
            Réserver un créneau
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;


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
    <nav className="fixed top-0 left-0 right-0 bg-card/80 backdrop-blur-md border-b border-border shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <Award className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground whitespace-nowrap hidden sm:inline">Bourse French Tech</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'text-primary-foreground bg-primary shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <Button
            onClick={() => scrollToSection('cta')}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all duration-200 shadow-sm"
          >
            Réserver un créneau
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;

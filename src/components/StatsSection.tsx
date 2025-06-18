
import React from 'react';
import { TrendingUp, Users, Award, Target } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const StatsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const stats = [
    {
      icon: TrendingUp,
      value: '50 000 €',
      label: 'Montant maximum',
      sublabel: '30 000€ en pratique'
    },
    {
      icon: Target,
      value: '70%',
      label: 'Taux d\'intervention',
      sublabel: 'Maximum des dépenses'
    },
    {
      icon: Award,
      value: '~25%',
      label: 'Taux de succès',
      sublabel: 'Dossiers acceptés'
    },
    {
      icon: Users,
      value: '24 mois',
      label: 'Durée maximum',
      sublabel: 'Phase de validation'
    }
  ];

  return (
    <div ref={ref} className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`text-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
            <stat.icon className="h-6 w-6 text-primary" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            {stat.value}
          </div>
          <div className="text-sm font-medium text-gray-600 mb-1">
            {stat.label}
          </div>
          <div className="text-xs text-gray-500">
            {stat.sublabel}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;

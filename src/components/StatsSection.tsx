
import React from 'react';
import { TrendingUp, Users, Award, Target } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: '50 000 €',
      label: 'Montant maximum',
      sublabel: '30 000€ max. en pratique'
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
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

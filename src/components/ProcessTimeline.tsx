
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Phone, Users, FileText, CheckCircle } from 'lucide-react';

const ProcessTimeline = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Dépôt en ligne',
      description: 'Soumission du dossier via app.bel.bpifrance.fr',
      documents: ['Fiche de présentation', 'Business plan détaillé', 'Pitch deck'],
      color: 'bg-blue-500'
    },
    {
      icon: Phone,
      title: 'Entretien téléphonique',
      description: 'Échange avec un chargé d\'affaires Bpifrance',
      documents: ['Validation du projet', 'Clarifications techniques'],
      color: 'bg-green-500'
    },
    {
      icon: Users,
      title: 'Pré-comité régional',
      description: 'Présentation devant le comité préliminaire',
      documents: ['Avis favorable requis', 'Recommandations éventuelles'],
      color: 'bg-yellow-500'
    },
    {
      icon: FileText,
      title: 'Instruction du dossier',
      description: 'Analyse approfondie par les équipes Bpifrance',
      documents: ['Vérification éligibilité', 'Évaluation technique'],
      color: 'bg-purple-500'
    },
    {
      icon: CheckCircle,
      title: 'Comité de décision',
      description: 'Décision finale d\'attribution',
      documents: ['Notification de décision', 'Convention de subvention'],
      color: 'bg-primary'
    }
  ];

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200"></div>
      
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            {/* Timeline dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-primary rounded-full z-10"></div>
            
            {/* Content */}
            <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 ${step.color} rounded-lg flex items-center justify-center mr-4`}>
                      <step.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-1">
                    {step.documents.map((doc, docIndex) => (
                      <li key={docIndex} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Step number */}
            <div className={`w-2/12 flex justify-center ${index % 2 === 0 ? 'order-last' : 'order-first'}`}>
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessTimeline;

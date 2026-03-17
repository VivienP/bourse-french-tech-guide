
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
      title: 'Entretien avec le chargé d\'affaires',
      description: 'Échange de 30-60min. avec un chargé d\'affaires Bpifrance',
      documents: ['Pitch du projet','Question sur l\'équipe (expérience, complémentarité)', 'Questions sur l\'innovation (verrous tech, applications)','Question sur la finance (tréso, traction, cash burn)'],
      color: 'bg-green-500'
    },
    {
      icon: Users,
      title: 'Etude du dossier par le chargé d\'affaire ou le Pré-comité',
      description: 'Etude préliminaire du dossier',
      documents: ['Avis favorable requis', 'Recommandations éventuelles'],
      color: 'bg-yellow-500'
    },
    {
      icon: FileText,
      title: 'Instruction du dossier',
      description: 'Réstitution du dossier par le chargé d\'affaire devant le comité',
      documents: ['Vérification éligibilité', 'Évaluation technique'],
      color: 'bg-purple-500'
    },
    {
      icon: CheckCircle,
      title: 'Réponse de bpifrance',
      description: 'Décision finale d\'attribution du financement',
      documents: ['Notification de décision', 'Convention de subvention'],
      color: 'bg-primary'
    }
  ];

  return (
    <div className="relative">
      {/* Timeline line - hidden on mobile, visible on desktop */}
      <div className="hidden lg:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200"></div>
      
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className={`relative flex items-center w-full ${index % 2 !== 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
            {/* Timeline dot - hidden on mobile, visible on desktop */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-primary rounded-full z-10"></div>
            
            {/* Mobile layout - full width */}
            <div className="w-full lg:hidden">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm mr-4">
                  {index + 1}
                </div>
                <div className={`w-10 h-10 ${step.color} rounded-lg flex items-center justify-center`}>
                  <step.icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
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

            {/* Desktop layout - content for left side */}
            {index % 2 === 0 && (
              <div className="hidden lg:block w-5/12 pr-8">
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
            )}
            
            {/* Step number - desktop only */}
            <div className="hidden lg:flex w-2/12 justify-center">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
            </div>

            {/* Desktop layout - content for right side */}
            {index % 2 !== 0 && (
               <div className="hidden lg:block w-5/12 pl-8">
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
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessTimeline;

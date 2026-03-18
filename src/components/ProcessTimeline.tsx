
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Phone, Users, FileText, CheckCircle } from 'lucide-react';

const ProcessTimeline = () => {
  const steps = [
    { icon: Upload, title: 'Dépôt en ligne', description: 'Soumission du dossier via app.bel.bpifrance.fr', documents: ['Fiche de présentation', 'Business plan détaillé', 'Pitch deck'] },
    { icon: Phone, title: "Entretien avec le chargé d'affaires", description: "Échange de 30-60min. avec un chargé d'affaires Bpifrance", documents: ['Pitch du projet', "Question sur l'équipe", "Questions sur l'innovation", 'Question sur la finance'] },
    { icon: Users, title: "Étude du dossier par le chargé d'affaires ou le Pré-comité", description: 'Étude préliminaire du dossier', documents: ['Avis favorable requis', 'Recommandations éventuelles'] },
    { icon: FileText, title: 'Instruction du dossier', description: "Restitution du dossier par le chargé d'affaires devant le comité", documents: ['Vérification éligibilité', 'Évaluation technique'] },
    { icon: CheckCircle, title: 'Réponse de Bpifrance', description: "Décision finale d'attribution du financement", documents: ['Notification de décision', 'Convention de subvention'] }
  ];

  return (
    <div className="relative">
      <div className="hidden lg:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-primary/20" />
      
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className={`relative flex items-center w-full ${index % 2 !== 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-card border-4 border-primary rounded-full z-10" />
            
            {/* Mobile layout */}
            <div className="w-full lg:hidden">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-bold text-sm mr-4">
                  {index + 1}
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <Card className="border-t-4 border-t-primary rounded-2xl shadow-sm hover:bg-muted/50 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                  <ul className="space-y-1">
                    {step.documents.map((doc, docIndex) => (
                      <li key={docIndex} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Desktop left */}
            {index % 2 === 0 && (
              <div className="hidden lg:block w-5/12 pr-8">
                <Card className="border-t-4 border-t-primary rounded-2xl shadow-sm hover:bg-muted/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                        <step.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {step.documents.map((doc, docIndex) => (
                        <li key={docIndex} className="text-sm text-muted-foreground flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
            
            <div className="hidden lg:flex w-2/12 justify-center">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
            </div>

            {/* Desktop right */}
            {index % 2 !== 0 && (
              <div className="hidden lg:block w-5/12 pl-8">
                <Card className="border-t-4 border-t-primary rounded-2xl shadow-sm hover:bg-muted/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                        <step.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {step.documents.map((doc, docIndex) => (
                        <li key={docIndex} className="text-sm text-muted-foreground flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
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

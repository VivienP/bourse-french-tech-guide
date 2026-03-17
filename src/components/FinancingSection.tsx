import React from 'react';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FinancingSection = () => {
  return (
    <section id="financement" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-1 w-12 rounded-full bg-primary" />
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Financement</span>
          <div className="h-1 w-12 rounded-full bg-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">Financement et tranches de versement</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-t-4 border-t-primary rounded-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-primary">Conditions de financement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-accent rounded-xl">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                <span className="font-medium text-foreground">Accordée sans sûreté ni caution personnelle</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-accent rounded-xl">
                <span className="font-medium text-foreground">Taux d'intervention</span>
                <span className="font-bold text-primary text-lg">70%</span>
              </div>
              <p className="text-sm text-muted-foreground">L'entreprise doit fournir un justificatif de trésorerie et un plan de trésorerie viable sur la durée du projet et au-delà.</p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-secondary rounded-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-secondary">Tranches de versement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center p-4 bg-primary/5 rounded-xl border border-primary/10">
                <CheckCircle className="h-5 w-5 text-primary mr-3 shrink-0" />
                <div>
                  <div className="font-medium text-foreground">Première tranche : 70%</div>
                  <div className="text-sm text-muted-foreground">À la signature de la convention</div>
                </div>
              </div>
              <div className="flex items-center p-4 bg-secondary/5 rounded-xl border border-secondary/10">
                <CheckCircle className="h-5 w-5 text-secondary mr-3 shrink-0" />
                <div>
                  <div className="font-medium text-foreground">Seconde tranche : 30%</div>
                  <div className="text-sm text-muted-foreground">Sur présentation des justificatifs des dépenses acquittées</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FinancingSection;
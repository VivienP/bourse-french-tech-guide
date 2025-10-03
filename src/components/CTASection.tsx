
import React from 'react';
import { Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(248,209,100,0.08),transparent_70%)]"></div>
      
      {/* Floating elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/8 rounded-full blur-lg animate-pulse delay-300"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Enhanced container with border and shadow */}
        <div 
          ref={ref}
          className={`bg-white/80 backdrop-blur-sm rounded-lg py-12 px-6 shadow-2xl border border-white/20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Prêt à démarrer votre projet ?
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
            Faites-vous accompagner dans votre démarche de financement BFT
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="group relative overflow-hidden"
              onClick={() => window.open('https://cal.com/vivienperrelle/bft', '_blank')}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Prendre rendez-vous
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="group"
              onClick={() => window.open('https://your-form-url.com', '_blank')}
            >
              <FileText className="mr-2 h-5 w-5" />
              Générer mon dossier
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

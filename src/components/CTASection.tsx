
import React from 'react';
import { Info, FileText } from 'lucide-react';
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
          className={`bg-white/80 backdrop-blur-sm rounded-lg p-12 shadow-2xl border border-white/20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Vous envisagez de candidater à la <span className="whitespace-nowrap">Bourse French Tech</span> ?
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto text-lg">
            Structurer votre dossier et maximiser vos chances de financement grâce à l'IA.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
            <Button 
              size="lg" 
              className="bg-gray-900 hover:bg-gray-800 text-white text-lg px-8 py-4 h-auto rounded-lg shadow-lg transition-colors duration-300"
              onClick={() => window.open('https://taap.it/bft-bpifrance-oseille-landing', '_blank')}
            >
              <Info className="mr-3 h-5 w-5" />
              En savoir plus
            </Button>
            
            <Button 
              size="lg" 
              className="relative bg-gradient-to-r from-primary to-yellow-400 hover:from-yellow-400 hover:to-primary text-gray-900 font-semibold text-lg px-8 py-4 h-auto rounded-lg shadow-lg transition-all duration-300 overflow-hidden group"
              onClick={() => window.open('https://taap.it/bft-bpifrance-oseille-auth', '_blank')}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Sliding highlight effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative flex items-center">
                <FileText className="mr-3 h-5 w-5" />
                Constituer mon dossier
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
